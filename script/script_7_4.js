console.log(`7.4 ООП в JS. Задание 4`);
/* 
Задание 4.

Реализуйте следующее консольное приложение подобно примеру, который разбирался в видео. Реализуйте его на прототипах.
Определите иерархию электроприборов. Включите некоторые в розетку. Посчитайте суммарную потребляемую мощность всех включенных приборов (передайте аргумент). 
Таких приборов должно быть как минимум два (например, настольная лампа и компьютер). Выбрав прибор, подумайте, какими свойствами он обладает.

План:
Определите родительскую функцию с методами, которые включают/выключают прибор из розетки.
Создайте делегирующую связь [[Prototype]] для двух конкретных приборов.
У каждого из приборов должны быть собственные свойства и, желательно, методы, отличные от родительских методов.
Создайте экземпляры каждого прибора.
Выведите в консоль и посмотрите на результаты работы, можете гордиться собой :)
Общие требования:

Имена функций, свойств и методов должны быть информативными
Соблюдайте best practices:
использование camelCase нотации для переменных и методов, PascalCase для названия функций-конструкторов и классов;
информативные имена (а не a, b);
четкая связь между классом и его экземплярами (класс описывает множество, а экземпляр — конкретную реализацию);
использование синтаксиса es6 (кроме функции-конструкторов) и так далее.
Удачи!
*/
let totalPower = 0;
function Device(name, model, installation, area, power, arrayGuaranty) {
  this.name = name;
  this.model = model;
  this.kindDevice = "Электроприбор";
  this.installation = installation;
  this.area = area;
  this["power consumption"] = power;
  this.enabled = false;
  this.arrayGuaranty = arrayGuaranty;
}

Device.prototype.toggleDevice = function () {
  this.enabled = !this.enabled;
  if (this.enabled) {
    if (totalPower) {
      totalPower += this["power consumption"];
    } else {
      totalPower = this["power consumption"];
    }
    alert(`Устройство ${this.name} включили в сеть!`);
    return true;
  } else {
    totalPower -= this["power consumption"];
    alert(`Устройство ${this.name} выключили из сети!`);
  }
  return false;
};

// Упрощенный вариант подсчета электроэнергии, второй вариант решения в следующем задании 5 про классы
Device.prototype.printTotalPower = function () {
  if (totalPower > 99) {
    console.log(
      "Расходуется " + totalPower / 1000 + " кВт в час электроэнергии"
    );
  } else if (totalPower > 0) {
    console.log("Расходуется " + totalPower + " Ватт в час электроэнергии");
  } else {
    console.log(
      "Ни одно устройство не подключено. Электроэнергия не расходуется"
    );
  }
};

Device.prototype.printDaysGuaranty = function () {
  let dateStartGuaranty = new Date(
    this.arrayGuaranty[0],
    this.arrayGuaranty[1],
    this.arrayGuaranty[2]
  );
  let today = new Date();
  today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  dateStartGuaranty = dateStartGuaranty.getTime();
  const guaranty = this.arrayGuaranty[3] * 60 * 60 * 24 * 1000;
  const finishGuaranty = new Date(dateStartGuaranty + guaranty);
  let daysGuaranty = 0;

  if (finishGuaranty - today > 0) {
    daysGuaranty = Math.round((finishGuaranty - today) / (60 * 60 * 24 * 1000));
    console.log("Гарантия истекает через " + daysGuaranty + " дней");
    return daysGuaranty;
  } else if (finishGuaranty - today == 0) {
    console.log("Гарантия истекает сегодня");
    return 0;
  } else {
    daysGuaranty = Math.round((today - finishGuaranty) / (60 * 60 * 24 * 1000));
    console.log("Гарантия истекла " + daysGuaranty + " дней назад");
    return daysGuaranty;
  }
};

function LightDevice(
  name,
  model,
  installation,
  area,
  power,
  arrayGuaranty,
  lightArea,
  lightTemp
) {
  Device.call(this, name, model, installation, area, power, arrayGuaranty);
  this.typeElectricDevice = "Cветовые электроприборы";
  this.lightArea = lightArea;
  this.lightTemp = lightTemp;
}

// LightDevice.prototype = new Device();
LightDevice.prototype = Object.create(Device.prototype);
LightDevice.prototype.constructor = LightDevice;
LightDevice.prototype.printLightType = function () {
  let lightType;
  const selfLightTemp = +this.lightTemp;
  switch (true) {
    case selfLightTemp > 2700 && selfLightTemp <= 3500:
      lightType = "Тёплый белый. Оттенок - желтоватый";
      break;
    case selfLightTemp > 3500 && selfLightTemp <= 4000:
      lightType = "Естественный белый";
      break;
    case selfLightTemp > 4000 && selfLightTemp <= 5000:
      lightType = "Холодный белый";
      break;
    case selfLightTemp > 5000 && selfLightTemp <= 6500:
      lightType = "Дневной нейтральный, белый";
      break;
    case selfLightTemp > 6500:
      lightType = "Холодный дневной. Оттенок - голубоватый";
      break;
    default:
      lightType = false;
  }
  if (lightType) {
    return "Цвет свечения: " + lightType;
  } else {
    return "Цвет свечения определить не получилось";
  }
};

const microwave = new Device(
  "Микроволновка",
  "Scarlett SC-MW9020S05M",
  "Настольный",
  "Кухня",
  700,
  [2021, 02, 10, 24 * 30]
);

const pc = new microwave.constructor(
  "Ноутбук Asus",
  "Intel i5, Win 10",
  "Переносное устройство",
  "Спальная",
  80,
  [2018, 18, 10, 365 * 5]
);

const lamp = new LightDevice(
  "Светильник",
  "E27",
  "Настольный",
  "Кухня",
  60,
  [2018, 18, 10, 365 * 3],
  3,
  6500
);
console.log(microwave);
console.log(pc);
console.log(lamp);

pc.toggleDevice();
lamp.toggleDevice();
lamp.printTotalPower();
