// child_process는 NodeJS말고 다른 프로세스 하나를 더 띄우는거. 여기선 터미널


const exec = require('child_process').exec;
// 혹은 const { exec } = require(child_process);

var process = exec('cmd /c chcp 65001>nul && dir')   // 터미널에 dir이라 치는것과 같음.

// 콘솔에 나온 데이터를 문자로 직접 받아줘야함
process.stdout.on('data', function (data){
    console.log(data.toString);
});

// 에러 처리
process.stderr.on('data', function (data) {
    console.error(data.toString('utf8'));
});