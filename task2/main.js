const path = require("path");
const fs = require("fs");
const os = require("os");
const EventEmitter = require("events");
const zlib = require("zlib");

// 1
function getFileAndDir() {
    console.log({
        File: __filename,
        Dir: __dirname
    });
}

getFileAndDir();


// 2
function getFileName(filePath) {
    return path.basename(filePath);
}

console.log(getFileName("/user/files/report.pdf"));


// 3
function buildPath(obj) {
    return path.join(obj.dir, obj.name + obj.ext);
}

console.log(buildPath({
    dir: "/folder",
    name: "app",
    ext: ".js"
}));


// 4
function getExtension(filePath) {
    return path.extname(filePath);
}

console.log(getExtension("/docs/readme.md"));


// 5
function parsePath(filePath) {
    const result = path.parse(filePath);

    return {
        Name: result.name,
        Ext: result.ext
    };
}

console.log(parsePath("/home/app/main.js"));


// 6
function isAbsolute(filePath) {
    return path.isAbsolute(filePath);
}

console.log(isAbsolute("/home/user/file.txt"));


// 7
function joinSegments(...segments) {
    return path.join(...segments);
}

console.log(joinSegments("src", "components", "App.js"));


// 8
function resolvePath(filePath) {
    return path.resolve(filePath);
}

console.log(resolvePath("./index.js"));


// 9
function joinTwoPaths(path1, path2) {
    return path.join(path1, path2);
}

console.log(joinTwoPaths("/folder1", "folder2/file.txt"));


// 10
function deleteFile(filePath) {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.log(err.message);
            return;
        }

        console.log("File is deleted.");
    });
}


// 11
function createFolder(folderPath) {
    try {
        fs.mkdirSync(folderPath);
        console.log("Success");
    } catch (err) {
        console.log(err.message);
    }
}


// 12
const emitter = new EventEmitter();

emitter.on("start", () => {
    console.log("Welcome event triggered!");
});

emitter.emit("start");


// 13
emitter.on("login", (username) => {
    console.log(`User logged in: ${username}`);
});

emitter.emit("login", "Ahmed");


// 14
function readFile(filePath) {
    const data = fs.readFileSync(filePath, "utf8");
    console.log(data);
}


// 15
function writeFile(filePath, content) {
    fs.writeFile(filePath, content, (err) => {
        if (err) {
            console.log(err.message);
            return;
        }

        console.log("File written successfully");
    });
}


// 16
function checkExists(filePath) {
    return fs.existsSync(filePath);
}

console.log(checkExists("./notes.txt"));


// 17
function getOSInfo() {
    return {
        Platform: os.platform(),
        Arch: os.arch()
    };
}

console.log(getOSInfo());


// 18
function readUsingStream(filePath) {
    const stream = fs.createReadStream(filePath, "utf8");

    stream.on("data", (chunk) => {
        console.log(chunk);
    });
}


// 19
function copyUsingStreams(source, destination) {
    const readStream = fs.createReadStream(source);
    const writeStream = fs.createWriteStream(destination);

    readStream.pipe(writeStream);

    writeStream.on("finish", () => {
        console.log("File copied using streams");
    });
}


// 20
function compressFile(source, destination) {
    const readStream = fs.createReadStream(source);
    const writeStream = fs.createWriteStream(destination);
    const gzip = zlib.createGzip();

    readStream
        .pipe(gzip)
        .pipe(writeStream);

    writeStream.on("finish", () => {
        console.log("File compressed successfully");
    });
}