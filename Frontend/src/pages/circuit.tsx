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
  Turns: number;
  LapRecord?: string;
  Image?: string;
}

function CircuitPage() {
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
      console.log("Circuits:", data);
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
              <h3 className="circuit-name">{circuit.Name}</h3>
              <p className="circuit-location">{circuit.Country}</p>
              
              <div className="circuit-stats">
                <div className="stat">
                  <span className="stat-label">Length</span>
                  <span className="stat-value">{circuit.Length} km</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Turns</span>
                  <span className="stat-value">{circuit.Turns}</span>
                </div>
              </div>
              
              {circuitImage && (
                <div 
                  className="circuit-image-wrap"
                  style={{
                    position: 'absolute',
                    bottom: '0.5rem',
                    right: '0.5rem',
                    width: '45%',
                    maxWidth: '200px',
                    opacity: 0.4,
                    zIndex: 1
                  }}
                >
                  <img 
                    src={circuitImage}
                    alt={circuit.Name}
                    className="circuit-image"
                    style={{
                      width: '100%',
                      height: 'auto',
                      objectFit: 'contain',
                      filter: 'brightness(1.8) contrast(1.2) drop-shadow(0 0 6px rgba(255,255,255,0.3))'
                    }}
                  />
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