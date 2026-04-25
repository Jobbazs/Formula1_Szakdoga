import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/driver.css";
import { constructorCarMap, constructorLogoMap } from "../../utils/constructor-image-map";
import { imageMap } from "../../utils/drivers-image-map";

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

interface Driver {
  DriverID: number;
  Name: string;
  ConstructorID: number;
  Nationality: string;
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

function ConstructorDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [constructor, setConstructor] = useState<Constructor | null>(null);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cRes = await fetch(`http://127.0.0.1:8000/api/constructor/${id}`);
        const cData = await cRes.json();
        setConstructor(cData);

        const dRes = await fetch(`http://127.0.0.1:8000/api/driver`);
        const allDrivers = await dRes.json();
        setDrivers(allDrivers.filter((d: Driver) => d.ConstructorID === Number(id)));
      } catch (err) {
        console.error("Hiba:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (!constructor) return <div className="loading">No constructor found</div>;

  return (
    <div className="driver-detail-page">
      <button className="detail-back-btn" onClick={() => navigate("/constructor")}>
        ← Back
      </button>

      <div
        className="gp-detail-hero"
        style={{ background: constructorColors[constructor.ConstructorID] }}
      >
        <div className="gp-detail-info">
          <div className="gp-detail-year">EST. {constructor.FoundedYear}</div>
          <h1 className="gp-detail-name">{constructor.Name}</h1>
          <div className="gp-detail-country">{constructor.Nationality}</div>
          <div className="gp-detail-country" style={{ marginTop: "0.5rem", fontSize: "1rem" }}>
            👤 {constructor.TeamPrincipal}
          </div>
        </div>
        {constructorLogoMap[constructor.ConstructorID] && (
          <div className="constructor-logo-box">
            <img
              src={constructorLogoMap[constructor.ConstructorID]}
              alt={constructor.Name}
            />
          </div>
        )}
      </div>

      {constructorCarMap[constructor.ConstructorID] && (
        <div
          className="constructor-car-box"
          style={{ background: constructorColors[constructor.ConstructorID] }}
        >
          <img
            src={constructorCarMap[constructor.ConstructorID]}
            alt={`${constructor.Name} car`}
          />
        </div>
      )}

      <div className="driver-detail-stats">
        <div className="driver-detail-card">
          <div className="driver-detail-label"> Bajnokságok</div>
          <div className="driver-detail-value">{constructor.WorldChampionships}</div>
        </div>
        <div className="driver-detail-card">
          <div className="driver-detail-label"> Győzelmek</div>
          <div className="driver-detail-value">{constructor.Wins}</div>
        </div>
        <div className="driver-detail-card">
          <div className="driver-detail-label"> Pole-ok</div>
          <div className="driver-detail-value">{constructor.PolePositions}</div>
        </div>
        <div className="driver-detail-card">
          <div className="driver-detail-label"> Pódiumok</div>
          <div className="driver-detail-value">{constructor.Podiums}</div>
        </div>
      </div>

      {drivers.length > 0 && (
        <>
          <h2 style={{ color: "#e10600", marginTop: "2rem", textAlign: "center" }}>
            Versenyzők
          </h2>
          <div className="constructor-drivers-grid">
            {drivers.map(d => (
              <div
                key={d.DriverID}
                className="constructor-driver-card"
                onClick={() => navigate(`/driver/${d.DriverID}`)}
                style={{ background: constructorColors[constructor.ConstructorID] }}
              >
                <div className="constructor-driver-info">
                  <div className="constructor-driver-name">{d.Name}</div>
                  <div className="constructor-driver-nationality">{d.Nationality}</div>
                </div>
                {imageMap[d.Name as keyof typeof imageMap] && (
                  <img
                    src={imageMap[d.Name as keyof typeof imageMap]}
                    alt={d.Name}
                    className="constructor-driver-image"
                  />
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {constructor.History && (
        <div className="driver-detail-bio">
          <h2>Történet</h2>
          <p>{constructor.History}</p>
        </div>
      )}
    </div>
  );
}

export default ConstructorDetailPage;