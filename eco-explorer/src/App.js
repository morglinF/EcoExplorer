import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./components/Home"
import Animal from "./components/Animal"

function App() {
  return (
  <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/:name" element={<Animal />}></Route>
    </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
