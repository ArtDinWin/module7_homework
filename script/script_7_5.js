console.log(`7.5 ООП в ES6. Задание 5`);
/* 
7.5 ООП в ES6 Задание 5.

Переписать консольное приложение из предыдущего юнита на классы.

Общие требования:

Имена классов, свойств и методов должны быть информативными;
Соблюдать best practices;
Использовать синтаксис ES6.
*/

// Использовался другой метод подсчета суммарной потребляемой мощности
const objTotalPower = {};

class DeviceES6 {
  constructor(name, model, installation, area, power, arrayGuaranty) {
    this.name = name;
    this.model = model;
    this.kindDevice = "Электроприбор";
    this.installation = installation;
    this.area = area;
    this["power consumption"] = power;
    this.enabled = false;
    this.arrayGuaranty = arrayGuaranty;
  }

  toggleDevice() {
    this.enabled = !this.enabled;
    if (this.enabled) {
      objTotalPower[this.name] = this["power consumption"];
      alert(`Устройство ${this.name} включили в сеть!`);
      return true;
    } else {
      delete objTotalPower[this.name];
      alert(`Устройство ${this.name} выключили из сети!`);
    }
    return false;
  }

  printTotalPower(obj = objTotalPower) {
    let arrValues = Object.values(obj);
    let totalPower = arrValues.reduce((sum, current) => sum + current, 0);
    let devices = arrValues.length;
    /*  Через цикл for ... in 
    let totalPower = 0, devices = 0;  
    for (let key in obj) {
      totalPower += obj[key];
      devices++;
    }*/
    if (totalPower > 99) {
      console.log(
        "В сеть подключено " +
          devices +
          " устройств. Расходуется " +
          totalPower / 1000 +
          " кВт в час электроэнергии"
      );
    } else if (totalPower > 0) {
      console.log(
        "В сеть подключено " +
          devices +
          " устройств. Расходуется " +
          totalPower +
          " Ватт в час электроэнергии"
      );
    } else {
      console.log(
        "Ни одно устройство не подключено. Электроэнергия не расходуется"
      );
    }
  }

  printDaysGuaranty() {
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
      daysGuaranty = Math.round(
        (finishGuaranty - today) / (60 * 60 * 24 * 1000)
      );
      console.log("Гарантия истекает через " + daysGuaranty + " дней");
      return daysGuaranty;
    } else if (finishGuaranty - today == 0) {
      console.log("Гарантия истекает сегодня");
      return 0;
    } else {
      daysGuaranty = Math.round(
        (today - finishGuaranty) / (60 * 60 * 24 * 1000)
      );
      console.log("Гарантия истекла " + daysGuaranty + " дней назад");
      return daysGuaranty;
    }
  }
}

class LightDeviceES6 extends DeviceES6 {
  constructor(
    name,
    model,
    installation,
    area,
    power,
    arrayGuaranty,
    lightArea,
    lightTemp
  ) {
    super(name, model, installation, area, power, arrayGuaranty);
    this.lightArea = lightArea;
    this.lightTemp = lightTemp;
    this.typeElectricDevice = "Cветовые электроприборы";
  }
  printLightType() {
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
  }
}

const microwave = new DeviceES6(
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
  [2020, 18, 10, 365 * 5]
);

const lamp = new LightDeviceES6(
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
