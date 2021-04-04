import http from "../http-commons";

class CourseOfferingsService {
    create(data) {
        return http.post("/", data);
    }
}

export default new CourseOfferingsService();