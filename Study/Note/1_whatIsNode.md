

[자바스크립트 문법](ko.javascript.info)




# 노드의 정의

> Node는 서버인가?

- Node는 서버가 아닌 '런타임'이다.

  : 크롬 V8(자바스크립트 엔진)으로 빌드 된 **자바스크립트 런타임**




    > 런타임이란?
    
      : (쉽게 말하면) 실행기
    
        더이상 HTML에 종속되지 않고 실행될 수 있음

  




# 노드의 특성



## 이벤트

- 이벤트의 예: 클릭, 네트워크 요청, 타이머 등
- 이벤트 리스너: 이벤트를 등록하는 함수 (인터럽트 설정)
- 콜백 함수: 이벤트가 발생했을 때 실행될 함수


---


## 논블로킹 I/O

> 노드는 크게 "비동기면서 논블로킹", "동기면서 블로킹"으로 나뉜다.


---


## 프로세스 vs 스레드

- 프로세스: 운영체제에서 할당하는 작업의 단위, 프로세스 간 자원 공유 X

  > 프로그램 하나 실행하면, 프로세스는 하나만 뜸

- 스레드: 프로세스 내에서 실행되는 작업의 단위, 부모 프로세스 자원 공유

  > 프로세스 안에서 각자의 기능을 실행하는 단위. 마치 크롬내의 탭들과 유사


``` 노드는
Node.js의 스레드는 당연히 여러개(멀티)지만, 우리가 다룰 수 있는 스레드가 1개이기때문에, Node.js를 싱글스레드라 했음
```

> Node.js V14 부터, **멀티 스레드 사용 가능**
>
> 하지만, 아래의 이유로 **현업에서 멀티 스레드 기능은 이용할 일이 거의 없음**



### 멀티스레드

> 코딩이 상당히 어렵고, 처리 비용 증가

	### 싱글스레드

> 블로킹이 발생하는 경우, 나머지 작업은 모두 대기해야 함 == 비효율 발생

	### Node.js

​		> 주문을 다 받고, 번호표를 나눠주어 완료되면 알려주는 식

​			: **멀티스레드를 안하고**(어려우므로) 최대한 효율적으로 활용하기위해 Node.js를 이용


---


## Libuv

> 싱글스레드 비동기 I/O

 
---


## 서버로서의 노드

|            장점             |              단점               |
| :-------------------------: | :-----------------------------: |
|  컴퓨터 사용을 적게 사용함  |      적게 사용하는게 단점       |
| I/O 작업이 많은 서버로 적함 | CPU 작업이 많은 서버로는 부적함 |
|    자바스크립트를 사용함    |                                 |


---


## 노드의 작동방식

```
메모리 > 호출 스택(js) > 백그라운드(c++) > 테스크 큐(c++)  4단계로 구성
```

0. Anonymous 스택

1. 선언 된 함수를 메모리에 인스턴스

2. 

  1) setTimeOut()가 호출 스택에 올라가면, 백그라운드에 (타이머, 함수)가 올라감

  2) new Promise((resolve => {resolve('hi');})).then(console.log) 호출스택에 올라가면

  ​	then('실행이 다 되고나서 결과가 나왔을 때'라는 뜻)이 붙을때 백그라운드로 넘어감

3. 백그라운드에서는 명령어가 동시에 실행됨 (**멀티스레드**, c++로 구성)

4. 테스크 큐에 있는 명령들은 호출 스택이 다 **비워지고 나서야** 호출 스택에 올라감

   > 이때 Promise가 일반 호출 새치기함


---


# JavaScript 복습



## Const vs let

```
const는 뒤에 '='을 한번만 붙일 수 있음
```


---


## 함수호출

```
function_name() == function_name``
```


---


## Arrow Function

> Arrow Function은 Function을 대체할 수 없음
>
> - Function은 자신만의 **this**를 갖는데, Arrow Func.는 자신만의 this를 따로 **가지지 않음	**



- 객체 리턴의 경우

  ```javascript
  const obj = (x, y) => ({x, y})
  ```

  : 꼭 이렇게 소괄호를 쳐줘야, 엔진이 헷갈리지 않음


---


## 구조분해 할당

**Before**

```javascript
const example = {a: 123, b: {c: 135, d: 146}}
const a = example.a;
const d = example.b.d;
```

