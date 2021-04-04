import http from "../http-commons";

class DepartmentService {
    create(data) {
        return http.post("/addDepartment", data);
    }
}

export default new DepartmentService();