console.log(`7.3 Прототип и конструктор объекта. Задание 3`);
/* 
7.3 Прототип и конструктор объекта. Задание 3
Написать функцию, которая создает пустой объект, но без прототипа.
*/

function createObject() {
  let object = Object.create(null);
  return object;
}

console.log(createObject());
