# Como gerar ícones PNG para iOS

## Problema
iOS não suporta SVG para ícones de apps. É necessário usar PNG.

## Solução Rápida (Recomendada)

### Opção 1: RealFaviconGenerator (Mais Fácil)

1. Acesse: https://realfavicongenerator.net/
2. Clique em "Select your Favicon image"
3. Faça upload do arquivo `public/app-icon.svg`
4. Clique em "Generate your Favicons and HTML code"
5. Baixe o pacote gerado (Favicon package)
6. Extraia os arquivos `.png` na pasta `public/`
7. Atualize o `index.html` com os caminhos corretos

### Opção 2: CloudConvert (Online)

1. Acesse: https://cloudconvert.com/svg-to-png
2. Faça upload do `public/app-icon.svg`
3. Configure para gerar os seguintes tamanhos:
   - 512x512 → salve como `public/icon-512.png`
   - 192x192 → salve como `public/icon-192.png`
   - 180x180 → salve como `public/apple-touch-icon.png`

### Opção 3: Usar ferramenta local

Se você tem ImageMagick instalado:

```bash
cd public
convert app-icon.svg -resize 512x512 icon-512.png
convert app-icon.svg -resize 192x192 icon-192.png
convert app-icon.svg -resize 180x180 apple-touch-icon.png
```

## Atualizar index.html

Depois de gerar os PNGs, atualize o `index.html`:

```html
<!-- Ícone do navegador -->
<link rel="icon" type="image/png" href="/icon-192.png" />

<!-- Ícones Apple -->
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
```

## Atualizar manifest.webmanifest

```json
{
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    },
    {
      "src": "/apple-touch-icon.png",
      "sizes": "180x180",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

## Testar

1. Faça o build: `npm run build`
2. Faça o deploy
3. No iPhone, acesse o site
4. Toque em Compartilhar > Adicionar à Tela de Início
5. O ícone verde com carrinho deve aparecer!

## Status Atual (Temporário)

Atualmente, o app está usando um emoji 🛒 como fallback temporário até que os PNGs sejam gerados.
