import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/statistics.css";

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

interface DriverStats {
  points: number;
  podiums: number;
  wins: number;
  fastest_laps: number;
  races: number;
  points_per_race: number;
  points_chart: { Name: string; Country: string; points: number }[];
}

interface ConstructorStats {
  points: number;
  podiums: number;
  wins: number;
  fastest_laps: number;
  races: number;
  points_per_race: number;
  points_chart: { Name: string; Country: string; points: number }[];
  drivers: { DriverID: number; Name: string }[];
}

interface Standing {
  DriverID?: number;
  ConstructorID?: number;
  driver_name?: string;
  constructor_name?: string;
  Nationality: string;
  total_points: number;
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

function StatisticsPage() {
  const [tab, setTab] = useState<"drivers" | "constructors">("drivers");
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [constructors, setConstructors] = useState<Constructor[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<number | null>(null);
  const [selectedConstructor, setSelectedConstructor] = useState<number | null>(null);
  const [driverStats, setDriverStats] = useState<DriverStats | null>(null);
  const [constructorStats, setConstructorStats] = useState<ConstructorStats | null>(null);
  const [standings, setStandings] = useState<Standing[]>([]);
  const [statsLoading, setStatsLoading] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/driver/")
      .then(r => r.json()).then(setDrivers).catch(console.error);

    fetch("http://127.0.0.1:8000/api/constructor/")
      .then(r => r.json()).then(setConstructors).catch(console.error);

    fetch("http://127.0.0.1:8000/api/statistics/standings/drivers")
      .then(r => r.json()).then(setStandings).catch(console.error);
  }, []);

  useEffect(() => {
    if (tab === "drivers") {
      fetch("http://127.0.0.1:8000/api/statistics/standings/drivers")
        .then(r => r.json()).then(setStandings).catch(console.error);
    } else {
      fetch("http://127.0.0.1:8000/api/statistics/standings/constructors")
        .then(r => r.json()).then(setStandings).catch(console.error);
    }
    setSelectedDriver(null);
    setSelectedConstructor(null);
    setDriverStats(null);
    setConstructorStats(null);
  }, [tab]);

  const handleDriverSelect = (id: number) => {
    setSelectedDriver(id);
    setStatsLoading(true);
    fetch(`http://127.0.0.1:8000/api/statistics/driver/${id}`)
      .then(r => r.json())
      .then(data => { setDriverStats(data); setStatsLoading(false); })
      .catch(console.error);
  };

  const handleConstructorSelect = (id: number) => {
    setSelectedConstructor(id);
    setStatsLoading(true);
    fetch(`http://127.0.0.1:8000/api/statistics/constructor/${id}`)
      .then(r => r.json())
      .then(data => { setConstructorStats(data); setStatsLoading(false); })
      .catch(console.error);
  };

  const maxPoints = driverStats
    ? Math.max(...driverStats.points_chart.map(r => r.points), 1)
    : constructorStats
    ? Math.max(...constructorStats.points_chart.map(r => r.points), 1)
    : 1;

  const chart = driverStats?.points_chart ?? constructorStats?.points_chart ?? [];
  const stats = driverStats ?? constructorStats;

  const selectedDriverObj = drivers.find(d => d.DriverID === selectedDriver);
  const selectedConstructorObj = constructors.find(c => c.ConstructorID === selectedConstructor);

