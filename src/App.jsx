import { Link } from "react-router-dom"
import Pokedex from "./components/Pokedex/pokedex"
import CustomRoutes from "./routes/CustomRoutes"
import './App.css'


function App() {

  return (
    <div className="outer-pokedex">
    <h1 id="pokedex-heading">
      <Link to="/">pokedex</Link>
      </h1>
    <CustomRoutes />
    </div>
  )
}

export default App
