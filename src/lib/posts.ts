import fs from 'fs'
import path from 'path'
import getMatterMetadata from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

export interface PostMeta {
  id: string
  title: string,
  date: string
}

export interface Post extends PostMeta {
  contentHtml: string
}

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory)

  const allPostsData = getAllPostsData(fileNames)
  const sortedPostsData = sortPostsByDate(allPostsData)

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

export async function getPostData(id: string): Promise<Post> {
  const fileName = `${id}.md`
  const fileContents = readMarkdownFileAsString(fileName)

  const matterResult = getMatterMetadata(fileContents)
  const contentHtml = await convertMarkdownToHTML(matterResult.content)

  return {
    id,
    contentHtml,
    ...matterResult.data
  } as Post
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

function getAllPostsData(fileNames: string[]): PostMeta[] {
  return fileNames.map(fileName => {

    const id = removeMdExtension(fileName)
    const fileContents = readMarkdownFileAsString(fileName)

    const matterResult = getMatterMetadata(fileContents)

    return {
      id,
      ...matterResult.data
    } as PostMeta
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
