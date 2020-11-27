import Head from 'next/head'
import React from 'react'

const siteName = "Guilherme Balog Gardino"
const siteUrl = "https://www.guilhermebalog.ga/"
const defaultImage = "https://instagram.fssz1-1.fna.fbcdn.net/v/t51.2885-19/s150x150/100369734_268412654301075_233554944257425408_n.jpg?_nc_ht=instagram.fssz1-1.fna.fbcdn.net&_nc_ohc=AdLlU9czyjgAX_FUC9E&_nc_tp=25&oh=71352096e18ea6760fe12dd6d63cd838&oe=5FD650C7"

export default function SEOHead({ pageTitle, pageDescription, pagePath = "", imageUrl = defaultImage }) {
  return (
    <Head>
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
