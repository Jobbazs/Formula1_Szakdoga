import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/driver.css";

interface Driver {
  DriverID: number;
  Name: string;
  ConstructorID: number;
  Nationality: string;
  BirthDate?: string;
  Biography?: string;
  Image?: string;
}

type DriverForm = {
  Name: string;
  ConstructorID: string;
  Nationality: string;
  BirthDate: string;
  Biography: string;
  Image: string;
};

const EMPTY_FORM: DriverForm = {
  Name: "",
  ConstructorID: "",
  Nationality: "",
  BirthDate: "",
  Biography: "",
  Image: "",
};

const API_BASE = "http://127.0.0.1:8000/api";
const SANCTUM_URL = "http://localhost:8000/sanctum/csrf-cookie";

function AdminDriverPage() {
  const navigate = useNavigate();
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(false);
  const [editDriver, setEditDriver] = useState<Driver | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [form, setForm] = useState<DriverForm>(EMPTY_FORM);

  useEffect(() => {
    fetchDrivers();
  }, []);

  // ─── API helpers ──────────────────────────────────────────────────────────

  const getCookie = (name: string): string | null => {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? decodeURIComponent(match[2]) : null;
  };

  const getCsrfToken = async (): Promise<string> => {
    await fetch(SANCTUM_URL, { method: "GET", credentials: "include" });
    return getCookie("XSRF-TOKEN") ?? "";
  };

  const authHeaders = (csrfToken: string): HeadersInit => ({
    "Content-Type": "application/json",
    "Accept": "application/json",
    "X-XSRF-TOKEN": csrfToken,
  });

  // ─── Data fetching ────────────────────────────────────────────────────────

  const fetchDrivers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/driver/`);
      setDrivers(await res.json());
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ─── CRUD handlers ────────────────────────────────────────────────────────

  const handleAdd = async () => {
    try {
      const csrfToken = await getCsrfToken();
      const res = await fetch(`${API_BASE}/driver`, {
        method: "POST",
        credentials: "include",
        headers: authHeaders(csrfToken),
        body: JSON.stringify({
          ...form,
          ConstructorID: parseInt(form.ConstructorID),
          Biography: form.Biography || "",
          Image: form.Image || "",
        }),
      });
      if (res.ok) {
        setShowAddForm(false);
        setForm(EMPTY_FORM);
        fetchDrivers();
      }
    } catch (err) {
      console.error("Add error:", err);
    }
  };

  const handleEdit = async () => {
    if (!editDriver) return;
    try {
      const csrfToken = await getCsrfToken();
      const res = await fetch(`${API_BASE}/driver/${editDriver.DriverID}`, {
        method: "PUT",
        credentials: "include",
        headers: authHeaders(csrfToken),
        body: JSON.stringify({
          ...editDriver,
          Biography: editDriver.Biography || "",
          Image: editDriver.Image || "",
        }),
      });
      if (res.ok) {
        setEditDriver(null);
        fetchDrivers();
      }
    } catch (err) {
      console.error("Edit error:", err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const csrfToken = await getCsrfToken();
      await fetch(`${API_BASE}/driver/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: { "X-XSRF-TOKEN": csrfToken },
      });
      setDeleteConfirmId(null);
      fetchDrivers();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // ─── Sub-components ───────────────────────────────────────────────────────

  const renderAddForm = () => (
    <div className="admin-form-box">
      <h2>Új Driver</h2>
      <div className="admin-form">
        {(["Name", "Nationality", "ConstructorID", "BirthDate", "Image"] as (keyof DriverForm)[]).map((field) => (
          <div className="admin-form-group" key={field}>
            <label>{field}</label>
            <input
              type={field === "ConstructorID" ? "number" : field === "BirthDate" ? "date" : "text"}
              value={form[field]}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            />
          </div>
        ))}
        <div className="admin-form-group">
          <label>Biography</label>
          <textarea
            rows={3}
            value={form.Biography}
            onChange={(e) => setForm({ ...form, Biography: e.target.value })}
          />
        </div>
        <div className="admin-form-buttons">
          <button className="admin-form-save" onClick={handleAdd}>Mentés</button>
          <button className="admin-form-cancel" onClick={() => setShowAddForm(false)}>Mégse</button>
        </div>
      </div>
    </div>
  );

  const renderDriverTable = () => (
    <table className="admin-driver-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Név</th>
          <th>Nemzetiség</th>
          <th>Constructor ID</th>
          <th>Születés</th>
          <th>Műveletek</th>
        </tr>
      </thead>
      <tbody>
        {drivers.map((driver) => (
          <tr key={driver.DriverID}>
            <td>{driver.DriverID}</td>
            <td>{driver.Name}</td>
            <td>{driver.Nationality}</td>
            <td>{driver.ConstructorID}</td>
            <td>{driver.BirthDate || "-"}</td>
            <td className="admin-driver-actions">
              <button className="admin-edit-btn" onClick={() => setEditDriver({ ...driver })}>
                ✏️ Szerkesztés
              </button>
              {deleteConfirmId === driver.DriverID ? (
                <>
                  <button className="admin-form-save" onClick={() => handleDelete(driver.DriverID)}>
                    Biztos?
                  </button>
                  <button className="admin-form-cancel" onClick={() => setDeleteConfirmId(null)}>
                    Mégse
                  </button>
                </>
              ) : (
                <button className="admin-delete-btn" onClick={() => setDeleteConfirmId(driver.DriverID)}>
                  🗑 Törlés
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderEditModal = () => (
    <div className="modal-overlay" onClick={() => setEditDriver(null)}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Szerkesztés</h2>
        {(["Name", "Nationality", "ConstructorID", "BirthDate", "Image"] as (keyof Driver)[]).map((field) => (
          <div className="admin-form-group" key={field}>
            <label>{field}</label>
            <input
              type={field === "ConstructorID" ? "number" : field === "BirthDate" ? "date" : "text"}
              value={editDriver![field] as string || ""}
              onChange={(e) => setEditDriver({ ...editDriver!, [field]: e.target.value })}
            />
          </div>
        ))}
        <div className="admin-form-group">
          <label>Biography</label>
          <textarea
            rows={3}
            value={editDriver!.Biography || ""}
            onChange={(e) => setEditDriver({ ...editDriver!, Biography: e.target.value })}
          />
        </div>
        <div className="modal-buttons">
          <button onClick={handleEdit}>Mentés</button>
          <button onClick={() => setEditDriver(null)}>Mégse</button>
        </div>
      </div>
    </div>
  );

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="admin-form-page">
      <div className="admin-driver-container">

        <div className="admin-driver-header">
          <h1>Driver Management</h1>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button className="admin-add-btn" onClick={() => setShowAddForm(!showAddForm)}>
              {showAddForm ? "✕ Bezár" : "+ Add Driver"}
            </button>
            <button className="admin-form-cancel" onClick={() => navigate("/driver")}>
              ← Vissza
            </button>
          </div>
        </div>

        {showAddForm && renderAddForm()}
        {loading ? <div className="loading">Betöltés...</div> : renderDriverTable()}
        {editDriver && renderEditModal()}

      </div>
    </div>
  );
}

export default AdminDriverPage;