import Link from 'next/link'
import Head from '../components/SEOHead'

import { getSortedPostsData } from '../lib/posts'
import styles from '../styles/Home.module.css'

export default function Home({ allPostsData }) {
  return (
    <div className={styles.container}>
      <Head pageDescription="Minha descrição muito top" />

      <main className={styles.main}>
        <h1 className={styles.title}>
          Bem vindo ao meu blog!
        </h1>

        <p className={styles.description}>
          Fico muito feliz por você ter chegado aqui
        </p>

        <div className={styles.grid}>
          {allPostsData.map(({ id, date, title }) => (
            <Link href={`/posts/${id}`} key={id}>
              <a className={styles.card}>
                <h3>{title} &rarr;</h3>
                <p>{date}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}