import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LeadDetail from "./pages/LeadDetail";
import LeadList from "./pages/LeadList";
import SalesAgent from "./pages/SalesAgent";
import Reports from "./pages/Reports";
import LeadStatusView from "./pages/LeadStatusView";
import SalesagentView from "./pages/SalesagentView";
function App() {
  return (
    <Router>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/leads/:id" element={<LeadDetail />} />
        <Route path="/leads" element={<LeadList />} />
        <Route path="/agents" element={<SalesAgent />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/leadstatus" element={<LeadStatusView />} />
        <Route path="/salesagent" element={<SalesagentView />} />
      </Routes>{" "}
      <Footer />
    </Router>
  );
}

export default App;
