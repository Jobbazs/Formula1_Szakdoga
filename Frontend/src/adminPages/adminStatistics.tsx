import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/driver.css";

interface RaceResult {
  ResultID: number;
  GrandPrixID: number;
  DriverID: number;
  ConstructorID: number;
  Position: number | null;
  Grid: number | null;
  Laps: number | null;
  TimeOrRetired: string | null;
  Points: number;
  FastestLap: boolean;
  GpOrSprint: string | null;
  driver?: { Name: string };
  grand_prix?: { Name: string; Year: number };
  constructor?: { Name: string };
}

type RaceResultForm = {
  GrandPrixID: string;
  DriverID: string;
  ConstructorID: string;
  Position: string;
  Grid: string;
  Laps: string;
  TimeOrRetired: string;
  Points: string;
  FastestLap: boolean;
  GpOrSprint: string;
};

const EMPTY_FORM: RaceResultForm = {
  GrandPrixID: "", DriverID: "", ConstructorID: "",
  Position: "", Grid: "", Laps: "", TimeOrRetired: "",
  Points: "0", FastestLap: false, GpOrSprint: "GP",
};

const API_BASE = "http://127.0.0.1:8000/api";
const SANCTUM_URL = "http://localhost:8000/sanctum/csrf-cookie";

const NUMBER_FIELDS = ["GrandPrixID", "DriverID", "ConstructorID", "Position", "Grid", "Laps", "Points"];

