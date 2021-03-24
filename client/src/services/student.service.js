import http from "../http-common";

class StudentService {
    create(data) {
        return http.post("/addStudent", data);
    }

    deleteAll() {
        return http.delete(`/`);
    }
}

export default new StudentService();