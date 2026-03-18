import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/driver.css";
import { imageMap } from "../utils/drivers-image-map";

interface Driver {
  DriverID: number;
  Name: string;
  ConstructorID: number;
  Nationality: string;
  BirthDate?: string;
  Biography?: string;
  Image?: string;
}

interface DriversPageProps {
  isAdmin: boolean;
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

function DriversPage({ isAdmin }: DriversPageProps) {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/driver/");
      const data = await response.json();
      setDrivers(data);
    } catch (err) {
      console.error("Hiba:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDriverClick = (driverId: number) => {
    navigate(`/driver/${driverId}`);
  };

  return (
    <div className="drivers-page">
      <div className="drivers-header">
        <h1>Drivers</h1>
        {isAdmin && (
          <button
            className="admin-add-btn"
            onClick={() => navigate("/admin/drivers")}
          >
            + Manage Drivers
          </button>
        )}
      </div>

      {loading ? (
        <div className="loading">Betöltés...</div>
      ) : (
        <div className="drivers-grid">
          {drivers.map((driver) => (
            <div
              key={driver.DriverID}
              onClick={() => handleDriverClick(driver.DriverID)}
              className="driver-card"
              style={{ background: constructorColors[driver.ConstructorID] }}
            >
              <div className="driver-name">{driver.Name}</div>
              <div className="driver-info">{driver.Nationality}</div>
              <img
                src={imageMap[driver.Name as keyof typeof imageMap]}
                alt={driver.Name}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DriversPage;