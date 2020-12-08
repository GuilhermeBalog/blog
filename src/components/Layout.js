import React from 'react';

import styles from '../styles/Layout.module.css'

function Layout({ children }) {
  return (
    <>
      <header className={styles.header}>
        <Layout href="/">
          <a>
            Guilherme Balog Gardino
          </a>
        </Layout>
      </header>

      {children}

      <footer className={styles.footer}>
        &copy; Guilherme Balog Gardino, {new Date().getFullYear()}
      </footer>
    </>
  )
}

export default Layout;
