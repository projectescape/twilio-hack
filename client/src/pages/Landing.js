import React from "react";

const Landing = () => {
  return (
    <>
      <nav
        className="navbar is-primary is-fixed-top"
        aria-label="main navigation"
      >
        <div className="navbar-start">
          <div className="navbar-item">Git Talking</div>
        </div>
      </nav>
      <section className="hero is-medium is-dark is-fullheight is-bold">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Welcome to Git Talking</h1>
            <h2 className="subtitle">
              <a className="button is-primary" href="/auth/github">
                L<i className="fab fa-github"></i>gin
              </a>
            </h2>
          </div>
        </div>
      </section>
    </>
  );
};

export default Landing;
