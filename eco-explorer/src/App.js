import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./components/Home";
import Animal from "./components/Animal";
import About from "./components/About";

function App() {
  return (
  <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/:name" element={<Animal />} />
      <Route path="/about" element={<About/>} />
    </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
