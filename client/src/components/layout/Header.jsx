import React from "react";
import { NavLink, Link } from "react-router-dom";
import { MdShoppingBag } from "react-icons/md";
import { useAuth } from "../../context/auth";
import SearchComponent from "../SearchComponent";
import toast from "react-hot-toast";
import useCategory from "../../hooks/useCategory";
const Header = () => {
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  function handleLogout() {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logged out successfully");
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            {" "}
            <MdShoppingBag style={{ fontSize: "30px" }} /> MernMart
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ms-auto">
              <SearchComponent />
              <NavLink to="/" className="nav-link " aria-current="page">
                Home
              </NavLink>
              {/* if user exists, then show him logout, else show him register and login */}
              {!auth.user ? (
                <>
                  <NavLink to="/register" className="nav-link">
                    Register
                  </NavLink>
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {auth?.user?.name}
                  </NavLink>
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink
                        to={`/dashboard/${
                          auth?.user?.role === 1 ? "admin" : "user"
                        }`}
                        className="dropdown-item"
                      >
                        DashBoard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={handleLogout}
                        to="/login"
                        className="nav-link"
                      >
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </>
              )}
              <NavLink to="/cart" className="nav-link">
                Cart
              </NavLink>

              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="/categories"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    {" "}
                    <Link className="dropdown-item" to="/categories">
                      All Categories
                    </Link>
                  </li>
                  {categories.map((category) => (
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/category/${category.slug}`}
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
