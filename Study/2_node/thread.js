const {
    Worker, isMainThread, parentPort, workerData
} = require('worker_threads');



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
                console.log("Job Done");
            }
        });
    }
}

else {  // worker thread 일 시작
    const data = workerData; // 객체
    parentPort.postMessage(data.start + 100);
}