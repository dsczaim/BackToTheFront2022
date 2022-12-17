import React, { Fragment } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";

import Search from "./pages/Search";
import MovieDetails from "./pages/MovieDetails";
import SearchResult from "./pages/SearchResult";
function App() {
  return (
    <div className="App">
      <Fragment>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/search" element={<Search />} />
          <Route path="/searchresult/:searchText" element={<SearchResult />} />
          <Route path="/moviedetails/:id" element={<MovieDetails />} />
          <Route />
        </Routes>
      </Fragment>
    </div>
  );
}

export default App;
