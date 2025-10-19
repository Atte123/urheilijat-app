-- Luo tietokanta ja taulu urheilijoille
CREATE DATABASE IF NOT EXISTS urheilijat CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE urheilijat;

CREATE TABLE IF NOT EXISTS athletes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  nickname VARCHAR(100) DEFAULT '',
  birthdate DATE NOT NULL,
  weight DECIMAL(6,2) NOT NULL,
  image_url VARCHAR(500) DEFAULT '',
  sport VARCHAR(100) NOT NULL,
  achievements TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_sport (sport),
  INDEX idx_name (last_name, first_name)
);

-- Esimerkkidata
INSERT INTO athletes (first_name, last_name, nickname, birthdate, weight, image_url, sport, achievements) VALUES
('Iivo', 'Niskanen', '', '1992-01-12', 70.0, 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Iivo_Niskanen_2019.jpg', 'Maastohiihto', 'Olympiakulta 2018, 2022; MM-mitaleita'),
('Emma', 'Terho', 'Laaksonen', '1981-04-17', 68.0, 'https://upload.wikimedia.org/wikipedia/commons/9/93/Emma_Terho_2010.jpg', 'Jääkiekko', 'Olympiapronssia 1998, 2010; MM-pronssia');
