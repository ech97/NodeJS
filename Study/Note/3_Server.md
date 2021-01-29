# 서버



## 클라이언트와 서버

> 1. 클라이언트가 서버로 요청(request)을 보냄
> 2. 서버는 요청을 처리
> 3. 처리 후 클라이언트로 응답(response)을 보냄

**서버가 알아들을 수 있게 약속(프로토콜) HTTP으로 요청해야함**



## 서버 만들기

``` javascript
const http = require('http');

const server = http.createServer((req, res) => {	
    // 얘도 Stream이므로, write, end와 같은 Event 존재
	res.write('<h1>Hello Node!</h1>');
	res.write('<p>Hello server</p>');
	res.end('<p>Hello Chan</p>');
})
	.listen(8080);	// 사용자의 요청을 받도록 대기

server.on('listening', () => {
    console.log('8080 포트에서 서버 대기 중입니다.');
});

server.on('error', (e) => {
    console.error(error);
})
```

또는

``` javascript
const http = require('http');

function onRequest(req, res) {
    res.write('<h1>Hello Node!</h1>');
	res.write('<p>Hello server</p>');
	res.end('<p>Hello Chan</p>');
}

const server = http.createServer(onRequest).listen(8080);

server.on('listening', () => {
    console.log('8080 포트에서 서버 대기 중입니다.');
});

server.on('error', (e) => {
    console.error(error);
})
```



> 클라이언트가 요청을 하면, 우리가 만든 이 서버로 요청이 옴
>
> 이제 우리가 요청을 받아서 답을 보내주거나, 거부하면 됨






---





## 포트	

> 포트 하나당 하나의 프로그램(리스너?) 생성가능

```javascript
const server = http.createServer((req, res) => {	
	res.write('<h1>Hello Node!</h1>');
	res.write('<p>Hello server</p>');
	res.end('<p>Hello Chan</p>');
})
	.listen(8080);

server.on('listening', () => {
    console.log('8080 포트에서 서버 대기 중입니다.');
});

server.on('error', (e) => {
    console.error(error);
})
```

> 이와 같이, 여러 포트로 프로그램을 따로 실행할 수 있음
>
> 	- http = 80
> 	- https = 443
> 	- MySQL = 330
> 	- Telnet = 23
> 	- FTP = 21





---





## HTML 제공



### HTML임을 알려주기

> Safari 같은 경우 res.write('<h1> Hello Node! </h1>') 를 문자열로 알아들을 수 있음
>
> 따라서, HTML 언어임을 명시하는 구문 추가

``` javascript
res.writeHead(200, { 'Content-Type': 'text/html; charset = utf-8' });
```

>  **text/html 로 HTML임을 알려줌**



### fs로 HTML 제공

>일일히 createServer()에 HTML을 넣어주는건 비효율적

```javascript
const http = require('http');
const fs = require('fs').promises;

const server = http.createServer((req, res) => {	
    try {	// 오류처리
    	res.writeHead(200, { 'Content-Type': 'text/html; charset = utf-8' });
        const data = await fs.readFile('./index.html'); // HTML 파일을 읽어서 전송
        res.end('data');
    } catch (err) {
        console.error(err);
        res.writeHead(200, {'Content-Type': 'text/plain; charset = utf-8' });
        res.end(err.message);
    }
})
	.listen(8080);

server.on('listening', () => {
    console.log('8080 포트에서 서버 대기 중입니다.');
});

server.on('error', (e) => {
    console.error(error);
})
```





---





## REST API

``` 
localhost/profile/login/site
```

> 위와 같이 클라이언트는 주소를 통해 서버에게 무언가를 요구

**어떤식으로 요구하면 되는지 정하는게 REST API**



### REST API

```
/user이면 사용자 정보에 관한 정보를 요청하는 것

/post면 게시글에 관련된 자원을 요청하는 것
```



### HTTP 요청 메서드

```javascript
GET: 서버 자원을 가져오려고 할 때 사용
// 유저의 정보를 가져와라 == GET/user

POST: 서버에 자원을 새로 등록하고자 할 때 사용(또는 뭘 써야할 지 애매할 떄)
// 사용자를 등록해라 == POST/user
// 로그인해라 == (애매하니깐) POST/..
// 현금보내라 == (애매하니깐) POST/..

PUT: 서버의 자원을 요청에 들어있는 자원으로 치환하고자 할 때 사용
// 전체수정

PATCH: 서버 자원의 일부만 수정하고자 할 때 사용
// 부분수정

DELETE: 서버의 자원을 삭제하고자 할 때 사용
```





### RESTful

> REST API를 사용한 주소 체계를 이용하는 서버
>
> - 동사가 들어가면 안됨 (그럼 login은??)
> - 기타 등등..

완벽하게 지키는 서버는 거의 없음

**따라서, 잘 알아볼 수 있게만 설정하는걸 추천**



### 링크

> a,  link, script 태그는 결국 서버에 GET 요청을 보내는 것.
>
> **request에 대한 응답을 만들어 줘야함**

``` html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>RESTful SERVER</title>
  <link rel="stylesheet" href="./restFront.css" />   CSS도 GET 요청 보내는 중
</head>
<body>
<nav>
  <a href="/">Home</a>								 a 태그는 GET 요청
  <a href="/about">About</a>
</nav>
<div>
  <h2>소개 페이지입니다.</h2>
  <p>사용자 이름을 등록하세요!</p>
</div>
</body>
</html>
```





---





## Header

> 데이터들에 대한 데이터

**HTML에 대한 정보 전달**

- 몇시에 보냈는지
- 텍스트 타입
- URL
- 성공(200) / 실패(404) / [링크 참조](https://developer.mozilla.org/ko/docs/Web/HTTP/Status)

- 허용하는 압축 파일들

- User-Agent