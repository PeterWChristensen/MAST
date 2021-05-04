import http from "../http-commons";

class AreaRequirementService {
    create(data) {
        return http.post("/addAreaRequirement", data);
    }
}

export default new AreaRequirementService();