import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage"
import AboutPage from "./pages/About";
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import PageNotFound from './pages/PageNotFound';
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import ForgotPass from "./pages/Auth/ForgotPass";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgot-password" element={<ForgotPass />}></Route>
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="" element={<Dashboard />}/>
        </Route>
        <Route path="/about" element={<AboutPage />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/policy" element={<Policy />}></Route>
        <Route path="/*" element={<PageNotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
