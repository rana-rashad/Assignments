
const express = require('express');
const { pool, initializeDatabase } = require('./db');

const app = express();

app.use(express.json());

async function startServer() {
    try {
        await initializeDatabase();

        await pool.query('USE store_db');

        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    } catch (error) {
        console.error(error);
    }
}

app.post('/products', async (req, res) => {
    try {
        const { ProductName, Price, StockQuantity, SupplierID } = req.body;

        const [result] = await pool.query(
            'INSERT INTO Products (ProductName, Price, StockQuantity, SupplierID) VALUES (?, ?, ?, ?)',
            [ProductName, Price, StockQuantity, SupplierID]
        );

        res.status(201).json({ message: 'Product created', ProductID: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/products', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Products');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/products/:id', async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM Products WHERE ProductID = ?',
            [req.params.id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/products/:id', async (req, res) => {
    try {
        const { ProductName, Price, StockQuantity, SupplierID } = req.body;

        const [result] = await pool.query(
            'UPDATE Products SET ProductName = ?, Price = ?, StockQuantity = ?, SupplierID = ? WHERE ProductID = ?',
            [ProductName, Price, StockQuantity, SupplierID, req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ message: 'Product updated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/products/:id', async (req, res) => {
    try {
        const [result] = await pool.query(
            'DELETE FROM Products WHERE ProductID = ?',
            [req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.post('/suppliers', async (req, res) => {
    try {
        const { SupplierName, ContactNumber } = req.body;

        const [result] = await pool.query(
            'INSERT INTO Suppliers (SupplierName, ContactNumber) VALUES (?, ?)',
            [SupplierName, ContactNumber]
        );

        res.status(201).json({
            message: 'Supplier created',
            SupplierID: result.insertId
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/suppliers', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Suppliers');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/suppliers/:id', async (req, res) => {
    try {
        const { SupplierName, ContactNumber } = req.body;

        const [result] = await pool.query(
            'UPDATE Suppliers SET SupplierName = ?, ContactNumber = ? WHERE SupplierID = ?',
            [SupplierName, ContactNumber, req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        res.json({ message: 'Supplier updated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/suppliers/:id', async (req, res) => {
    try {
        const [result] = await pool.query(
            'DELETE FROM Suppliers WHERE SupplierID = ?',
            [req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        res.json({ message: 'Supplier deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.post('/sales', async (req, res) => {
    try {
        const { ProductID, QuantitySold, SaleDate } = req.body;

        const [result] = await pool.query(
            'INSERT INTO Sales (ProductID, QuantitySold, SaleDate) VALUES (?, ?, ?)',
            [ProductID, QuantitySold, SaleDate]
        );

        res.status(201).json({
            message: 'Sale recorded',
            SaleID: result.insertId
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/sales', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Sales');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/sales/product/:id', async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM Sales WHERE ProductID = ?',
            [req.params.id]
        );

        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.post('/database/add-category', async (req, res) => {
    try {
        await pool.query(
            'ALTER TABLE Products ADD COLUMN Category VARCHAR(100)'
        );

        res.json({ message: 'Category column added' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/database/remove-category', async (req, res) => {
    try {
        await pool.query(
            'ALTER TABLE Products DROP COLUMN Category'
        );

        res.json({ message: 'Category column removed' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/database/contact-number', async (req, res) => {
    try {
        await pool.query(
            'ALTER TABLE Suppliers MODIFY ContactNumber VARCHAR(15)'
        );

        res.json({ message: 'ContactNumber changed to VARCHAR(15)' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/database/product-name', async (req, res) => {
    try {
        await pool.query(
            'ALTER TABLE Products MODIFY ProductName VARCHAR(100) NOT NULL'
        );

        res.json({ message: 'ProductName is now NOT NULL' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/reports/total-sold', async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT Products.ProductName, SUM(Sales.QuantitySold) AS TotalQuantitySold
            FROM Products
            JOIN Sales ON Products.ProductID = Sales.ProductID
            GROUP BY Products.ProductID, Products.ProductName
        `);

        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/reports/highest-stock', async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT ProductName, StockQuantity
            FROM Products
            ORDER BY StockQuantity DESC
            LIMIT 1
        `);

        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/reports/suppliers-starting-with-f', async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT *
            FROM Suppliers
            WHERE SupplierName LIKE 'F%'
        `);

        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/reports/products-never-sold', async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT *
            FROM Products
            WHERE NOT EXISTS (
                SELECT 1
                FROM Sales
                WHERE Sales.ProductID = Products.ProductID
            )
        `);

        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/reports/sales-details', async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT Products.ProductName, Sales.QuantitySold, Sales.SaleDate
            FROM Sales
            JOIN Products ON Sales.ProductID = Products.ProductID
        `);

        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

startServer();
