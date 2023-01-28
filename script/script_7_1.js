console.log(`7.3 Прототип и конструктор объекта. Задание 1`);
/* 
7.3 Прототип и конструктор объекта. Задание 1
Написать, функцию, которая принимает в качестве аргумента объект и выводит в консоль все ключи и значения только собственных свойств. Данная функция не должна возвращать значение.
*/

const car = {
  country: "Germany",
  year: "2013",
  brand: "Volkswagen",
};

const truck = Object.create(car);
truck.model = "Transporter T5";
truck.color = "Black";
truck["load capacity"] = 3000;

function showOwnProperty(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      console.log("Ключ: " + key + ", значение: " + obj[key]);
    }
  }
}

showOwnProperty(truck);
