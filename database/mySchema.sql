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

-- mysql -u root -p   < /Users/silkyh13/hrr41-mvp/database/mySchema.sql

