import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../views/Home/Home";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";


function AppRouter() {
    return (
        <Router>
            <Navbar />
            <Routes >
                <Route path="/" element={<Home />} />
            </Routes>
            <Footer />
        </Router>
    )
}

export default AppRouter