const http = require("http");
const url = require("url");
const PORT = 8080;

const StudentController = require("./controllers/student.controller");

const server = http.createServer((req, res) => {
    const urlParse = url.parse(req.url);
    switch (urlParse.pathname) {
        case "/":
            StudentController.showStudentList(req, res);
            break;
        case "/student":
            StudentController.showStudent(req, res, urlParse);
            break;
        case "/add":
            if (req.method === "GET") {
                StudentController.showAddPage(req, res)
            } else {
                StudentController.addStudent(req, res)
            }
            break;
        case "/delete":
            StudentController.deleteStudent(req, res, urlParse);
            break;
        case "/edit":
            if (req.method === "GET") {
                StudentController.showEditPage(req, res, urlParse)
            } else {
                StudentController.editStudent(req, res)
            }
            break;
        default:
            res.write(" 404 Not found");
            res.end();
            break;
    }

})

server.listen(PORT, "localhost", () => {
    console.log("listen localhost on port " + PORT);
})