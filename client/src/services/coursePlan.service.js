import http from "../http-commons";

class CoursePlanService {
    create(data) {
        return http.post("/addCoursePlan", data);
    }

    getAll() {
        return http.get("/getCoursePlans");
    }
}

export default new CoursePlanService();