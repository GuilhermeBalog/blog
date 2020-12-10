import Link from 'next/link';
import React from 'react';

import styles from '../styles/Layout.module.css'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <header className={styles.header}>
        <Link href="/">
          <a>
            Guilherme Balog Gardino
          </a>
        </Link>
        <small>Design em andamento!</small>
      </header>

      {children}

      <footer className={styles.footer}>
        &copy; Guilherme Balog Gardino, {new Date().getFullYear()}
      </footer>
    </>
  )
}

export default Layout;
