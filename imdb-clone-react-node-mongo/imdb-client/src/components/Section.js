import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import TopPicks from "./list/TopPicks";

function Section() {
  return (
    <div className="px-5 pt-5">
      <div className="flex">
        <h1
          style={{
            width: "50%",
            color: "gold",
            backgroundColor: "black",
          }}
        >
          What to watch
        </h1>
        <span className="d-inline mt-3">
          <p className="text-primary fw-semibold text-end">
          <Link to="/watch-section">
            Get more recommendations {">"}
            </Link>
          </p>
        </span>
      </div>
      <div className="pb-5">
        <h2
          style={{
            width: "50%",
            color: "gold",
            backgroundColor: "black",
          }}
        >
          Top Picks {">"}
        </h2>
        <span className="d-inline mt-3">
          <p className="text-white-50 fw-semibold fs-5">
            TV shows and movies just for you
          </p>
        </span>
        <p className="fs-5">
          <Link to="/login">Sign In</Link>{" "}
        </p>
        <TopPicks category="highrated" />
      </div>

      <div className="pt-5 pb-5">
        <h2
          style={{
            width: "50%",
            color: "gold",
            backgroundColor: "black",
          }}
        >
          From your Watchlist{">"}
        </h2>
        <span className="d-inline mt-3">
          <p className="text-white-50 fw-semibold fs-5">
            Movies you added to your Watchlist
          </p>
        </span>
        <TopPicks category="wishlist" />
      </div>

      <div className="pt-5 pb-5">
        <h2
          style={{
            width: "50%",
            color: "gold",
            backgroundColor: "black",
          }}
        >
          Fan Favorites {">"}
        </h2>
        <span className="d-inline mt-3">
          <p className="text-white-50 fw-semibold fs-5">
            This week's top TV and movies
          </p>
        </span>
        <TopPicks category="favorites" />
      </div>
    </div>
  );
}

export default Section;
