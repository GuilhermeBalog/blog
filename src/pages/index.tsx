import Link from 'next/link'
import Head from '../components/SEOHead'

import { getSortedPostsMeta, PostMeta } from '../lib/posts'
import styles from '../styles/Home.module.css'

interface Props {
  allPostsData: PostMeta[]
}

const Home = ({ allPostsData }: Props) => {
  return (
    <div className={styles.container}>
      <Head pageDescription="Minha descrição muito top" />

      <main className={styles.main}>
        <img src="/assets/profile.jpeg" />
        <h1 className={styles.title}>
          Bem vindo ao meu blog!
        </h1>

        <p className={styles.description}>
          Fico muito feliz por você ter chegado aqui
        </p>

        <div className={styles.grid}>
          {allPostsData.map(({ id, date, title, description }) => (
            <Link href={`/posts/${id}`} key={id}>
              <a className={styles.card}>
                <h3>{title}</h3>
                <p>{description}</p>
                <p>{date.replace(/(\d+)-(\d+)-(\d+)/, '$3/$2/$1')}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Home

export async function getStaticProps() {
  const allPostsData = getSortedPostsMeta()

  return {
    props: {
      allPostsData
    }
  }
}