  return (
    <div className="stats-page">
      <div className="stats-header">
        <h1>Statistics</h1>
        <div className="stats-tabs">
          <div
            className={`stats-tab ${tab === "drivers" ? "active" : ""}`}
            onClick={() => setTab("drivers")}
          >Drivers</div>
          <div
            className={`stats-tab ${tab === "constructors" ? "active" : ""}`}
            onClick={() => setTab("constructors")}
          >Constructors</div>
        </div>
      </div>

      <div className="stats-layout">
        <div className="stats-left">
          <div className="stats-selector-title">
            {tab === "drivers" ? "Select a Driver" : "Select a Constructor"}
          </div>

          {tab === "drivers" ? (
            <div className="stats-list">
              {drivers.map(d => (
                <div
                  key={d.DriverID}
                  className={`stats-list-item ${selectedDriver === d.DriverID ? "active" : ""}`}
                  style={{ borderLeft: `4px solid transparent`,
                    background: selectedDriver === d.DriverID
                      ? constructorColors[d.ConstructorID]
                      : "#2a2a2a"
                  }}
                  onClick={() => handleDriverSelect(d.DriverID)}
                >
                  <div className="stats-item-name">{d.Name}</div>
                  <div className="stats-item-sub">{d.Nationality}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="stats-list">
              {constructors.map(c => (
                <div
                  key={c.ConstructorID}
                  className={`stats-list-item ${selectedConstructor === c.ConstructorID ? "active" : ""}`}
                  style={{
                    background: selectedConstructor === c.ConstructorID
                      ? constructorColors[c.ConstructorID]
                      : "#2a2a2a"
                  }}
                  onClick={() => handleConstructorSelect(c.ConstructorID)}
                >
                  <div className="stats-item-name">{c.Name}</div>
                  <div className="stats-item-sub">{c.Nationality}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="stats-right">
          {!stats && !statsLoading && (
            <div className="stats-standings">
              <div className="stats-standings-title">
                {tab === "drivers" ? "Driver Standings 2024" : "Constructor Standings 2024"}
              </div>
              {standings.map((s, i) => (
                <div
                  key={i}
                  className="stats-standing-row"
                  onClick={() => tab === "drivers"
                    ? handleDriverSelect(s.DriverID!)
                    : handleConstructorSelect(s.ConstructorID!)
                  }
                  style={{
                    background: tab === "constructors" && s.ConstructorID
                      ? constructorColors[s.ConstructorID]
                      : tab === "drivers" && s.DriverID
                      ? constructorColors[drivers.find(d => d.DriverID === s.DriverID)?.ConstructorID ?? 0]
                      : "#2a2a2a"
                  }}
                >
                  <span className="standing-pos">{i + 1}</span>
                  <span className="standing-name">
                    {s.driver_name ?? s.constructor_name}
                  </span>
                  <span className="standing-pts">{s.total_points} pts</span>
                </div>
              ))}
            </div>
          )}

          {statsLoading && (
            <div className="stats-loading">Loading statistics...</div>
          )}

          {stats && !statsLoading && (
            <>
              <div className="stats-entity-title">
                {selectedDriverObj?.Name ?? selectedConstructorObj?.Name}
                <span className="stats-entity-sub">
                  {selectedDriverObj?.Nationality ?? selectedConstructorObj?.Nationality}
                </span>
              </div>

              <div className="stats-cards">
                <div className="stats-card">
                  <div className="stats-card-label">Points</div>
                  <div className="stats-card-value">{stats.points}</div>
                </div>
                <div className="stats-card">
                  <div className="stats-card-label">Wins</div>
                  <div className="stats-card-value">{stats.wins}</div>
                </div>
                <div className="stats-card">
                  <div className="stats-card-label">Podiums</div>
                  <div className="stats-card-value">{stats.podiums}</div>
                </div>
                <div className="stats-card">
                  <div className="stats-card-label">Fastest Laps</div>
                  <div className="stats-card-value">{stats.fastest_laps}</div>
                </div>
                <div className="stats-card">
                  <div className="stats-card-label">Races</div>
                  <div className="stats-card-value">{stats.races}</div>
                </div>
                <div className="stats-card">
                  <div className="stats-card-label">Pts / Race</div>
                  <div className="stats-card-value">{stats.points_per_race}</div>
                </div>
              </div>

              <div className="stats-chart-title">Points per Race</div>
              <div className="stats-chart">
                {chart.map((r, i) => (
                  <div key={i} className="stats-bar-wrap">
                    <div className="stats-bar-value">{r.points > 0 ? r.points : ""}</div>
                    <div
                      className="stats-bar"
                      style={{ height: `${Math.max((r.points / maxPoints) * 100, 2)}%` }}
                    />
                    <div className="stats-bar-label">{r.Country.slice(0, 3).toUpperCase()}</div>
                  </div>
                ))}
              </div>

              {constructorStats && (
                <div className="stats-drivers-title">Drivers</div>
              )}
              {constructorStats?.drivers.map(d => (
                <div key={d.DriverID} className="stats-driver-chip">{d.Name}</div>
              ))}

              <button className="stats-back-btn" onClick={() => {
                setDriverStats(null);
                setConstructorStats(null);
                setSelectedDriver(null);
                setSelectedConstructor(null);
              }}>← Back to standings</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default StatisticsPage;