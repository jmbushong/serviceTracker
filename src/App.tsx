import React from "react";
import "./App.css";
import Signup from "./Components/Home/Signup";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Chart from "./Components/StudentView/StudentDashboard/StudentViewDashboard/Chart";
import Login from "./Components/Home/Login";
import SelectRole from "./Components/Home/SelectRole";
import StudentPin from "./Components/Home/StudentPin";
import AdminSignup from "./Components/Home/AdminSignup";
import TeacherPin from "./Components/Home/TeacherPin";
import MyDashboard from "./Components/StudentView/StudentDashboard/MyDashboard";
import AddServiceHours from "./Components/StudentView/StudentDashboard/AddServiceHours";
import UpdateServiceHours from "./Components/StudentView/StudentDashboard/UpdateServiceHours";
import ViewEvents from "./Components/StudentView/ViewEvents";
import AdminDash from "./Components/AdminView/AdminDash";
import EventSchedule from "./Components/AdminView/Events/EventSchedule";
import ManageAccounts from "./Components/AdminView/ManageAccounts";
import Sitebar from "./Components/Sitebar/Sitebar";
import { Redirect } from "react-router-dom";

type myState = {
  date: any;
  typeOfService: any;
  description: any;
  hours:any;
  status: any; 
  studentUserId: any;
  sessionToken: any;
  email: any;
  firstName: string;
  lastName: string;
  password: any;
  studentAccount: any;
  teacherAccount: any;
  eventInformation: any;
  classCode: any;
  backArrowToggle: any;
  serviceRequests: any;
  setServiceRequests: (e: any) => void;
  setEmail: (e: string) => void; //setEmail is a function that takes a string and returns nothing
  setPassword: (e: any) => void;
  setClassCode: (e: any) => void;
  setFirstName: (e: any) => void;
  setLastName: (e: any) => void;
  setTeacherProfile: (e: any) => void;
  isAdmin: boolean;
  setIsAdminTrue: (e: any) => void;
  setIsAdminFalse: (e: any) => void;
  setDate: (e: any) => void;
  setTypeOfService: (e: any) => void;
  setDescription: (e: any) => void;
  setHours: (e: any) => void;
  setStatus: (e: any) => void;
};

type myProps = {
  updateToken: any;
  collectToken: any;
  clearToken:any;
};
class App extends React.Component<{}, myState> {
  constructor(props: myProps) {
    super(props);
    this.state = {
      date: "",
      typeOfService: "",
      description: "",
      hours:"",
      status: "",
      studentUserId: "",
      backArrowToggle: false,
      sessionToken: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      serviceRequests: [],
      studentAccount: [],
      teacherAccount: [],
      eventInformation: [],
      classCode: "",
      isAdmin: true,
      setServiceRequests: (entry) => {
        this.setState({ serviceRequests: entry });
      },
      setEmail: (email) => {
        this.setState({ email: email });
      },
      setPassword: (pass) => {
        this.setState({ password: pass });
      },
      setClassCode: (code) => {
        this.setState({ classCode: code });
      },
      setFirstName: (first) => {
        this.setState({ firstName: first });
      },
      setLastName: (last) => {
        this.setState({ lastName: last });
      },
      setTeacherProfile: (info) => {
        this.setState({teacherAccount: info});
      },
      setIsAdminTrue: (e) => {
        this.setState({isAdmin: e});
      },
      setIsAdminFalse: (e) => {
        this.setState({isAdmin: e});
      },
      setDate: (date) => {
        this.setState({ date: date });
      },
      setTypeOfService: (desc) => {
        this.setState({ typeOfService: desc });
      },
      setDescription: (desc) => {
        this.setState({ description: desc });
      },
      setHours: (hours) => {
        this.setState({ hours:hours });
      },
      setStatus: (status) => {
        this.setState({ status:status });
      },


    };
    console.log("[App.js] Constructor");
  }

  //Here we are calling the setState() method and updating our value of session token
  collectToken = () => {
    if (localStorage.getItem("token")) {
      this.setState({ sessionToken: localStorage.getItem("token") });
    } else {
      console.log("goodbye");
    }
  };

  //pass as props?
  updateToken = (newToken: any) => {
    localStorage.setItem("token", newToken);
    this.setState({ sessionToken: newToken });
    console.log(newToken);
  };

  clearToken = () => {
    localStorage.clear();
    this.setState({ sessionToken: "" });
  };

  componentDidMount() {
    console.log("[App.js] component did mount");
    this.collectToken();
  }

  arrowHandler = () => {
    this.state.backArrowToggle === false
      ? this.setState({ backArrowToggle: true })
      : this.setState({ backArrowToggle: false });
  };

