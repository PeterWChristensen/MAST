import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MaterialTable from "material-table";
import axios from "axios";

import AuthService from "../../services/auth.service";

class MSViewStudentScreen extends Component {
    constructor(props){
        super(props)
        this.state = {  
            user:   AuthService.getCurrentUser(),
            showModalDialogPopup: false,
            modalType: "none",
            student: [],
            firstName: "",
            lastName: "",
            email: "",
            studentID: "",
            password: "",
            gpa: "",
            entrySemester: "",
            entryYear: "",
            gradSemester: "",
            gradYear: "",
            hasGraduated: "",
            departmentID: "",
            track : "",
            nSemestersInProgram: "", 
            advisor: "",
            totalCredits: "",
            projectOption: "",
            requirementVersionYear: "",
            requirementVersionSemester: "",
            coursePlans: [{courseOfferingID: "CSE 503", grade: "A"}, {courseOfferingID: "CSE 504", grade: "B"}],
            coursePlanColumns: [
                {
                    title: "Semester",
                    field: "courseOfferingID"
                }, 
                {
                    title: "",
                    field: "grade"
                }
            ],
            comments: [],
            commentColumns: [
                {
                    title: "Date",
                    field: "date"
                }, 
                {
                    title: "Comment",
                    field: "comment"
                }
            ]
        }    
    }



    componentDidMount(){
        console.log("componentDidMount at ms_student_screens/MSViewStudentScreen.js");

        
        var username=this.state.user.username    
        axios.post("/getinfo", {
            username
          })
          .then(response => {
            this.setState({
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                studentID: response.data.studentID,
                hasGraduated: response.data.hasGraduated,
                email: response.data.email,
                gpa: response.data.gpa,
                entrySemester: response.data.entrySemester,
                entryYear: response.data.entryYear,
                gradSemester: response.data.gradSemester,
                gradYear: response.data.gradYear,
                nSemestersInProgram: response.data.nSemestersInProgram,
                projectOption: response.data.projectOption,
                advisor: response.data.advisor,
                departmentID: response.data.departmentID,
                track: response.data.track,
                requirementVersionYear: response.data.requirementVersionYear,
                requirementVersionSemester: response.data.requirementVersionSemester,
                totalCredits: response.data.totalCredits})
                return response.data;
          }).catch(err => console.error(err));
          var stu_username=username;
 
          axios.post("/getcmt", {
            stu_username
          })
          .then(response => {
                console.log("this is getcmt at view student");
                var tempList=[];
                for(var i=0;response.data[i];i++){
                    tempList.push({date: response.data[i].date, comment:response.data[i].comment})
                }

                this.setState({comments:tempList});
                
                return response.data;
          }).catch(err => console.error(err));

    }

