import http from "../http-commons";

class GradeService {
  getAll() {
    return http.get("/");
  }

  get(id) {
    return http.get(`//${id}`);
  }

  create(data) {
    return http.put("/", data);
  }

  update(id, data) {
    return http.put(`/${id}`, data);
  }
}

export default new GradeService();