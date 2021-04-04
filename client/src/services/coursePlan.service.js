import http from "../http-commons";

class CoursePlanService {
    create(data) {
        return http.post("/addCoursePlan", data);
    }
}

export default new CoursePlanService();