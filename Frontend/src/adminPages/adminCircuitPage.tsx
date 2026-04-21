import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/driver.css";

interface Circuit {
  CircuitID: number;
  Name: string;
  Location: string;
  Nation: string;
  FirstGrandPrix?: number;
  RecordLapTime?: string;
  RecordDriver?: string;
  Image?: string;
}

type CircuitForm = {
  Name: string;
  Location: string;
  Nation: string;
  FirstGrandPrix: string;
  RecordLapTime: string;
  RecordDriver: string;
  Image: string;
};

const EMPTY_FORM: CircuitForm = {
  Name: "", Location: "", Nation: "",
  FirstGrandPrix: "", RecordLapTime: "", RecordDriver: "", Image: "",
};

const API_BASE = "http://127.0.0.1:8000/api";
const SANCTUM_URL = "http://localhost:8000/sanctum/csrf-cookie";

const NUMBER_FIELDS = ["FirstGrandPrix"];

function AdminCircuitPage() {
  const navigate = useNavigate();
  const [circuits, setCircuits] = useState<Circuit[]>([]);
  const [loading, setLoading] = useState(false);
  const [editC, setEditC] = useState<Circuit | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [form, setForm] = useState<CircuitForm>(EMPTY_FORM);

  useEffect(() => { fetchCircuits(); }, []);

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

  const fetchCircuits = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/circuit/`);
      setCircuits(await res.json());
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
      const res = await fetch(`${API_BASE}/circuit`, {
        method: "POST",
        credentials: "include",
        headers: authHeaders(csrfToken),
        body: JSON.stringify({
          ...form,
          FirstGrandPrix: form.FirstGrandPrix ? parseInt(form.FirstGrandPrix) : null,
          RecordLapTime: form.RecordLapTime || "",
          RecordDriver: form.RecordDriver || "",
          Image: form.Image || "",
        }),
      });
      if (res.ok) {
        setShowAddForm(false);
        setForm(EMPTY_FORM);
        fetchCircuits();
      }
    } catch (err) {
      console.error("Add error:", err);
    }
  };

  const handleEdit = async () => {
    if (!editC) return;
    try {
      const csrfToken = await getCsrfToken();
      const res = await fetch(`${API_BASE}/circuit/${editC.CircuitID}`, {
        method: "PUT",
        credentials: "include",
        headers: authHeaders(csrfToken),
        body: JSON.stringify({
          ...editC,
          RecordLapTime: editC.RecordLapTime || "",
          RecordDriver: editC.RecordDriver || "",
          Image: editC.Image || "",
        }),
      });
      if (res.ok) {
        setEditC(null);
        fetchCircuits();
      }
    } catch (err) {
      console.error("Edit error:", err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const csrfToken = await getCsrfToken();
      await fetch(`${API_BASE}/circuit/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: { "X-XSRF-TOKEN": csrfToken },
      });
      setDeleteConfirmId(null);
      fetchCircuits();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // ─── Sub-components ───────────────────────────────────────────────────────

  const renderAddForm = () => (
    <div className="admin-form-box">
      <h2>Új Circuit</h2>
      <div className="admin-form">
        {(Object.keys(EMPTY_FORM) as (keyof CircuitForm)[]).map((field) => (
          <div className="admin-form-group" key={field}>
            <label>{field}</label>
            <input
              type={NUMBER_FIELDS.includes(field) ? "number" : "text"}
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
          <th>Helyszín</th>
          <th>Nemzet</th>
          <th>Első GP</th>
          <th>Rekorder</th>
          <th>Műveletek</th>
        </tr>
      </thead>
      <tbody>
        {circuits.map((c) => (
          <tr key={c.CircuitID}>
            <td>{c.CircuitID}</td>
            <td>{c.Name}</td>
            <td>{c.Location}</td>
            <td>{c.Nation}</td>
            <td>{c.FirstGrandPrix || "-"}</td>
            <td>{c.RecordDriver || "-"}</td>
            <td className="admin-driver-actions">
              <button className="admin-edit-btn" onClick={() => setEditC({ ...c })}>
                ✏️ Szerkesztés
              </button>
              {deleteConfirmId === c.CircuitID ? (
                <>
                  <button className="admin-form-save" onClick={() => handleDelete(c.CircuitID)}>Biztos?</button>
                  <button className="admin-form-cancel" onClick={() => setDeleteConfirmId(null)}>Mégse</button>
                </>
              ) : (
                <button className="admin-delete-btn" onClick={() => setDeleteConfirmId(c.CircuitID)}>
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
    <div className="modal-overlay" onClick={() => setEditC(null)}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Szerkesztés</h2>
        {(["Name", "Location", "Nation", "FirstGrandPrix", "RecordLapTime", "RecordDriver", "Image"] as (keyof Circuit)[]).map((field) => (
          <div className="admin-form-group" key={field}>
            <label>{field}</label>
            <input
              type={NUMBER_FIELDS.includes(field as string) ? "number" : "text"}
              value={editC![field] as string | number || ""}
              onChange={(e) => setEditC({ ...editC!, [field]: e.target.value })}
            />
          </div>
        ))}
        <div className="modal-buttons">
          <button onClick={handleEdit}>Mentés</button>
          <button onClick={() => setEditC(null)}>Mégse</button>
        </div>
      </div>
    </div>
  );

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="admin-form-page">
      <div className="admin-driver-container">

        <div className="admin-driver-header">
          <h1>Circuit Management</h1>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button className="admin-add-btn" onClick={() => setShowAddForm(!showAddForm)}>
              {showAddForm ? "✕ Bezár" : "+ Add Circuit"}
            </button>
            <button className="admin-form-cancel" onClick={() => navigate("/circuit")}>
              ← Vissza
            </button>
          </div>
        </div>

        {showAddForm && renderAddForm()}
        {loading ? <div className="loading">Betöltés...</div> : renderTable()}
        {editC && renderEditModal()}

      </div>
    </div>
  );
}

export default AdminCircuitPage;