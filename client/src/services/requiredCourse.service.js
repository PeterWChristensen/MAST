import http from "../http-commons";

class requiredCourseService {
    create(data) {
        return http.post("/addRequiredCourse", data);
    }
}

export default new requiredCourseService();