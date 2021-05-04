import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MaterialTable from "material-table";

import AuthService from "../../services/auth.service";
import MSStudentService from "../../services/msStudent.service";
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
            password: "will add password setting",
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
            comments: [{date: "4/13/21", comment: "Great job!"}],
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
        console.log("componentDidMount at ms_student_screens/MSViewStudentScreen.js");

        await MSStudentService.getinfo(this.state.user.username);
        var stuInfo= await MSStudentService.getStudentInfo();

        console.log(stuInfo);
            
        this.setState({
            firstName: stuInfo.firstName,
            lastName: stuInfo.lastName,
            studentID: stuInfo.studentID,
            hasGraduated: stuInfo.hasGraduated,
            email: stuInfo.email,
            gpa: stuInfo.gpa,
            entrySemester: stuInfo.entrySemester,
            entryYear: stuInfo.entryYear,
            gradSemester: stuInfo.gradSemester,
            gradYear: stuInfo.gradYear,
            nSemestersInProgram: stuInfo.nSemestersInProgram,
            projectOption: stuInfo.projectOption,
            advisor: stuInfo.advisor,
            departmentID: stuInfo.departmentID,
            track: stuInfo.track,
            requirementVersionYear: stuInfo.requirementVersionYear,
            requirementVersionSemester: stuInfo.requirementVersionSemester,
            totalCredits: stuInfo.totalCredits

        });    
    }
     


    render() {
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
                        <input  className="viewStudent_input" type="input" defaultValue={this.state.studentID} disabled/>
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
                        <input className="viewStudent_input" label="First Name" type="input" defaultValue={this.state.gradYear} disabled/>
                        <input  className="viewStudent_input" type="input" defaultValue={this.state.hasGraduated} disabled/>
                        </p>                        
                        <br></br>                        
                        <p className="viewStudent_prompt">Department:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Track: &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;&nbsp; # Semesters In Program:
                        <br></br><input className="viewStudent_input" type="input" defaultValue={this.state.departmentID} disabled/>
                        <input className="viewStudent_input" label="First Name" type="input" defaultValue={this.state.track} disabled/>
                        <input  className="viewStudent_input" type="input" defaultValue={this.state.nSemestersInProgram} disabled/>
                        </p>
                        <br></br>
                        <p className="viewStudent_prompt">Advisor:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;Project: &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp; Requirements Version:
                        <br></br><input className="viewStudent_input" type="input" defaultValue={this.state.advisor} disabled/>
                        <input className="viewStudent_input" label="First Name" type="input" defaultValue={this.state.projectOption} disabled/>
                        <input  className="viewStudent_input" type="input" defaultValue={this.state.requirementVersionYear} disabled/>
                        </p>
                        <br></br><br></br>
                        <h2 id="viewStudentFormHeader">Degree Progress</h2>
                        <br></br>
                        <p>&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;Degree Requirements not available</p>
                        
                        <br></br>
                        
                        <h2 id="viewStudentFormHeader">Course Plan
                        </h2>  
                        <a><Link to={"/suggestcourseplan"}> <button id="SuggestCoursePlanButton"> Suggest Course Plan </button></Link></a>
                        <br></br>                      
                        <div style={{position: "relative", width: "50%", left: "8%"}}>
                            <MaterialTable title="Semester"  
                                options={{toolbar: false, paging: false, sorting:false, headerStyle: {backgroundColor: '#000000',color: '#FFF'}, cellStyle: {width: 20, maxWidth: 20},
                                zIndex:0, maxBodyHeight: '500px', search:true, headerSelectionProps: {color: "primary"}}}
                                columns={this.state.coursePlanColumns} data={this.state.coursePlans}
                            />
                        </div>
                        <br></br>
                        <br></br>

                        <h2 id="viewStudentFormHeader">Comments</h2>     
                        <br></br>
                        <div style={{position: "relative", width: "50%", left: "8%"}}>
                            <MaterialTable title="Comments"  
                                options={{toolbar: false, paging: false, sorting:false, headerStyle: {backgroundColor: '#000000',color: '#FFF'}, cellStyle: {width: 20, maxWidth: 20},
                                zIndex:0, maxBodyHeight: '500px', search:true, headerSelectionProps: {color: "primary"}}}
                                columns={this.state.commentColumns} data={this.state.comments}
                            />
                        </div>                   
                        <br></br>
                        <Link to={{pathname: '/editMSStudent', state: {studentID: this.props.studentID}}}><button id="viewStudentForm_edit_button" className="viewStudent_button">Edit</button></Link>
                        </div>
                </div>
            </div>
        )
    }
}

export default MSViewStudentScreen;
