const faker = require('faker');
const models = require('../models/index.js');

let convert = (obj) => {
  let date = JSON.stringify(obj);
  let saveDate = date.slice(1, 11);
  let saveTime = ' ' + date.slice(12, 20);
  let converted = saveDate + saveTime;
  return converted;
};
const seedBTSData = () => {


  for (let i = 0; i < 21; i++) {
    let fakeStart = faker.date.between('2019-11-18', '2020-12-30');
    let fakeEnd = faker.date.between(`${fakeStart}`, '2020-12-30');
    let start = convert(fakeStart);
    let end = convert(fakeEnd);
    let event = ['Golden Disc Awards', 'BTS "LOVE YOURSELF in Seoul" Movie Concert (Premier Worldwide)', 'Grammy Awards', 'BTS World Tour “LOVE YOURSELF” in Hongkong (Asia World Expo Arena)', 'BTS World Tour “LOVE YOURSELF” in Bangkok (Rajamangala International Stadium)', 'BTS Global Press Conference Map Of The Soul Persona 11 AM KST (Live at BangtanTV)', ' BS Music Bank (Comeback)', 'MCountdown – BTS Comeback Special', 'SBS Inkigayo ‘Super Concert’ in Gwangju', 'BTS WORLD TOUR ‘LOVE YOURSELF: SPEAK YOURSELF’ in New Jersey (Metlife Stadium)', 'Britain’s Got Talent (UK Time)', 'BTS WORLD TOUR ‘LOVE YOURSELF: SPEAK YOURSELF’ in London (Wembley Stadium)', 'BTS Festa : By Jin (Audio)', 'BTS Festa : BTS Choreography Video #2 (Video)', 'BTS 5TH MUSTER ‘MAGIC SHOP’ in Busan (Busan Asiad Aux Stadium)', 'BTS World Released', 'BTS World Tour : Love Yourself in Seoul at JTBC', 'BRING THE SOUL: THE MOVIE Released', 'KIIS Jingle Bell (US Time)', 'BTS JAPAN OFFICIAL FANMEETING VOL.5 ‘MAGIC SHOP’ in Osaka', 'KBS Music Festival (KBS Gayo Daechukjae)'];
    models.post(start, end, event[i], () => { console.log('holaaaa'); });
  }

};

const seedData = () => {

  for (let i = 0; i < 30; i++) {
    let fakeStart = faker.date.between('2019-10-03', '2020-12-30');
    let fakeEnd = faker.date.between(`${fakeStart}`, '2020-12-30');
    let start = convert(fakeStart);
    let end = convert(fakeEnd);
    let event = faker.hacker.phrase();
    models.post(start, end, event, () => { console.log('moo'); });
  }

};

seedData();
seedBTSData();