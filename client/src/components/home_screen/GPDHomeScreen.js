import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ModalDialog from '../modal/ModalWindow'
import StudentService from "../../services/student.service";
import MaterialTable from "material-table";
import { Grid, Button, Box } from '@material-ui/core';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import PageView from '@material-ui/icons/Pageview';
import { forwardRef } from 'react';
import MSStudentService from "../../services/msStudent.service";
import AuthService from "../../services/auth.service";

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
    PageView: forwardRef((props, ref) => <PageView {...props} ref={ref} />)
  };


class GPDHomeScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            showModalDialogPopup: false,
            modalType: "none",
            students: [],
            columns: [
                {
                    title: "ID",
                    field: "studentID",
                    render: rowData => <Link to={{pathname: '/viewStudent', state: {email: rowData.email, studentID: rowData.studentID}}}>{rowData.studentID}</Link>
                },
                {
                    title: "First Name",
                    field: "firstName"
                },
                {
                    title: "Last Name",
                    field: "lastName"
                },
                {
                    title: "Email",
                    field: "email"
                },
                {
                    title: "Entry Semester",
                    field: "entrySemester"
                },
                {
                    title: "Entry Year",
                    field: "entryYear"
                },
                {
                    title: "Grad Semester",
                    field: "gradSemester"
                },
                {
                    title: "Grad Year",
                    field: "gradYear"
                },
                {
                    title: "Semesters in Program",
                    field: "nSemestersInProgram"
                }
            ]
        }    
    }

      //Displays or Hides the Modal Dialog PopUp 
    showModalDialogPopUp = (type) => {
        this.setState({modalType: type, showModalDialogPopup: true});
    }

    hideModalDialogPopUp = () => {
        this.setState({showModalDialogPopup: false});
    }

    deleteAllStudents() {
        StudentService.deleteAll()
        .then(response => {
            console.log(response.data);
            this.setState({showModalDialogPopup: false});
        })
        .catch(e => {
            console.log(e);
        });



        AuthService.deleteAllStudent();
    }

    componentDidMount() {
        StudentService.getAll()
            .then(response => {
                console.log(response.data);
                this.setState({students: response.data});
            })
            .catch(e => {
                console.log(e);
            });

    MSStudentService.removeInfo();
    }

    render() {

        return (
            <Box>
                <Box>
                    {this.state.showModalDialogPopup ? <ModalDialog modalType={this.state.modalType} hideModalDialogPopUp={this.hideModalDialogPopUp.bind(this)} deleteAllStudents={this.deleteAllStudents.bind(this)}/> : null} 
                    <Box id="GPDHomepageScreen">
                    <a href='/enrollment-trends'><Link to={{pathname: '/enrollment-trends'}}><button id="enrollmentTrendsPageButton" className="GPDHomepageButton">Enrollment Trends</button></Link></a>
                    <Box class="dropdown">
                        <button class="dropbtn">Import</button>
                        <Box class="dropdown-content">
                            <a onClick={() => this.showModalDialogPopUp("importDegreeRequirements")}>Degree Requirements</a>
                            <a onClick={() => this.showModalDialogPopUp("importCourseInformation")}>Course Information</a>
                            <a onClick={() => this.showModalDialogPopUp("importCourseOfferings")}>Course Offerings</a>
                            <a onClick={() => this.showModalDialogPopUp("importStudentData")}>Student Data</a>
                            <a onClick={() => this.showModalDialogPopUp("importGrades")}>Grades</a>
                        </Box>
                        </Box>
                            <a href='/addStudent'><Link to={{pathname: '/addStudent'}}><button className="GPDHomepageButton">Add Student</button></Link></a>
                            <button className="GPDHomepageButton" onClick={() => this.showModalDialogPopUp("deleteAllStudents")}> Delete All Student Data</button>
                        <Box m={5}>
                            <MaterialTable title="Students" icons={tableIcons} 
                                options={{headerStyle: {backgroundColor: '#707070',color: '#FFF'},
                                zIndex:0, maxBodyHeight: '650px', search:true, headerSelectionProps: {color: "primary"}}}
                                columns={this.state.columns} data={this.state.students}
                                actions = {[
                                    {
                                        icon: () => <PageView/>,
                                        tooltip: 'View Student',
                                        onClick: (event, rowData) => console.log(rowData)
                                    }
                                ]}/>
                        </Box>
                    </Box>
                </Box>
            </Box>
        );
    }

}

export default GPDHomeScreen;