**After**

```javascript
const example = {a: 123, b: {c: 135, d: 146}}
const {a, b:{d}} = example;
console.log(a); // 123
console.log(d); // 146
```



**Before**

```javascript
arr = [1, 2, 3, 4, 5]
const x = arr[0]
const y = arr[1]
const z = arr[4]
```

**After**

```javascript
arr = [1, 2, 3, 4, 5]
const [x, y, , , z] = arr; // 자리가 똑같아야함!
```



**this가 있는 경우는 구조분해 할당이용 금지**


---


## Class

**Class Declaration**

 ```javascript
class Human {
  constructor(type = 'human') {
      this.type = type;
  }

  static isHuman(human) { // static은 굳이 생성되는 객체마다 따로 선언해줄 필요 없게 미리 박아두는것
      return human instanceof Human;
  }

  breathe() {
      alert('h-a-a-a-m');
  }
}
 ```

**Class Inheritance**

```javascript
// After
class Zero extends Human { // Class 상속
  constructor(type, firstName, lastName) {
    super(type);  // 부모의 type이 전달됨.
    super.breathe(); // 부모의 breathe()가 호출됨.
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
```


---


## Promise

**Promise**

```javascript
const condition = true;
const promise = new Promise((resolve, reject) => {
    if (condition) {
        resolve('성공');
    } else {
        reject('실패');
    }
});

promise
    .then((message) => {
        console.log(message);
    })
    .catch((error) => {
        console.error(error);
    })
```

> Callback 지옥 해결



**Async / Await**

```javascript
async function findAndSaveUser(Users) {
    let user = await.Users.findOne({});	// then을 사용하지 않고 그냥 기다리도록 설정
    user.name = 'zero';
    user = await user.save();
    user = await Users.findOne({gender: 'm'});
}
```

> Promise 지옥 해결

- async: Promise를 return
- await: then을 사용하지 않고 기다리게해줌

- **catch**가 없으므로 try...catch 사용


---


## AJAX

> 서버로 요청을 보내는 코드

- 라이브러리 없이는 브라우저가 지원하는 XMLHttpRequest 객체 이용
- AJAX 요청 시 Axios, fetch 라이브러리를 사용하는 게 편함.
- HTML에 아래 스크립트를 추가하면 사용할 수 있음.

``` HTML
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
	// 예제코드 삽입
</script>
```



**axios.get() 은 Promise를 지원하는 함수**

```javascript
axios.get('https://www.zerocho.com/api/get')
    .then((result) => {
        console.log(result);
        console.log(result.date);
    })
    .catch(console.log)
```



**따라서 async/await 사용가능**

```javascript
async() => { // async, await은 set!
    try {
        const result = await axios.get('https://www.zerocho.com/api/get')
        console.log(result);
        console.log(result.date);
    } catch (e) {
        console.log(e);
    }
}
```



**POST 요청을 하는 코드**

``` javascript
(async () => {
	try {
        const result = await axios.post('https://www.zerocho.com/api/post/json', {
            name: 'zerocho',
            birch: 1994,
        });
         console.log(result);
        console.log(result.date);
 	} catch (error) {
        console.error(error);
    }
})();
```



**form 태그에 담긴 데이터를 AJAX**

``` javascript
const formData = new FromData();
formData.append('name', 'zerocho');
formData.append('item', 'orange');
//...
//has: 데이터 존재 여부 확인
//get: 데이터 조회
//getAll: 데이터 모두 조회
//delete: 데이터 삭제
//set: 데이터 수정
```



**주소창에 한글 입력할 때**

```javascript
(async () => {
	try {
        const result = await axios.post(`https://www.zerocho.com/api/search/${encodeURIComponent('노드')}`
                                        // '노드' == %EB%85%B8%EB%93%9C
                                        // decodeURIComponent(''%EB%85%B8%EB%93%9C');
                                        //...
```

> encode**URI**Component에 감싸서 입력하는게 **안전함**

- URI = URL (Locate) + URN (Name)

  : 서버의 자원위치(URI): 파일위치(URL)



**HTML과 JS의 Data 교환**

``` 
data-user-job -> dataset.userJob (html -> js)

dataset.monthSalary = 10000 -> data-month-salary = "10000" (js -> html)
```



