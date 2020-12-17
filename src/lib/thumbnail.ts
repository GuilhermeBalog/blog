import {
  createCanvas,
  loadImage,
  registerFont,
  Canvas,
  CanvasRenderingContext2D
} from 'canvas'

import path from 'path'

interface ThumbnailOptions {
  title: string
  authorName?: string,
  avatarUrl?: string,
  backgroundColor?: string,
  titleColor?: string,
  footerBackgroundColor?: string,
  authorNameColor?: string
}

loadFonts()

let canvas: Canvas | null

export async function getThumbnail({
  title,
  authorName = "Guilherme Balog Gardino",
  avatarUrl = "https://avatars0.githubusercontent.com/u/38947601?v=4",
  backgroundColor = "#00bcd4",
  titleColor = "#fff",
  footerBackgroundColor = "#fff",
  authorNameColor = "#262626"
}: ThumbnailOptions) {

  canvas = createThumbnailCanvas()
  const context = canvas.getContext('2d')
  drawBackground(context, backgroundColor)
  const titleX = drawTitleAndReturnXPosition(context, title, titleColor)

  await drawFooter(
    context,
    titleX,
    authorName,
    avatarUrl,
    footerBackgroundColor,
    authorNameColor
  )

  return canvas
}

function loadFonts() {
  const fontsPath = path.join(process.cwd(), 'src', 'fonts')

  registerFont(
    path.join(fontsPath, `Rubik-Black.ttf`),
    {
      family: 'Rubik Title',
      weight: 'bold'
    }
  )

  registerFont(
    path.join(fontsPath, `Rubik-Medium.ttf`),
    {
      family: 'Rubik Footer',
      weight: 'normal'
    }
  )
}

function createThumbnailCanvas() {
  if (canvas) return canvas

  const thumbWidth = 1200
  const thumbHeight = 600

  return createCanvas(thumbWidth, thumbHeight)
}

function drawBackground(
  context: CanvasRenderingContext2D,
  backgroundColor: string
) {

  context.fillStyle = backgroundColor
  context.fillRect(0, 0, context.canvas.width, context.canvas.height)
}

function drawTitleAndReturnXPosition(
  context: CanvasRenderingContext2D,
  title: string,
  color: string
) {
  context.font = '70px Rubik Title'
  context.textAlign = 'left'

  const maxWidth = context.canvas.width * 0.8
  const lineHeight = 80

  const x = (context.canvas.width - maxWidth) / 2
  let y = lineHeight

  const words = title.split(" ")
  let line = "";

  // https://codepen.io/nishiohirokazu/pen/jjNyye?editors=0010
  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + " ";
    const metrics = context.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > maxWidth && i > 0) {
      drawText(line, x, y)
      line = words[i] + " ";
      y += lineHeight;

    } else {
      line = testLine;
    }
  }

  drawText(line, x, y)

  return x;

  function drawText(text: string, x: number, y: number) {
    context.fillStyle = 'rgba(0, 0, 0, 0.3)'
    context.fillText(text, x, y + 7)

    context.fillStyle = color
    context.fillText(text, x, y)
  }
}

async function drawFooter(
  context: CanvasRenderingContext2D,
  leftMargin: number,
  name: string,
  avatarUrl: string,
  backgroundColor: string,
  color: string
) {
  const footerHeight = 100

  drawFooterBackground(context, footerHeight)
  await drawFooterContent(context, footerHeight, leftMargin, name, avatarUrl)

  function drawFooterBackground(context: CanvasRenderingContext2D, footerHeight: number) {
    context.fillStyle = backgroundColor

    const x = 0
    const y = (context.canvas.height - footerHeight)
    const footerWidth = context.canvas.width

    context.fillRect(x, y, footerWidth, footerHeight)
  }

  async function drawFooterContent(
    context: CanvasRenderingContext2D,
    footerHeight: number,
    leftMargin: number,
    name: string,
    avatarUrl: string
  ) {
    context.font = '30px Rubik Footer'
    context.textAlign = 'left'

    const spacingBetweenNameAndImage = 30

    const nameMeasure = context.measureText(name)

    const nameCenterY = (context.canvas.height - footerHeight) + (nameMeasure.actualBoundingBoxAscent / 2) + (footerHeight / 2)

    const nameHeight = nameMeasure.actualBoundingBoxAscent + nameMeasure.actualBoundingBoxDescent

    const nameActualY = nameCenterY - nameMeasure.actualBoundingBoxAscent

    const imageWidth = 75
    const imageHeight = 75
    const imageX = leftMargin
    const imageY = nameActualY - (imageHeight / 2) + (nameHeight / 2)

    const profileImage = await loadImage(avatarUrl)
    context.drawImage(profileImage, imageX, imageY, imageWidth, imageHeight)

    const textX = leftMargin + imageWidth + spacingBetweenNameAndImage
    const textY = nameCenterY

    context.fillStyle = 'rgba(0, 0, 0, 0.3)'
    context.fillText(name, textX, textY + 0)

    context.fillStyle = color
    context.fillText(name, textX, textY)
  }
}
