import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/driver.css";

interface GrandPrix {
  GrandPrixID: number;
  Name: string;
  Country: string;
  CircuitID: number;
  Year: number;
  WinnerDriverID?: number;
  Image?: string;
}

type GrandPrixForm = {
  Name: string;
  Country: string;
  CircuitID: string;
  Year: string;
  WinnerDriverID: string;
  Image: string;
};

const EMPTY_FORM: GrandPrixForm = {
  Name: "",
  Country: "",
  CircuitID: "",
  Year: "",
  WinnerDriverID: "",
  Image: "",
};

const API_BASE = "http://127.0.0.1:8000/api";
const SANCTUM_URL = "http://localhost:8000/sanctum/csrf-cookie";

function AdminGrandPrixPage() {
  const navigate = useNavigate();
  const [grandPrixList, setGrandPrixList] = useState<GrandPrix[]>([]);
  const [loading, setLoading] = useState(false);
  const [editGP, setEditGP] = useState<GrandPrix | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [form, setForm] = useState<GrandPrixForm>(EMPTY_FORM);

  useEffect(() => {
    fetchGrandPrix();
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

  const fetchGrandPrix = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/grand_prix`);
      setGrandPrixList(await res.json());
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
      const res = await fetch(`${API_BASE}/grand_prix`, {
        method: "POST",
        credentials: "include",
        headers: authHeaders(csrfToken),
        body: JSON.stringify({
          ...form,
          CircuitID: parseInt(form.CircuitID),
          Year: parseInt(form.Year),
          WinnerDriverID: form.WinnerDriverID ? parseInt(form.WinnerDriverID) : null,
          Image: form.Image || "",
        }),
      });
      if (res.ok) {
        setShowAddForm(false);
        setForm(EMPTY_FORM);
        fetchGrandPrix();
      }
    } catch (err) {
      console.error("Add error:", err);
    }
  };

  const handleEdit = async () => {
    if (!editGP) return;
    try {
      const csrfToken = await getCsrfToken();
      const res = await fetch(`${API_BASE}/grand_prix/${editGP.GrandPrixID}`, {
        method: "PUT",
        credentials: "include",
        headers: authHeaders(csrfToken),
        body: JSON.stringify({
          ...editGP,
          Image: editGP.Image || "",
        }),
      });
      if (res.ok) {
        setEditGP(null);
        fetchGrandPrix();
      }
    } catch (err) {
      console.error("Edit error:", err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const csrfToken = await getCsrfToken();
      await fetch(`${API_BASE}/grand_prix/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: { "X-XSRF-TOKEN": csrfToken },
      });
      setDeleteConfirmId(null);
      fetchGrandPrix();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // ─── Sub-components ───────────────────────────────────────────────────────

  const renderAddForm = () => (
    <div className="admin-form-box">
      <h2>Új Grand Prix</h2>
      <div className="admin-form">
        {(["Name", "Country", "CircuitID", "Year", "WinnerDriverID", "Image"] as (keyof GrandPrixForm)[]).map((field) => (
          <div className="admin-form-group" key={field}>
            <label>{field}</label>
            <input
              type={["CircuitID", "Year", "WinnerDriverID"].includes(field) ? "number" : "text"}
              value={form[field]}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            />
          </div>
        ))}
        <div className="admin-form-buttons">
          <button className="admin-form-save" onClick={handleAdd}>Mentés</button>
          <button className="admin-form-cancel" onClick={() => setShowAddForm(false)}>Mégse</button>
        </div>
      </div>
    </div>
  );

  const renderTable = () => (
    <table className="admin-driver-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Név</th>
          <th>Ország</th>
          <th>Circuit ID</th>
          <th>Év</th>
          <th>Győztes Driver ID</th>
          <th>Műveletek</th>
        </tr>
      </thead>
      <tbody>
        {grandPrixList.map((gp) => (
          <tr key={gp.GrandPrixID}>
            <td>{gp.GrandPrixID}</td>
            <td>{gp.Name}</td>
            <td>{gp.Country}</td>
            <td>{gp.CircuitID}</td>
            <td>{gp.Year}</td>
            <td>{gp.WinnerDriverID || "-"}</td>
            <td className="admin-driver-actions">
              <button className="admin-edit-btn" onClick={() => setEditGP({ ...gp })}>
                ✏️ Szerkesztés
              </button>
              {deleteConfirmId === gp.GrandPrixID ? (
                <>
                  <button className="admin-form-save" onClick={() => handleDelete(gp.GrandPrixID)}>
                    Biztos?
                  </button>
                  <button className="admin-form-cancel" onClick={() => setDeleteConfirmId(null)}>
                    Mégse
                  </button>
                </>
              ) : (
                <button className="admin-delete-btn" onClick={() => setDeleteConfirmId(gp.GrandPrixID)}>
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
    <div className="modal-overlay" onClick={() => setEditGP(null)}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Szerkesztés</h2>
        {(["Name", "Country", "CircuitID", "Year", "WinnerDriverID", "Image"] as (keyof GrandPrix)[]).map((field) => (
          <div className="admin-form-group" key={field}>
            <label>{field}</label>
            <input
              type={["CircuitID", "Year", "WinnerDriverID"].includes(field as string) ? "number" : "text"}
              value={editGP![field] as string || ""}
              onChange={(e) => setEditGP({ ...editGP!, [field]: e.target.value })}
            />
          </div>
        ))}
        <div className="modal-buttons">
          <button onClick={handleEdit}>Mentés</button>
          <button onClick={() => setEditGP(null)}>Mégse</button>
        </div>
      </div>
    </div>
  );

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="admin-form-page">
      <div className="admin-driver-container">

        <div className="admin-driver-header">
          <h1>Grand Prix Management</h1>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button className="admin-add-btn" onClick={() => setShowAddForm(!showAddForm)}>
              {showAddForm ? "✕ Bezár" : "+ Add Grand Prix"}
            </button>
            <button className="admin-form-cancel" onClick={() => navigate("/grand_prix")}>
              ← Vissza
            </button>
          </div>
        </div>

        {showAddForm && renderAddForm()}
        {loading ? <div className="loading">Betöltés...</div> : renderTable()}
        {editGP && renderEditModal()}

      </div>
    </div>
  );
}

export default AdminGrandPrixPage;