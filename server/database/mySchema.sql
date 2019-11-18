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
