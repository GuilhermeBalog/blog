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
            <span>
              Guilherme
            </span>
            {' '}
            <strong>
              Balog
            </strong>
          </a>
        </Link>
        <ul>
          <li>
            <Link href="/">
              <a>
                {/* Início */}
              </a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>
                {/* Posts */}
              </a>
            </Link>
          </li>
        </ul>
      </header>

      <main className={styles.main}>
        {children}
      </main>

      <footer className={styles.footer}>
        &copy; Guilherme Balog Gardino, {new Date().getFullYear()}
      </footer>
    </>
  )
}

export default Layout;
