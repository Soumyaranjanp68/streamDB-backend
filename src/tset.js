
//  function fn(){
//     var a =10;
//    }
// fn();
// // console.log();


// console.log(fn(5,8));

// num1=3;
// function cal() {
// num1=6;
// num2=5;
// num3=num2*num1;
// console.log(num3);
// }
// cal();

// let age = 18

// function checkAge(data) {
//     if (data >  age) {
//     console.log("You are an adult!");
//     } else if (data ===  age) {
//     console.log("You are still an adult.");
//     } else {
//     console.log(`Hmm.. You don't have an age I guess`);  //data < age
//     }
//    }
   
//    checkAge(18);


// let  person = {
//     name: "Akash",
//     mobile: 999999999,
//     address: {
//         pincode: 1234,
//         city: "gurgaon",
//         state: "haryana",
//         emails: ["asd@gmail.com", "abc@yahoo.com", "rty@hotmail.com"],
//     },
// };

// let person1 = {...person}
// person1.name = "rahul";
// person1.address.pincode = 4567


// console.log(person);
// console.log(person1);


// function abc(){
//     let a = 22
// }
// let a = 12

// abc();
// console.log(a);

let obj = {
    age:22
}
function f(obj){
  obj.city = "kolkata"
}
f(obj)
console.log(obj);