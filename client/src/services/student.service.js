import http from "../http-common";

class StudentService {
    create(data) {
        return http.post("/addStudent", data);
    }
}

export default new StudentService();