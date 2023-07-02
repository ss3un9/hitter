import React from 'react';

export const NavBar = () => {
  const storedSession = JSON.parse(localStorage.getItem('session')) || {};

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
      <div className="container px-5">
        <a className="navbar-brand" href="/">
          HITTABLE
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="/member/hit_ai">
                Hit
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/song/board">
                Leader Board
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/board/paging">
                Community
              </a>
            </li>
            <li className="nav-item">
              {storedSession.loginName != null && (
                <a className="nav-link" href="/member/mypage">
                  <p>{storedSession.loginName}</p>
                </a>
              )}
            </li>
            <li className="nav-item">
              {storedSession.loginName != null ? (
                <a className="nav-link" href="/member/logout">
                  로그아웃
                </a>
              ) : (
                <a className="nav-link" href="/member/save">
                  Sign Up
                </a>
              )}
            </li>
            <li className="nav-item">
              {storedSession.loginName == null && (
                <a className="nav-link" href="/member/login">
                  Log In
                </a>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
