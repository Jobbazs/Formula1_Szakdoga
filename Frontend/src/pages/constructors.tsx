import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/constructor.css";
import { constructorCarMap, constructorLogoMap } from "../utils/constructor-image-map";

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

const constructorColors: Record<number, string> = {
  1:  "linear-gradient(135deg, #0d2747 0%, #c8102e 100%)",
  2:  "linear-gradient(135deg, #460202 0%, #a6051a 100%)",
  3:  "linear-gradient(135deg, #25412b 0%, #00e6cf 100%)",
  4:  "linear-gradient(135deg, #1a1a1a 0%, #ff8000 100%)",
  5:  "radial-gradient(circle at bottom right, #00665e 0%, #003a33 50%)",
  6:  "linear-gradient(135deg, #ff0095 0%, #0090ff 100%)",
  7:  "radial-gradient(circle at bottom right, #e8e8e8 0%, #003087 50%)",
  8:  "linear-gradient(135deg, #1a1a2e 0%, #3c618b 100%)",
  9:  "linear-gradient(135deg, #00ff22 0%, #000000 100%)",
  10: "linear-gradient(135deg, #1a1a1a 0%, #b6babd 100%)",
};

function ConstructorPage() {
  const [constructors, setConstructors] = useState<Constructor[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConstructors = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://127.0.0.1:8000/api/constructor/");
        const data = await response.json();
        setConstructors(data.sort((a: Constructor, b: Constructor) => a.Name.localeCompare(b.Name)));
      } catch (err) {
        console.error("Hiba:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchConstructors();
  }, []);

  const handleConstructorClick = (constructorId: number) => {
    navigate(`/constructor/${constructorId}`);
  };

  return (
    <div className="constructor-page">
      <div className="constructor-header">
        <h1>Constructors</h1>
      </div>

      {loading ? (
        <div className="loading">Betöltés...</div>
      ) : (
        <div className="constructor-grid">
          {constructors.map((c) => (
            <div
              key={c.ConstructorID}
              className="constructor-card"
              onClick={() => handleConstructorClick(c.ConstructorID)}
              style={{ background: constructorColors[c.ConstructorID] }}
            >
              <div className="constructor-top">
                <img
                  src={constructorLogoMap[c.ConstructorID]}
                  alt={`${c.Name} logo`}
                  className="constructor-logo"
                />
                <span className="constructor-name">{c.Name}</span>
              </div>

              <div className="constructor-details">
                <span className="constructor-nationality">{c.Nationality}</span>
                <span className="constructor-info">{c.FoundedYear} · {c.TeamPrincipal}</span>
              </div>

              <div className="constructor-car-wrap">
                <img
                  src={constructorCarMap[c.ConstructorID]}
                  alt={`${c.Name} car`}
                  className="constructor-car"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ConstructorPage;