---
title: "Como gerar thumbnails automaticamente com Node.js"
description: "Uma conversa sobre OG Tags, canvas, thumbnails e mais."
date: "2020-12-17"
---

Nesse post vou contar como surgiu a ideia do [thumbnail-generator](https://github.com/GuilhermeBalog/thumbnail-generator) e de onde tirei inspirações para a implementação, além de, claro, um pequeno tutorial pra vocês!

## Motivação

Durante a construção deste blog, estou sempre pensando em SEO, e entre as tags que são usadas estão as [Open Graph Tags](https://tableless.com.br/utilizando-meta-tags-facebook/), ou simplesmente OG Tags. Elas são utilizadas para definir como deve aparecer o preview do seu site ao compartilhar o link nas redes sociais, como Facebook, Twitter, Discord, etc.

![Preview do compartilhamento da Home](/assets/posts/og-home-preview.png)

E seria interessante que cada post tivesse, ao invés da minha foto, uma imagem única, que chamasse a atenção para, mas ao mesmo tempo ter que criar uma imagem manualmente para cada vez que fosse escrever iria com certeza dificultar a produtividade.

## Inspirações

Então lembrei de duas coisas que entrei em contato recentemente:

- O [REHeader](https://reheader.glitch.me/), que gera automaticamente um header para você usar no [README de perfil](https://docs.github.com/pt/free-pro-team@latest/github/setting-up-and-managing-your-github-profile/managing-your-profile-readme) no Github
- [Este vídeo](https://www.youtube.com/watch?v=qvetoR6V5ic) da Rocketseat, que mostra a implementação de um "Thumbnail as a Service" (TaaS?), de onde veio a inspiração de implementar a funcionalidade aqui no blog

No vídeo, a implementação utiliza a biblioteca [Puppeteer](https://pptr.dev/), que basicamente manipula um browser de forma *headless* (sem mostrar a interface gráfica). Assista o vídeo se quiser fazer esta implementação, mas decidi fazer uma implementação um pouco diferente.

Fiquei bastante curioso sobre como REHeader fazia a geração das imagens, então parti para uma pequena investigação com o inspecionar elemento do navegador. Passando o mouse em cima da imagem que vai se modificando, pude ver que se tratava de um [canvas](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Canvas).

![Canvas do REHeader](/assets/posts/reheader-canvas.png)

Por um momento fiquei muito feliz, pois já havia mexido com canvas quando fiz um [Campo Minado](https://guilhermebalog.ga/minesweeper/), mas lembrei de um detalhe: o thumbnail-generator roda no Node, enquanto o canvas e outros elementos HTML estão disponíveis apenas no javascript que roda no browser. Porém, como já era de se esperar, achei uma biblioteca que resolve o problema: a [node-canvas](https://www.npmjs.com/package/canvas), uma implementação do canvas no ambiente Node.

E enquanto procurava por essa biblioteca, achei [esse post do Flavio Copes](https://flaviocopes.com/canvas-node-generate-image/) utilizando a biblioteca para o mesmo objetivo. Com isso já temos todas as inspirações, agora é só juntar as peças.

## Tutorial de Implementação!

Agora sim, vamos à implementação! Vou utilizar o [yarn](https://yarnpkg.com/), mas se quiser, pode utilizar o [npm](https://www.npmjs.com/). A única dependência que vai ser utilizada é a `node-canvas`.

Para iniciar, entramos na pasta do projeto e rodamos os seguintes comandos:

```bash
npm init -y
npm install canvas
```

Com a biblioteca instalada, bora codar!

Primeiro, importamos o método `createCanvas` de dentro do `canvas` e também os módulos `fs` e `path` para salvar a imagem.

```js
const { createCanvas } = require('canvas')
const fs = require('fs')
const path = require('path')
```

Agora podemos criar nosso canvas com o método que importamos. O formato recomendado para as OG Images é **1200x600**.

```js
const width = 1200
const height = 600
const canvas = createCanvas(width, height)
```

Com o canvas "em mãos", podemos começar a desenhar. Para isso precisamos obter o contexto 2D e usar ele como um pincel. Quando trabalhamos com o canvas, a ideia normalmente é preparar as ferramentas e depois usá-las. Pensando nisso, vamos pintar o fundo com um cinza escuro e escrever o famoso **Hello World** em branco no meio da tela. Definimos o preenchimento para a cor em hexadecimal e usamos método `fillRect` para pintar toda a tela. Depois preparamos a ferramenta de texto definindo a fonte, o alinhamento e redefinindo a cor de preenchimento para branco para finalmente escrevemos o texto no meio da tela.

```js
const context = canvas.getContext('2d')

context.fillStyle = '#2f2f2f'
context.fillRect(0, 0, width, height)

const text = 'Hello World'
context.font = 'bold 70px Arial'
context.textAlign = 'center'
context.fillStyle = '#fff'
context.fillText(text, width/2, height/2)
```

Nesse momento você pode brincar a vontade, mudar cores colocar formas, imagens, e muito mais, qualquer coisa que foi possível fazer com o canvas.

Agora é só salvar o conteúdo do canvas. Para isso utilizamos o método `toBuffer()` que transforma o seu desenho em um *buffer*, que basicamente é o conteúdo do arquivo `.png` que será salvo. Para saber em que local salvar o arquivo, utilizamos o método `path.join()` para juntar `__dirname` (que é o caminho até a pasta atual) com o nome de arquivo`'result.png'`. Já temos o caminho do arquivo e o conteúdo, então basta salvar utilizando o método `fs.writeFileSync()`

```js
const destinationFile = path.join(__dirname, 'result.png')
const pngBuffer = canvas.toBuffer('image/png')

fs.writeFileSync(destinationFile, pngBuffer)
```

Prontinho! Para deixar mais legal podemos envolver o código em uma função que receba o título da thumbnail como parâmetro pra deixar mais reutilizável. O código final ficou assim:

```js
const { createCanvas } = require('canvas')
const fs = require('fs')
const path = require('path')

function generateThumbnail(title) {
  const width = 1200
  const height = 600
  const canvas = createCanvas(width, height)

  const context = canvas.getContext('2d')

  context.fillStyle = '#2f2f2f'
  context.fillRect(0, 0, width, height)

  context.font = 'bold 70px Arial'
  context.textAlign = 'center'
  context.fillStyle = '#fff'
  context.fillText(title, width/2, height/2)

  const destinationFile = path.join(__dirname, 'result.png')
  const pngBuffer = canvas.toBuffer('image/png')

  fs.writeFileSync(destinationFile, pngBuffer)
}
```

Para implementar no blog, segui o vídeo que citei apenas trocando o retorno da API pelo `pngBuffer`. Você pode conferir o [código fonte do blog](https://github.com/GuilhermeBalog/blog) para ver como ficou!

## Conclusão

Desenvolver esse código foi uma experiência muito boa, por estar adaptando várias soluções que encontrei por aí, e foi bem desafiador deixar no estilo que eu queria de forma flexível, como você pode ver na minha [implementação final](https://github.com/GuilhermeBalog/thumbnail-generator) e provavelmente seria mais fácil utilizar a implementação com o Puppeteer, para ter todas as vantagens do CSS e seu sistema de posicionamento, mas decidi encarar o desafio.

Agora ao compartilhar um post você verá essa linda thumbnail:

![Exemplo de Preview](/assets/posts/og-post-preview.png)

Continua acompanhando o blog para mais códigos loucos e aproveita e compartilha o post com um amigo pra testar a thumbnail você mesmo ;)
