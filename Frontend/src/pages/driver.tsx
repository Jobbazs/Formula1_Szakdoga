import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/driver.css";
import  {imageMap}  from "../utils/drivers-image-map";

interface Driver {
  DriverID: number;
  Name: string;
  ConstructorID: number;
  Nationality: string;
  BirthDate?: string;
  Biography?: string;
  Image?: string;
}

function DriversPage() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDrivers = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://127.0.0.1:8000/api/driver/");
        const data = await response.json();
        console.log("Drivers:", data);
        setDrivers(data);
      } catch (err) {
        console.error("Hiba:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  const handleDriverClick = (driverId: number) => {
    navigate(`/driver/${driverId}`);
  };

  return (
    <div className="drivers-page">
      <div className="drivers-header">
        <h1>DRIVERS</h1>
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
            >
              <div className="driver-name">{driver.Name}</div>
              <div className="driver-info">{driver.Nationality}</div>
             <img src={imageMap[driver.Name as keyof typeof imageMap]} alt={driver.Name} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DriversPage;
