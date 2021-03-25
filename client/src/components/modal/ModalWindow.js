import React from 'react';    
import { Link } from 'react-router-dom';
import CSVReader from "react-csv-reader";
import CourseOfferingsService from "../../services/courseOfferings.service";
import GradeService from "../../services/importGrade.service";
import StudentService from "../../services/student.service";
import CoursePlanService from "../../services/coursePlan.service";

const papaparseOptions = {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
};

const departmentSelectionOptions =  ["This Project", "All Departments", "AAS", "ACC", "AFH", "AFS", "AMS", "ANT", "ARH", "ARS", "BCB", "BDA", "BEE", "BGE", 
        "BIO", "BME", "BMI", "BNB", "BSB", "BUS", "CAR", "CHE", "CHI", "CIV", "CLT", "CME", "CSE", "CSM", "CST", "CWL", "DAN", "DCS", "DPA", "ECO", 
        "EGL", "EHM", "EMP", "ESE", "ESL", "ESM", "ESS", "EST", "EUR", "EXT", "FIN", "FLA", "FLM", "FRN", "FSY", "GEO", "GER", "GRD", "GSS", "HAX", 
        "HBA", "HBH", "HBM", "HBP", "HBY", "HCB", "HDO", "HIS", "HPD", "HPH", "HWC", "IAP", "IDC", "ISE", "ITL", "JPN", "JRN", "KOR", "LAT", "LIN", 
        "MAE", "MAR", "MAR-S", "MAT", "MBA", "MCB", "MEC", "MKT", "MST", "MUS", "NET", "NEU", "NUR", "OAE", "PHI", "PHY", "POL", "POR", "PSY",
         "RUS", "SCI", "SLV", "SOC", "SPN", "SUS", "TAF", "THR", "TMP", "VIP", "WNS", "WRT", "WST"];

class ModalWindow extends React.Component {  
    constructor(props){
        super(props)
        this.state = {
            /* These state objects will hold the parsed info from files to be uploaded upon pressing import button */
            degreeRequirements: "none",
            courseInformation: "none",
            courseOfferings: "none",
            studentData: "none",
            studentDataCoursePlans: "none",
            grades: "none",
            departmentToParse: "This Project"
        }
        this.handleImportDegreeRequirementsFile = this.handleImportDegreeRequirementsFile.bind(this);
        this.handleImportCourseInformationFile = this.handleImportCourseInformationFile.bind(this);
        this.handleImportCourseOfferingsFile = this.handleImportCourseOfferingsFile.bind(this);  
        this.handleImportStudentDataFile = this.handleImportStudentDataFile.bind(this);
        this.handleImportStudentDataCoursePlansFile = this.handleImportStudentDataCoursePlansFile.bind(this);
        this.handleImportGradesFile = this.handleImportGradesFile.bind(this);
        this.handleImportDegreeRequirements = this.handleImportDegreeRequirements.bind(this);
        this.handleImportCourseInformation = this.handleImportCourseInformation.bind(this);
        this.handleImportCourseOfferings = this.handleImportCourseOfferings.bind(this);  
        this.handleImportStudentData = this.handleImportStudentData.bind(this);
        //this.handleImportStudentDataCoursePlans = this.handleImportStudentDataCoursePlans.bind(this);
        this.handleImportGrades = this.handleImportGrades.bind(this);
    }

    /* Following functions handle data from files */
    handleImportDegreeRequirementsFile(){
        
    }

    handleImportCourseInformationFile(){
        
    }

    handleImportCourseOfferingsFile = function(data, fileInfo) {
        this.setState({courseOfferings: data});
    }

    handleImportStudentDataFile = function(data, fileInfo) {
        this.setState({studentData: data});

    }

    handleImportStudentDataCoursePlansFile = function(data, fileInfo) {
        this.setState({studentDataCoursePlans: data});

    }

    handleImportGradesFile = function(data, fileInfo) {
        this.setState({grades: data});
    }
    

    /* Following functions upload data to the database */
    handleImportDegreeRequirements(){
    
    }

    handleImportCourseInformation(){
        var department = [];
        /* Get departments to look for from user specification */
        if (this.state.departmentToParse === "This Project"){
            department = ["AMS, BMI, CSE, ECE"]
        }
        else if(this.state.departmentToParse === "All Departments"){
            department = departmentSelectionOptions.slice(2);
        }
        else{
            department.push(this.state.departmentToParse);
        }
        console.log(department);
        /* Search file for each department in the array */


        this.props.hideModalDialogPopUp();
    }

