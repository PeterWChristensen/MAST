import http from "../http-commons";

class CourseOfferingsService {
    create(data) {
        return http.post("/", data);
    }
    getAll(data) {
        return http.get("/getCourseOfferings, data");
    }
}

export default new CourseOfferingsService();