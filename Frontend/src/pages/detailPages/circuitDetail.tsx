import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/driver.css";
import { circuitImageMap } from "../../utils/circuits-image-map";

interface Circuit {
  CircuitID: number;
  Name: string;
  Location: string;
  Country: string;
  FirstGrandPrix?: number;
  RecordLapTime?: string;
  RecordDriver?: string;
  Image?: string;
}

interface GrandPrix {
  GrandPrixID: number;
  Name: string;
  Country: string;
  Year: number;
  CircuitID: number;
}

const countryColors: Record<string, string> = {
  "Bahrain":              "linear-gradient(135deg, #ce1126 0%, #8b0000 100%)",
  "Saudi Arabia":         "linear-gradient(135deg, #006c35 0%, #003d1f 100%)",
  "Australia":            "linear-gradient(135deg, #00008b 0%, #cc0000 100%)",
  "Japan":                "linear-gradient(135deg, #bc002d 0%, #6b0019 100%)",
  "China":                "linear-gradient(135deg, #de2910 0%, #8b1a0b 100%)",
  "United States":        "linear-gradient(135deg, #3c3b6e 0%, #b22234 100%)",
  "Italy":                "linear-gradient(135deg, #009246 0%, #ce2b37 100%)",
  "Monaco":               "linear-gradient(135deg, #ce1126 0%, #b30e1f 100%)",
  "Canada":               "linear-gradient(135deg, #ff0000 0%, #8b0000 100%)",
  "Spain":                "linear-gradient(135deg, #c60b1e 0%, #f1bf00 100%)",
  "Austria":              "linear-gradient(135deg, #ed2939 0%, #8b0000 100%)",
  "United Kingdom":       "linear-gradient(135deg, #012169 0%, #c8102e 100%)",
  "Hungary":              "linear-gradient(135deg, #ce2939 0%, #477050 100%)",
  "Belgium":              "linear-gradient(135deg, #000000 0%, #fae042 100%)",
  "Netherlands":          "linear-gradient(135deg, #ae1c28 0%, #21468b 100%)",
  "Azerbaijan":           "linear-gradient(135deg, #0092bc 0%, #ef3340 100%)",
  "Singapore":            "linear-gradient(135deg, #ef3340 0%, #b30e1f 100%)",
  "Mexico":               "linear-gradient(135deg, #006847 0%, #ce1126 100%)",
  "Brazil":               "linear-gradient(135deg, #009c3b 0%, #ffdf00 100%)",
  "Qatar":                "linear-gradient(135deg, #8d1b3d 0%, #4d0a1f 100%)",
  "United Arab Emirates": "linear-gradient(135deg, #00732f 0%, #000000 100%)",
};

function CircuitDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [circuit, setCircuit] = useState<Circuit | null>(null);
  const [races, setRaces] = useState<GrandPrix[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cRes = await fetch(`http://127.0.0.1:8000/api/circuit/${id}`);
        const cData = await cRes.json();
        setCircuit(cData);

        const gpRes = await fetch(`http://127.0.0.1:8000/api/grand_prix`);
        const allGps = await gpRes.json();
        setRaces(allGps.filter((gp: GrandPrix) => gp.CircuitID === Number(id)));
      } catch (err) {
        console.error("Hiba:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (!circuit) return <div className="loading">No circuit found</div>;

  const circuitImage = circuitImageMap[circuit.Country];
  const heroBackground = countryColors[circuit.Country] || "linear-gradient(135deg, #1a1a1a 0%, #444 100%)";

  return (
    <div className="driver-detail-page">
      <button className="detail-back-btn" onClick={() => navigate("/circuit")}>
        ← Back
      </button>

      <div
        className="circuit-hero"
        style={{ background: heroBackground }}
      >
        <div className="circuit-hero-overlay" />

        <div className="circuit-hero-content">
          <div className="circuit-hero-info">
            <div className="gp-detail-year"> {circuit.Location}</div>
            <h1 className="circuit-hero-name">{circuit.Name}</h1>
            <div className="circuit-hero-nation">{circuit.Country}</div>
          </div>

          {circuitImage && (
            <div className="circuit-hero-image-wrap">
              <img
                src={circuitImage}
                alt={circuit.Name}
                className="circuit-hero-image"
              />
            </div>
          )}
        </div>
      </div>

      <div className="driver-detail-stats">
        <div className="driver-detail-card">
          <div className="driver-detail-label"> Location </div>
          <div className="driver-detail-value">{circuit.Location}</div>
        </div>
        <div className="driver-detail-card">
          <div className="driver-detail-label">First GP </div>
          <div className="driver-detail-value">{circuit.FirstGrandPrix ?? "-"}</div>
        </div>
        <div className="driver-detail-card">
          <div className="driver-detail-label"> Laptime rekord </div>
          <div className="driver-detail-value">{circuit.RecordLapTime ?? "-"}</div>
        </div>
        <div className="driver-detail-card">
          <div className="driver-detail-label"> Record </div>
          <div className="driver-detail-value">{circuit.RecordDriver ?? "-"}</div>
        </div>
      </div>

      {races.length > 0 && (
        <>
          <h2 style={{ color: "#e10600", marginTop: "2rem", textAlign: "center" }}>
            Grand Prix Races
          </h2>
          <div className="constructor-drivers-grid">
            {races.map(gp => (
              <div
                key={gp.GrandPrixID}
                className="constructor-driver-card"
                onClick={() => navigate(`/grandprix/${gp.GrandPrixID}`)}
                style={{
                  background: heroBackground,
                  minHeight: "100px",
                }}
              >
                <div className="constructor-driver-info">
                  <div className="constructor-driver-name">{gp.Name}</div>
                  <div className="constructor-driver-nationality">{gp.Year}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default CircuitDetailPage;