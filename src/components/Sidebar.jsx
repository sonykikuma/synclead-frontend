import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="py-2 bg-light rounded shadow">
      <Link to="/" style={{ textDecoration: "none" }}>
        Back to Dashboard
      </Link>
    </div>
  );
};

export default Sidebar;
