
let idx = 0;


async function getUser() {
    try {
        const res = await axios.get('/users');
        const users = res.data;
        const toDoList = document.querySelector(".toDoList");
        
        console.dir(users);



        toDoList.innerHTML = '';

        const span = document.createElement('span');
        const editBtn = document.createElement('button')
        const removeBtn = document.createElement('button');
        
        const userLi = document.createElement('li');

        Object.keys(users).map((key) => {
            
            span.innerText = users[key];
            editBtn.innerText = 'edit✔';
            removeBtn.innerText = 'delete✔';
            
            
            
            editBtn.addEventListener('click', async () => {
                const toDo = prompt('edit your to Do');
                if(!toDo) {
                    return alert('plz write me your to Do');
                }
                
                try {
                    await axios.put('/user/' + key, { toDo });
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
            
            userLi.appendChild(span);
            userLi.appendChild(editBtn);
            userLi.appendChild(removeBtn);
            toDoList.appendChild(userLi);
            
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