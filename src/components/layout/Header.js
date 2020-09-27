import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";

const Header = () => {

  const tab = useSelector(state => {
    return state.tab.tab
  });
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <a className="navbar-brand" href="/">
            Bookstore (graphQL)
          </a>
        </div>
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
          <li className="nav-item">
            <Link to="/bookList" className={"nav-link" + (tab === "book" ? " active" : "")}>
              Books
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/categoryList" className={"nav-link" + (tab === "category" ? " active" : "")}>
              Categories
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/publisherList" className={"nav-link" + (tab === "publisher" ? " active" : "")}>
              Publishers
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/authorList" className={"nav-link" + (tab === "author" ? " active" : "")}>
              Authors
            </Link>
          </li>
        </ul>

      </div>
    </nav>
  );
}

export default Header;
