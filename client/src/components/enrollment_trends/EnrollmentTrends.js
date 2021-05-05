import React, {Component} from 'react';
import Graph from './Graph.js';
import CourseService from "../../services/course.service";
import CoursePlanService from "../../services/coursePlan.service";
import axios from "axios";

class EnrollmentTrends extends Component {
    constructor(props){
        super(props)
        this.state = { 
            toggleDropDown: false,
            departmentID: "ALL",
            startSemester: "Fall",
            startYear: 2021,
            endSemester: "Fall",
            endYear: 2025,
            numSelectedCourses: 0,
            coursesForGraph: [],
            courses1: [],
            coursePlans1:[],
            semestersForGraph: ["Fall 2021", "Winter 2022", "Spring 2022"],            
            courses: [{courseID: "AMS503"}, {courseID: "AMS534"}, {courseID: "AMS555"}, {courseID: "BMI500"}, {courseID: "BMI502"}, {courseID: "CSE506"},{courseID:  "CSE508"}, {courseID: "CSE510"}, {courseID: "CSE534"}, {courseID: "ESE532"}, {courseID: "ESE533"}],
            coursePlans: [{courseOfferingID: "CSE508Fall20212", courseName: "CSE 508", semester: "Fall 2021", grade: "A"}, {courseOfferingID: "CSE508Fall20212", courseName: "CSE 508", semester: "Fall 2021", grade: "A"}, 
            {courseOfferingID: "CSE508Spring20221", courseName: "CSE 508", semester: "Spring 2022", grade: ""}, {courseOfferingID: "CSE508Spring20221", courseName: "CSE 508", semester: "Spring 2022", grade: ""}, {courseOfferingID: "CSE508Spring20221", courseName: "CSE 508", semester: "Spring 2022", grade: ""}, {courseOfferingID: "CSE508Spring20221", courseName: "CSE 508", semester: "Spring 2022", grade: ""}, {courseOfferingID: "CSE508Spring20221", courseName: "CSE 508", semester: "Spring 2022", grade: ""}, {courseOfferingID: "CSE508Spring20221", courseName: "CSE 508", semester: "Spring 2022", grade: ""},
            {courseOfferingID: "CSE510Spring20221", courseName: "CSE 510", semester: "Spring 2022", grade: ""}, {courseOfferingID: "CSE534Winter20221", courseName: "CSE 534", semester: "Winter 2022", grade: ""}, 
            {courseOfferingID: "CSE508Winter20221", courseName: "CSE 534", semester: "Winter 2022", grade: ""}], //array of courseplans, having courseName and semester
            dataForGraph: [{course: "CSE 508", semester: "Fall 2021", frequency: 2}, {course: "CSE 508", semester: "Winter 2022", frequency: 3}, {course: "CSE 508", semester: "Spring 2022", frequency: 8}, 
            {course: "CSE 506", semester: "Fall 2021", frequency: 7}, {course: "CSE 506", semester: "Winter 2022", frequency: 6}, {course: "CSE 506", semester: "Spring 2022", frequency: 4}]
        }
    }

    componentDidMount() {
        CourseService.getAll()
            .then(response => {
                console.log(response.data);
                this.setState({courses: response.data});
            })
            .catch(e => {
                console.log(e);
            });
        
        CoursePlanService.getAll()
        .then(response => {
            console.log(response.data);
            this.setState({coursePlans: response.data});
        })
        .catch(e => {
            console.log(e);
        });

        axios.get("/getAllCourse")
            .then(response => {
                this.setState({courses1: response.data});
                // console.log("===================CourseService.getAllCourse()");
                // console.log(response.data);
                return response.data;
            }).catch(err => console.error(err));

        axios.get("/getAllCoursePlan")
        .then(response => {
            this.setState({coursePlans1: response.data});
            console.log("===================CourseService.getAllCoursePlan()");
            console.log(response.data);
            return response.data;
        }).catch(err => console.error(err));

        
    }

    
    toggleDropDownState = () => {
        this.setState(({ toggleDropDown }) => ({ toggleDropDown: !toggleDropDown }));
    }

    changeCourseToGraph = (event) => { 
        var courseArr = this.state.coursesForGraph
        var numSelected = this.state.numSelectedCourses
        if (event.target.checked == true){
            if (courseArr.includes(event.target.value) == false){
                courseArr.push(event.target.value)
                numSelected = numSelected + 1
                this.setState({coursesForGraph: courseArr, numSelectedCourses: numSelected})
            }
        }else{ //If checked is false, then user unclicked so remove from array
            var index = courseArr.indexOf(event.target.value);
            if (index > -1) {
                courseArr.splice(index, 1);
            }
            numSelected = numSelected - 1
            this.setState({coursesForGraph: courseArr, numSelectedCourses: numSelected})
        }
    };

