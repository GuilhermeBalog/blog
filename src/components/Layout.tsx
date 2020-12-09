import Link from 'next/link';
import React from 'react';

import styles from '../styles/Layout.module.css'

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <header className={styles.header}>
        <Link href="/">
          <a>
            Guilherme Balog Gardino
          </a>
        </Link>
      </header>

      {children}

      <footer className={styles.footer}>
        &copy; Guilherme Balog Gardino, {new Date().getFullYear()}
      </footer>
    </>
  )
}

export default Layout;
