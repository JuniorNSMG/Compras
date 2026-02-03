const fs = require('fs');
const https = require('https');

// Usar Iconify API para baixar o ícone como PNG
const sizes = [192, 512, 180, 152, 120];
const iconName = 'fluent-emoji:shopping-cart';

console.log('Gerando ícones PNG para iOS...');
console.log('Nota: Este script precisa de uma ferramenta externa ou você pode');
console.log('usar o site: https://realfavicongenerator.net/');
console.log('Upload o SVG app-icon.svg para gerar todos os tamanhos necessários');

