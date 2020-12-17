import { GetStaticPaths, GetStaticProps } from 'next'
import React, { useEffect, useRef } from 'react'
import hljs from 'highlight.js'

import SEOHead from '../../components/SEOHead'
import { getAllPostIds, getPost, Post } from '../../lib/posts'

import styles from '../../styles/Post.module.css'

interface Props {
  postData: Post
}

const PostLayout = ({ postData }: Props) => {
  const articleBody = useRef(null)

  function highlightCodeBlocks() {
    if (!articleBody) return

    const codeBlocks = articleBody.current.querySelectorAll('pre code') as HTMLElement[]
    codeBlocks.forEach(codeBlock => hljs.highlightBlock(codeBlock))
  }

  useEffect(highlightCodeBlocks, [])

  return (
    <main>
      <SEOHead
        pageDescription={postData.description}
        pageTitle={postData.title}
        pagePath={`/posts/${postData.id}`}
        imageUrl={postData.thumbnailUrl}
      />

      <article className={styles.post}>
        <h1>{postData.title}</h1>
        <p className={styles.postDescription}>
          {postData.description}
        </p>

        <img src={postData.thumbnailUrl} />

        <div
          ref={articleBody}
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
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
  const postData = await getPost(params.id as string)

  return {
    props: {
      postData
    }
  }
}
