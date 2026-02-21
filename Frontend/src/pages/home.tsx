import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <h1>F1 Database</h1>
      <div className="home-buttons">
        <button onClick={() => navigate("/driver")}>Versenyzők</button>
        <button onClick={() => navigate("/constructor")}>Csapatok</button>
      </div>
    </div>
  );
}

export default HomePage;