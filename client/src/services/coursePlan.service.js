import http from "../http-common";

class CoursePlanService {
    create(data) {
        return http.post("/", data);
    }
}

export default new CoursePlanService();