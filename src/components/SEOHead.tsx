import React, { ReactNode } from 'react'
import Head from 'next/head'

const siteName = "Blog do Guilherme Balog"
const siteUrl = "https://blog.guilhermebalog.ga/"
const defaultImage = "https://blog.guilhermebalog.ga/base_icon.png"

interface Props {
  pageTitle: string,
  pageDescription: string,
  pagePath: string,
  imageUrl: string,
  children?: ReactNode;
}

const SEOHead = ({ pageTitle, pageDescription, pagePath, imageUrl, children }: Props) => {
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

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={imageUrl} />

      {children}
    </Head>
  )
}

SEOHead.defaultProps = {
  pageTitle: siteName,
  pagePath: "",
  imageUrl: defaultImage,
}

export default SEOHead