    handleImportCourseOfferings(){
        this.state.courseOfferings.forEach(function (offering) {

            let timeslot = offering.timeslot;
            let timeslotSplit = timeslot.split(' ');
            let timeSplit = timeslotSplit[1].split('-');
            let dayString = timeslotSplit[0];
            let startTimeString = timeSplit[0];
            let endTimeString = timeSplit[1];
            
            let offeringCourseID = offering.department + offering.course_num;
            let courseOfferingIDNum = offeringCourseID + offering.semester + offering.year + offering.section;
            var data = {
                courseOfferingID: courseOfferingIDNum,
                courseID: offeringCourseID,
                semester: offering.semester,
                year: offering.year,
                section: offering.section,
                day: dayString,
                startTime: startTimeString,
                endTime: endTimeString
            };
            CourseOfferingsService.create(data)
            .then(response => {
                this.setState({
                    courseOfferingID: response.data.courseOfferingID,
                    courseID: response.data.courseID,
                    semester: response.data.semester,
                    year: response.year,
                    section: response.section, 
                    day: response.day,
                    startTime: response.startTime,
                    endTime: response.endTime
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        });
        this.props.hideModalDialogPopUp();
    }

    handleImportStudentData(){
        var data = this.state.studentData
        var i
        for (i = 0; i < data.length; i++) {
            var data_temp = {
                studentID: data[i].sbu_id,
                firstName: data[i].first_name,
                lastName: data[i].last_name,
                email: data[i].email,
                department: data[i].department,
                track: data[i].track,
                entrySemester: data[i].entry_semester,
                entryYear: data[i].entry_year,
                requirementVersionSemester: data[i].requirement_version_semester,
                requirementVersionYear: data[i].requirement_version_year,
                graduationSemester: data[i].graduation_semester,
                graduationYear: data[i].graduation_year,
                password: data[i].password
            };
            console.log(data_temp)
            StudentService.create(data_temp)
            .then(response => {
                this.setState({
                    studentID: response.data_temp.studentID,
                    firstName: response.data_temp.firstName,
                    lastName: response.data_temp.lastName,
                    email: response.data_temp.email,
                    department: response.data_temp.department,
                    track: response.data_temp.track,
                    entrySemester: response.data_temp.entrySemester,
                    entryYear: response.data_temp.entryYear,
                    requirementVersionSemester: response.data_temp.requirementVersionSemester,
                    requirementVersionYear: response.data_temp.requirementVersionYear,
                    graduationSemester: response.data_temp.graduationSemester,
                    graduationYear: response.data_temp.graduationYear,
                    password: response.data_temp.password
                });
                console.log(response.data_temp);
            })
            .catch(e => {
                console.log(e);
            });
        }

        var plan = this.state.studentDataCoursePlans
        
        var i
        for (i = 0; i < plan.length; i++) {

            let offeringCourseID = plan[i].department + plan[i].course_num;

            var data_plan = {
                studentID: plan[i].sbu_id,
                courseOfferingID: offeringCourseID,
                grade: plan[i].grade
            };
            console.log(data_plan.studentID)
            console.log(data_plan.courseOfferingID)
            console.log(data_plan.grade)

            GradeService.create(data_plan)
            .then(response => {
                this.setState({
                    studentID: response.data_plan.studentID,
                    courseOfferingID: response.data_plan.courseOfferingID,
                    grade: response.data_plan.grade
                });
                console.log(response.data_plan);
            })
            .catch(e => {
                console.log(e);
            });
        }

        this.props.hideModalDialogPopUp();
    }

    handleImportGrades() {
        this.state.grades.forEach(function (info) {
            let offeringCourseID = info.department + info.course_num;
            let courseOfferingIDNum = offeringCourseID + info.semester + info.year + info.section;
            console.log("courseOfferingIDNum& studentID=");
            console.log(courseOfferingIDNum);
            console.log(info.sbu_id);
            console.log(info.grade);
            var data = {
                studentID: info.sbu_id,
                courseOfferingID: courseOfferingIDNum,
                grade: info.grade
            };
            console.log("Before create service");            
            GradeService.create(data)
            .then(response => {
                this.setState({
                    studentID: response.data.studentID,
                    courseOfferingID: response.data.courseOfferingID,
                    grade: response.data.grade
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
                console.log("Error create service");
            });
            //actually after this. I need to update courseOffering with all the new info such as section etc.
        });
        this.props.hideModalDialogPopUp();
    }

    render(){

        let optionsForDepartment = departmentSelectionOptions.map((el) => <option key={el}>{el}</option>);

        const selectDepartmentToParseCourseInfoHandler = (event) => { 
            this.setState({departmentToParse: event.target.value}); 
        };

        // Type variable to store modal to display
        let modalContents = null; 

        if(this.props.modalType === "importDegreeRequirements"){
            modalContents =
            <div className="modal" id="import" header="Import" >
                <p id="modalDialogMessage">
                    <br></br><br></br>
                    
                <br></br></p>
                <Link to="/"><button className="modalButton" onClick={this.handleImportDegreeRequirements, this.props.hideModalDialogPopUp} >Import</button></Link>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="modalButton" modal="close" onClick={this.props.hideModalDialogPopUp} >Cancel</button>    
            </div>;
        }
        else if(this.props.modalType === "importCourseInformation"){
            modalContents =
            <div className="modal" id="import" header="Import" >
                <p id="modalDialogMessage">
                    <br></br>
                    Choose .txt file to import:</p><br></br>
                    <input type="file" accept=".txt" id="scrapeCourseInfoFileButton"/>
                    <br></br><br></br>
                    <p>Select one or all departments to scrape: 
                    <select id="scrapeCourseInfoDepartmentSelection" className="dropdownSelect" onChange={selectDepartmentToParseCourseInfoHandler}>
                            {optionsForDepartment}
                    </select>
                    </p>
                               
                <br></br>
                <Link to="/"><button className="modalButton" onClick={this.handleImportCourseInformation} >Import</button></Link>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="modalButton" modal="close" onClick={this.props.hideModalDialogPopUp} >Cancel</button>    
            </div>;
        }
        else if(this.props.modalType === "importCourseOfferings"){
            modalContents =
            <div className="modal" id="import" header="Import" >
                <p id="modalDialogMessage">
                    <br></br><br></br>
                    <CSVReader
                        label="Choose file to import: "
                        onFileLoaded={this.handleImportCourseOfferingsFile}
                        parserOptions={papaparseOptions}/>
                <br></br><br></br></p>
                <Link to="/"><button className="modalButton" onClick={this.handleImportCourseOfferings} >Import</button></Link>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="modalButton" modal="close" onClick={this.props.hideModalDialogPopUp} >Cancel</button>    
            </div>;
        }
        else if(this.props.modalType === "importStudentData"){
            modalContents =
            <div className="modal" id="import" header="Import" >
                <p id="modalDialogMessage">
                    <br></br><br></br>
                    <CSVReader
                        label="Choose student profile file to import: "
                        onFileLoaded={this.handleImportStudentDataFile}
                        parserOptions={papaparseOptions}/>
                    <CSVReader
                        label="Choose student course plan file to import: "
                        onFileLoaded={this.handleImportStudentDataCoursePlansFile}
                        parserOptions={papaparseOptions}/>
                <br></br><br></br></p>
                <Link to="/"><button className="modalButton" onClick={this.handleImportStudentData} >Import</button></Link>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="modalButton" modal="close" onClick={this.props.hideModalDialogPopUp} >Cancel</button>    
            </div>;
        }
        else if(this.props.modalType === "importGrades"){
            modalContents =
            <div className="modal" id="import" header="Import" >
                <p id="modalDialogMessage">
                    <br></br><br></br>
                    <CSVReader
                        label="Choose file to import: "
                        onFileLoaded={this.handleImportGradesFile}
                        parserOptions={papaparseOptions}/>
                <br></br><br></br></p>
                <Link to="/"><button className="modalButton" onClick={this.handleImportGrades} >Import</button></Link>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="modalButton" modal="close" onClick={this.props.hideModalDialogPopUp} >Cancel</button>    
            </div>;
        }
        else if(this.props.modalType === "addStudent"){
            modalContents =
            <div className="modal" id="addStudent" header="Add" >
                <p id="modalDialogMessage">
                Do you want to add this student?
                <br></br><br></br></p>
                <Link to="/"><button className="modalButton" onClick={this.props.addStudent} >Yes</button></Link>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="modalButton" modal="close" onClick={this.props.hideModalDialogPopUp} >No</button>    
            </div>;
        }
        else if(this.props.modalType === "cancelAddStudent"){
            modalContents =
            <div className="modal" id="cancelAddStudent" header="Cancel"  >
                <p id="modalDialogMessage">
                Cancel adding student?
                <br></br><br></br></p>
                <Link to="/"><button className="modalButton" onClick={this.props.hideModalDialogPopUp}>Yes</button></Link>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="modalButton" modal="close" onClick={this.props.hideModalDialogPopUp}>No</button> 
            </div>
        }
        else if(this.props.modalType === "deleteAllStudents"){
            modalContents =
            <div className="modal" id="deleteAllStudents" header="Cancel"  >
                <p id="modalDialogMessage">
                Delete all students?
                <br></br><br></br></p>
                <Link to="/"><button className="modalButton" onClick={this.props.deleteAllStudents}>Yes</button></Link>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="modalButton" modal="close" onClick={this.props.hideModalDialogPopUp}>No</button> 
            </div>
        }
        return (  
        <div>
            <div id = "modal_background">
                    {modalContents}
            </div>
        </div>
        );  
    }  
}  
export default ModalWindow;
