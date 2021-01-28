const http = require('http');
const fs = require('fs').promises;

const server = http.createServer((req, res) => {	
    res.writeHead(200, { 'Content-Type': 'text/html; charset = utf-8' });
    fs.readFile('./index.html') // HTML 파일을 읽어서 전송
        .then( (data) => {
            console.log('html을 읽었습니다');
            return res.end(data);
        })
        .catch( (err) => {
            console.error(err);
            return res.end(err.message);
    });
})
    .listen(8080);

server.on('listening', () => {
    console.log('8080 포트에서 서버 대기 중입니다.');
});

server.on('error', (e) => {
    console.error(error);
})