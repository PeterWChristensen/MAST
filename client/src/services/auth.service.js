import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }


  deleteAllStudent() 
  {
    return axios
    .delete("/deletestu")
        .then(response => {
            return response.data;
        }).catch(err => console.error(err));
    }


    // Use it for addStudent later.
  register(username, userID, password) {
    return axios.post(API_URL + "signup", {
      username,
      userID,
      password,
      roles:"student"
    });
  }
// get stored user information (including JWT)
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();