    processGraphData = () => {
        //Process Range of Semesters
        var semesterOrder = ["Winter", "Spring", "Summer1", "Summer2", "Fall"] //Semester order if same year
        var semesters = [] //To store semesters for graph = x-axis
        var courseplans = this.state.coursePlans
        var year = this.state.startYear
        var startSemesterIndex = semesterOrder.indexOf(this.state.startSemester)
        var endSemesterIndex = semesterOrder.indexOf(this.state.endSemester)
        var endYear = this.state.endYear
        if (this.state.startYear == this.state.endYear){ //Same Years
            if (this.state.startSemester == this.state.endSemester){ //Same Semester
                semesters.push(this.state.startSemester + " " + this.state.startYear)
            }
            else{ //Different Semester, Same Year
                for(var i=startSemesterIndex; i < semesterOrder.length; i++){
                    semesters.push(semesterOrder[i] + " " + year)
                }
            }
        }
        else{ //Different Years
            for(var i=startSemesterIndex; i < semesterOrder.length; i++){ //Do initial semesters in initial same year
                semesters.push(semesterOrder[i] + " " + year)
            }
            var nextyear = year + 1;
            for(var y=nextyear; y <= endYear; y++){
                for(var i=0; i < semesterOrder.length; i++){
                    if (y==endYear){
                        if(i == endSemesterIndex){
                            semesters.push(semesterOrder[i] + " " + y)
                            break
                        }
                        else{
                            semesters.push(semesterOrder[i] + " " + y)
                        }
                    }
                    else{
                        semesters.push(semesterOrder[i] + " " + y)
                    }
                }
            }
        }
       
        var dataForGraphTemp = [] //Store data for graph to set state with
        
        //Find count of each course based on semester
        this.state.coursesForGraph.forEach((course) => { //Go through each course in the list of courses to graph
            var semestersOfCourse = new Map();
            for(var c=0; c < courseplans.length; c++){ //Go through each courseplan for the specific course
                if (courseplans[c].courseOfferingID.substring(0, 6)===course){ //Course Found
                    if (semesters.includes(courseplans[c].semester) == true){
                        if (semestersOfCourse.has(courseplans[c].semester) == false){ //Semester not in map so add it with frequency of 1
                            semestersOfCourse.set(courseplans[c].semester, 1);
                        }
                        else{ //Semester in map so increment frequency of course being taken in that semester
                            let frequency = semestersOfCourse.get(courseplans[c].semester) + 1;
                            semestersOfCourse.set(courseplans[c].semester, frequency);
                        }
                    }
                }
                //Semester in range bbut not in map; Add with a frequency of 0
                for(var i=0; i < semesters.length; i++){
                    if (semestersOfCourse.has(semesters[i]) == false){ 
                        semestersOfCourse.set(semesters[i], 0);
                    }
                }
            }
            //Process SemestersOfCourse into obj to store into dataForGraph
            semestersOfCourse.forEach( function(frequency, semester){
                let newDataPoint = {course: course, semester: semester, frequency: frequency}
                dataForGraphTemp.push(newDataPoint)
            });
        });

        //Set state for graph variables; dataForGraph are the datapoints and semestersForGraph is the x-axis
        this.setState({dataForGraph: dataForGraphTemp, semestersForGraph: semesters})
    }

    resetCourseSelection = () => {
        var emptyArr = []
        var toggleDropDownNew = this.state.toggleDropDown
        this.setState({coursesForGraph: emptyArr, numSelectedCourses: 0, toggleDropDown: !toggleDropDownNew})
    }

