import http from "../http-commons";

class DegreeRequirementService {
    create(data) {
        return http.post("/addDegreeRequirement", data);
    }
}

export default new DegreeRequirementService();