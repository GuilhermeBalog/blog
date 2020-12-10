import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import SEOHead from '../../components/SEOHead'
import { getAllPostIds, getPostData, Post } from '../../lib/posts'

import styles from '../../styles/Post.module.css'

interface Props {
  postData: Post
}

const PostLayout = ({ postData }: Props) => {
  return (
    <main>
      <SEOHead
        pageDescription=""
        pageTitle={postData.title}
        pagePath={`/${postData.id}`}
      />

      <article className={styles.post}>
        <h1>{postData.title}</h1>

        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </main>
  )
}

export default PostLayout

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
