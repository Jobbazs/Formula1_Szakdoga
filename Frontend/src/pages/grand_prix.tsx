import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/grandprix.css";

interface GrandPrix {
  GrandPrixID: number;
  Name: string;
  Country: string;
  CircuitID: number;
  Year: number;
  WinnerDriverID: number;
  Image?: string;
}

const countryColors: Record<string, string> = {
  "Bahrain":              "linear-gradient(to right, #ce1126 70%, #ffffff 70%)",
  "Saudi Arabia":         "linear-gradient(to right, #006c35 80%, #ffffff 80%)",
  "Australia":            "linear-gradient(to right, #00008b 60%, #cc0000 60%)",
  "Japan":                "linear-gradient(to right, #ffffff 40%, #bc002d 40%)",
  "China":                "linear-gradient(to right, #de2910 70%, #ffde00 70%)",
  "United States":        "linear-gradient(to right, #3c3b6e 40%, #b22234 40%)",
  "Italy":                "linear-gradient(to right, #009246 33%, #ffffff 33%, #ffffff 66%, #ce2b37 66%)",
  "Monaco":               "linear-gradient(to right, #ce1126 50%, #ffffff 50%)",
  "Canada":               "linear-gradient(to right, #ff0000 25%, #ffffff 25%, #ffffff 75%, #ff0000 75%)",
  "Spain":                "linear-gradient(to right, #c60b1e 25%, #f1bf00 25%, #f1bf00 75%, #c60b1e 75%)",
  "Austria":              "linear-gradient(to right, #ed2939 33%, #ffffff 33%, #ffffff 66%, #ed2939 66%)",
  "United Kingdom":       "linear-gradient(to right, #012169 40%, #c8102e 40%)",
  "Hungary":              "linear-gradient(to right, #ce2939 33%, #ffffff 33%, #ffffff 66%, #477050 66%)",
  "Belgium":              "linear-gradient(to right, #000000 33%, #fae042 33%, #fae042 66%, #ef3340 66%)",
  "Netherlands":          "linear-gradient(to right, #ae1c28 33%, #ffffff 33%, #ffffff 66%, #21468b 66%)",
  "Azerbaijan":           "linear-gradient(to right, #0092bc 33%, #ef3340 33%, #ef3340 66%, #509e2f 66%)",
  "Singapore":            "linear-gradient(to right, #ef3340 50%, #ffffff 50%)",
  "Mexico":               "linear-gradient(to right, #006847 33%, #ffffff 33%, #ffffff 66%, #ce1126 66%)",
  "Brazil":               "linear-gradient(to right, #009c3b 60%, #ffdf00 60%)",
  "Qatar":                "linear-gradient(to right, #8d1b3d 70%, #ffffff 70%)",
  "United Arab Emirates": "linear-gradient(to right, #00732f 33%, #ffffff 33%, #ffffff 66%, #000000 66%)",
};

function GrandPrixPage() {
  const [grand_prix, setGrandPrix] = useState<GrandPrix[]>([]);
  const [loading, setLoading] = useState(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGrandPrix = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://127.0.0.1:8000/api/grand_prix");
        const data = await response.json();
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
    <div className="grandprix-page">
      <div className="grandprix-header">
        <h1>Grand Prix</h1>
      </div>

      {loading ? (
        <div className="loading">Betöltés...</div>
      ) : (
        <div className="grandprix-list">
          {grand_prix.map((gp) => (
            <div
              key={gp.GrandPrixID}
              onClick={() => handleGrandPrixClick(gp.GrandPrixID)}
              className={`grandprix-row ${hoveredId === gp.GrandPrixID ? "hovered" : ""} ${hoveredId === gp.GrandPrixID && gp.Country === "United Arab Emirates" ? "hovered-uae" : ""} ${hoveredId === gp.GrandPrixID && gp.Country === "Belgium" ? "hovered-belgium" : ""}`}
              onMouseEnter={() => setHoveredId(gp.GrandPrixID)}
              onMouseLeave={() => setHoveredId(null)}
              style={
                hoveredId === gp.GrandPrixID && countryColors[gp.Country]
                  ? { background: countryColors[gp.Country] }
                  : {}
              }
            >
              <span className="gp-name">{gp.Name}</span>
              <span className="gp-country">{gp.Country}</span>
              <span className="gp-year">{gp.Year}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GrandPrixPage;