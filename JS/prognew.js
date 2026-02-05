function add(a, b) { return a + b;
}
let result = add(10, 20); console.log("Result:", result); class Person {
constructor(name, age) { this.name = name; this.age = age;
}


show() {
console.log(this.name + " is " + this.age + " years old");
}
}
const p1 = new Person("RISHABH SINGH YADAV", 20); p1.show();
const numbers = [1, 2, 3];
const newNumbers = [...numbers, 4, 5]; console.log("Numbers:", newNumbers); 