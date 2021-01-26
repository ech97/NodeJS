var relationship1 = {
    name: 'zero',
    friends: ['nero', 'hero', 'xero'],
    logFriends: function () {
        var that = this;    // 함수마다 자신만의 This를 가지고있기 때문에, 부모의 this를 물려주기위해 변수에 저장함.
        this.friends.forEach(function (friend) {
            console.log(that.name, friend); // 부모에 저장된 this안에 있는 name을 불러옴.
        });
    },
};

relationship1.logFriends();


var relationship2 = {
    name: 'zero',
    friends: ['nero', 'hero', 'xero'],
    logFriends: function () {
        //var that = this;    
        this.friends.forEach(friend => {
            console.log(this.name, friend); // Arrow Func.를 이용하게 되면, 부모의 this를 그냥 바로 사용가능
        });
    },
};

relationship2.logFriends();



button.addEventListner('click', (e) => {    // eventListner은 기본적으로 e를 인자로 받음 (그냥 그럼!)
    console.log(this.textContent)   // 이렇게 하면 this는 블록 밖의 this를 가르켜서 실행 X
})

button.addEventListner('click', function(e) {
    console.log(this.textContent)   // 이처럼 본인을 선택할 수 있는 this를 선언하기 위해선, function()을 사용해야함
})