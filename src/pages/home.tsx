import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import { imageMap } from "../utils/drivers-image-map";
import { constructorCarMap, constructorLogoMap } from "../utils/constructor-image-map";

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

type TabType = "drivers" | "teams";

const ITEMS_PER_PAGE = 3;
const API_BASE_URL = "http://127.0.0.1:8000/api";

const CONSTRUCTOR_COLORS: Record<number, string> = {
  1: "linear-gradient(135deg, #0d2747 0%, #c8102e 100%)",
  2: "linear-gradient(135deg, #460202 0%, #a6051a 100%)",
  3: "linear-gradient(135deg, #25412b 0%, #00e6cf 100%)",
  4: "linear-gradient(135deg, #1a1a1a 0%, #ff8000 100%)",
  5: "radial-gradient(circle at bottom right, #00665e 0%, #003a33 50%)",
  6: "linear-gradient(135deg, #ff0095 0%, #0090ff 100%)",
  7: "radial-gradient(circle at bottom right, #e8e8e8 0%, #003087 50%)",
  8: "linear-gradient(135deg, #1a1a2e 0%, #3c618b 100%)",
  9: "linear-gradient(135deg, #00ff22 0%, #000000 100%)",
  10: "linear-gradient(135deg, #1a1a1a 0%, #b6babd 100%)",
};

function HomePage() {
  const [activeTab, setActiveTab] = useState<TabType>("drivers");
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [constructors, setConstructors] = useState<Constructor[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDrivers();
    fetchConstructors();
  }, []);

  useEffect(() => {
    setCurrentPage(0);
  }, [activeTab]);

  const fetchDrivers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/driver/`);
      const data = await response.json();
      setDrivers(data);
    } catch (error) {
      console.error("Failed to fetch drivers:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchConstructors = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/constructor/`);
      const data = await response.json();
      const sortedData = data.sort((a: Constructor, b: Constructor) => 
        a.Name.localeCompare(b.Name)
      );
      setConstructors(sortedData);
    } catch (error) {
      console.error("Failed to fetch constructors:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDriverClick = (driverId: number) => {
    navigate(`/driver/${driverId}`);
  };

  const handleConstructorClick = (constructorId: number) => {
    navigate(`/constructor/${constructorId}`);
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  const getCurrentItems = () => {
    return activeTab === "drivers" ? drivers : constructors;
  };

  const getDisplayedItems = () => {
    const items = getCurrentItems();
    const startIndex = currentPage * ITEMS_PER_PAGE;
    return items.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  const getTotalPages = () => {
    return Math.ceil(getCurrentItems().length / ITEMS_PER_PAGE);
  };

  const canGoNext = () => {
    return currentPage < getTotalPages() - 1;
  };

  const canGoPrevious = () => {
    return currentPage > 0;
  };

  const goToNextPage = () => {
    if (canGoNext()) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const goToPreviousPage = () => {
    if (canGoPrevious()) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const goToPage = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  const renderDriverCard = (driver: Driver) => (
    <div
      key={driver.DriverID}
      onClick={() => handleDriverClick(driver.DriverID)}
      className="item-card"
      style={{ background: CONSTRUCTOR_COLORS[driver.ConstructorID] }}
    >
      <div className="card-content">
        <div className="card-name">{driver.Name}</div>
        <div className="card-info">{driver.Nationality}</div>
        <img
          src={imageMap[driver.Name as keyof typeof imageMap]}
          alt={driver.Name}
          className="card-image"
        />
      </div>
    </div>
  );

  const renderConstructorCard = (constructor: Constructor) => (
    <div
      key={constructor.ConstructorID}
      onClick={() => handleConstructorClick(constructor.ConstructorID)}
      className="item-card"
      style={{ background: CONSTRUCTOR_COLORS[constructor.ConstructorID] }}
    >
      <div className="card-content">
        <div className="constructor-top">
          <img
            src={constructorLogoMap[constructor.ConstructorID]}
            alt={`${constructor.Name} logo`}
            className="constructor-logo"
          />
          <span className="card-name">{constructor.Name}</span>
        </div>

        <div className="constructor-details">
          <span className="card-info">{constructor.Nationality}</span>
          <span className="card-info">
            {constructor.FoundedYear} · {constructor.TeamPrincipal}
          </span>
        </div>

        <div className="constructor-car-wrap">
          <img
            src={constructorCarMap[constructor.ConstructorID]}
            alt={`${constructor.Name} car`}
            className="constructor-car"
          />
        </div>
      </div>
    </div>
  );

  const renderCards = () => {
    const items = getDisplayedItems();
    
    if (activeTab === "drivers") {
      return (items as Driver[]).map(renderDriverCard);
    }
    
    return (items as Constructor[]).map(renderConstructorCard);
  };

  const renderPaginationDots = () => {
    const totalPages = getTotalPages();
    
    return Array.from({ length: totalPages }).map((_, index) => (
      <span
        key={index}
        className={`dot ${index === currentPage ? "active" : ""}`}
        onClick={() => goToPage(index)}
      />
    ));
  };

  if (loading) {
    return (
      <div className="home-page">
        <div className="loading">Betöltés...</div>
      </div>
    );
  }

  return (
    <div className="home-page">
      <div className="season-header">
        <h1>2025 SEASON</h1>
      </div>

      <div className="tab-container">
        <button
          className={`tab-btn ${activeTab === "drivers" ? "active" : ""}`}
          onClick={() => handleTabChange("drivers")}
        >
          DRIVERS
        </button>
        <button
          className={`tab-btn ${activeTab === "teams" ? "active" : ""}`}
          onClick={() => handleTabChange("teams")}
        >
          TEAMS
        </button>
      </div>

      <div className="carousel-container">
        <button 
          className="carousel-btn prev" 
          onClick={goToPreviousPage} 
          disabled={!canGoPrevious()}
          aria-label="Previous page"
        >
          &#8249;
        </button>

        <div className="items-grid">
          {renderCards()}
        </div>

        <button 
          className="carousel-btn next" 
          onClick={goToNextPage} 
          disabled={!canGoNext()}
          aria-label="Next page"
        >
          &#8250;
        </button>
      </div>

      <div className="pagination-dots">
        {renderPaginationDots()}
      </div>
    </div>
  );
}

export default HomePage;