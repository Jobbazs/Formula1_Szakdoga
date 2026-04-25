import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/driver.css";
import { imageMap } from "../../utils/drivers-image-map";

interface Driver {
  DriverID: number;
  Name: string;
  ConstructorID: number;
  Nationality: string;
  BirthDate?: string;
  Biography?: string;
  Image?: string;
}

interface Constructor {
  ConstructorID: number;
  Name: string;
}

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

function DriverDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [driver, setDriver] = useState<Driver | null>(null);
  const [constructor, setConstructor] = useState<Constructor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const driverRes = await fetch(`http://127.0.0.1:8000/api/driver/${id}`);
        const driverData = await driverRes.json();
        setDriver(driverData);

        if (driverData?.ConstructorID) {
          const cRes = await fetch(`http://127.0.0.1:8000/api/constructor/${driverData.ConstructorID}`);
          const cData = await cRes.json();
          setConstructor(cData);
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
  if (!driver) return <div className="loading">No driver found</div>;

  const formatDate = (date?: string) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("hu-HU");
  };

  return (
    <div className="driver-detail-page">
      <button className="detail-back-btn" onClick={() => navigate("/driver")}>
        ← Back
      </button>

      <div
        className="driver-detail-hero"
        style={{ background: constructorColors[driver.ConstructorID] }}
      >
        <div className="driver-detail-info">
          <h1 className="driver-detail-name">{driver.Name}</h1>
          <div className="driver-detail-nationality">{driver.Nationality}</div>
          {constructor && (
            <div
              className="driver-detail-team"
              onClick={() => navigate(`/constructor/${constructor.ConstructorID}`)}
              style={{ cursor: "pointer", textDecoration: "underline" }}
            >
              {constructor.Name}
            </div>
          )}
        </div>
        <img
          src={imageMap[driver.Name as keyof typeof imageMap]}
          alt={driver.Name}
          className="driver-detail-image"
        />
      </div>

      <div className="driver-detail-stats">
        <div className="driver-detail-card">
          <div className="driver-detail-label">Born </div>
          <div className="driver-detail-value">{formatDate(driver.BirthDate)}</div>
        </div>
        <div className="driver-detail-card">
          <div className="driver-detail-label">Nationality </div>
          <div className="driver-detail-value">{driver.Nationality}</div>
        </div>
        <div
          className="driver-detail-card team-card"
          onClick={() => constructor && navigate(`/constructor/${constructor.ConstructorID}`)}
          style={{
            cursor: constructor ? "pointer" : "default",
            background: constructor ? constructorColors[constructor.ConstructorID] : "#1a1a1a",
            border: "none",
          }}
        >
          <div className="driver-detail-label" style={{ color: "rgba(255,255,255,0.85)" }}>
            Constructor
          </div>
          <div className="driver-detail-value" style={{ color: "#fff" }}>
            {constructor?.Name ?? "-"}
          </div>
        </div>
      </div>

      {driver.Biography && (
        <div className="driver-detail-bio">
          <h2>Biography</h2>
          <p>{driver.Biography}</p>
        </div>
      )}
    </div>
  );
}

export default DriverDetailPage;