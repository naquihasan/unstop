import { BrowserRouter, Routes, Route , useNavigate} from "react-router-dom";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";


function App() {
  return (
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
      </Routes>
  );
}

export default App;
