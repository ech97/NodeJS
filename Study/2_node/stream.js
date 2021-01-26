const fs = require('fs');
const zlib = require('zlib');

const readStream = fs.createReadStream('./asdf.txt', { highWaterMark: 16});

const zlibStream = zlib.createGzip(); // 스트림 압축

const writeStream = fs.createWriteStream('./asdf.txt.gz');  // 압축된 파일을 스트림으로 쓰기

readStream.pipe(zlibStream).pipe(writeStream); // .on이 아닌 pipe로 이을 수 있음