import http from "../http-commons";

class StudentService {
    create(data) {
        return http.post("/addStudent", data);
    }

    deleteAll() {
        return http.delete(`/`);
    }

    getAll() {
        return http.get("/getStudents");
    }
}

export default new StudentService();