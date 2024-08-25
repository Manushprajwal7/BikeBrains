// Sidebar.js
import React from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import PublicIcon from "@mui/icons-material/Public";
import "./css/Sidebar.css";

function Sidebar({ isOpen }) {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-container">
        <div className="sidebar-options">
          <div className="sidebar-option">
            <a href="/">Home</a>
          </div>
          <div className="sidebar-option">
            <a href="/">PUBLIC</a>
            <div className="link">
              <div className="link-tag">
                <a href="/">Questions</a>
                <PublicIcon className="icon" />
              </div>
              <div className="sidebar-option">
                <a href="/">FIND A JOB</a>
                <div className="link">
                  <div className="tags">
                    <a href="/jobs">Jobs</a>
                    <a href="/companies">Companies</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="sidebar-option">
            <p>Search by Brand</p>
            <div className="link">
              <div className="link-tag">
                <StarBorderIcon className="icon" />
                <a href="/brands">Brands</a>
              </div>
            </div>
          </div>
          <div className="service">
            <a href="/service">Service</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
