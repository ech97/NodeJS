
// Promise 기반 라이브러리이므로, async/await도 사용가능
axios.get('https://www.zerocho.com/api/get')
    .then((result) => {
        console.log(result);
        console.log(result.date);
    })
    .catch(console.log)



async () => {
    try {
        const result = await axios.get('https://www.zerocho.com/api/get');
        console.log(result);
        console.log(result.date);
    } catch (e) {
        console.log(e);
    }

}


(async () => {
	try {
        const result = await axios.post('https://www.zerocho.com/api/post/json', {
            name: 'zerocho',
            birch: 1994,
        });
        console.log(result);
        console.log(result.date);
 	} catch(e) {
        console.error(e);
    }
})();