  render() {
    console.log("[App.js] render");

    return (
      <div>
        {console.log(this.state.sessionToken)}

        <BrowserRouter>
          <Switch>
       
         
              <Route exact path="/mydashboard">
                <MyDashboard
                isAdmin={this.state.isAdmin}
                  firstName={this.state.firstName}
                  lastName={this.state.lastName}
                  sessionToken={this.state.sessionToken}
                  backArrowToggle={this.state.backArrowToggle}
                  arrowHandler={this.arrowHandler}
                  key={this.state.sessionToken}
                  setIsAdminFalse={this.state.setIsAdminFalse}
                  clearToken={this.clearToken}
            
                />
              </Route>
              <Route exact path="/admindash">
              <AdminDash
                sessionToken={this.state.sessionToken}
                teacherAccount={this.state.teacherAccount}
                backArrowToggle={this.state.backArrowToggle}
                arrowHandler={this.arrowHandler}
                key={this.state.sessionToken}
                clearToken={this.clearToken}
                isAdmin={this.state.isAdmin}
              />
            </Route>
           
            <Route exact path="/">
              <Login
                updateToken={this.updateToken}
                firstName={this.state.firstName}
                lastName={this.state.lastName}
                email={this.state.email}
                password={this.state.password}
                sessionToken={this.state.sessionToken}
                setEmail={this.state.setEmail}
                setPassword={this.state.setPassword}
                classCode={this.state.classCode}
                setClassCode={this.state.setClassCode}
                collectToken={this.collectToken}
                isAdmin={this.state.isAdmin}
                setIsAdminTrue={this.state.setIsAdminTrue}
                setIsAdminFalse={this.state.setIsAdminFalse}
                setTeacherProfile={this.state.setTeacherProfile}
               
              />
            </Route>
            <Route exact path="/selectrole">
              <SelectRole />
            </Route>
            <Route exact path="/signup">
              <Signup
                updateToken={this.updateToken}
                firstName={this.state.firstName}
                lastName={this.state.lastName}
                email={this.state.email}
                password={this.state.password}
                sessionToken={this.state.sessionToken}
                setEmail={this.state.setEmail}
                setPassword={this.state.setPassword}
                classCode={this.state.classCode}
                setClassCode={this.state.setClassCode}
                setFirstName={this.state.setFirstName}
                setLastName={this.state.setLastName}
              />
            </Route>
            <Route exact path="/adminsignup">
              <AdminSignup
                updateToken={this.updateToken}
                firstName={this.state.firstName}
                lastName={this.state.lastName}
                email={this.state.email}
                password={this.state.password}
                sessionToken={this.state.sessionToken}
                setEmail={this.state.setEmail}
                setPassword={this.state.setPassword}
                classCode={this.state.classCode}
                setClassCode={this.state.setClassCode}
                setFirstName={this.state.setFirstName}
                setLastName={this.state.setLastName}
                teacherAccount={this.state.teacherAccount}
                setTeacherProfile={this.state.setTeacherProfile}
              />
            </Route>
            <Route exact path="/studentpin">
              <StudentPin
                classCode={this.state.classCode}
                setClassCode={this.state.setClassCode}
              />
            </Route>
            <Route exact path="/teacherpin">
              <TeacherPin sessionToken={this.state.sessionToken}
              teacherAccount={this.state.teacherAccount} />
            </Route>
            <Route exact path="/chart">
              <Chart />
            </Route>

            <Route exact path="/addservice">
              <AddServiceHours
              setIsAdminFalse={this.state.setIsAdminFalse}
               isAdmin={this.state.isAdmin}
                backArrowToggle={this.state.backArrowToggle}
                arrowHandler={this.arrowHandler}
                clearToken={this.clearToken}
                sessionToken={this.state.sessionToken}
                date= {this.state.date}
                typeOfService= {this.state.typeOfService}
                description= {this.state.description}
                hours= {this.state.hours}
                status={this.state.status}
                studentUserId={this.state.studentUserId}
                setDate={this.state.setDate}
                setTypeOfService={this.state.setTypeOfService}
                setDescription={this.state.setDescription}
                setHours={this.state.setHours}
                setStatus={this.state.setStatus}
  
                
                
              />
            </Route>
            <Route exact path="/editservice">
              <UpdateServiceHours
               serviceRequests={this.state.serviceRequests}
               setServiceRequests={this.state.setServiceRequests}
               setIsAdminFalse={this.state.setIsAdminFalse}
               isAdmin={this.state.isAdmin}
                backArrowToggle={this.state.backArrowToggle}
                arrowHandler={this.arrowHandler}
                clearToken={this.clearToken}
                sessionToken={this.state.sessionToken}
                date= {this.state.date}
                typeOfService= {this.state.typeOfService}
                description= {this.state.description}
                hours= {this.state.hours}
                status={this.state.status}
                studentUserId={this.state.studentUserId}
                setDate={this.state.setDate}
                setTypeOfService={this.state.setTypeOfService}
                setDescription={this.state.setDescription}
                setHours={this.state.setHours}
                setStatus={this.state.setStatus}
               
              />
            </Route>
            <Route exact path="/events">
              <ViewEvents
               setIsAdminFalse={this.state.setIsAdminFalse}
               isAdmin={this.state.isAdmin}
                backArrowToggle={this.state.backArrowToggle}
                arrowHandler={this.arrowHandler}
                clearToken={this.clearToken}
                sessionToken={this.state.sessionToken}
              
              />
            </Route>
            {/* <Route exact path="/admindash">
              <AdminDash
                sessionToken={this.state.sessionToken}
                teacherAccount={this.state.teacherAccount}
                backArrowToggle={this.state.backArrowToggle}
                arrowHandler={this.arrowHandler}
                key={this.state.sessionToken}
                clearToken={this.clearToken}
                isAdmin={this.state.isAdmin}
              />
            </Route> */}
            <Route exact path="/adminevent">
              <EventSchedule
                backArrowToggle={this.state.backArrowToggle}
                arrowHandler={this.arrowHandler}
                clearToken={this.clearToken}
                sessionToken={this.state.sessionToken}
              />
            </Route>
            <Route exact path="/manageaccounts">
              <ManageAccounts
                backArrowToggle={this.state.backArrowToggle}
                arrowHandler={this.arrowHandler}
                clearToken={this.clearToken}
                sessionToken={this.state.sessionToken}
              />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
