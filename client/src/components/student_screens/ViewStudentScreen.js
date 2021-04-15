import React, { Component } from 'react';
import { Link  } from 'react-router-dom';

import AuthService from "../../services/auth.service";
import MSStudentService from "../../services/msStudent.service";



class ViewStudentScreen extends Component {
    constructor(props){
        super(props);
        this.state = {    
            currentUser: AuthService.getCurrentUser(),
            showModalDialogPopup: false,
            modalType: "none",
            student: [],
            firstName: null,
            lastName: null,
            sid: null,
            email: null,
            password: null,
            gpa: null,
            totalCredits: null,
            entrySemester: null,
            entryYear: null,
            gradSemester: null,
            gradYear: null,
            hasGraduated: null,
            department: null,
            track : null,
            nSemestersInProgram: null, 
            advisor: null,
            projectOption: null,
            requirementVersionSemester: null,
            requirementVersionYear: null,
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
            comments: [{date: "4/13/21", comment: "Great job!"}, {date: "4/1/21", comment: "Nice job!"}, {date: "3/23/21", comment: "Good job!"}],
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

  
    
    async componentDidMount(){
        console.log("componentDidMount at Student_screens/ViewStudentScreen.js");
        await MSStudentService.getinfo(this.props.location.state.email);
 
        var stuInfo= await MSStudentService.getStudentInfo();
        console.log(stuInfo);
            
        this.setState({
            firstName: stuInfo.firstName,
            lastName: stuInfo.lastName,
            sid: stuInfo.studentID,
            hasGraduated: stuInfo.hasGraduated,
            email: stuInfo.email,
            gpa: stuInfo.gpa,
            entrySemester: stuInfo.entrySemester,
            //entryYear: stuInfo.entryYear,
            //gradSemester: stuInfo.gradSemester,
            expectedGraduation: stuInfo.gradYear,
            nSemestersInProgram: stuInfo.nSemestersInProgram,
            //totalCredits: stuInfo.totalCredits,
            projectOption: stuInfo.projectOption,
            advisor: stuInfo.advisor,
            hasGraduated: stuInfo.hasGraduated,
            department: stuInfo.departmentID,
            track: stuInfo.track,
            requirementsVersion: stuInfo.requirementsVersion           

        });    
    }
     



    render() {
        var commentTable = [];
        const createEntry = (comment) => {
            var divId = "comment" + comment.index;
            return <div id={divId}>
                <input className="comments" value={comment.date} disabled/>
                <input className="comments" value={comment.comment} disabled/>
            </div>;
        }
        const createCommentTable = () =>{
            commentTable.push(<div id="commentTableHeader">
                <input className="comments" value="Date" disabled/>
                <input className="comments" value="Comment" disabled/>
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
                        <br></br><input className="viewStudent_input" type="input" defaultValue={this.state.firstName} disabled/>
                        <input className="viewStudent_input" label="First Name" type="input" defaultValue={this.state.lastName} disabled/>
                        <input  className="viewStudent_input" type="input" defaultValue={this.state.sid} disabled/>
                        </p>
                        <br></br>
                        <p className="viewStudent_prompt">Email:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;Password: &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp; GPA:
                        <br></br><input className="viewStudent_input" type="input" defaultValue={this.state.email} disabled/>
                        <input className="viewStudent_input" label="First Name" type="input" defaultValue={this.state.password} disabled/>
                        <input  className="viewStudent_input" type="input" defaultValue={this.state.gpa} disabled/>
                        </p>
                        <br></br>
                        <p className="viewStudent_prompt">Entry Semester:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;Expected Graduation: &emsp;&emsp;&emsp;&emsp;&ensp;&nbsp; Graduated:
                        <br></br><input className="viewStudent_input" type="input" defaultValue={this.state.entrySemester} disabled/>
                        <input className="viewStudent_input" label="First Name" type="input" defaultValue={this.state.expectedGraduation} disabled/>
                        <input  className="viewStudent_input" type="input" defaultValue={this.state.hasGraduated} disabled/>
                        </p>                        
                        <br></br>                        
                        <p className="viewStudent_prompt">Department:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Track: &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;&nbsp; # Semesters In Program:
                        <br></br><input className="viewStudent_input" type="input" defaultValue={this.state.department} disabled/>
                        <input className="viewStudent_input" label="First Name" type="input" defaultValue={this.state.track} disabled/>
                        <input  className="viewStudent_input" type="input" defaultValue={this.state.nSemestersInProgram} disabled/>
                        </p>
                        <br></br>
                        <p className="viewStudent_prompt">Advisor:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;Project: &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp; Requirements Version:
                        <br></br><input className="viewStudent_input" type="input" defaultValue={this.state.advisor} disabled/>
                        <input className="viewStudent_input" label="First Name" type="input" defaultValue={this.state.projectOption} disabled/>
                        <input  className="viewStudent_input" type="input" defaultValue={this.state.requirementsVersion} disabled/>
                        </p>
                        <br></br>
                        <p className="viewStudent_prompt">Total Credits: 
                        <br></br><input className="viewStudent_input" type="input" defaultValue={this.state.totalCredits} disabled/>
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
                            
                        </div>
                        <br></br>
                        <br></br>

                        <h2 id="viewStudentFormHeader">Comments</h2>     
                        <br></br>
                        <div style={{position: "relative", width: "50%", left: "8%"}}>
                        {createCommentTable()}
                        </div>                   
                        <br></br>
                        <Link to={{pathname: '/editStudent', state: {studentID: this.props.studentID}}}><button id="viewStudentForm_edit_button" className="viewStudent_button">Edit</button></Link>
                        <Link to="/"><button id="viewStudentForm_return_button" className="viewStudent_button">Return</button></Link>
                        </div>
                </div>
            </div>
        )
    }
}

export default ViewStudentScreen;
