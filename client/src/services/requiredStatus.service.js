import http from "../http-commons";

class RequiredStatusService {
    create(data) {
        return http.get("/getRequiredStatus", data);
    }
}

export default new RequiredStatusService();