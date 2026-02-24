import { useNavigate } from "react-router-dom";
import HomeSlider from "../components/homeSlider";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <h1>F1 Database</h1>
     return (
    <div>
      <HomeSlider />
    </div>
    </div>
  );
}

export default HomePage;