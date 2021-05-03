import http from "../http-commons";

class RequiredCourseService {
    create(data) {
        return http.post("/addRequiredCourse", data);
    }
}

export default new RequiredCourseService();