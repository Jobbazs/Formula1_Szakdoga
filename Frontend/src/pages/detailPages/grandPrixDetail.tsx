import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/driver.css";
import { circuitImageMap } from "../../utils/circuits-image-map";
import { imageMap } from "../../utils/drivers-image-map";

interface GrandPrix {
  GrandPrixID: number;
  Name: string;
  Country: string;
  CircuitID: number;
  Year: number;
  WinnerDriverID?: number;
  Image?: string;
}

interface Circuit {
  CircuitID: number;
  Name: string;
  Location: string;
  Nation: string;
}

interface Driver {
  DriverID: number;
  Name: string;
  ConstructorID: number;
  Nationality: string;
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

const constructorColors: Record<number, string> = {
  1:  "linear-gradient(135deg, #0d2747 0%, #c8102e 100%)",
  2:  "linear-gradient(135deg, #460202 0%, #a6051a 100%)",
  3:  "linear-gradient(135deg, #25412b 0%, #00e6cf 100%)",
  4:  "linear-gradient(135deg, #1a1a1a 0%, #ff8000 100%)",
  5:  "radial-gradient(circle at bottom right, #00665e 0%, #003a33 50%)",
  6:  "linear-gradient(135deg, #fd0ae9 0%, #0066ff 80%)",
  7:  "radial-gradient(circle at bottom right, #e8e8e8 0%, #003087 50%)",
  8:  "linear-gradient(135deg, #1a1a2e 0%, #4778af 100%)",
  9:  "linear-gradient(135deg, #00ff22 0%, #000000 100%)",
  10: "linear-gradient(135deg, #1a1a1a 0%, #b6babd 100%)",
};

function GrandPrixDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [gp, setGp] = useState<GrandPrix | null>(null);
  const [circuit, setCircuit] = useState<Circuit | null>(null);
  const [winner, setWinner] = useState<Driver | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gpRes = await fetch(`http://127.0.0.1:8000/api/grand_prix/${id}`);
        const gpData = await gpRes.json();
        setGp(gpData);

        if (gpData?.CircuitID) {
          const cRes = await fetch(`http://127.0.0.1:8000/api/circuit/${gpData.CircuitID}`);
          setCircuit(await cRes.json());
        }

        if (gpData?.WinnerDriverID) {
          const dRes = await fetch(`http://127.0.0.1:8000/api/driver/${gpData.WinnerDriverID}`);
          setWinner(await dRes.json());
        }
      } catch (err) {
        console.error("Hiba:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (!gp) return <div className="loading">No Grand Prix found</div>;

  const circuitImage = circuitImageMap[gp.Country];
  const winnerImage = winner ? imageMap[winner.Name as keyof typeof imageMap] : null;

  return (
    <div className="driver-detail-page">
      <button className="detail-back-btn" onClick={() => navigate("/grand_prix")}>
        ← Back
      </button>

      <div
        className="gp-detail-hero"
        style={{ background: countryColors[gp.Country] || "linear-gradient(135deg, #1a1a1a 0%, #444 100%)" }}
      >
        <div className="gp-detail-info">
          <div className="gp-detail-year">{gp.Year}</div>
          <h1 className="gp-detail-name">{gp.Name}</h1>
          <div className="gp-detail-country">{gp.Country}</div>
        </div>
        {circuitImage && (
          <img
            src={circuitImage}
            alt={gp.Country}
            className="gp-detail-circuit-image"
          />
        )}
      </div>

      <div className="driver-detail-stats">
        <div className="driver-detail-card">
          <div className="driver-detail-label">Ország</div>
          <div className="driver-detail-value">{gp.Country}</div>
        </div>

        <div
          className="driver-detail-card team-card"
          onClick={() => circuit && navigate(`/circuit/${circuit.CircuitID}`)}
          style={{
            cursor: circuit ? "pointer" : "default",
            background: "linear-gradient(135deg, #2a2a2a 0%, #444 100%)",
            border: "none",
          }}
        >
          <div className="driver-detail-label" style={{ color: "rgba(255,255,255,0.85)" }}>
             Circuit
          </div>
          <div className="driver-detail-value" style={{ color: "#fff" }}>
            {circuit?.Name ?? "-"}
          </div>
        </div>

        <div
          className="driver-detail-card team-card"
          onClick={() => winner && navigate(`/driver/${winner.DriverID}`)}
          style={{
            cursor: winner ? "pointer" : "default",
            background: winner ? constructorColors[winner.ConstructorID] : "#1a1a1a",
            border: "none",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          {winnerImage && (
            <img
              src={winnerImage}
              alt={winner?.Name}
              style={{ height: "60px", borderRadius: "50%", objectFit: "cover" }}
            />
          )}
          <div>
            <div className="driver-detail-label" style={{ color: "rgba(255,255,255,0.85)" }}>
               Winner
            </div>
            <div className="driver-detail-value" style={{ color: "#fff" }}>
              {winner?.Name ?? "-"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GrandPrixDetailPage;