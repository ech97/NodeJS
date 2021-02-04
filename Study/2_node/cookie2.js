const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');


const parseCookies = (cookie = '') => // Webstorm-4bfc3d32=2d880e13-9e43...; mycookie=test 이런식으로 쿠키가 들어감
    cookie
        .split(';')
        .map(v => {
            return v.split('=')
        })
        .reduce((acc, [k, v]) => {
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        }, {}); 

http.createServer(async (req, res) =>  {
    const cookies = parseCookies(req.headers.cookie);

    // 주소가 /login으로 시작하는 경우
    if (req.url.startsWith('/login')) {
        const { query } = url.parse(req.url);   // parse가 반환한 구조를 분해. 바로 query라는 요소를 추출하겠다.
        const { name } = qs.parse(query);   // 바로 name이라는 요소를 추출하겠다.
        
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 5);   // 쿠키 유효시간 설정

        res.writeHead(302, {    // 리다이렉션을 위한 302
            Location: '/',  // '/'로 리다이렉투
            'Set-Cookie' : `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
        });
        res.end();
    
    // 키값이 name인 쿠키가 있는경우
    } else if (cookies.name) {
        res.writeHead(200, { 'Content-Type' : 'text/plain; charset=utf-8'});
        res.end(`${cookies.name}님 안녕하세요`);
    } else {
        try {
            const data = await fs.readFile('./index.html');
            res.writeHead(200, { 'Content-Type' : 'text/html; charset=utf-8'});
            res.end(data);
        } catch (err) {
            res.writeHead(500, {'Content-Type' : 'text/plain; charset=utf-8'});
            res.end(err.message);
        }
    }

})
    .listen(8084, () => {
        console.log('8084번 포트에서 서버 대기 중입니다!');
    });