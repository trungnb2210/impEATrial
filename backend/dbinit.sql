CREATE TABLE IF NOT EXISTS restaurants (
  restaurant VARCHAR(100) PRIMARY KEY,
  latitude FLOAT8 NOT NULL,
  longitude FLOAT8 NOT NULL,
  opening_time_weekday TIME,
  closing_time_weekday TIME,
  opening_time_weekend TIME,
  closing_time_weekend TIME,
  tags VARCHAR(200)
);

CREATE TABLE IF NOT EXISTS menuitems (
  restaurant VARCHAR(100),
  item VARCHAR(200),
  category VARCHAR(20) CONSTRAINT food_drink CHECK (category IN ('Food', 'Drink')),
  price FLOAT8 CONSTRAINT non_negative_price CHECK (price >= 0),
  gluten_free BOOLEAN,
  vegetarian BOOLEAN,
  vegan BOOLEAN,
  tags VARCHAR(200),
  nutrients VARCHAR(200),
  date DATE,
  PRIMARY KEY(restaurant, item),
  FOREIGN KEY(restaurant) REFERENCES restaurants(restaurant)
);