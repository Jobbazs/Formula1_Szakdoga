import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface GrandPrix {
  GrandPrixID: number;
  Name: string;
  Country: string;
  CircuitID: number;
  Year: number;
  WinnerDriverID: number;
  Image?: string;
}

export function GrandPrixPage() {
  const [grand_prix, setGrandPrix] = useState<GrandPrix[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGrandPrix = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://127.0.0.1:8000/api/grand_prix");
        const data = await response.json();
        console.log("GrandPrix:", data);
        setGrandPrix(data);
      } catch (err) {
        console.error("Hiba:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGrandPrix();
  }, []);

  const handleGrandPrixClick = (grandPrixId: number) => {
    navigate(`/grandprix/${grandPrixId}`);
  };

  return (
    <div className="smart-buttons-container">
      <h1>Grand Prix</h1>

      {loading ? (
        <div className="loading">Betöltés...</div>
      ) : (
        <div className="cards-grid">
          {grand_prix.map((gp) => (
            <button
              key={gp.GrandPrixID}
              onClick={() => handleGrandPrixClick(gp.GrandPrixID)}
              className="card"
            >
              <div className="card-name">{gp.Name}</div>
              <div className="card-info">{gp.Country}</div>
              <div className="card-info">{gp.Year}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}