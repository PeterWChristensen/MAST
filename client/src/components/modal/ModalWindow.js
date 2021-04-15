import React from 'react';    
import { Link } from 'react-router-dom';
import CSVReader from "react-csv-reader";
import CourseOfferingsService from "../../services/courseOfferings.service";
import StudentService from "../../services/student.service";
import CoursePlanService from "../../services/coursePlan.service";
import CourseService from "../../services/course.service";
import PrerequisiteService from "../../services/prerequisite.service";
import DegreeRequirementService from "../../services/degreeRequirement.service";

const papaparseOptions = {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
};

const departmentSelectionOptions =  ["AMS, BMI, CSE, ESE", "All Departments", "AAS", "ACC", "AFH", "AFS", "AMS", "ANT", "ARH", "ARS", "BCB", "BDA", "BEE", "BGE", 
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
            departmentToParse: "AMS, BMI, CSE, ESE",
            departmentToParseSemester: "Fall",
            departmentToParseYear: "2021",
            courseInfoFile: null,
            degreeRequirementsFile: null
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

    onDegreeFileChange = event => {
        this.setState({degreeRequirementsFile: event.target.files[0]});
    }

    handleImportDegreeRequirements(){
        var content = " ";
        let fileReader = new FileReader();
        fileReader.readAsText(this.state.degreeRequirementsFile);
        fileReader.onloadend = function(e) {
            content = fileReader.result;
            var obj = JSON.parse(content);
            console.log(obj)
            var data_temp = {
                requirementID: obj.requirementID,
                departID: obj.departID,
                track: obj.track,
                versionSemester: obj.versionSemester,
                versionYear: obj.versionYear,
                totalCredit: obj.totalCredit,
                project: obj.project,
                thesis: obj.thesis,
                timeLimit: obj.timeLimit,
                finalRecommended: obj.finalRecommended,
                minGPA: obj.minGPA
            };
            console.log(data_temp)
            DegreeRequirementService.create(data_temp)
            .then(response => {
                this.setState({
                    requirementID: response.data_temp.requirementID,
                    departID: response.data_temp.departID,
                    track: response.data_temp.track,
                    versionSemester: response.data_temp.versionSemester,
                    versionYear: response.data_temp.versionYear,
                    totalCredit: response.data_temp.totalCredit,
                    project: response.data_temp.project,
                    thesis: response.data_temp.thesis,
                    timeLimit: response.data_temp.timeLimit,
                    finalRecommended: response.data_temp.finalRecommended,
                    minGPA: response.data_temp.minGPA
                });
                console.log(response.data_temp);
            })
            .catch(e => {
                console.log(e);
            });
        }
        this.props.hideModalDialogPopUp();
    }

    onFileChange = event => {
        this.setState({courseInfoFile: event.target.files[0]});
    }

    handleImportCourseInformation(){
        var department = [];
        /* Get departments to look for from user specification */
        if (this.state.departmentToParse === "AMS, BMI, CSE, ESE"){
            department = ["AMS", "BMI", "CSE", "ESE"]
        }
        else if(this.state.departmentToParse === "All Departments"){
            department = departmentSelectionOptions.slice(2);
        }
        else{
            department.push(this.state.departmentToParse);
        }
        /* Search file for each department in the array */
        var semester = this.state.departmentToParseSemester;
        var year = this.state.departmentToParseYear;
        var content = " ";
        let fileReader = new FileReader();
        fileReader.readAsText(this.state.courseInfoFile);
        fileReader.onloadend = function(e) {
            content = fileReader.result;
            department.forEach(function(dep){
                var regexp = new RegExp(dep + '\\s*\\d{3}:[^\\r]*\\r[^\\r]*\\r[^\\r]*\\r[^\\r]*', 'g');
                const data = [...content.matchAll(regexp)];
                data.forEach(function(course){
                    let courseInfo = course[0].split("\r");
                    let coursenameSplit = courseInfo[0].split(":");
                    let courseIdSplit = coursenameSplit[0].split(" ");
                    let courseID = courseIdSplit[0] + courseIdSplit[2];
                    let courseName = coursenameSplit[1].trim();
                    let regexps = new RegExp('\\d*\\scredits|\\d*\-?\–?\\d*\\s*credits', 'g'); //for credits
                    let regexpr = new RegExp('[A-Z]{3}\\s\\d{3}|[A-Z]{3}\\d{3}', 'g'); //for prereq
                    let credits = ""
                    let preReqsArray = []
                    if(courseInfo[2].includes("credits")){
                        let creditRow = courseInfo[2].match(regexps);
                        let creditSplit = creditRow[0].split(" ");
                        credits = creditSplit[0];
                    }
                    if(courseInfo[2].includes("Prerequisites")){
                        let prereqRow = [courseInfo[2].match(regexpr)];
                        if(prereqRow!=null){
                            preReqsArray = prereqRow;
                        }
                    }
                    var courseData = {
                        courseID: courseID,
                        departID: dep,
                        name: courseName,
                        description: courseInfo[1],
                        credits: credits,
                        semester: semester,
                        year: year
                    };
                    //console.log(courseData);
                    CourseService.create(courseData)
                     .then(response => {
                         this.setState({
                             courseID: response.courseData.courseID,
                             departID: response.courseData.departID,
                             name: response.courseData.name,
                             description: response.courseData.description,
                             credits: response.courseData.credits,
                             semester: response.courseData.semester,
                             year: response.courseData.year
                         });
                         console.log(response.data);
                     })
                     .catch(e => {
                         console.log(e);
                     });
                    preReqsArray.forEach(function(prereq) {
                        let prereqInfo = prereq[0].split(" ");
                        let prerequisiteID = prereqInfo[0] + prereqInfo[1];
                        var prereqData = {
                            courseID: courseData.courseID,
                            prerequisiteID: prerequisiteID
                        };
                        console.log(prereqData);
                        PrerequisiteService.create(prereqData)
                        .then(response => {
                            this.setState({
                                courseID: response.prereqData.courseID,
                                prerequisiteID: response.prereqData.prerequisiteID
                            });
                            console.log(response.data);
                        })
                        .catch(e => {
                            console.log(e);
                        });
                    });
                });
            });
        }
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
        console.log(plan)
        
        var i
        for (i = 0; i < plan.length; i++) {

            let offeringCourseID = plan[i].department + plan[i].course_num + plan[i].semester + plan[i].year + plan[i].section;

            var data_plan = {
                studentID: plan[i].sbu_id,
                courseOfferingID: offeringCourseID,
                grade: plan[i].grade
            };
            console.log(data_plan.studentID)
            console.log(data_plan.courseOfferingID)
            console.log(data_plan.grade)

            CoursePlanService.create(data_plan)
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
            CoursePlanService.create(data)
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

        const changeSemesterOptionHandler = (event) => { 
            this.setState({departmentToParseSemester: event.target.value}); 
        }; 
        const changeYearOptionHandler = (event) => { 
            this.setState({departmentToParseYear: event.target.value}); 
        }; 

        // Type variable to store modal to display
        let modalContents = null; 

        if(this.props.modalType === "importDegreeRequirements"){
            modalContents =
            <div className="modal" id="import" header="Import" >
                <p id="modalDialogMessage">
                    <br></br>
                    Choose .json file to import:</p>
                    <br></br>
                    <input type="file" accept=".json" id="scrapeDegreeReqiormentsFileButton" onChange={this.onDegreeFileChange}/>
                    <br></br><br></br>
                    
                <br></br>
                <Link to="/"><button className="modalButton" onClick={this.handleImportDegreeRequirements} >Import</button></Link>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="modalButton" modal="close" onClick={this.props.hideModalDialogPopUp} >Cancel</button>    
            </div>;
        }
        else if(this.props.modalType === "importCourseInformation"){
            modalContents =
            <div id="modalCourseInfo" className="modal" header="Import" >
                <p id="modalDialogMessage">
                    <br></br>
                    Choose .txt file to import:</p><br></br>
                    <input type="file" accept=".txt" id="scrapeCourseInfoFileButton" onChange={this.onFileChange}/>
                    <br></br><br></br>
                    <p>Specify semester/year:
                        <select id="semesterSelectCourseScrape" className="dropdownSelect" onChange={changeSemesterOptionHandler}>
                            <option value="Fall">Fall</option>
                            <option value="Winter">Winter</option>
                            <option value="Spring">Spring</option>
                            <option value="Summer">Summer1</option>
                            <option value="Summer">Summer2</option>
                        </select>
                        <select id="yearSelectCourseScrape" className="dropdownSelect" onChange={changeYearOptionHandler}>
                            <option value="2021">2021</option>
                            <option value="2020">2020</option>
                            <option value="2019">2019</option>
                            <option value="2018">2018</option>
                            <option value="2017">2017</option>
                            <option value="2016">2016</option>
                            <option value="2015">2015</option>
                            <option value="2014">2014</option>
                            <option value="2013">2013</option>
                            <option value="2012">2012</option>
                            <option value="2011">2011</option>
                            <option value="2010">2010</option>
                            <option value="2009">2009</option>
                            <option value="2008">2008</option>
                            <option value="2007">2007</option>
                            <option value="2006">2006</option>
                            <option value="2005">2005</option>
                            <option value="2004">2004</option>
                            <option value="2003">2003</option>
                            <option value="2002">2002</option>
                            <option value="2001">2001</option>
                            <option value="2000">2000</option>
                            <option value="1999">1999</option>
                            <option value="1998">1998</option>
                            <option value="1997">1997</option>
                            <option value="1996">1996</option>
                            <option value="1995">1995</option>
                            <option value="1994">1994</option>
                            <option value="1993">1993</option>
                            <option value="1992">1992</option>
                            <option value="1991">1991</option>
                            <option value="1990">1990</option>
                        </select>
                    </p>
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
