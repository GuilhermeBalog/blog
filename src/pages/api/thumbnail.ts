import { NextApiRequest, NextApiResponse } from "next";
import { getThumbnail } from "../../lib/thumbnail";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const query = req.query

    const title = query.title as string | undefined;
    const titleColor = query.title_color as string | undefined;
    const backgroundColor = query.bg as string | undefined;

    const avatarUrl = query.avatar as string | undefined;
    const authorName = query.author as string | undefined;
    const authorNameColor = query.author_color as string | undefined;
    const footerBackgroundColor = query.footer_bg as string | undefined;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' })
    }

    const thumbnailCanvas = await getThumbnail({
      title,
      titleColor,
      backgroundColor,
      avatarUrl,
      authorName,
      authorNameColor,
      footerBackgroundColor,
    })

    res.statusCode = 200

    res.setHeader('Content-Type', `image/png`)
    /*res.setHeader(
      'Cache-Control',
      'public, immutable, no-transform, s-maxage=31536000, max-age=31536000'
    )*/

    res.end(thumbnailCanvas.toBuffer())

  } catch (e) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'text/html')
    res.end('<h1>Internal Error</h1><p>Sorry, there was a problem</p>')
    console.log(e)
  }
}
