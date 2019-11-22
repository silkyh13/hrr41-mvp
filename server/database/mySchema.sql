DROP DATABASE IF EXISTS calendar;
CREATE DATABASE calendar;
USE calendar;

create table schedule (
  id 	INT UNIQUE NOT NULL AUTO_INCREMENT,
  event_start DATETIME,
  event_end DATETIME,
  event_description	TEXT NOT NULL,
  PRIMARY KEY(id)
);

-- mysql -u root -p   < /Users/silkyh13/hrr41-mvp/server/database/mySchema.sql

-- 5 Jan Golden Disc Awards
insert into schedule (event_start, event_end, event_description) values ("2020-01-05 08:00:00", "2020-01-05 10:00:00", "Golden Disc Awards")
insert into schedule (event_start, event_end, event_description) values ("2020-03-09 08:00:00", "2020-03-09 10:00:00", "Suga Birthday");

insert into schedule (event_start, event_end, event_description) values ("2020-01-18 08:00:00", "2020-01-18 10:00:00", "J-Hope Birthday");
insert into schedule (event_start, event_end, event_description) values ("2020-09-01 08:00:00", "2020-09-01 10:00:00", "Jungkook Birthday");
insert into schedule (event_start, event_end, event_description) values ("2020-09-12 08:00:00", "2020-09-12 10:00:00", "RM Birthday");
insert into schedule (event_start, event_end, event_description) values ("2020-10-13 08:00:00", "2020-10-13 10:00:00", "Jimin Birthday");
insert into schedule (event_start, event_end, event_description) values ("2020-12-04 08:00:00", "2020-12-04 10:00:00", "Jin Birthday");
insert into schedule (event_start, event_end, event_description) values ("2020-12-30 08:00:00", "2020-12-30 10:00:00", "V Birthday");
insert into schedule (event_start, event_end, event_description) values ("2020-12-04 08:00:00", "2020-12-04 10:00:00", "2020 MAMA");