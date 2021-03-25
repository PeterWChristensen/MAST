import http from "../http-commons";

class CoursePlanService {
    create(data) {
        return http.post("/", data);
    }
}

export default new CoursePlanService();