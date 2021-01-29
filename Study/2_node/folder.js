const fs = require('fs').promises;

fs.copyFile('asdf.txt', 'asdf2.txt')	// 이전 readStream.pipe(writeStream)과 같음
	.then( () => {console.log('복사 완료')
                 return fs.rmdir('./folder', (err) => {
                     console.log(err, '엘레렐레레레ㅔㄹ');
                 })
                 })
	.catch( (e) => console.error(e) );