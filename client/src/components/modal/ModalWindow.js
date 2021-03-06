import React from 'react';    
import { Link } from 'react-router-dom';
import CSVReader from "react-csv-reader";
import CourseOfferingsService from "../../services/courseOfferings.service";
import StudentService from "../../services/student.service";
import CoursePlanService from "../../services/coursePlan.service";
import CourseService from "../../services/course.service";
import PrerequisiteService from "../../services/prerequisite.service";
import DegreeRequirementService from "../../services/degreeRequirement.service";
import AuthService from '../../services/auth.service';
import AreaService from "../../services/area.service";
import SubAreaService from "../../services/subArea.service";
import AreaRequirementService from "../../services/areaRequirement.service";
import SubAreaCourseService from "../../services/subAreaCourse.service";
import RequiredCourseService from "../../services/requiredCourse.service";
import axios from "axios";

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
            degreeRequirementsFile: null,
            credit: ""
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
            for (var x = 0; x < obj.length; x++) {
                var data_temp = {
                    requirementID: obj[x].requirementID,
                    departID: obj[x].departID,
                    track: obj[x].track,
                    versionSemester: obj[x].versionSemester,
                    versionYear: obj[x].versionYear,
                    totalCredit: obj[x].totalCredit,
                    project: obj[x].project,
                    thesis: obj[x].thesis,
                    timeLimit: obj[x].timeLimit,
                    finalRecommended: obj[x].finalRecommended,
                    minGPA: obj[x].minGPA
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
                for (var i = 0; i < obj[x].area.length; i++) {
                    //console.log(obj.area.length)
                    var data_area = {
                        areaID: obj[x].area[i].areaID,
                        requirementID: obj[x].requirementID,
                        departmentID: obj[x].departID,
                        name: obj[x].area[i].name
                    };
                    console.log(data_area)
                    AreaService.create(data_area)
                    .then(response =>{
                        this.setState({
                            areaID: response.data_area.areaID,
                            requirementID: response.data_area.requirementID,
                            departmentID: response.data_area.departmentID,
                            name: response.data_area.name,
                        });
                    })
                    .catch(e => {
                        console.log(e);
                    });
                }
                for (var i = 0; i < obj[x].area.length; i++) {
                    for (var j = 0; j < obj[x].area[i].subArea.length; j++){
                        var data_subArea = {
                            areaID: obj[x].area[i].areaID,
                            subAreaID: obj[x].area[i].subArea[j].subAreaID,
                            departmentID: obj[x].departID,
                            minCourses: obj[x].area[i].subArea[j].minCourses,
                            minCredit: obj[x].area[i].subArea[j].minCredit,
                            maxCredit: obj[x].area[i].subArea[j].maxCredit,
                            maxCourse: obj[x].area[i].subArea[j].maxCourse,
                            name: obj[x].area[i].subArea[j].name
                        };
                        console.log(data_subArea)
                        SubAreaService.create(data_subArea)
                        .then(response =>{
                            this.setState({
                                areaID: response.data_subArea.areaID,
                                subAreaID: response.data_subArea.subAreaID,
                                departmentID: response.data_subArea.departmentID,
                                minCourses: response.data_subArea.minCourses,
                                minCredit: response.data_subArea.minCredit,
                                maxCredit: response.data_subArea.maxCredit,
                                maxCourse: response.data_subArea.maxCourse,
                                name: response.data_subArea.name
                            });
                        })
                        .catch(e => {
                            console.log(e);
                        });
                    }
                }
                for (var i = 0; i < obj[x].area.length; i++) {
                    var data_areaRequirement = {
                        areaID: obj[x].area[i].areaID,
                        departmentID: obj[x].departID,
                        nSubAreas: obj[x].area[i].nSubAreas,
                        nCourses: obj[x].area[i].nCourses,
                        nCredits: obj[x].area[i].nCredits
                    };
                    console.log(data_areaRequirement)
                    AreaRequirementService.create(data_areaRequirement)
                    .then(response =>{
                        this.setState({
                            areaID: response.data_areaRequirement.areaID,
                            departmentID: response.data_areaRequirement.departmentID,
                            nSubAreas: response.data_areaRequirement.nSubAreas,
                            nCourses: response.data_areaRequirement.nCourses,
                            nCredits: response.data_areaRequirement.nCredits
                        });
                    })
                    .catch(e => {
                        console.log(e);
                    });
                }
                for (var i = 0; i < obj[x].area.length; i++) {
                    for (var j = 0; j < obj[x].area[i].subArea.length; j++){
                        for (var k = 0; k < obj[x].area[i].subArea[j].courses.length; k++){

                            // var courseID = obj[x].area[i].subArea[j].courses[k].courseID
                            // axios.post("/getCourseInfo", {
                            //     courseID
                            // })
                            // .then(response => {
                            //     this.setState({
                            //         credit: response.data.credit})
                            //         return response.data;
                            // }).catch(err => console.error(err));
                            // //console.log(this.state.credit)

                            var data_subAreaCourse = {
                                    requirementID: obj[x].requirementID,
                                    courseID: obj[x].area[i].subArea[j].courses[k].courseID,
                                    departmentID: obj[x].departID,
                                    track: obj[x].track,
                                    areaID: obj[x].area[i].areaID,
                                    subAreaID: obj[x].area[i].subArea[j].subAreaID,
                                    credit: obj[x].area[i].subArea[j].courses[k].credit
                                };
                                console.log(data_subAreaCourse)
                                SubAreaCourseService.create(data_subAreaCourse)
                                .then(response =>{
                                    this.setState({
                                        requirementID: response.data_subAreaCourse.requirementID,
                                        courseID: response.data_subAreaCourse.courseID,
                                        departmentID: response.data_subAreaCourse.departmentID,
                                        track: response.data_subAreaCourse.track,
                                        areaID: response.data_subAreaCourse.areaID,
                                        subAreaID: response.data_subAreaCourse.subAreaID,
                                        credit: response.data_subAreaCourse.credit
                                    });
                                })
                                .catch(e => {
                                    console.log(e);
                                });
                        }
                    }
                }
                for (var i = 0; i < obj[x].requiredCourse.length; i++) {
                    var data_requiredCourse = {
                        requirementID: obj[x].requirementID,
                        courseID: obj[x].requiredCourse[i].courseID,
                        departmentID: obj[x].departID,
                        credit: obj[x].requiredCourse[i].credit
                    };
                        console.log(data_requiredCourse)
                        RequiredCourseService.create(data_requiredCourse)
                        .then(response =>{
                            this.setState({
                                requirementID: response.data_requiredCourse.requirementID,
                                courseID: response.data_requiredCourse.courseID,
                                departmentID: response.data_requiredCourse.departmentID,
                                credit: response.data_requiredCourse.credit
                            });
                        })
                        .catch(e => {
                            console.log(e);
                        });
                }
            }

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
                    let regexps = new RegExp('\\d*\\scredits|\\d*\-?\????\\d*\\s*credits', 'g'); //for credits
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
                departmentID: data[i].department,
                track: data[i].track,
                entrySemester: data[i].entry_semester,
                entryYear: data[i].entry_year,
                requirementVersionSemester: data[i].requirement_version_semester,
                requirementVersionYear: data[i].requirement_version_year,
                gradSemester: data[i].graduation_semester,
                gradYear: data[i].graduation_year,
                password: data[i].password,
                gpa: null,
                totalCredits: null,
                projectOption: null,
                advisor: null,
                hasGraduated: null
            };
            console.log(data_temp)
            StudentService.create(data_temp)
            .then(response => {
                this.setState({
                    studentID: response.data_temp.studentID,
                    firstName: response.data_temp.firstName,
                    lastName: response.data_temp.lastName,
                    email: response.data_temp.email,
                    departmentID: response.data_temp.departmentID,
                    track: response.data_temp.track,
                    entrySemester: response.data_temp.entrySemester,
                    entryYear: response.data_temp.entryYear,
                    requirementVersionSemester: response.data_temp.requirementVersionSemester,
                    requirementVersionYear: response.data_temp.requirementVersionYear,
                    gradSemester: response.data_temp.gradSemester,
                    gradYear: response.data_temp.gradYear,
                    password: response.data_temp.password,
                    gpa: response.data_temp.gpa,
                    totalCredits: response.data_temp.totalCredits,
                    projectOption: response.data_temp.projectOption,
                    advisor: response.data_temp.advisor,
                    hasGraduated: response.data_temp.hasGraduated
                });
                console.log(response.data_temp);
            })
            .catch(e => {
                console.log(e);
            });

            var username=data_temp.email;
            var userID=data_temp.studentID;
            var password= data_temp.password;
            AuthService.register(username,userID,password);

        }

        var plan = this.state.studentDataCoursePlans
        console.log(plan)
        
        var i
        for (i = 0; i < plan.length; i++) {

            let offeringCourseID = plan[i].department + plan[i].course_num + plan[i].semester + plan[i].year + plan[i].section;
            let courseName = plan[i].department + " " + plan[i].course_num;
            let semester = plan[i].semester + " " + plan[i].year 
            var data_plan = {
                studentID: plan[i].sbu_id,
                courseOfferingID: offeringCourseID,
                courseName: courseName,
                semester: semester,
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
                    courseName: response.data_plan.courseName,
                    semester: response.data_plan.semester,
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
            <div className="modal" id="importDegreeReqModal" header="Import" >
                <p id="modalDialogMessage">
                    <br></br>
                    Choose .json file to import:</p>
                    <br></br>
                    <input type="file" accept=".json" id="scrapeDegreeReqiormentsFileButton" onChange={this.onDegreeFileChange}/>
                    <br></br><br></br>
                    
                <br></br>
                <Link to="/gpd"><button className="modalButton" onClick={this.handleImportDegreeRequirements} >Import</button></Link>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="modalButton" modal="close" onClick={this.props.hideModalDialogPopUp} >Cancel</button>    
            </div>;
        }
        else if(this.props.modalType === "importCourseInformation"){
            modalContents =
            <div id="courseInfoModal" className="modal" header="Import" >
                <p id="modalDialogMessage">
                    <br></br>
                    Choose .txt file to import:</p><br></br>
                    <input type="file" accept=".txt" id="scrapeCourseInfoFileButton" onChange={this.onFileChange}/>
                    <br></br><br></br>
                    <p>Specify semester/year: &nbsp;
                        <select id="semesterSelectCourseScrape" className="dropdownSelect" onChange={changeSemesterOptionHandler}>
                            <option value="Fall">Fall</option>
                            <option value="Winter">Winter</option>
                            <option value="Spring">Spring</option>
                            <option value="Summer">Summer1</option>
                            <option value="Summer">Summer2</option>
                        </select>&nbsp;
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
                    </p><br></br>
                    <p>Select one or all departments to scrape: &nbsp;
                    <select id="scrapeCourseInfoDepartmentSelection" className="dropdownSelect" onChange={selectDepartmentToParseCourseInfoHandler}>
                            {optionsForDepartment}
                    </select>
                    </p>
                <br></br><br></br>
                <Link to="/gpd"><button className="modalButton" onClick={this.handleImportCourseInformation} >Import</button></Link>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="modalButton" modal="close" onClick={this.props.hideModalDialogPopUp} >Cancel</button>    
            </div>;
        }
        else if(this.props.modalType === "importCourseOfferings"){
            modalContents =
            <div className="modal" id="importCourseOfferingsModal" header="Import" >
                <p id="modalDialogMessage">
                    <br></br><br></br>
                    Choose file to import: 
                    <br></br><br></br>
                    <CSVReader
                        onFileLoaded={this.handleImportCourseOfferingsFile}
                        parserOptions={papaparseOptions}/>
                <br></br><br></br></p>
                <Link to="/gpd"><button className="modalButton" onClick={this.handleImportCourseOfferings} >Import</button></Link>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="modalButton" modal="close" onClick={this.props.hideModalDialogPopUp} >Cancel</button>    
            </div>;
        }
        else if(this.props.modalType === "importStudentData"){
            modalContents =
            <div className="modal" id="importStudentDataModal" header="Import" >
                <p id="modalDialogMessage">
                    <br></br><br></br>
                    Choose student profile file to import: 
                    <br></br><br></br>
                    <CSVReader
                        onFileLoaded={this.handleImportStudentDataFile}
                        parserOptions={papaparseOptions}/>
                    <br></br>
                    Choose student course plan file to import: 
                    <br></br><br></br>
                    <CSVReader
                        onFileLoaded={this.handleImportStudentDataCoursePlansFile}
                        parserOptions={papaparseOptions}/>
                <br></br><br></br></p>
                <Link to="/gpd"><button className="modalButton" onClick={this.handleImportStudentData} >Import</button></Link>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="modalButton" modal="close" onClick={this.props.hideModalDialogPopUp} >Cancel</button>    
            </div>;
        }
        else if(this.props.modalType === "importGrades"){
            modalContents =
            <div className="modal" id="importGradesModal" header="Import" >
                <p id="modalDialogMessage">
                    <br></br><br></br>
                    Choose file to import: 
                    <br></br><br></br>
                    <CSVReader
                        onFileLoaded={this.handleImportGradesFile}
                        parserOptions={papaparseOptions}/>
                <br></br><br></br></p>
                <Link to="/gpd"><button className="modalButton" onClick={this.handleImportGrades} >Import</button></Link>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="modalButton" modal="close" onClick={this.props.hideModalDialogPopUp} >Cancel</button>    
            </div>;
        }
        else if(this.props.modalType === "addStudent"){
            modalContents =
            <div className="modal" id="addStudentModal" header="Add" >
                <p id="modalDialogMessage">
                    <br></br>
                Do you want to add this student?
                <br></br><br></br></p>
                <Link to="/gpd"><button className="modalButton" onClick={this.props.addStudent} >Yes</button></Link>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="modalButton" modal="close" onClick={this.props.hideModalDialogPopUp} >No</button>    
            </div>;
        }
        else if(this.props.modalType === "cancelAddStudent"){
            modalContents =
            <div className="modal" id="cancelAddStudentModal" header="Cancel"  >
                <p id="modalDialogMessage"><br></br>
                Cancel adding student?
                <br></br><br></br></p>
                <Link to="/gpd"><button className="modalButton" onClick={this.props.hideModalDialogPopUp}>Yes</button></Link>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="modalButton" modal="close" onClick={this.props.hideModalDialogPopUp}>No</button> 
            </div>
        }
        else if(this.props.modalType === "deleteAllStudents"){
            modalContents =
            <div className="modal" id="deleteAllStudentsModal" header="Cancel"  >
                <p id="modalDialogMessage">
                    <br></br>
                Delete all students?
                <br></br><br></br></p>
                <Link to="/gpd"><button className="modalButton" onClick={this.props.deleteAllStudents}>Yes</button></Link>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="modalButton" modal="close" onClick={this.props.hideModalDialogPopUp}>No</button> 
            </div>
        }
        else if(this.props.modalType === "editStudent"){
            modalContents =
            <div className="modal" id="editStudent" header="Add" >
                <p id="modalDialogMessage"><br></br>
                Confirm edits to student?
                <br></br><br></br></p>
                <button className="modalButton" onClick={this.props.editStudent} >Yes</button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="modalButton" modal="close" onClick={this.props.hideModalDialogPopUp} >No</button>    
            </div>;
        }
        else if(this.props.modalType === "cancelEditStudent"){
            modalContents =
            <div className="modal" id="editStudent" header="Cancel"  >
                <p id="modalDialogMessage"> <br></br>
                Cancel editing student?
                <br></br><br></br></p>
                {/* <button className="modalButton" onClick={this.props.hideModalDialogPopUp}>Yes</button> */}
                <Link to={{pathname:'/viewStudent', state: {email: this.props.email, studentID: this.props.studentID}}}><button className="modalButton" onClick={this.props.hideModalDialogPopUp}>Yes</button></Link>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="modalButton" modal="close" onClick={this.props.hideModalDialogPopUp}>No</button> 
            </div>
            console.log("this is from MODAL for this.props");
            console.log(this.props);
        }
        else if(this.props.modalType === "editMSStudent"){
            modalContents =
            <div className="modal" id="editStudent" header="Add" >
                <p id="modalDialogMessage"><br></br>
                Confirm edits to student?
                <br></br><br></br></p>
                <button className="modalButton" onClick={this.props.editStudent} >Yes</button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="modalButton" modal="close" onClick={this.props.hideModalDialogPopUp} >No</button>    
            </div>;
        }
        else if(this.props.modalType === "cancelMSEditStudent"){
            modalContents =
            <div className="modal" id="editStudent" header="Cancel"  >
                <p id="modalDialogMessage"> <br></br>
                Cancel editing student?
                <br></br><br></br></p>
                {/* <button className="modalButton" onClick={this.props.hideModalDialogPopUp}>Yes</button> */}
                <Link to={{pathname:'/student', state: {email: this.props.email ,studentID:this.props.studentID}}}><button className="modalButton" onClick={this.props.hideModalDialogPopUp}>Yes</button></Link>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="modalButton" modal="close" onClick={this.props.hideModalDialogPopUp}>No</button> 
            </div>
            console.log("this is from MODAL for this.props");
            console.log(this.props);
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
