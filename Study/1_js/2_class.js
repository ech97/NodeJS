// // Before
// var Human = function(type) {
//   this.type = type || 'human';
// };

// Human.isHuman = function(human) {
//   return human instanceof Human;
// }

// Human.prototype.breathe = function() {
//   alert('h-a-a-a-m');
// };


// After
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





// // Before
// var Zero = function(type, firstName, lastName) {
//   Human.apply(this, arguments);
//   this.firstName = firstName;
//   this.lastName = lastName;
// };

// Zero.prototype = Object.create(Human.prototype);
// Zero.prototype.constructor = Zero; // 상속하는 부분
// Zero.prototype.sayName = function() {
//   alert(this.firstName + ' ' + this.lastName);
// };
// var oldZero = new Zero('human', 'Zero', 'Cho');
// Human.isHuman(oldZero); // true



// After
class Zero extends Human { // Class 상속
  constructor(type, firstName, lastName) {
    super(type);  // 부모의 type이 전달됨.
    super.breathe(); // 부모의 breathe()가 호출됨.
    this.firstName = firstName;
    this.lastName = lastName;
  }
}