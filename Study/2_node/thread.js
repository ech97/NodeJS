const {
  Worker, isMainThread, parentPort, workerData,
} = require('worker_threads');


const max = 10_000_000;
const min = 2;
let primes = [];

function findPrimes(start, range) {
    let isPrime = true;
    const end = start + range;
    for (let i = start; i < end; i++) {
        for (let j = min; j < Math.sqrt(end); j++) {
            if (i !== j && i % j === 0) {
                isPrime = false;
                break;
            }
        }
    

    if (isPrime) { primes.push(i); }
    
    isPrime = true;
    }
}


if (isMainThread) {
    const threadsCount = 8;
    const range = Math.ceil((max - min) / threadsCount); // 내림
    const threads = new Set();
    
    let start = min;

    console.time('timer2');

    for (let i = 0; i < threadsCount - 1; i++) {
        const wStart = start;
        threads.add(new Worker(__filename, { workerData: { start: wStart, range }}));
        start += range; // start === worker에 각각 소수를 찾을 범위를 설정
    }

    threads.add(new Worker(__filename, { workerData: { start, range: range + ((max - min + 1) % threadsCount)}}));
    
    for (let worker of threads) {
        worker.on('error', (err) => {
            throw err;
        });

        worker.on('exit', () => {
            threads.delete(worker);
            if (threads.size === 0) {
                console.timeEnd('timer2');
                console.log(`소수의 개수: ${primes.length}`);
            }
        }); 

        worker.on('message', (msg) => {
            primes = primes.concat(msg);    // 작업물을 다 합쳐줘야함;
        })
    }
}

else {
    findPrimes(workerData.start, workerData.range);
    parentPort.postMessage(primes);
}





