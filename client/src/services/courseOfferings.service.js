import http from "../http-common";

class CourseOfferingsService {
    create(data) {
        return http.post("/", data);
    }
}

export default new CourseOfferingsService();