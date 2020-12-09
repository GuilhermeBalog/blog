import { GetStaticPaths, GetStaticProps } from 'next'
import { getAllPostIds, getPostData, Post } from '../../lib/posts'
import Head from 'next/head'

interface Props {
  postData: Post
}

const Post: React.FC<Props> = ({ postData }) => {
  return (
    <main>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1>{postData.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </main>
  )
}

export default Post

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id as string)

  return {
    props: {
      postData
    }
  }
}
