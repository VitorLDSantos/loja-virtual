# Loja React

Catálogo de produtos em grade, com quantidade (− / +) em cada card, carrinho e finalização de compra.

## Como rodar
1. Instale o Node.js 18 ou superior.
2. Na pasta do projeto:
   ```
   npm install
   npm run dev
   ```
3. Abra o endereço mostrado no terminal (normalmente http://localhost:5173).

## Trocar as imagens
Em `src/data/produtos.js`, preencha o campo `imagem` de cada produto com a URL de uma foto.
Sem URL, o card mostra o emoji.

## Gerar versão para publicar
```
npm run build
```
Os arquivos ficam na pasta `dist`.
