
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'store_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function initializeDatabase() {
    await pool.query('CREATE DATABASE IF NOT EXISTS store_db');

    await pool.query(`
        CREATE TABLE IF NOT EXISTS Suppliers (
            SupplierID INT PRIMARY KEY AUTO_INCREMENT,
            SupplierName VARCHAR(100),
            ContactNumber VARCHAR(15)
        )
    `);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS Products (
            ProductID INT PRIMARY KEY AUTO_INCREMENT,
            ProductName VARCHAR(100) NOT NULL,
            Price DECIMAL(10, 2),
            StockQuantity INT,
            SupplierID INT,
            FOREIGN KEY (SupplierID) REFERENCES Suppliers(SupplierID)
        )
    `);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS Sales (
            SaleID INT PRIMARY KEY AUTO_INCREMENT,
            ProductID INT,
            QuantitySold INT,
            SaleDate DATE,
            FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
        )
    `);

    console.log('Database and tables created successfully');
}

module.exports = { pool, initializeDatabase };

