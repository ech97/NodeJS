const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');


const parseCookies = (cookie = '') => // Webstorm-4bfc3d32=2d880e13-9e43...; mycookie=test 이런식으로 쿠키가 들어감
    cookie
        .split(';')
        .map(v => {
            console.log(v.split('='));
            return v.split('=')
        })
        .reduce((acc, [k, v]) => {
            console.log(k.trim());
            acc[k.trim()] = decodeURIComponent(v);
            console.log(acc);
            return acc;
        }, {}); 

http.createServer(async (req, res) =>  {
    const cookies = parseCookies(req.headers.cookie);

    // 주소가 /login으로 시작하는 경우
    if (req.url.startsWith('/login')) {
        const { query } = url.parse(req.url);
        const { name } = qs.parse(query);
        
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 5);   // 쿠키 유효시간 설정

        res.writeHead(302, {    // 리다이렉션을 위한 302
            Location: '/',
            'Set-Cookie' : `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
        });
        res.end();
    } else

})
    .listen(8084, () => {
        console.log('8084번 포트에서 서버 대기 중입니다!');
    });