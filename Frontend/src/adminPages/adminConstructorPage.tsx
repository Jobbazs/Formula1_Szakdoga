import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/driver.css";

interface Constructor {
  ConstructorID: number;
  Name: string;
  Nationality: string;
  FoundedYear: number;
  TeamPrincipal: string;
  Wins: number;
  PolePositions: number;
  Podiums: number;
  WorldChampionships: number;
  History?: string;
  Image?: string;
}

type ConstructorForm = {
  Name: string;
  Nationality: string;
  FoundedYear: string;
  TeamPrincipal: string;
  Wins: string;
  PolePositions: string;
  Podiums: string;
  WorldChampionships: string;
  History: string;
  Image: string;
};

const EMPTY_FORM: ConstructorForm = {
  Name: "", Nationality: "", FoundedYear: "", TeamPrincipal: "",
  Wins: "0", PolePositions: "0", Podiums: "0", WorldChampionships: "0",
  History: "", Image: "",
};

const API_BASE = "http://127.0.0.1:8000/api";
const SANCTUM_URL = "http://localhost:8000/sanctum/csrf-cookie";

const NUMBER_FIELDS = ["FoundedYear", "Wins", "PolePositions", "Podiums", "WorldChampionships"];

function AdminConstructorPage() {
  const navigate = useNavigate();
  const [constructors, setConstructors] = useState<Constructor[]>([]);
  const [loading, setLoading] = useState(false);
  const [editC, setEditC] = useState<Constructor | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [form, setForm] = useState<ConstructorForm>(EMPTY_FORM);

  useEffect(() => { fetchConstructors(); }, []);

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

  const fetchConstructors = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/constructor/`);
      setConstructors(await res.json());
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
      const res = await fetch(`${API_BASE}/constructor`, {
        method: "POST",
        credentials: "include",
        headers: authHeaders(csrfToken),
        body: JSON.stringify({
          ...form,
          FoundedYear: parseInt(form.FoundedYear),
          Wins: parseInt(form.Wins),
          PolePositions: parseInt(form.PolePositions),
          Podiums: parseInt(form.Podiums),
          WorldChampionships: parseInt(form.WorldChampionships),
          History: form.History || "",
          Image: form.Image || "",
        }),
      });
      if (res.ok) {
        setShowAddForm(false);
        setForm(EMPTY_FORM);
        fetchConstructors();
      }
    } catch (err) {
      console.error("Add error:", err);
    }
  };

  const handleEdit = async () => {
    if (!editC) return;
    try {
      const csrfToken = await getCsrfToken();
      const res = await fetch(`${API_BASE}/constructor/${editC.ConstructorID}`, {
        method: "PUT",
        credentials: "include",
        headers: authHeaders(csrfToken),
        body: JSON.stringify({
          ...editC,
          History: editC.History || "",
          Image: editC.Image || "",
        }),
      });
      if (res.ok) {
        setEditC(null);
        fetchConstructors();
      }
    } catch (err) {
      console.error("Edit error:", err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const csrfToken = await getCsrfToken();
      await fetch(`${API_BASE}/constructor/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: { "X-XSRF-TOKEN": csrfToken },
      });
      setDeleteConfirmId(null);
      fetchConstructors();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // ─── Sub-components ───────────────────────────────────────────────────────

  const renderAddForm = () => (
    <div className="admin-form-box">
      <h2>Új Constructor</h2>
      <div className="admin-form">
        {(Object.keys(EMPTY_FORM) as (keyof ConstructorForm)[]).filter(f => f !== "History").map((field) => (
          <div className="admin-form-group" key={field}>
            <label>{field}</label>
            <input
              type={NUMBER_FIELDS.includes(field) ? "number" : "text"}
              value={form[field]}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            />
          </div>
        ))}
        <div className="admin-form-group">
          <label>History</label>
          <textarea rows={3} value={form.History}
            onChange={(e) => setForm({ ...form, History: e.target.value })} />
        </div>
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
          <th>Nemzetiség</th>
          <th>Alapítás</th>
          <th>Csapatfőnök</th>
          <th>Bajnokságok</th>
          <th>Műveletek</th>
        </tr>
      </thead>
      <tbody>
        {constructors.map((c) => (
          <tr key={c.ConstructorID}>
            <td>{c.ConstructorID}</td>
            <td>{c.Name}</td>
            <td>{c.Nationality}</td>
            <td>{c.FoundedYear}</td>
            <td>{c.TeamPrincipal}</td>
            <td>{c.WorldChampionships}</td>
            <td className="admin-driver-actions">
              <button className="admin-edit-btn" onClick={() => setEditC({ ...c })}>
                ✏️ Szerkesztés
              </button>
              {deleteConfirmId === c.ConstructorID ? (
                <>
                  <button className="admin-form-save" onClick={() => handleDelete(c.ConstructorID)}>Biztos?</button>
                  <button className="admin-form-cancel" onClick={() => setDeleteConfirmId(null)}>Mégse</button>
                </>
              ) : (
                <button className="admin-delete-btn" onClick={() => setDeleteConfirmId(c.ConstructorID)}>
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
        {(["Name", "Nationality", "FoundedYear", "TeamPrincipal", "Wins", "PolePositions", "Podiums", "WorldChampionships", "Image"] as (keyof Constructor)[]).map((field) => (
          <div className="admin-form-group" key={field}>
            <label>{field}</label>
            <input
              type={NUMBER_FIELDS.includes(field as string) ? "number" : "text"}
              value={editC![field] as string | number || ""}
              onChange={(e) => setEditC({ ...editC!, [field]: e.target.value })}
            />
          </div>
        ))}
        <div className="admin-form-group">
          <label>History</label>
          <textarea rows={3} value={editC!.History || ""}
            onChange={(e) => setEditC({ ...editC!, History: e.target.value })} />
        </div>
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
          <h1>Constructor Management</h1>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button className="admin-add-btn" onClick={() => setShowAddForm(!showAddForm)}>
              {showAddForm ? "✕ Bezár" : "+ Add Constructor"}
            </button>
            <button className="admin-form-cancel" onClick={() => navigate("/constructor")}>
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

export default AdminConstructorPage;