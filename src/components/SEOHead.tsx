import React from 'react'
import Head from 'next/head'

const siteName = "Guilherme Balog Gardino"
const siteUrl = "https://guilhermebalog.ga/"
const defaultImage = "https://avatars0.githubusercontent.com/u/38947601?v=4 "

interface Props {
  pageTitle?: string,
  pageDescription: string,
  pagePath?: string,
  imageUrl?: string,
}

const SEOHead: React.FC<Props> = ({ pageTitle = siteName, pageDescription, pagePath, imageUrl = defaultImage }) => {
  return (
    <Head>
      <title>{pageTitle && `${pageTitle} | `}{siteName}</title>

      <meta name="description" content={pageDescription} />

      <meta itemProp="name" content={pageTitle} />
      <meta itemProp="description" content={pageDescription} />
      <meta itemProp="image" content={imageUrl} />

      <meta property="og:locale" content="pt_BR" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={`${siteUrl}${pagePath}`} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={imageUrl} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={imageUrl} />
    </Head>
  )
}

export default SEOHead
