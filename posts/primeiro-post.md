---
title: "Primeiro post do blog"
date: "2020-12-09"
---

Este é o primeiro post do blog. Atualmente estou usando **Next.js** com **Typescript** e acabei de refatorar o módulo responsável por converter os arquivos `.md` nos quais escrevo os posts em HTML.

Tentei ao máximo aplicar o *Clean Code*, separando em funções menores e mais reutilizáveis, e se algum dia eu resolver fazer testes unitários será mais fácil de escrever os testes, uma vez que a maioria das funções são puras (não dependem do mundo externo, como APIs, sistema de arquivo, etc).

Além disso pretendo mudar a conversão para HTML para o resultado ser *React*.

Os próximos passos que pretendo dar:

- Melhorar o design das páginas:
  - Layout geral
  - Design dos links
  - Design dos trechos de código
- Adicionar o componente tempo
- Gerar posts como componentes react
- Gerar páginas AMP
- Fazer geração de thumbnails com funções serverless
- Melhorar o uso do componente `<SEOHead />` para colocar as imagens geradas
