import React from 'react';

function Layout({ children }) {
  return (
    <>
      <header>
        Guilherme Balog Gardino
      </header>

      {children}

      <footer>
        &copy; Guilherme Balog Gardino, {new Date().getFullYear()}
      </footer>
    </>
  )
}

export default Layout;
