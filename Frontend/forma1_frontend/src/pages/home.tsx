import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Driver {
  DriverID: number;
  Name: string;
  ConstructorID: number;
  Nationality: string;
  BirthDate?: string;
  Biography?: string;
}

interface Constructor {
  ConstructorID: number;
  Name: string;
  Nationality?: string;
  Founded?: string;
}

function SmartButtons() {
  const [activeTab, setActiveTab] = useState<"driver" | "constructor" | null>(null);
  const [driver, setDrivers] = useState<Driver[]>([]);
  const [constructor, setConstructor] = useState<Constructor[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDrivers = async () => {
      if (activeTab === "driver" && driver.length === 0) {
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
      }
    };

    fetchDrivers();
  }, [activeTab, driver.length]);

  useEffect(() => {
    const fetchConstructors = async () => {
      if (activeTab === "constructor" && constructor.length === 0) {
        setLoading(true);
        try {
          const response = await fetch("http://127.0.0.1:8000/api/constructor/");
          const data = await response.json();
          console.log("Constructors:", data);
          setConstructor(data);
        } catch (err) {
          console.error("Hiba:", err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchConstructors();
  }, [activeTab, constructor.length]);

  const handleDriverClick = (driverId: number) => {
    navigate(`/driver/${driverId}`);
  };

  const handleConstructorClick = (constructorId: number) => {
    navigate(`/constructor/${constructorId}`);
  };

  return (
    <div className="smart-buttons-container">
      <div className="tab-buttons">
        <button
          onClick={() => setActiveTab(activeTab === "driver" ? null : "driver")}
          className={`tab-button ${activeTab === "driver" ? "active" : ""}`}
        >
          Drivers
        </button>
        <button
          onClick={() =>
            setActiveTab(activeTab === "constructor" ? null : "constructor")
          }
          className={`tab-button ${activeTab === "constructor" ? "active" : ""}`}
        >
          Teams
        </button>
      </div>

      {activeTab && (
        <div className="cards-container">
          {loading ? (
            <div className="loading">Betöltés...</div>
          ) : (
            <div className="cards-grid">
              {activeTab === "driver" &&
                driver.map((driver) => (
                  <button
                    key={driver.DriverID}
                    onClick={() => handleDriverClick(driver.DriverID)}
                    className="card"
                  >
                    <div className="card-name">{driver.Name}</div>
                    <div className="card-info">{driver.Nationality}</div>
                  </button>
                ))}
              {activeTab === "constructor" &&
                constructor.map((constructor) => (
                  <button
                    key={constructor.ConstructorID}
                    onClick={() => handleConstructorClick(constructor.ConstructorID)}
                    className="card"
                  >
                    <div className="card-name">{constructor.Name}</div>
                    {constructor.Nationality && (
                      <div className="card-info">{constructor.Nationality}</div>
                    )}
                  </button>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SmartButtons;