    render() {
        var courseTable = [];
        var semester = new Map(); //map semester with course

        const createCourseEntry = (course) => {
            var divId = "course" + course.index;
            return <div id={divId}>
            <input className="coursePlan" value={course.courseName} readOnly/>
            <input className="coursePlan" value={course.grade} readOnly/>
            </div>;
        }

        const createCourseTables = () => {  
            var course = this.state.coursePlans;
            //Get Semesters and courses 
            for (let i = 0; i < course.length; i++){
                if (semester.has(course[i].semester) == false){
                    semester.set(course[i].semester, [{courseOfferingID: course[i].courseOfferingID, courseName: course[i].courseName, semester: course[i].semester, grade: course[i].grade, index: i}]);
                }
                else{
                    let courseArr = semester.get(course[i].semester);
                    courseArr.push({courseOfferingID: course[i].courseOfferingID, courseName: course[i].courseName, semester: course[i].semester, grade: course[i].grade, index: i});
                    semester.set(course[i].semester, courseArr);
                }
            }
            let semestersSorted = new Map([...semester].sort((a, b) => String(a[0]).localeCompare(b[0])));
            //Note: Create new sort method to display semesters in correct order
            semestersSorted.forEach( function(courseArray, semester){
                courseTable.push(<div>
                <input className="semesterTableHeader" value={semester} disabled/>
                </div>)
                for(let i = 0; i < courseArray.length; i++){
                    courseTable.push(createCourseEntry(courseArray[i]));
                }
                courseTable.push(<br></br>);
            });
            return courseTable;
        }

        var commentTable = [];
        const createEntry = (comment) => {
            var divId = "comment" + comment.index;
            return <div id={divId}>
                <textarea className="commentsDate" value={comment.date} readOnly/>
                <textarea className="commentsComment" value={comment.comment} readOnly/>
            </div>;
        }
        const createCommentTable = () =>{
            commentTable.push(<div id="commentTableHeaders">
                <input className="commentTableHeaderDate" value="Date" disabled/>
                <input className="commentTableHeaderComment" value="Comment" disabled/>
                </div>)
            var comments = this.state.comments;
            for (let i = 0; i < comments.length; i++){ //Add index to each comment for editing
                comments[i] = {date: comments[i].date, comment: comments[i].comment, index: i}
                commentTable.push(createEntry(comments[i]));
            }
            return commentTable;
        }

        return (
            <div id="viewStudentFormBackground">
                <div id="viewStudentForm">
                    <br></br><br></br><br></br>
                    <h2 id="viewStudentFormHeader">Student Information</h2>
                    <div>
                        <br></br><br></br>
                        <p className="viewStudent_prompt"> First Name: &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;&nbsp; Last Name: &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;&ensp;&ensp;&nbsp;  SBU ID: 
                        <br></br><input className="viewStudent_input" type="input" defaultValue={this.state.firstName} readOnly/>
                        <input className="viewStudent_input" label="First Name" type="input" defaultValue={this.state.lastName} readOnly/>
                        <input  className="viewStudent_input" type="input" defaultValue={this.state.studentID} readOnly/>
                        </p>
                        <br></br>
                        <p className="viewStudent_prompt">Email:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;Password: &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp; GPA:
                        <br></br><input className="viewStudent_input" type="input" defaultValue={this.state.email} readOnly/>
                        <input className="viewStudent_input" label="First Name" type="input" defaultValue={this.state.password} readOnly/>
                        <input  className="viewStudent_input" type="input" defaultValue={this.state.gpa?this.state.gpa: "NULL" } readOnly/>
                        </p>
                        <br></br>
                        <p className="viewStudent_prompt">Entry Semester:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;Expected Graduation: &emsp;&emsp;&emsp;&emsp;&ensp;&nbsp; Graduated:
                        <br></br><input className="viewStudent_input" type="input" value={this.state.entrySemester + " " + this.state.entryYear} readOnly/>
                        <input className="viewStudent_input" label="First Name" type="input" value={this.state.gradSemester + " " + this.state.gradYear} readOnly/>
                        <input  className="viewStudent_input" type="input" defaultValue={this.state.hasGraduated? this.state.hasGraduated: "False"} readOnly/>
                        </p>                        
                        <br></br>                        
                        <p className="viewStudent_prompt">Department:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Track: &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;&nbsp; # Semesters In Program:
                        <br></br><input className="viewStudent_input" type="input" defaultValue={this.state.departmentID} readOnly/>
                        <input className="viewStudent_input" label="First Name" type="input" defaultValue={this.state.track?this.state.track: "NULL" } readOnly/>
                        <input  className="viewStudent_input" type="input" defaultValue={this.state.nSemestersInProgram?this.state.nSemestersInProgram:0} readOnly/>
                        </p>
                        <br></br>
                        <p className="viewStudent_prompt">Advisor:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;Project: &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp; Requirements Version:
                        <br></br><input className="viewStudent_input" type="input" defaultValue={this.state.advisor? this.state.advisor: "NULL"} readOnly/>
                        <input className="viewStudent_input" label="First Name" type="input" defaultValue={this.state.projectOption? this.state.projectOption: "NULL"} readOnly/>
                        <input  className="viewStudent_input" type="input" value={this.state.requirementVersionSemester + " " + this.state.requirementVersionYear} readOnly/>
                        </p>
                        <br></br>
                        <p className="viewStudent_prompt">Total Credits: 
                        <br></br><input className="viewStudent_input" type="input" defaultValue={this.state.totalCredits? this.state.totalCredits:0} readOnly/>
                        </p>
                        <br></br><br></br>
                        <h2 id="viewStudentFormHeader">Degree Progress</h2>
                        <br></br>
                        <p>&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;Degree Requirements not available</p>
                        
                        <br></br>
                        
                        <h2 id="viewStudentFormHeader">Course Plan
                        <button id="viewStudent_suggestcourseplanbutton" className="viewStudent_button">Suggest Course Plan</button>
                        </h2>  
                        <br></br>                      
                        <div style={{position: "relative", width: "50%", left: "8%"}}>
                        {createCourseTables()}
                        </div>
                        <br></br>
                        <br></br>

                        <h2 id="viewStudentFormHeader">Comments</h2>     
                        <br></br>
                        <div style={{position: "relative", width: "50%", left: "8%"}}>
                        {createCommentTable()}
                        </div>                   
                        <br></br>
                        <Link to={{pathname: '/editStudent', state: {email: this.state.email}}}><button id="viewStudentForm_edit_button" className="viewStudent_button">Edit</button></Link>
                        <Link to="/"><button id="viewStudentForm_return_button" className="viewStudent_button">Return</button></Link>
                        </div>
                </div>
            </div>
        )
    }
}



export default MSViewStudentScreen;
