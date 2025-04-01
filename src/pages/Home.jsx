import React from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import Leads from "../components/Leads";

const Home = () => {
  return (
    <>
      {/* <hr /> */}
      <h1 className="text-center py-3 shadow"> LeadSync Dashboard</h1>

      <div className="container my-5">
        <div className="row">
          <div className="col-md-3 text-center py-3 rounded ">
            <div className="py-2 bg-light rounded shadow">
              <Link to="/leads" style={{ textDecoration: "none" }}>
                Leads
              </Link>
            </div>
            <div className="py-2 bg-light rounded my-1 shadow">
              {" "}
              <Link to="/agents" style={{ textDecoration: "none" }}>
                SalesAgents
              </Link>
            </div>

            <div className="py-2 bg-light rounded my-1 shadow">
              {" "}
              <Link to="/reports" style={{ textDecoration: "none" }}>
                Report
              </Link>
            </div>
            <div className="py-2 bg-light rounded my-1 shadow">
              {" "}
              <Link to="/leadstatus" style={{ textDecoration: "none" }}>
                Lead Status View
              </Link>
            </div>
            <div className="py-2 bg-light rounded my-1 shadow">
              {" "}
              <Link to="/salesagent" style={{ textDecoration: "none" }}>
                Sales Agent View
              </Link>
            </div>

            <div className="py-2 bg-light rounded my-1 shadow">
              {" "}
              <Link to="/" style={{ textDecoration: "none" }}>
                Settings
              </Link>
            </div>
          </div>
          <div className="col-md-9 ml-3">
            <Leads />
          </div>
        </div>

        {/* <ToastContainer /> */}
      </div>
    </>
  );
};

export default Home;
