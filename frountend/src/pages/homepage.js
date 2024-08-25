import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Header from "../components/header/header";
import Index from "../components/Main/index";
import Footer from "../components/footer/Footer";

function Homepage() {
  return (
    <div>
      <Header />
      <Sidebar />
      <Index />
      <Footer />
    </div>
  );
}

export default Homepage;
