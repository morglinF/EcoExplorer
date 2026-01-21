import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./components/Home";
import Animal from "./components/Animal";
import About from "./components/About";
import Favorites from "./components/Favorites";

function App() {
  return (
  <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/:name" element={<Animal />} />
      <Route path="/about" element={<About/>} />
      <Route path="/favorites" element={<Favorites />} />
    </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
