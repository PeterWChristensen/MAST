import http from "../http-commons";

class PrerequisiteService {
    create(data) {
        return http.post("/addPrerequisite", data);
    }
}

export default new PrerequisiteService();