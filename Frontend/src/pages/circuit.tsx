import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/circuit.css";
import { circuitImageMap } from "../utils/circuits-image-map";

interface Circuit {
  CircuitID: number;
  Name: string;
  Location: string;
  Country: string;
  Length: number;
  Laps: number;
  FirstGrandPrix: number;
  RecordDriver?: string;
  RecordLapTime?: string;
  Image?: string;
}

interface CircuitPageProps {
  isAdmin: boolean;
}

function CircuitPage({ isAdmin }: CircuitPageProps) {
  const [circuits, setCircuits] = useState<Circuit[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCircuits();
  }, []);

  const fetchCircuits = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/circuit/");
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setCircuits(data);
    } catch (err) {
      console.error("Failed to fetch circuits:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch");
    } finally {
      setLoading(false);
    }
  };

  const handleCircuitClick = (circuitId: number) => {
    navigate(`/circuit/${circuitId}`);
  };

  const getCircuitImage = (country: string) => {
    return circuitImageMap[country] || circuitImageMap[country.split(" ")[0]];
  };

  if (loading) {
    return (
      <div className="circuit-page">
        <div className="loading">Betöltés...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="circuit-page">
        <div className="error">Hiba: {error}</div>
      </div>
    );
  }

  return (
    <div className="circuit-page">
      <div className="circuit-header">
        <h1>CIRCUITS</h1>
        {isAdmin && (
          <button className="admin-add-btn" onClick={() => navigate("/admin/circuits")}>
            + Manage Circuits
          </button>
        )}
      </div>

      <div className="circuits-grid">
       {circuits.map((circuit) => {
  const circuitImage = getCircuitImage(circuit.Country);

  return (
    <div
      key={circuit.CircuitID}
      onClick={() => handleCircuitClick(circuit.CircuitID)}
      className="circuit-card"
    >
      <div className="circuit-top">
        <div>
          <h3 className="circuit-name">{circuit.Name}</h3>
          <p className="circuit-location">
            {circuit.Location}, {circuit.Country}
          </p>
        </div>
      </div>
<div className="circuit-stats-grid">
  <div className="stat-box">
    <span>Length </span>
    <strong>{circuit.Length} km</strong>
  </div>

  <div className="stat-box">
    <span>Laps </span>
    <strong>{circuit.Laps}</strong>
  </div>

  <div className="stat-box">
    <span>First GP </span>
    <strong>{circuit.FirstGrandPrix}</strong>
  </div>

  <div className="stat-box">
    <span>Record </span>
    <strong>
      {circuit.RecordDriver
        ? `${circuit.RecordDriver} – ${circuit.RecordLapTime}`
        : "-"}
    </strong>
  </div>
</div>

      {circuitImage && (
        <div className="circuit-image-wrap">
          <img src={circuitImage} alt={circuit.Name} />
        </div>
      )}
    </div>
  );
})}
                </div>
              
            </div>
          );
        }

export default CircuitPage;