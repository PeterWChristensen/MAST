import axios from "axios";

const retVal="";

class MSStudentService {
    getinfo(username) {
      return axios
      .post("/getinfo", {
            username
          })
          .then(response => {
            console.log("return value from service");
            console.log(response.data);            
            return response.data;
          }).catch(err => console.error(err));
      }
    }    

export default new MSStudentService();



// import axios from "axios";

// class MSStudentService {
//     getinfo(username) {
//       return axios
//       .post("/getinfo", {
//             username
//           })
//           .then(response => {
//             console.log("return value from service");
//             console.log(response.data);
//             return response.data;
//           }).catch(err => console.error(err));
//       }
//     }    

// export default new MSStudentService();
