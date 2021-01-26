# Node.JS 객체

>**추가적인 API는 [링크](https://nodejs.org/dist/latest-v15.x/docs/api/) 참조**



## 모듈 만들기

``` javascript
// var.js
const odd = '홀수';
const even = '짝수';

module.exports = {
    odd : odd,	// odd: 생략가능
    even : even, // even: 생략가능
};	// Array도 전달 가능

// 또는
exports.odd = odd;
exports.even = even;
```

> exports === module.exports **(참조관계)** === {}
>
> exports와 module.exports가 같이 선언되거나 **함수**를 넣게되는 경우 **참조관계가 깨짐!**
>
> --> 먼저 선언된 export가 무시됨

``` javascript
// func.js
const value = require('./var.js');	// 객체 전달
console.log(value.odd);
console.log(value.even);

	// 구조분해
	const {odd, even} = require('./var.js');
	function checkOddOrEven(number) {
        if (number % 2) {
            return odd;
        } else {
            return even;
        }
    }

	module.exports = checkOddOrEven;
```

``` javascript
// index.js
const {odd, even} = require('./var.js');
const checkNumber = require('./func.js');

console.log(checkNumber(10));
```





**JS와 Node.JS의 Module 문법이 다름**

> Node.JS의 Module가 먼저 생기고, 이후에 JavaScript의 Module이 생김.

``` javascript
// Node.JS

// 1.js
module.exports = ...;

// 2.js
const ... = require('./1.js');
```

```javascript
// JS

// 1.js
export default ...;

// 2.js
import ${변수명} from './1.js';
```

※ 둘이 완전히 같지는 않으므로, 사용에 주의!





### Require

> require 모듈

- require.main

  > 우리가 실행한거

- require.cache

  >한번 읽은 require은 cache에 저장됨
  >
  >-> 두번째로 부를때부턴 cache에서 불러옴

  ``` javascript
  // 이런식으로 사용할 수 있으나, 위험해서 사용하지 않음
  require.cache['절대 경로'].exports.odd
  ```

**가장 위에 써놓을 필요는 없음 (!= import는 항상 위에 써야함)**





### 순환참조

``` javascript
// dep1.js
require('./dep2');
module.exports = { ... };
                 
// dep2.js
const a = require('./dep1');
console.log(a)	// {}
```

> 위와같은 경우, 순환참조를 막기위해 한쪽의 require를 빈 객체 **{}**로 만들어 줌





---





## global

```javascript
globalThis	// 웹에서의 window 객체와 동일
```



```javascript
// global 생략가능

global.setTimeout(),

global.require()

global.module.exports()

global.console.log()
```

> global 속성에 값을 대입하면 다른 파일에서도 사용 가능 (**안좋은 습관**)



### console 객체

```javascript
console.log()

console.dir // 객체 로딩에는 dir이 좋음

console.time('id') // console.timeEnd('id')

console.error()

console.trace() // 함수안에서 사용하면, 현재 호출 스택 확인 가능 

console.table() // 표 형식으로 깔끔하게 보여줌
```





### Timer 메서드

> set 메서드에 clear 메서드가 대응 됨.
>
> :: set 메서드의 리턴 값(아이디)을 clear 메서드에 넣어서 취소

```javascript
const ${변수명} = setTimeout(Func, ms)

const ${변수명} = setInterval(Func. ms)

const ${변수명} = setImmediate(Func) // [백그라운드 -> 테스크 큐 -> 호출 스택] 순서이므로, 
									// 중간에 취소 가능
```

```javascript
// clear를 사용해서 명령 취소 가능

clearTimeout(${변수})

clearInterval(${변수})

clearImmediate(${변수})
```





---





## this

``` javascript
console.log(this); // 웹에서는 최상위 객체. window를 가르킴

console.log(this === module.exports); // Anonymous(전역스코프)에 있는 this는 !== global

function a() {  // function에서 this는 global
    console.log(this === global);
}
a();
```





___





## Process

```javascript
const process = require('process');

process.version

process.arch // 프로세스 아키텍쳐

process.platform

process.pid

process.uptime()

process.execPath // 노드의 경로

process.cwd() // 실행되는 위치

process.cpuUsage()

process.exit() // 프로세스 종료
  // process.exit(1) // 프로세스를 종료하며, 오류가 있음을 알리고 싶을 때 사용
  // process.exit(0) // 프로세스 종료
  
process.nextTick() // Promise와 동일하게, 테스크 큐에서 호출 스택으로 넘어갈 때 우선권 존재
```





### process.env

> 시스템 환경변수가 들어있는 객체
>
> - 환경변수: 비밀키(데이터베이스의 비밀번호, 서드파티 앱 키 등) 보관하는 용도

 ``` javascript
const secretId = process.env.SECRET_ID;
const secretCode = process.env.SECRET_CODE;
 ```

대놓고 코드에 쓴다면 털릴 위험이 있으니깐, 환경변수 이용



#### 환경변수를 조작하여 스레드, 메모리량 조절 가능

``` javascript
NODE_OPTIONS = --max-old-space-size = 8192 // 메모리가 부족할때 늘릴 수 있음
UV_THRADPOOL_SIZE = 8	// 복잡한 작업을 진행할 때, 사용할 스레드를 늘릴 수 있음
```





---





## OS

> process와 일부 비슷

```javascript
const os = require('os');

os.homedir()

os.tmpdir()

os.cpus()

os.freemem()

os.totalmem()

os.release() // OS의 버전

...
```





----





## Path

> 경로 관련 API

``` javascript
//double underline == 'do''under' == 던더

console.log(__filename) // 현재 파일 경로

console.log(__dirname); // 현재 폴더 경로
```



> OS마다 다른 경로이름 문제를 해결

```javascript
c:\\	// window
c:/ 	// POSIX == Linux + Mac
```



**path를 사용하면 다음과 같이 변경 **

```javascript
const path = require('path');

// 상대경로 우선시
path.join(__dirname, '/var.js');  // 절대경로로 써있어도 자동으로 ./var.js로 바뀜
// './nodejs-book/lecture/var.js'

// 절대경로 우선시
path.resolve(__dirname, '/var.js'); // 절대경로가 써있으면, 앞에 __dirname은 무시해버림
```



```javascript
path.dirname(__filename)	// 파일이 있는 곳의 폴더명 추출

path.extname(__filename)	// 확장자 추출

path.basename(__filename)	// 이름 + 확장자

path.basename(__filename, path.extname(__filename))	// 이름

path.parse(__filename)	// 파일 경로 분해

path.format({
  dir: 'C:\\...',
  name: 'path',
  ext: '.js',
})	// 파일 경로 병합

path.normalize('지저분한 경로명')	// 파일 경로 '표준화'

path.join(__dirname, '..', '..', '/users', '.', 'chanhyun')	// 부모의 부모로 올라가

...
```

 



---





## URL

```
naver.com?page=3&limit=10&category=nodejs&...
```

> 이런식으로, ? 뒤에 나오는게 data를 객체로 바꿔주는 모듈이 searchParams (whatWG), queryString (node)





---





## 암호



### 해시

> 암호는 복호가 가능한데, 해시는 복호가 불가능함. 암호화만 가능
>
> > 비밀번호는 암호화가 아님. 해시 기법을 사용한 것임



#### 해시 알고리즘

> md5, sha1, sha256, sha512, pbkdf2, bcrypt
>
> - md5, sha1은 취약점 발견됨
> - bcrypt는 Node에서 지원안함



#### 인코딩 알고리즘

> base64, hex, latin1 ...



#### 해시 생성

**createHash(사용할 알고리즘) / update(변환할 문자열) / digest(인코딩 알고리즘)**

````javascript
const crypto = require('crypto');

crypto.createHash('sha512').update('비밀번호').digest('base64');
````





### 양방향 암호화

``` 
암호학에 대한 지식없이는 사용이 어려우므로 **crypto-js** 모듈을 사용하는걸 추천
```

 

#### 대칭형 암호화 (AES, ...)

> 암호화할 때와 복호화 할 때 같은 Key를 사용해야 함 (**취약함**)



#### 비대칭 암호화 (RSA, ...)

> 암호화 할 때의 Key와 복호화 할 때의 Key가 다른 경우





---





## Util



### deprecated

>  함수를 잘못만들었을 때, 해당 함수를 **그냥 지워버리게 된다면**, 기존에 해당 함수를 사용하던 모든 프로그램이 **고장**나버림

```javascript
const util = require('util');

const dontUseMe = util.deprecate((x, y) => {
	console.log(x + y);
}, 'dontUseMe 함수는 deprecated 되었으니, 더 이상 사용하지 마세요!');
```



### promisify

> 아직 Node에서는 Promise를 지원하지 않는 경우가 많아, Callback을 사용해야하는데, 이때 쓸 수 있는 Util

```javascript
const util = require('util');

const randomPromise = util.promisify(콜백함수);

randomPromise(인자)
	.then(console.log)
	.catch(console.log)
	// ...
```

**※ 하지만 CallBack이 (error, data) 형식이어야 함**





---





## 멀티스레드

> Main Thread와 Worker Thread 구별

```javascript
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

if (isMainThread) {
    const threads = new Set(); // 집합(배열) 생성

    threads.add(new Worker(__filename, {
        workerData: { start: 1 },
    }));
   
    threads.add(new Worker(__filename, {
        workerData: { start: 2 },
    }));
   
    threads.add(new Worker(__filename, {
        workerData: { start: 3 },
    }));


    for (let worker of threads) {
        worker.on('massage', (value) => console.log('워커로부터', value));
        worker.on('exit', () => {
            threads.delete(worker);
            if (threads.size === 0) {
                console.log("모든 워커 종료!");
            }
        });
    }
}

else {  // worker thread 일 시작
    const data = workerData; // 객체
    parentPort.postMessage(data.start + 100);
}
```

