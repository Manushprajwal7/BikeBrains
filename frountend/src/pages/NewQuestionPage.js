import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Header from "../components/header/header";
import NewQuestion1 from "../components/Add-Question/NewQuestion1";
function NewQuestionPage() {
  return (
    <div>
      <Header />
      <Sidebar />
      <NewQuestion1 />
    </div>
  );
}

export default NewQuestionPage;
