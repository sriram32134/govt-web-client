import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import District from "./components/Home/District";
import Mobile from "./components/Home/Mobile";
import History from "./components/Home/ComplaintsHistory";

function App() {
  return (
    <Routes>
      <Route element={<Home />}>
        <Route path="/" element={<District />} />
        <Route path="/mobile" element={<Mobile />} />
        <Route path="/history" element={<History/>}/>
      </Route>
    </Routes>
  );
}

export default App;
