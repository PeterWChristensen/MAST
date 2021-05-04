import axios from "axios";


class CommentService {

    create(
        stu_username,
        gpd_username,
        comment,
        date) {
    return axios
    .post("/addcmt", {     
            stu_username,
            gpd_username,
            comment,
            date
        })
        .then(response => {
            return response.data;
        }).catch(err => console.error(err));
    }





    deleteComment(
        stu_username,
        date) {
        return axios
        .delete("/deletecmt", {
                data:{
                    stu_username,
                    date                        
                }     
            })
            .then(response => {
                return response.data;
            }).catch(err => console.error(err));
        }

        

}   
export default new CommentService();
