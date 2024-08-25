// Header.js
import React from "react";
import "./css/Header.css";
import SearchIcon from "@mui/icons-material/Search";

import { Avatar } from "@mui/material";
import ArchiveIcon from "@mui/icons-material/Archive";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/counter/UserSlice";
import { signOut } from "firebase/auth";
import { auth } from "../frebase/firebase";
import { Link } from "react-router-dom";

function Header() {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/auth");
      })
      .catch((error) => {
        console.error("Sign out error:", error);
      });
  };

  return (
    <>
      <header>
        <div className="header-container">
          <div className="header-left">
            <Link to="/">
              <img src="./assets/logo.png" alt="logo" className="logo2" />
            </Link>

            <p>
              <h3>
                <b>Bike Brains</b>
              </h3>{" "}
            </p>
          </div>
          <div className="header-middle">
            <div className="header-search-container">
              <SearchIcon className="icon" />
              <input type="text" placeholder="Search..." />
            </div>
          </div>
          <div className="header-right">
            <div className="header-right-container">
              <span onClick={handleSignOut}>
                <Avatar className="icon" src={user?.photo} />
              </span>
              <ArchiveIcon className="icon" />
              <EmojiEventsIcon className="icon" />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
