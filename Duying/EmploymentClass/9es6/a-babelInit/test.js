/*
 * @Author: @Guojufeng 
 * @Date: 2019-05-04 16:37:16 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-05-17 09:28:48
 */
/* symbol */
var a = {},b = Symbol('123'),c=Symbol('123');
a[b] = 'b';
a[c] = 'c';
console.log(a)
/* 箭头函数 */
// this的实际应用：
function ThisFun(){
  this.button = document.getElementById('button');
  this.count = 0;
  /* this.button.onclick = function(){
    console.log(this);//普通函数中，this指向button这个dom对象本身
  } */
  this.button.onclick = () => {
    this.count ++;//箭头函数中，this指向实例化对象thisFun
    console.log(this.count);
  }
}
let thisFun = new ThisFun();
/* 解构赋值 */
// 解构赋值转化伪数组为数组：
function args(){
  console.log(arguments);
  let oldArr = Array.prototype.slice.call(arguments);//之前的写法
  let newArr = [...arguments];//解构赋值的方式[...arguments]
  let newArr2 = Array.from(arguments);//Array.from
  console.log(oldArr,newArr,newArr2);
}
args(1,2,3,23,2,42,34);
// 
let [des01,des02,des03] = [1,true,null];
console.log(des01,des02,des03);
// 甚至再骚的写法都行
let [de01,[de02,de03]] = ['hah',[1,2]];
console.log(de01,de02,de03);
/* // 第一种写法,解构一个对象(先声明,后赋值;) */
let obj = {
  name: 'xing.org1^',
  age: 12,
  sex: 'female',
  address: 'BeiJing·CHINA',
  hobby: ['one','two',{
    newObj: 'i am a Object'
  }]
}
let name,age;
({name,age} = obj);//这里注意小括号的包裹，否则会有报错
console.log(name,age);

/* // 第二种写法，直接解构一个对象(连带着声明变量+赋值) */
let {sex, address} = obj;
console.log(sex,address);

/* // 第三种写法，解构对象时，声明的变量不必和对象属性同名 */
let {name:　myName, sex:　mySex} = obj;
console.log(myName,mySex);

/* // 第四种写法，三的基础上，加入 默认赋值 做法 */
let {age:　myAge, myPhone = 110} = obj;
console.log(myAge,myPhone);


/* // 第五种写法，解构数组 - 把数组当对象解构 */
let {0: myOne, 1: myTwo, length: myLength} = obj.hobby;
console.log(myOne,myTwo,myLength);
// 这里比较特殊，记下含义：因为数组也是一种特殊的对象，上边obj.hobby这个数组写成完全对象的格式时，形如下边这么写：
/* obj.hobby = {
  0: 'one',
  1: 'two',
  length: 2
} */
// 所以按照第三种写法开始的那种键值对赋值的方式来写，就有了0、1、length对应新定义的myOne,myTwo,myLength三个变量这种写法了，实际上是把0，1，length当做数组里边对象的key值来获取的。


/* // 第六种写法，解构数组  - 数组就要数组的姿态，用数组的形式结构数组 */
let [myArrOne,myArrTwo] = obj.hobby;
console.log(myArrOne,myArrTwo)

/* // 第七种写法，解构数组中的对象 */
let [,,{mynewObj}] = obj.hobby;
console.log(mynewObj)
// 特殊一点，这里注意let后边数组里的前两个逗号","的写法，因为数组中的前两个并不是我们要结构的目标对象，所以定义两项空内容。

/* // 第八种写法，同样将数组中的对象key重命名并结构 */
let [,,{newObj: myNewObj}] = obj.hobby;
console.log(myNewObj)
// 在第七种写法的基础上，结合第三种写法，举一反三的写法。

/* 第九种写法 函数形参的解构赋值*/
function add([x, y]){
  return x + y;
}

add([1, 2]); // 3

function move({x = 0, y = 0} = {}) {
  return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]
/*解构赋值  常用场景，结构ajax请求返回来的数据 */



// babel默认不转换API
// 比如Object.assign、promise这些

// Object.assign(目标对象,克隆对象1，克隆对象2);
// 会以浅克隆的方式，将后边对象的值复制到目标对象里边去。
// import '@babel/polyfill';
var assign1 = {
  a: 1,
  b: {
    c: 2
  }
}
var assign2 = {
  aa: 1,
  bb: {
    cc: 2
  }
};

var newObj = Object.assign({}, assign1, assign2);
console.log(newObj);
newObj.aa = 3;
newObj.b.c = '浅拷贝';
console.log(assign1, assign2, newObj);

// es7 - 扩展运算符
var obj1 = {
  name: 'xing.org1',
  age: 18,
  IDCard: {
    num: 123123812412,
    address: 'BeiJing CHINA'
  }
}
var obj2 = {
  ...obj1,
  sex: 'female'
}
console.log(obj2);
obj2.IDCard.address = 'HangZhou CHINA';
console.log(obj1.IDCard.address, obj2); // 浅拷贝

// es6扩展运算符浅克隆

var arrA = [{

  a: 1,

  b: 1

}, 'b', {

  a: 2,

  b: 2

}];

var arrB = [...arrA]; //相当于[].concat(arrA);

console.log(arrB)

arrB[0].a = '浅克隆？';

arrB[1] = '浅克隆！';

console.log('arrA：', arrA, 'arrB', arrB);

var oUl = document.getElementsByTagName('ul')[0],
  oLi = oUl.getElementsByTagName('li');
/* for (var i = 0; i < oLi.length; i++) {
  oLi[i].onclick = (function(j){
    return function(e){
      console.log(j,e);
    };
  })(i)
} */
for (let i = 0; i < oLi.length; i++) {
  oLi[i].onclick = function (e) {
    console.log(i, e);
  };
}

let arr = [];

for (let i = 0; i < oLi.length; i++) {
  arr[i] = function () {
    console.log(i);
  };
}
let aaa = [];
for (let i = 0; i < 10; i++) {
  aaa[i] = function () {
    console.log(i);
  };
}
aaa[6](); // 6


let a = 21;
console.log(a);
a = 2;
const b = 13;
// b = 3;
console.log(b);

console.log(tisheng);
let tisheng = 'let和const没有变量声明提升';


let zanshi = 'Temporal Dead Zone';

if (true) {
  let zanshi = 'Temporal Dead Zone';
  console.log(zanshi);
}

console.log(zanshi);
console.log(window.zanshi);
if (true) {
  let test = 1;
  console.log(test); {
    console.log(test);
    let test = 2; {
      let test = 3;
    }
  }
}
// 扩展运算符
var arg2 = [1, 2, 3, 4, 5];

console.log(...arg2); // 读，展开数组成散列的项

function test(a, b, ...args) {
  console.log(a, b, args); //写，把散列的项写入到一个数组中
}
test(1, 2, 3, 4, 5);

function getSum(...arr) {
  // let arr = Array.prototype.slice.call(arguments);
  return arr.reduce((pre, cur) => {
    return pre += cur;
  }, 0);
}
console.log(getSum(1, 2, 3, 4, 6));

// 数组合并

// 读操作 - 数组合并

let arr1 = [1, 2, 3, 4],
  arr2 = [6, 7, 8, 9],
  newArr = [...arr1, ...arr2];
console.log(newArr);
// 相当于下边的写法：
let concatArr = [].concat(arr1, arr2);
console.log(concatArr);