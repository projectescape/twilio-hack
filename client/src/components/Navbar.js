import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import Context from "../context";

const Navbar = () => {
  const { profile, handleLogout } = useContext(Context);
  const history = useHistory();

  return (
    <>
      <nav className="navbar is-dark" aria-label="main navigation">
        <div className="navbar-start">
          <Link to="/" className="navbar-item">
            <div className="title is-4 has-text-white-bis">Git Talking</div>
          </Link>
        </div>
        <div className="navbar-end">
          {/* <div className="navbar-item">Welcome {profile.username}</div> */}
          <div className="navbar-item">
            <div className="buttons">
              <button
                className="button is-primary"
                onClick={async () => {
                  await handleLogout();
                  history.push("/");
                }}
              >
                Log <i className="fab fa-github" />
                ut
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
