import React, { Component } from 'react';
import MaterialTable from "material-table";
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';

class EditStudentScreen extends Component {
    constructor(props){
        super(props)
        this.state = {    
            showModalDialogPopup: false,
            modalType: "none",
            student: [],
            firstName: "",
            lastName: "",
            id: "",
            department: "",
            track : "",
            advisor: "",
            entrySemester: "",
            expectedGraduation: "",
            gpa: "",
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

    render() {

        const changeDepartmentOptionHandler = (event) => { 
            this.setState({department: event.target.value}); 
        }; 

        const changeTrackOptionHandler = (event) => { 
            this.setState({track: event.target.value}); 
        }; 

        // Different arrays for different dropdowns 
        const ams = [ "Computational Applied Mathematics", "Computational Biology", 
            "Operations Research", "Statistics", "Quantitative Finance"]; 
        const bmi = ["Clinical Informatics", "Imaging Informatics", "Translational Bioinformatics"]; 
        const ese = ["None"]; 
        const cse = ["None"]; 
        
        // Type variable to store different array for different dropdown
        let type = null; 
        
        //This will be used to create set of options that user will see
        let options = null; 
        
        // Setting Type variable according to dropdown
        if (this.state.department === "AMS") { 
            type = ams; 
        } else if (this.state.department === "BMI") { 
            type =bmi; 
        } else if (this.state.department === "ESE") { 
            type = ese; 
        } else if (this.state.department === "CSE") { 
            type = cse; 
        } 
        
        // If "Type" is null or undefined then options will be null, otherwise it will create a options iterable based on our array 
        if (type) { 
            options = type.map((el) => <option key={el}>{el}</option>); 
        }         


        return (
            <div id="viewStudentFormBackground">
                <div id="viewStudentForm">
                    <br></br><br></br><br></br>
                    <h2 id="viewStudentFormHeader">Student Information</h2>
                    <div>
                        <br></br><br></br>
                        <p className="viewStudent_prompt"> First Name: &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;&nbsp; Last Name: &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;&ensp;&ensp;&nbsp;  SBU ID: 
                        <br></br><input className="viewStudent_input" type="input" defaultValue="First Name" />
                        <input className="viewStudent_input" label="First Name" type="input" defaultValue="Last Name" />
                        <input  className="viewStudent_input" type="input" defaultValue="ID" />
                        </p><br></br>                        
                        <p className="viewStudent_prompt">Department:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Track: &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;&nbsp; Advisor:
                        <br></br>
                        <select id="departmentSelectEditStudent" className="dropdownSelect" onChange={changeDepartmentOptionHandler}>
                            <option value="AMS">AMS</option>
                            <option value="BMI">BMI</option>
                            <option value="ESE">ESE</option>
                            <option value="CSE">CSE</option>
                        </select>
                        <select id="trackSelectEditStudent" className="dropdownSelect" onChange={changeTrackOptionHandler}>
                            {options}
                        </select>

                        <input  className="viewStudent_input" type="input" defaultValue="Advisor" />
                        </p>
                        <br></br>
                        <p className="viewStudent_prompt">Entry Semester:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;Expected Graduation: &emsp;&emsp;&emsp;&emsp;&ensp;&nbsp; GPA:
                        <br></br><input className="viewStudent_input" type="input" defaultValue="Semester" />
                        <input className="viewStudent_input" label="First Name" type="input" defaultValue="Graduation Semester" />
                        <input  className="viewStudent_input" type="input" defaultValue="GPA" />
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
                            <MaterialTable title="Semester"
                                actions={[
                                    {
                                    icon: 'edit',
                                    tooltip: 'Edit Course'
                                    }
                                ]}
                                options={{actionsColumnIndex: -1, toolbar: false, paging: false, sorting:false, headerStyle: {backgroundColor: '#000000',color: '#FFF'}, cellStyle: {width: 20, maxWidth: 20},
                                zIndex:0, maxBodyHeight: '500px', search:true, headerSelectionProps: {color: "primary"}}}
                                columns={this.state.coursePlanColumns} data={this.state.coursePlans}
                            />
                        </div>
                        <br></br>
                        <br></br>

                        <h2 id="viewStudentFormHeader">Comments
                        <button id="editStudent_addCommentbutton" className="viewStudent_button">Add Comment</button>    
                        </h2> 
                        <br></br>
                        <div style={{position: "relative", width: "50%", left: "8%"}}>
                            <MaterialTable title="Comments"  
                                actions={[
                                    {
                                      icon: 'delete',
                                      tooltip: 'Delete Comment'
                                    }
                                  ]}
                                options={{actionsColumnIndex: -1, toolbar: false, paging: false, sorting:false, headerStyle: {backgroundColor: '#000000',color: '#FFF'}, cellStyle: {width: 20, maxWidth: 20},
                                zIndex:0, maxBodyHeight: '500px', search:true, headerSelectionProps: {color: "primary"}}}
                                columns={this.state.commentColumns} data={this.state.comments}
                            />
                        </div>                   
                        <br></br>
                        <button id="viewStudentForm_edit_button" className="viewStudent_button">Save</button>
                        <button id="viewStudentForm_return_button" className="viewStudent_button">Cancel</button>
                        </div>
                </div>
            </div>
        )
    }
}

export default EditStudentScreen;
