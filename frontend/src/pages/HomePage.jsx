// rafce
import AddTask from "@components/AddTask.jsx";
import DateTimeFilter from "@components/DateTimeFilter.jsx";
import Footer from "@components/Footer.jsx";
import Header from "@components/Header.jsx";
import StatsAndFilter from "@components/StatsAndFilter.jsx";
import TaskList from "@components/TaskList.jsx";
import TaskListPagination from "@components/TaskListPagination.jsx";

import React from "react";

const HomePage = () => {
  return (
    <div className="min-h-screen w-full bg-[#fefcff] relative">
      {/* Dreamy Sky Pink Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
        radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
        }}
      />
      {/* Your Content/Components */}

      <div className="container pt-8 mx-auto">
        <div className="w-full max-w-2xl mx-auto space-y-6">
          <Header />
          <AddTask />
          <StatsAndFilter />
          <TaskList />
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <TaskListPagination />
            <DateTimeFilter />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
