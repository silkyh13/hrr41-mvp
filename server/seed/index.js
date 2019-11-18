const faker = require('faker');
const models = require('../models/index.js');

let convert = (obj) => {
  let date = JSON.stringify(obj);
  let saveDate = date.slice(1, 11);
  let saveTime = ' ' + date.slice(12, 20);
  let converted = saveDate + saveTime;
  return converted;
};
const seedData = () => {

  for (let i = 0; i < 10; i++) {
    let fakeStart = faker.date.between('2019-11-18', '2020-12-30');
    let fakeEnd = faker.date.between(`${fakeStart}`, '2020-12-30');
    let start = convert(fakeStart);
    let end = convert(fakeEnd);
    let event = faker.random.words();
    models.post(start, end, event, () => { console.log('moo'); });
  }

};
seedData();