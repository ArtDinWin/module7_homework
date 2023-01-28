console.log(`7.3 Прототип и конструктор объекта. Задание 2`);
/* 
7.3 Прототип и конструктор объекта. Задание 2
Написать функцию, которая принимает в качестве аргументов строку и объект, а затем проверяет есть ли у переданного объекта свойство с данным именем. Функция должна возвращать true или false.
*/

const car = {
  country: "Germany",
  year: "2013",
  brand: "Volkswagen",
};

function checkStrInProperty(str, obj) {
  for (let key in obj) {
    if (str == key) {
      return true;
    }
  }
  return false;
}

console.log(checkStrInProperty("brand", car));
