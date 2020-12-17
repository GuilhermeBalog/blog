import fs from 'fs'
import path from 'path'
import getMetadata from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

export interface PostMeta {
  id: string,
  title: string,
  description: string,
  date: string,
}

export interface Post extends PostMeta {
  contentHtml: string,
  thumbnailUrl: string
}

export function getSortedPostsMeta() {
  const fileNames = fs.readdirSync(postsDirectory)

  const allPostsMeta = getAllPostsMeta(fileNames)
  const sortedPostsData = sortPostsByDate(allPostsMeta)

  return sortedPostsData
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)

  return fileNames.map(fileName => {
    return {
      params: {
        id: removeMdExtension(fileName)
      }
    }
  })
}

export async function getPost(id: string): Promise<Post> {
  const fileName = `${id}.md`
  const fileContents = readMarkdownFileAsString(fileName)

  const meta = getMetadata(fileContents)
  const contentHtml = await convertMarkdownToHTML(meta.content)

  const baseUrl = process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://blog.guilhermebalog.ga'

  const thumbnailUrl = `${baseUrl}/api/thumbnail.png?title=${meta.data.title}`

  return {
    id,
    contentHtml,
    thumbnailUrl,
    title: String(meta.data.title),
    description: String(meta.data.description),
    date: String(meta.data.date)
  }
}

function getAllPostsMeta(fileNames: string[]): PostMeta[] {
  return fileNames.map(getPostMeta)
}

function getPostMeta(fileName: string): PostMeta {
  const id = removeMdExtension(fileName)
  const fileContents = readMarkdownFileAsString(fileName)

  const meta = getMetadata(fileContents)

  return {
    id,
    title: String(meta.data.title),
    description: String(meta.data.description),
    date: String(meta.data.date),
  }
}

function sortPostsByDate(posts: PostMeta[]): PostMeta[] {
  return posts.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

function removeMdExtension(fileName: string) {
  return fileName.replace(/\.md$/, '')
}

function readMarkdownFileAsString(fileName: string) {
  const fullPath = path.join(postsDirectory, fileName)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  return fileContents
}

async function convertMarkdownToHTML(markdown: string): Promise<string> {
  const processedContent = await remark()
    .use(html)
    .process(markdown)

  const contentHtml = processedContent.toString()

  return contentHtml
}