    render() {
        const changeDepartmentOptionHandler = (event) => { 
            var toggleDropDownNew = this.state.toggleDropDown
            this.setState({departmentID: event.target.value, toggleDropDown: !toggleDropDownNew}); 
        }; 

        const changeStartSemesterOptionHandler = (event) => { 
            this.setState({startSemester: event.target.value}); 
        }; 
        const changeStartYearOptionHandler = (event) => { 
            var year = parseInt(event.target.value)
            this.setState({startYear: year}); 
        }; 

        const changeEndSemesterOptionHandler = (event) => { 
            this.setState({endSemester: event.target.value}); 
        }; 

        const changeEndYearOptionHandler = (event) => { 
            var year = parseInt(event.target.value)
            this.setState({endYear: year}); 
        }; 

        //Display Course List
        var options = <label/>
        if(this.state.toggleDropDown==true){
            if (this.state.departmentID === "ALL"){
                if (this.state.numSelectedCourses == 10){
                    options = this.state.courses.map((el) =>{
                        if (this.state.coursesForGraph.includes(el.courseID)){
                            return <label key={el.courseID} style={{hidden: "true"}}> <input type="checkbox" value={el.courseID} onClick={(e) => this.changeCourseToGraph(e)} defaultChecked disabled/> {el.courseID} </label>                
                        }
                        else{
                            return <label key={el.courseID} style={{hidden: "true"}}> <input type="checkbox" value={el.courseID} onClick={(e) => this.changeCourseToGraph(e)} disabled/> {el.courseID} </label>                
                        }
                    }); 
                }else{
                    options = this.state.courses.map((el) => {
                        if (this.state.coursesForGraph.includes(el.courseID)){
                            return <label key={el.courseID} style={{hidden: "true"}}> <input type="checkbox" value={el.courseID} onClick={(e) => this.changeCourseToGraph(e)} defaultChecked/> {el.courseID} </label>                
                        }
                        else{
                            return <label key={el.courseID} style={{hidden: "true"}}> <input type="checkbox" value={el.courseID} onClick={(e) => this.changeCourseToGraph(e)}/> {el.courseID} </label>                
                        }
                    }); 
                }
            }else{
                var department = this.state.departmentID
                var filteredCourses = []
                //Get array of filtered courses
                this.state.courses.forEach( function(course){
                    if(course.courseID.substring(0, 3) === department){
                        filteredCourses.push(course.courseID)
                    }
                });
                if (this.state.numSelectedCourses == 10){//filteredCourses.map((el) =><label key={el} style={{hidden: "true"}}> <input type="checkbox" value={el} onClick={(e) => this.changeCourseToGraph(e)} disabled/> {el} </label>); 
                    options = filteredCourses.map((el) =>{
                        if (this.state.coursesForGraph.includes(el)){
                            return <label key={el} style={{hidden: "true"}}> <input type="checkbox" value={el} onClick={(e) => this.changeCourseToGraph(e)} defaultChecked disabled/> {el} </label>                
                        }
                        else{
                            return <label key={el} style={{hidden: "true"}}> <input type="checkbox" value={el} onClick={(e) => this.changeCourseToGraph(e)} disabled/> {el} </label>                
                        }
                    }); 
                }else{
                    options = filteredCourses.map((el) =>{
                        if (this.state.coursesForGraph.includes(el)){
                            return <label key={el} style={{hidden: "true"}}> <input type="checkbox" value={el} onClick={(e) => this.changeCourseToGraph(e)} defaultChecked/> {el} </label>                
                        }
                        else{
                            return <label key={el} style={{hidden: "true"}}> <input type="checkbox" value={el} onClick={(e) => this.changeCourseToGraph(e)}/> {el} </label>                
                        }
                    }); 
                }
            }
        }

    return (
        <div id="enrollmentTrendsBackground">
            <div id="enrollmentTrendsForm">
                <br></br><br></br><br></br><br></br><br></br>
                <h2 id="enrollmentTrendsHeader">Enrollment Trends</h2>
                <div className="enrollmentTrends_prompt">
                    <br></br><br></br>
                    <div id="enrollmentTrendGraph">
                    <Graph data={this.state.dataForGraph} semesters={this.state.semestersForGraph} divID={"enrollmentTrendGraph"} />
                    </div>
                    <br></br><br></br><br></br>
                    <text id="selectcoursetext">Select up to 10 courses</text>&emsp;&ensp;<text id="selectcoursetext">Department Filter</text>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;<text id="selectcoursetext">Range of Semesters</text>
                    <br></br>
                    <button ctype="button" className="enrollmentTrendsButton" onClick={() => this.toggleDropDownState()}>
                        Select Courses
                    </button>
                    <select id="departmentSelect" className="enrollmentTrendsYearDropdown" defaultValue={this.state.departmentID} onChange={changeDepartmentOptionHandler}>
                            <option value="ALL">ALL</option>
                            <option value="AMS">AMS</option>
                            <option value="BMI">BMI</option>
                            <option value="ESE">ESE</option>
                            <option value="CSE">CSE</option>
                    </select>
                    <select id="semesterSelect" className="enrollmentTrendsSemesterDropdown" defaultValue={this.state.startSemester} onChange={changeStartSemesterOptionHandler}>
                        <option value="Fall">Fall</option>
                        <option value="Winter">Winter</option>
                        <option value="Spring">Spring</option>
                        <option value="Summer1">Summer1</option>
                        <option value="Summer2">Summer2</option>
                    </select>
                    <select id="entryYearSelect" className="enrollmentTrendsYearDropdown" defaultValue={this.state.startYear} onChange={changeStartYearOptionHandler}>
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
                    <select id="gradSemesterSelect" className="enrollmentTrendsSemesterDropdown" defaultValue={this.state.endSemester} onChange={changeEndSemesterOptionHandler}>
                        <option value="Fall">Fall</option>
                        <option value="Winter">Winter</option>
                        <option value="Spring">Spring</option>
                        <option value="Summer1">Summer1</option>
                        <option value="Summer2">Summer2</option>
                    </select>
                    <select id="gradYearSelect" className="enrollmentTrendsYearDropdown" defaultValue={this.state.endYear} onChange={changeEndYearOptionHandler}>
                        <option value="2025">2025</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
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
                    <form id="dropdownCourses" className="dropdown-menu" >                        
                        {options}
                    </form>  
                    <button id="enrollmentcourseresetbutton" className="enrollmentTrendsButton" onClick={() => this.resetCourseSelection()}>Reset Courses</button>
                    <button ctype="button" id="generateGraphButton" className="enrollmentTrendsButton" onClick={() => this.processGraphData()}>
                        Generate Graph
                    </button>  
                                
                </div>
            </div>
        </div>
    );
    }
}

export default EnrollmentTrends;