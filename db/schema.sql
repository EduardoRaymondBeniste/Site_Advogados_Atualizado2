CREATE DATABASE IF NOT EXISTS adv_turbo CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE adv_turbo;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(180) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('client', 'lawyer', 'admin') NOT NULL DEFAULT 'client',
  phone VARCHAR(40),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE clients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  company_name VARCHAR(255),
  document VARCHAR(30),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE lawyers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  oab VARCHAR(30),
  specialty VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  author_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  status ENUM('draft','published') NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES users(id)
);

CREATE TABLE comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  post_id INT NOT NULL,
  author_id INT NOT NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
  FOREIGN KEY (author_id) REFERENCES users(id)
);

CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  owner_id INT NOT NULL,
  due_date DATE NOT NULL,
  status ENUM('open','in_progress','done') NOT NULL DEFAULT 'open',
  note TEXT,
  FOREIGN KEY (owner_id) REFERENCES users(id)
);

CREATE TABLE appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  client_id INT NOT NULL,
  lawyer_id INT NOT NULL,
  scheduled_at DATETIME NOT NULL,
  channel VARCHAR(100) NOT NULL,
  notes TEXT,
  FOREIGN KEY (client_id) REFERENCES users(id),
  FOREIGN KEY (lawyer_id) REFERENCES users(id)
);

CREATE TABLE payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  method ENUM('hotmart','picpay','pix','cartao','boleto','banco') NOT NULL,
  reference VARCHAR(100),
  amount DECIMAL(11,2) NOT NULL,
  status ENUM('pending','paid','failed') NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE communications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sender_id INT NOT NULL,
  receiver_id INT NOT NULL,
  subject VARCHAR(200),
  message TEXT NOT NULL,
  channel ENUM('chat','email','task','file') DEFAULT 'chat',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sender_id) REFERENCES users(id),
  FOREIGN KEY (receiver_id) REFERENCES users(id)
);

CREATE TABLE contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(180) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE uploads (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  filename VARCHAR(255) NOT NULL,
  mime VARCHAR(80),
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO users (name, email, password, role) VALUES
('Eduardo Ramon Venini', 'eduardo@mail.com', '$2b$10$adt', 'admin'),
('Cliente Demo', 'cliente@mail.com', '$2b$10$adt', 'client'),
('Advogado Demo', 'advogado@mail.com', '$2b$10$adt', 'lawyer');

INSERT INTO posts (author_id, title, body, status) VALUES
(1, 'Adv Turbo apresenta nova plataforma', 'Conteúdo baseado no PDF cartao_eduardo.pdf e visão corporativa.', 'published');

INSERT INTO payments (user_id, method, reference, amount, status) VALUES
(2, 'hotmart', 'HT-0001', 147.00, 'paid'),
(2, 'pix', 'PIX-PULSAR', 497.00, 'pending');
