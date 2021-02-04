
let idx = 0;


async function getUser() {
    try {
        const res = await axios.get('/users');
        console.dir(res);

        const users = res.data;

        console.dir(users);

        const toDoList = document.querySelector(".toDoList");
        
        toDoList.innerHTML = '';

        
        
        Object.keys(users).map((key) => {
            
            const li = document.createElement('li');
            const span = document.createElement('span');
            const editBtn = document.createElement('button')
            const removeBtn = document.createElement('button');
            
            let imsi = users[key];
            span.innerText = imsi.toDo;
            editBtn.innerText = 'edit✔';
            removeBtn.innerText = 'delete✔';
            
            
            
            editBtn.addEventListener('click', async () => {
                const toDo = prompt('edit your to Do');
                if(!toDo) {
                    return alert('plz write me your to Do');
                }
                
                try {
                    await axios.put('/user/' + key, { toDo, idx });
                    getUser();
                } catch (e) {
                    console.error(e);
                }
            });
            
            removeBtn.addEventListener('click', async () => {
                try {
                    await axios.delete('/user/' + key);
                    getUser();
                } catch (e) {
                    console.error(e);
                }
            });
            
            li.appendChild(span);
            li.appendChild(editBtn);
            li.appendChild(removeBtn);
            toDoList.appendChild(li);
            
        });
    } catch (e) {
        console.error(e);
    }
}

window.onload = getUser;

document.getElementById('toDoForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const toDoInput = document.querySelector('input');

    const toDo = toDoInput.value;
    if (!toDo) {
        return alert('write your to Do!');
    }
    try {
        await axios.post('/user', { toDo, idx });
        idx++;
        getUser();
    } catch (err) {
        console.error(err);
    }
    toDoInput.value = '';
})