function AdminStatisticsPage() {
  const navigate = useNavigate();
  const [results, setResults] = useState<RaceResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [editR, setEditR] = useState<RaceResult | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [form, setForm] = useState<RaceResultForm>(EMPTY_FORM);

  useEffect(() => { fetchResults(); }, []);

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

  const fetchResults = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/race_result`);
      setResults(await res.json());
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
      const res = await fetch(`${API_BASE}/race_result`, {
        method: "POST",
        credentials: "include",
        headers: authHeaders(csrfToken),
        body: JSON.stringify({
          GrandPrixID: parseInt(form.GrandPrixID),
          DriverID: parseInt(form.DriverID),
          ConstructorID: parseInt(form.ConstructorID),
          Position: form.Position ? parseInt(form.Position) : null,
          Grid: form.Grid ? parseInt(form.Grid) : null,
          Laps: form.Laps ? parseInt(form.Laps) : null,
          TimeOrRetired: form.TimeOrRetired || "",
          Points: parseFloat(form.Points),
          FastestLap: form.FastestLap,
          GpOrSprint: form.GpOrSprint || "GP",
        }),
      });
      if (res.ok) {
        setShowAddForm(false);
        setForm(EMPTY_FORM);
        fetchResults();
      }
    } catch (err) {
      console.error("Add error:", err);
    }
  };

  const handleEdit = async () => {
    if (!editR) return;
    try {
      const csrfToken = await getCsrfToken();
      const res = await fetch(`${API_BASE}/race_result/${editR.ResultID}`, {
        method: "PUT",
        credentials: "include",
        headers: authHeaders(csrfToken),
        body: JSON.stringify({
          GrandPrixID: editR.GrandPrixID,
          DriverID: editR.DriverID,
          ConstructorID: editR.ConstructorID,
          Position: editR.Position,
          Grid: editR.Grid,
          Laps: editR.Laps,
          TimeOrRetired: editR.TimeOrRetired || "",
          Points: editR.Points,
          FastestLap: editR.FastestLap,
          GpOrSprint: editR.GpOrSprint || "GP",
        }),
      });
      if (res.ok) {
        setEditR(null);
        fetchResults();
      }
    } catch (err) {
      console.error("Edit error:", err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const csrfToken = await getCsrfToken();
      await fetch(`${API_BASE}/race_result/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: { "X-XSRF-TOKEN": csrfToken },
      });
      setDeleteConfirmId(null);
      fetchResults();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // ─── Sub-components ───────────────────────────────────────────────────────

  const renderAddForm = () => (
    <div className="admin-form-box">
      <h2>Új Race Result</h2>
      <div className="admin-form">
        {(["GrandPrixID", "DriverID", "ConstructorID", "Position", "Grid", "Laps", "TimeOrRetired", "Points", "GpOrSprint"] as (keyof RaceResultForm)[]).map((field) => (
          <div className="admin-form-group" key={field}>
            <label>{field}</label>
            <input
              type={NUMBER_FIELDS.includes(field) ? "number" : "text"}
              value={form[field] as string}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            />
          </div>
        ))}
        <div className="admin-form-group">
          <label>
            <input
              type="checkbox"
              checked={form.FastestLap}
              onChange={(e) => setForm({ ...form, FastestLap: e.target.checked })}
            />
            {" "}Fastest Lap
          </label>
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
          <th>GP</th>
          <th>Driver</th>
          <th>Constructor</th>
          <th>Pos</th>
          <th>Pts</th>
          <th>FL</th>
          <th>Type</th>
          <th>Műveletek</th>
        </tr>
      </thead>
      <tbody>
        {results.map((r) => (
          <tr key={r.ResultID}>
            <td>{r.ResultID}</td>
            <td>{r.grand_prix?.Name ?? r.GrandPrixID}</td>
            <td>{r.driver?.Name ?? r.DriverID}</td>
            <td>{r.constructor?.Name ?? r.ConstructorID}</td>
            <td>{r.Position ?? "-"}</td>
            <td>{r.Points}</td>
            <td>{r.FastestLap ? "⚡" : ""}</td>
            <td>{r.GpOrSprint}</td>
            <td className="admin-driver-actions">
              <button className="admin-edit-btn" onClick={() => setEditR({ ...r })}>
                ✏️
              </button>
              {deleteConfirmId === r.ResultID ? (
                <>
                  <button className="admin-form-save" onClick={() => handleDelete(r.ResultID)}>Biztos?</button>
                  <button className="admin-form-cancel" onClick={() => setDeleteConfirmId(null)}>Mégse</button>
                </>
              ) : (
                <button className="admin-delete-btn" onClick={() => setDeleteConfirmId(r.ResultID)}>
                  🗑
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderEditModal = () => (
    <div className="modal-overlay" onClick={() => setEditR(null)}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Szerkesztés</h2>
        {(["GrandPrixID", "DriverID", "ConstructorID", "Position", "Grid", "Laps", "TimeOrRetired", "Points", "GpOrSprint"] as (keyof RaceResult)[]).map((field) => (
          <div className="admin-form-group" key={field}>
            <label>{field}</label>
            <input
              type={NUMBER_FIELDS.includes(field as string) ? "number" : "text"}
              value={editR![field] as string | number ?? ""}
              onChange={(e) => setEditR({ ...editR!, [field]: e.target.value })}
            />
          </div>
        ))}
        <div className="admin-form-group">
          <label>
            <input
              type="checkbox"
              checked={editR!.FastestLap}
              onChange={(e) => setEditR({ ...editR!, FastestLap: e.target.checked })}
            />
            {" "}Fastest Lap
          </label>
        </div>
        <div className="modal-buttons">
          <button onClick={handleEdit}>Mentés</button>
          <button onClick={() => setEditR(null)}>Mégse</button>
        </div>
      </div>
    </div>
  );

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="admin-form-page">
      <div className="admin-driver-container">

        <div className="admin-driver-header">
          <h1>Statistics Management</h1>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button className="admin-add-btn" onClick={() => setShowAddForm(!showAddForm)}>
              {showAddForm ? "✕ Bezár" : "+ Add Race Result"}
            </button>
            <button className="admin-form-cancel" onClick={() => navigate("/statistics")}>
              ← Vissza
            </button>
          </div>
        </div>

        {showAddForm && renderAddForm()}
        {loading ? <div className="loading">Betöltés...</div> : renderTable()}
        {editR && renderEditModal()}

      </div>
    </div>
  );
}

export default AdminStatisticsPage;