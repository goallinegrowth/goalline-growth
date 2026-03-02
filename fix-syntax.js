const fs = require('fs');
let code = fs.readFileSync('app.jsx', 'utf8');
code = code.replace(/<>/g, '<React.Fragment>');
code = code.replace(/<\/>/g, '</React.Fragment>');
code = code.replace(/cur\?\.multi/g, '(cur && cur.multi)');
fs.writeFileSync('app.jsx', code);
console.log('Fixed syntax!');
