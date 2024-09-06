import { Route, Routes, Navigate} from "react-router-dom";
import Home from "./Pages/Home";
import Admportal from "./Pages/admportal";
import Collpred from "./Pages/Collpred";
import LoginForm from "./LoginPage";
import Neetpred from "./Pages/Neetpred";
export default function MyRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/Home" />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/admportal" element={<Admportal />} />
      <Route path="/collpred" element={<Collpred />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/neetpred" element={<Neetpred />} />
    </Routes>
  );
}
