const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

const file = "users.json";

function readUsers() {
    const data = fs.readFileSync(file, "utf8");

    if (data.trim() === "") {
        return {};
    }

    return JSON.parse(data);
}

function writeUsers(users) {
    fs.writeFileSync(file, JSON.stringify(users, null, 2));
}


// Add User
app.post("/user", (req, res) => {
    const users = readUsers();

    const { name, age, email } = req.body;

    for (const id in users) {
        if (users[id].email === email) {
            return res.status(400).json({
                message: "Email already exists."
            });
        }
    }

    let newId = 1;

    for (const id in users) {
        if (Number(id) >= newId) {
            newId = Number(id) + 1;
        }
    }

    users[newId] = {
        id: newId,
        name,
        age,
        email
    };

    writeUsers(users);

    res.json({
        message: "User added successfully."
    });
});


// Get By Name
app.get("/user/getByName", (req, res) => {
    const users = readUsers();
    const name = req.query.name;

    for (const id in users) {
        if (users[id].name === name) {
            return res.json(users[id]);
        }
    }

    res.status(404).json({
        message: "User name not found."
    });
});


// Update User
app.patch("/user/:id", (req, res) => {
    const users = readUsers();
    const id = req.params.id;

    if (!users[id]) {
        return res.status(404).json({
            message: "User ID not found."
        });
    }

    const { name, age, email } = req.body;

    if (email) {
        for (const userId in users) {
            if (userId !== id && users[userId].email === email) {
                return res.status(400).json({
                    message: "Email already exists."
                });
            }
        }
    }

    if (name !== undefined) {
        users[id].name = name;
    }

    if (age !== undefined) {
        users[id].age = age;
    }

    if (email !== undefined) {
        users[id].email = email;
    }

    writeUsers(users);

    res.json({
        message: "User updated successfully."
    });
});


// Delete User
app.delete("/user/:id", (req, res) => {
    const users = readUsers();
    const id = req.params.id;

    if (!users[id]) {
        return res.status(404).json({
            message: "User ID not found."
        });
    }

    delete users[id];

    writeUsers(users);

    res.json({
        message: "User deleted successfully."
    });
});


// Get All Users
app.get("/user", (req, res) => {
    const users = readUsers();

    res.json(Object.values(users));
});


// Filter Users By Minimum Age
app.get("/user/filter", (req, res) => {
    const users = readUsers();
    const minAge = Number(req.query.minAge);

    const result = [];

    for (const id in users) {
        if (users[id].age >= minAge) {
            result.push(users[id]);
        }
    }

    if (result.length === 0) {
        return res.status(404).json({
            message: "no user found"
        });
    }

    res.json(result);
});


// Get User By ID
app.get("/user/:id", (req, res) => {
    const users = readUsers();
    const id = req.params.id;

    if (!users[id]) {
        return res.status(404).json({
            message: "User not found."
        });
    }

    res.json(users[id]);
});


module.exports = app;