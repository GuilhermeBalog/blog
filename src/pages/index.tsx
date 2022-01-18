import Link from 'next/link'
import RelativeDate from '../components/Date'
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
          Meu nome é Guilherme Balog e fico muito feliz por você ter chegado aqui! Dá uma olhada nos posts que já escrevi:
        </p>

        <div className={styles.grid}>
          {allPostsData.map(({ id, date, title, description }) => (
            <Link href={`/posts/${id}`} key={id}>
              <a className={styles.card}>
                <h3>{title}</h3>
                <p>{description}</p>
                <RelativeDate dateString={date} />
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
