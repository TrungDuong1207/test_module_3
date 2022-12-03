const BaseController = require("../controllers/base.controller");
const qs = require("qs");
let idStudent = 0;
class StudentController {
    static async showStudentList(req, res) {
        let dataHTML = await BaseController.getTemplate("./views/studentList.html");
        const sqlShowStudents = `SELECT * FROM students;`;
        let students = await BaseController.querySQL(sqlShowStudents);
        let html = "";

        students.forEach((student, index) => {
            html += "<tr>";
            html += `<td>${index + 1}</td>`;
            html += `<td><a class="text-decoration-none" href="/student?id=${student.studentID}">${student.studentName}</a></td>`;
            html += `<td>${student.class}</td>`;
            html += `<td>${student.evaluate}</td>`;
            html += `<td><a class="btn btn-danger" onclick="return confirm('Are you sure delete?')" href="/delete?id=${student.studentID} ">Delete</a></td>`;
            html += `<td><a class="btn btn-primary" href="/edit?id=${student.studentID}">Edit</a></td>`;
            html += "</tr>";
        });
        res.writeHead(200, { "Content-type": "text/html" });
        dataHTML = dataHTML.replace("{student-list}", html);
        res.write(dataHTML);
        res.end();
    }

    static async showStudent(req, res, urlParse) {
        let idStudentShow = qs.parse(urlParse.query).id;
        idStudent = idStudentShow;
        let studentHTML = await BaseController.getTemplate("./views/student.html");
        res.writeHead(200, { "Content-type": "text/html" });
        sqlShowStudents = `SELECT * FROM students;`;
        let students = await BaseController.querySQL(sqlShowStudents);
        studentHTML = studentHTML.replace("{studentID}", students[0].studentID);
        studentHTML = studentHTML.replace("{name}", students[0].studentName);
        studentHTML = studentHTML.replace("{class}", students[0].class);
        studentHTML = studentHTML.replace("{theo-mark}", students[0].theoreticalMark);
        studentHTML = studentHTML.replace("{pract-mark}", students[0].practiceMark);
        studentHTML = studentHTML.replace("{eval}", students[0].evaluate);
        studentHTML = studentHTML.replace("{descript}", students[0].description);
        res.write(studentHTML);
        res.end();
    }

    static async showAddPage(req, res) {
        let dataHTML = await BaseController.getTemplate("./views/add.html");
        res.writeHead(200, { "Content-type": "text/html" });
        res.write(dataHTML);
        res.end();
    }

    static async addStudent(req, res) {
        let data = ""
        req.on("data", chunk => {
            data += chunk;
        })

        req.on("end", async () => {
            let student = qs.parse(data);
            // console.log(times);
            const sqlAdd = `INSERT INTO students(studentName, theoreticalMark, practiceMark, description, class, evaluate) 
                            VALUES ("${student.studentName}", ${student.theoMark}, ${student.practMark},"${student.description}","${student.class}","${student.evoluate}");`;
            await BaseController.querySQL(sqlAdd);
            res.writeHead(301, { Location: "/" });
            res.end();
        })
    }
    static async deleteStudent(req, res, urlParse) {
        let idDelete = qs.parse(urlParse.query).id;
        idStudent = idDelete;
        const sqlDelete = `DELETE FROM students WHERE studentID = ${idDelete}`;
        await BaseController.querySQL(sqlDelete);
        res.writeHead(301, { Location: "/" });
        res.end();
    }

    static async showEditPage(req, res, urlParse) {
        let idEdit = qs.parse(urlParse.query).id;
        idStudent = idEdit;
        let studentHTML = await BaseController.getTemplate("./views/edit.html");
        res.writeHead(200, { "Content-type": "text/html" });
        let sqlShowStudents = `SELECT * FROM students;`;
        let students = await BaseController.querySQL(sqlShowStudents);
        studentHTML = studentHTML.replace("{studentID}", students[0].studentID);
        studentHTML = studentHTML.replace("{name}", students[0].studentName);
        studentHTML = studentHTML.replace("{class}", students[0].class);
        studentHTML = studentHTML.replace("{theo-mark}", students[0].theoreticalMark);
        studentHTML = studentHTML.replace("{pract-mark}", students[0].practiceMark);
        studentHTML = studentHTML.replace("{eval}", students[0].evaluate);
        studentHTML = studentHTML.replace("{descript}", students[0].description);
        res.write(studentHTML);
        res.end();
    }

    static async editStudent(req, res) {
        let data = ""
        req.on("data", chunk => {
            data += chunk;
        })

        req.on("end", async () => {
            let student = qs.parse(data);
            let sqlEdit = `UPDATE students
                        SET studentName = "${student.studentName}", theoreticalMark = "${student.theoMark}", practiceMark = "${student.practMark}", class = "${student.class}", description = "${student.description}", evaluate = "${student.evoluate}"
                        WHERE studentID = ${idStudent};`;
            await BaseController.querySQL(sqlEdit);
            res.writeHead(301, { Location: '/' });
            res.end();
        })


    }

}
module.exports = StudentController;