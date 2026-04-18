import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";

import { imageMap } from "../utils/drivers-image-map";
import { constructorCarMap, constructorLogoMap } from "../utils/constructor-image-map";

interface Driver {
  DriverID: number;
  Name: string;
  Nationality: string;
  ConstructorID: number;
}

interface Constructor {
  ConstructorID: number;
  Name: string;
  Nationality: string;
}

interface NewsItem {
  title: string;
  link: string;
  date: string;
  description: string;
}

const constructorColors: Record<number, string> = {
  1: "linear-gradient(135deg, #0d2747 0%, #c8102e 100%)",
  2: "linear-gradient(135deg, #460202 0%, #a6051a 100%)",
  3: "linear-gradient(135deg, #25412b 0%, #00e6cf 100%)",
  4: "linear-gradient(135deg, #1a1a1a 0%, #ff8000 100%)",
  5: "radial-gradient(circle at bottom right, #00665e 0%, #003a33 50%)",
  6: "linear-gradient(135deg, #fd0ae9 0%, #0066ff 80%)",
  7: "radial-gradient(circle at bottom right, #e8e8e8 0%, #003087 50%)",
  8: "linear-gradient(135deg, #1a1a2e 0%, #4778af 100%)",
  9: "linear-gradient(135deg, #00ff22 0%, #000000 100%)",
  10: "linear-gradient(135deg, #1a1a1a 0%, #b6babd 100%)",
};

const f1History: Record<string, { year: number; text: string }[]> = {
  "04-11": [
    { year: 1976, text: "Niki Lauda wins the Spanish Grand Prix at Jarama." },
    { year: 1999, text: "Michael Schumacher takes pole at Imola." },
  ],
  "04-12": [
    { year: 1981, text: "Gilles Villeneuve wins at San Marino GP." },
  ],
};

function getTodayKey(): string {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${m}-${day}`;
}

export default function HomePage() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [constructors, setConstructors] = useState<Constructor[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"drivers" | "teams">("drivers");
  const [activeNews, setActiveNews] = useState(0);

  const navigate = useNavigate();

  const todayKey = getTodayKey();
  const todayHistory = f1History[todayKey] ?? [
    { year: 1950, text: "The F1 World Championship began." },
  ];

  const today = new Date().toLocaleDateString("en-GB", {
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const [driversRes, constructorsRes, newsRes] = await Promise.all([
          fetch("http://127.0.0.1:8000/api/driver/"),
          fetch("http://127.0.0.1:8000/api/constructor/"),
          fetch("http://127.0.0.1:8000/api/news"),
        ]);

        setDrivers(await driversRes.json());
        setConstructors(await constructorsRes.json());

        const newsData = await newsRes.json();
        if (!newsData.error) setNews(newsData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (news.length === 0) return;

    const interval = setInterval(() => {
      setActiveNews((prev) => (prev + 1) % news.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [news]);

  if (loading) {
    return <div className="home-page">Loading...</div>;
  }

  return (
    <div className="home-page">

      <div className="home-main-grid">
        <div className="home-news-card">
          {news.length > 0 ? (
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
              <div className="home-news-meta">{news[activeNews].date}</div>
              
                <a className="home-news-link"
                href={news[activeNews].link}
                target="_blank"
                rel="noreferrer"
              >
                Read more →
              </a>
            </>
          ) : (
            <div className="home-news-loading">No news available</div>
          )}
        </div>

        <div className="home-history-card">
          <div className="home-history-label">On this day in F1</div>
          <div className="home-history-date">{today}</div>
          {todayHistory.map((h) => (
            <div className="home-history-item" key={h.year}>
              <strong>{h.year}</strong> {h.text}
            </div>
          ))}
        </div>
      </div>

      <div className="home-tabs-section">
        <div className="home-tabs-header">
          <button
            className={activeTab === "drivers" ? "active" : ""}
            onClick={() => setActiveTab("drivers")}
          >
            Drivers
          </button>

          <button
            className={activeTab === "teams" ? "active" : ""}
            onClick={() => setActiveTab("teams")}
          >
            Teams
          </button>
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
                  <div>{d.Name}</div>
                  <small>{d.Nationality}</small>
                </div>
              ))
            : constructors.slice(0, 6).map((c) => (
                <div
                  key={c.ConstructorID}
                  className="home-mini-card"
                  style={{ background: constructorColors[c.ConstructorID] }}
                  onClick={() => navigate(`/constructor/${c.ConstructorID}`)}
                >
                  <div>{c.Name}</div>
                  <small>{c.Nationality}</small>
                </div>
              ))}
        </div>
      </div>

    </div>
  );
}