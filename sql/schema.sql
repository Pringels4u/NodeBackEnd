-- Minimal database schema for NodeBackEnd
-- Run this in TablePlus / DBngin / herd to create the tables and some seed data

CREATE DATABASE IF NOT EXISTS nodebackend;
USE nodebackend;

CREATE TABLE IF NOT EXISTS afdelingen (
  id INT AUTO_INCREMENT PRIMARY KEY,
  naam VARCHAR(255) NOT NULL,
  leerjaren INT NOT NULL
);

CREATE TABLE IF NOT EXISTS leiding (
  id INT AUTO_INCREMENT PRIMARY KEY,
  voornaam VARCHAR(255) NOT NULL,
  achternaam VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  afdeling_id INT,
  FOREIGN KEY (afdeling_id) REFERENCES afdelingen(id) ON DELETE SET NULL
);

-- Seed some data
INSERT INTO afdelingen (naam, leerjaren) VALUES
  ('Speelclub', 1),
  ('Rakkers', 2),
  ('Kapoenen', 3)
ON DUPLICATE KEY UPDATE naam = VALUES(naam);

INSERT INTO leiding (voornaam, achternaam, email, afdeling_id) VALUES
  ('Jan', 'Peeters', 'jan.peeters@example.com', 1),
  ('Marie', 'Janssens', 'marie.janssens@example.com', 2)
ON DUPLICATE KEY UPDATE email = VALUES(email);
