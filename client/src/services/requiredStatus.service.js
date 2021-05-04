import http from "../http-commons";

class RequiredStatusService {
    getAll(data) {
        return http.get("/getRequiredStatus", data);
    }
}

export default new RequiredStatusService();