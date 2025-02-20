import "./App.css"
import AllCountries from "./components/AllCountries"

export default function App() {
  return (
    <div className="appContainer">
      <header>
        <div className="imgContainer">
          <img src="/hero-image.jpg" alt="" />
        </div>
        <img className="logo" src="/Logo.svg" alt="" />
      </header>
    
    <AllCountries />
    </div>
  )
}