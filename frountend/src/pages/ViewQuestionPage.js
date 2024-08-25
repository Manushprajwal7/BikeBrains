import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Header from "../components/header/header";
import ViewMainQuestion from "../components/ViewQuestion/ViewMainQuestion";
function ViewQuestionPage() {
  return (
    <div>
      <Header />
      <Sidebar />
      <ViewMainQuestion />
    </div>
  );
}

export default ViewQuestionPage;
