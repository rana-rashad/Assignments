const http = require("http");
const fs = require("fs");

const file = "./users.json";

function readUsers() {
    const data = fs.readFileSync(file, "utf8");
    return JSON.parse(data);
}

function writeUsers(users) {
    fs.writeFileSync(file, JSON.stringify(users, null, 4));
}

function sendResponse(res, statusCode, data) {
    res.writeHead(statusCode, {
        "Content-Type": "application/json"
    });

    res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {

    // 1. POST /user
    if (req.method === "POST" && req.url === "/user") {

        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", () => {

            const newUser = JSON.parse(body);
            const users = readUsers();

            for (const id in users) {
                if (users[id].email === newUser.email) {
                    sendResponse(res, 400, {
                        message: "Email already exists."
                    });
                    return;
                }
            }

            let id = 1;

            for (const userId in users) {
                id = Number(userId) + 1;
            }

            newUser.id = id;
            users[id] = newUser;

            writeUsers(users);

            sendResponse(res, 201, {
                message: "User added successfully."
            });
        });

        return;
    }


    // 2. PATCH /user/:id
    if (req.method === "PATCH" && req.url.startsWith("/user/")) {

        const id = req.url.split("/")[2];

        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", () => {

            const users = readUsers();

            if (!users[id]) {
                sendResponse(res, 404, {
                    message: "User ID not found."
                });
                return;
            }

            const data = JSON.parse(body);

            if (data.name !== undefined) {
                users[id].name = data.name;

                writeUsers(users);

                sendResponse(res, 200, {
                    message: "User name updated successfully."
                });

                return;
            }

            if (data.age !== undefined) {
                users[id].age = data.age;

                writeUsers(users);

                sendResponse(res, 200, {
                    message: "User age updated successfully."
                });

                return;
            }

            if (data.email !== undefined) {
                users[id].email = data.email;

                writeUsers(users);

                sendResponse(res, 200, {
                    message: "User email updated successfully."
                });

                return;
            }
        });

        return;
    }


    // 3. DELETE /user/:id
    if (req.method === "DELETE" && req.url.startsWith("/user/")) {

        const id = req.url.split("/")[2];

        const users = readUsers();

        if (!users[id]) {
            sendResponse(res, 404, {
                message: "User ID not found."
            });
            return;
        }

        delete users[id];

        writeUsers(users);

        sendResponse(res, 200, {
            message: "User deleted successfully."
        });

        return;
    }


    // 4. GET /user
    if (req.method === "GET" && req.url === "/user") {

        const users = readUsers();

        sendResponse(res, 200, Object.values(users));

        return;
    }


    // 5. GET /user/:id
    if (req.method === "GET" && req.url.startsWith("/user/")) {

        const id = req.url.split("/")[2];

        const users = readUsers();

        if (!users[id]) {
            sendResponse(res, 404, {
                message: "User not found."
            });
            return;
        }

        sendResponse(res, 200, users[id]);

        return;
    }


    sendResponse(res, 404, {
        message: "Route not found."
    });
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});