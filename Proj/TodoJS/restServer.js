// HTTP만으로 코드를 제작하면 이렇게 지저분해짐

const http = require('http');
const fs = require('fs').promises;

const users = {}; // 데이터 저장용

http.createServer(async (req, res) => {
  try {
    if (req.method === 'GET') { // CSS, JS 링크들 다 여기에 걸림
      if (req.url === '/') {
        const data = await fs.readFile('./index.html'); // html을 읽어서 전달
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); // Header파일에 이렇게 써라
        return res.end(data); // 응답 종료
      } else if (req.url === '/about') {
        const data = await fs.readFile('./about.html');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(data);
      } else if (req.url === '/users') {  // 사용자 가져오기
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });  // JSON형식으로 보냄
        return res.end(JSON.stringify(users));
      }
      
      
      // /도 /about도 /users도 아니면 CSS나 JS같은거 요청 처리
      try {
        const data = await fs.readFile(`.${req.url}`);
        return res.end(data);
      } catch (err) {
        // 주소에 해당하는 라우트를 못 찾았다는 404 Not Found error 발생
      }
    }
    
    else if (req.method === 'POST') {
      if (req.url === '/user') {  // POST/user 사용자 등록
        let body = '';
        // 요청의 body를 stream 형식으로 받음
        req.on('data', (data) => {
          body += data;
        });

        // 요청의 body를 다 받은 후 실행됨
        return req.on('end', () => {  // 입력이 다 끝나면
          console.log('POST 본문(Body):', body);
          const toDo = JSON.parse(body);


          const id = Date.now();
          users[id] = toDo;

          console.log(users[id]);

          res.writeHead(201, { 'Content-Type': 'text/plain; charset=utf-8' }); // 201을 보냄. 성공적으로 생성됐다는 의미.
          res.end('ok');
        });
      }
    }
    
    else if (req.method === 'PUT') {  // 데이터 치환
      if (req.url.startsWith('/user/')) { 
        const key = req.url.split('/')[2];
        let body = '';
        req.on('data', (data) => {
          body += data;
        });
        return req.on('end', () => {
          console.log('PUT 본문(Body):', body);
          users[key].toDo = JSON.parse(body).toDo;
          res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
          return res.end('ok');
        });
      }
    }
    
    else if (req.method === 'DELETE') {
      if (req.url.startsWith('/user/')) {
        const key = req.url.split('/')[2];
        delete users[key];
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        return res.end('ok');
      }
    }
    res.writeHead(404);
    return res.end('NOT FOUND');
  } catch (err) {
    console.error(err);
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(err.message);
  }
})
  .listen(8082, () => {
    console.log('8082번 포트에서 서버 대기 중입니다');
  });
