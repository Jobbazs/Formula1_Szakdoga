import { useState, useEffect } from "react";
import { imageMap } from "../utils/drivers-image-map";
import "../styles/homeSlider.css";

interface Driver {
  DriverID: number;
  Name: string;
  Image?: string;
}

interface Team {
  ConstructorID: number;
  Name: string;
  Image?: string;
}

function HomeSlider() {
  const [view, setView] = useState<"drivers" | "teams">("drivers");
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const driversRes = await fetch("http://127.0.0.1:8000/api/driver/");
        const driversData: Driver[] = await driversRes.json();
        setDrivers(driversData);

        const teamsRes = await fetch("http://127.0.0.1:8000/api/constructor/");
        const teamsData: Team[] = await teamsRes.json();
        setTeams(teamsData);

      } catch (err) {
        console.error("Hiba a fetch-nél:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const data = view === "drivers" ? drivers : teams;

  const nextSlide = () => {
    if (data.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % data.length);
  };

  const prevSlide = () => {
    if (data.length === 0) return;
    setCurrentIndex((prev) => (prev === 0 ? data.length - 1 : prev - 1));
  };

  const toggleView = (newView: "drivers" | "teams") => {
    setView(newView);
    setCurrentIndex(0);
  };

  if (loading) return <div className="slider-loading">Betöltés...</div>;
  if (data.length === 0) return <div className="slider-empty">Nincs adat</div>;

  const currentItem = data[currentIndex];

  return (
    <div className="home-slider">
      {/* Toggle buttons */}
      <div className="top-toggle">
        <button
          className={view === "drivers" ? "active" : ""}
          onClick={() => toggleView("drivers")}
        >
          DRIVERS
        </button>
        <button
          className={view === "teams" ? "active" : ""}
          onClick={() => toggleView("teams")}
        >
          TEAMS
        </button>
      </div>

      {/* Navigation arrows */}
      <div className="arrows">
        <button onClick={prevSlide}>◀</button>
        <button onClick={nextSlide}>▶</button>
      </div>

      {/* Slide content */}
      <div className="slide-content">
        <img
          src={
            currentItem.Image
              ? currentItem.Image
              : imageMap[currentItem.Name as keyof typeof imageMap]
          }
          alt={currentItem.Name}
        />
        <h2>{currentItem.Name}</h2>
      </div>
    </div>
  );
}

export default HomeSlider;
