import React, {Component} from 'react';
import Graph from './Graph.js';

class EnrollmentTrends extends Component {
    constructor(props){
        super(props)
        this.state = { 
            toggleDropDown: false,
            startSemester: "Fall",
            startYear: 2021,
            endSemester: "Fall",
            endYear: 2025,
            coursesForGraph: ["CSE 506", "CSE 508"],
            semestersForGraph: ["Fall 2021", "Winter 2022", "Spring 2022"],            
            courses: ["AMS 503", "AMS 555", "BME 500", "BME 502", "CSE 506", "CSE 508", "CSE 510", "CSE 534", "EST 532", "EST 533"], //array of Courses.courseName
            coursePlans: [{courseOfferingID: "CSE508Fall20212", courseName: "CSE 508", semester: "Fall 2021", grade: "A"}, {courseOfferingID: "CSE508Fall20212", courseName: "CSE 508", semester: "Fall 2021", grade: "A"}, 
            {courseOfferingID: "CSE508Spring20221", courseName: "CSE 508", semester: "Spring 2022", grade: ""}, {courseOfferingID: "CSE508Spring20221", courseName: "CSE 508", semester: "Spring 2022", grade: ""}, {courseOfferingID: "CSE508Spring20221", courseName: "CSE 508", semester: "Spring 2022", grade: ""}, {courseOfferingID: "CSE508Spring20221", courseName: "CSE 508", semester: "Spring 2022", grade: ""}, {courseOfferingID: "CSE508Spring20221", courseName: "CSE 508", semester: "Spring 2022", grade: ""}, {courseOfferingID: "CSE508Spring20221", courseName: "CSE 508", semester: "Spring 2022", grade: ""},
            {courseOfferingID: "CSE510Spring20221", courseName: "CSE 510", semester: "Spring 2022", grade: ""}, {courseOfferingID: "CSE534Winter20221", courseName: "CSE 534", semester: "Winter 2022", grade: ""}, 
            {courseOfferingID: "CSE508Winter20221", courseName: "CSE 534", semester: "Winter 2022", grade: ""}], //array of courseplans, having courseName and semester
            dataForGraph: [{course: "CSE 508", semester: "Fall 2021", frequency: 2}, {course: "CSE 508", semester: "Winter 2022", frequency: 3}, {course: "CSE 508", semester: "Spring 2022", frequency: 8}, 
            {course: "CSE 506", semester: "Fall 2021", frequency: 7}, {course: "CSE 506", semester: "Winter 2022", frequency: 6}, {course: "CSE 506", semester: "Spring 2022", frequency: 4}]
        }
    }
    
    toggleDropDownState = () => {
        this.setState(({ toggleDropDown }) => ({ toggleDropDown: !toggleDropDown }));
    }

    changeCourseToGraph = (event) => { 
        var courseArr = this.state.coursesForGraph
        if (event.target.checked == true){
            if (courseArr.includes(event.target.value) == false){
                courseArr.push(event.target.value)
                this.setState({coursesForGraph: courseArr})
            }
        }else{ //If checked is false, then user unclicked so remove from array
            var index = courseArr.indexOf(event.target.value);
            if (index > -1) {
                courseArr.splice(index, 1);
            }
            this.setState({coursesForGraph: courseArr})
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
                if (courseplans[c].courseName===course){ //Course Found
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

    renderGraph = () => {

    }

    render() {
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

        var options = <label/>
        if(this.state.toggleDropDown==true){
            options = this.state.courses.map((el) => <label key={el} style={{hidden: "true"}}> <input type="checkbox" value={el} onClick={(e) => this.changeCourseToGraph(e)}/> {el} </label>); 
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
                    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;Range of Semesters:
                    <br></br>
                    <button ctype="button" className="enrollmentTrendsButton" onClick={() => this.toggleDropDownState()}>
                        Select Courses
                    </button>
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
                    <button ctype="button" className="enrollmentTrendsButton" onClick={() => this.processGraphData()}>
                        Generate Graph
                    </button>                        
                    <form id="dropdownCourses" className="dropdown-menu" >
                        {options}
                    </form>  
                                
                </div>
            </div>
        </div>
    );
    }
}

export default EnrollmentTrends;