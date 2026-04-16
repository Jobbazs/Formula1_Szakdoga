import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";
<<<<<<< HEAD
import { imageMap } from "../utils/drivers-image-map";
import { constructorCarMap, constructorLogoMap } from "../utils/constructor-image-map";
=======
>>>>>>> gb_02_28

interface Driver {
  DriverID: number;
  Name: string;
<<<<<<< HEAD
  ConstructorID: number;
  Nationality: string;
  BirthDate?: string;
  Biography?: string;
  Image?: string;
=======
  Nationality: string;
  ConstructorID: number;
>>>>>>> gb_02_28
}

interface Constructor {
  ConstructorID: number;
  Name: string;
  Nationality: string;
<<<<<<< HEAD
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
=======
}

interface NewsItem {
  title: string;
  link: string;
  date: string;
  description: string;
}

const constructorColors: Record<number, string> = {
>>>>>>> gb_02_28
  1: "linear-gradient(135deg, #0d2747 0%, #c8102e 100%)",
  2: "linear-gradient(135deg, #460202 0%, #a6051a 100%)",
  3: "linear-gradient(135deg, #25412b 0%, #00e6cf 100%)",
  4: "linear-gradient(135deg, #1a1a1a 0%, #ff8000 100%)",
  5: "radial-gradient(circle at bottom right, #00665e 0%, #003a33 50%)",
<<<<<<< HEAD
  6: "linear-gradient(135deg, #ff0095 0%, #0090ff 100%)",
  7: "radial-gradient(circle at bottom right, #e8e8e8 0%, #003087 50%)",
  8: "linear-gradient(135deg, #1a1a2e 0%, #3c618b 100%)",
=======
  6: "linear-gradient(135deg, #fd0ae9 0%, #0066ff 80%)",
  7: "radial-gradient(circle at bottom right, #e8e8e8 0%, #003087 50%)",
  8: "linear-gradient(135deg, #1a1a2e 0%, #4778af 100%)",
>>>>>>> gb_02_28
  9: "linear-gradient(135deg, #00ff22 0%, #000000 100%)",
  10: "linear-gradient(135deg, #1a1a1a 0%, #b6babd 100%)",
};

<<<<<<< HEAD
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
=======
const f1History: Record<string, { year: number; text: string }[]> = {
  "04-11": [
    { year: 1976, text: "Niki Lauda wins the Spanish Grand Prix at Jarama." },
    { year: 1999, text: "Michael Schumacher takes pole position at Imola." },
    { year: 2010, text: "Sebastian Vettel dominates qualifying in Malaysia." },
  ],
  "04-12": [
    { year: 1981, text: "Gilles Villeneuve wins the San Marino Grand Prix." },
    { year: 2009, text: "Jenson Button takes victory in the Malaysian GP." },
  ],
  "01-15": [
    {
      year: 1950,
      text: "FIA announces the inaugural Formula 1 World Championship.",
    },
  ],
};

function getTodayKey(): string {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${m}-${day}`;
}

function HomePage() {
  const [activeTab, setActiveTab] = useState<"drivers" | "teams">("drivers");
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [constructors, setConstructors] = useState<Constructor[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [activeNews, setActiveNews] = useState(0);
  const navigate = useNavigate();

  const todayKey = getTodayKey();
  const todayHistory = f1History[todayKey] ?? [
    { year: 1950, text: "The F1 World Championship began in the 1950 season." },
  ];

  const today = new Date().toLocaleDateString("en-GB", {
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/driver/")
      .then((r) => r.json())
      .then(setDrivers)
      .catch(console.error);

    fetch("http://127.0.0.1:8000/api/constructor/")
      .then((r) => r.json())
      .then(setConstructors)
      .catch(console.error);

    fetch("http://127.0.0.1:8000/api/news")
      .then((r) => r.json())
      .then((data) => {
        if (!data.error) setNews(data);
      })
      .catch(console.error)
      .finally(() => setNewsLoading(false));
  }, []);

  useEffect(() => {
    if (news.length === 0) return;
    const interval = setInterval(() => {
      setActiveNews((prev) => (prev + 1) % news.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [news]);

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="home-page">
      <div className="home-main-grid">
        <div className="home-news-card">
          {newsLoading ? (
            <div className="home-news-loading">Loading news...</div>
          ) : news.length > 0 ? (
            <>
              <div className="home-news-tabs">
                {news.map((_, i) => (
                  <button
                    key={i}
                    className={`home-news-dot ${i === activeNews ? "active" : ""}`}
                    onClick={() => setActiveNews(i)}
                  />
                ))}
              </div>
              <span className="home-news-badge">Latest News</span>
              <div className="home-news-title">{news[activeNews].title}</div>
              <div className="home-news-meta">
                {formatDate(news[activeNews].date)}
              </div>

              <a
                className="home-news-link"
                href={news[activeNews].link}
                target="_blank"
                rel="noreferrer"
              >
                Read more →
              </a>
            </>
          ) : (
            <>
              <span className="home-news-badge">F1 Stats</span>
              <div className="home-news-title">2025 Formula 1 Season</div>
              <div className="home-news-meta">
                Follow every race, driver and team
              </div>
            </>
          )}
        </div>

        <div className="home-history-card">
          <div className="home-history-label">On this day in F1</div>
          <div className="home-history-date">{today}</div>
          {todayHistory.map((e) => (
            <div key={e.year} className="home-history-item">
              <div className="home-history-year">{e.year}</div>
              <div className="home-history-text">{e.text}</div>
            </div>
          ))}
          {todayHistory.length === 0 && (
            <div
              className="home-history-text"
              style={{ color: "#888", paddingTop: "1rem" }}
            >
              No notable F1 events on this day.
            </div>
          )}
        </div>
      </div>

      <div className="home-tabs-section">
        <div className="home-tabs-header">
          <div
            className={`home-tab ${activeTab === "drivers" ? "active" : ""}`}
            onClick={() => setActiveTab("drivers")}
          >
            Drivers
          </div>
          <div
            className={`home-tab ${activeTab === "teams" ? "active" : ""}`}
            onClick={() => setActiveTab("teams")}
          >
            Teams
          </div>
        </div>
        <div className="home-tabs-body">
          {activeTab === "drivers"
            ? drivers.slice(0, 6).map((d) => (
                <div
                  key={d.DriverID}
                  className="home-mini-card"
                  style={{ background: constructorColors[d.ConstructorID] }}
                  onClick={() => navigate(`/driver/${d.DriverID}`)}
                >
                  <div className="home-mini-name">{d.Name}</div>
                  <div className="home-mini-sub">{d.Nationality}</div>
                </div>
              ))
            : constructors.slice(0, 6).map((c) => (
                <div
                  key={c.ConstructorID}
                  className="home-mini-card"
                  style={{ background: constructorColors[c.ConstructorID] }}
                  onClick={() => navigate(`/constructor/${c.ConstructorID}`)}
                >
                  <div className="home-mini-name">{c.Name}</div>
                  <div className="home-mini-sub">{c.Nationality}</div>
                </div>
              ))}
        </div>
>>>>>>> gb_02_28
      </div>
    </div>
  );
}

<<<<<<< HEAD
export default HomePage;
=======
export default HomePage;
>>>>>>> gb_02_28
