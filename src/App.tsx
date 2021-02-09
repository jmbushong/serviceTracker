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

import ManageHoursTable from "./Components/AdminView/ManageHours";

//In App.tsx-- set state of indexNumber & setIndexNumber
//pass indexNumber to UpdateServiceHours
//pass setIndexNumber to Chart
//Inside Chart- onClick function changes value indexNumber so that it reflects the current thing I'm clicking

type myState = {
  indexNumber:any;
  specificEntry: any;
  date: any;
  typeOfService: string;
  description: string;
  hours:any;
  status: any; 
  studentUserId: any;
  sessionToken: any;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  studentAccount: any;
  teacherAccount: any;
  eventInformation: any;
  classCode: any;
  backArrowToggle: any;
  serviceRequests: any;
  setBackArrowToggle: (e: any) => void;
  setServiceRequests: (e: any) => void;
  setIndexNumber: (e: any) => void;
  setSpecificEntry: (e: any) => void;
  setEmail: (e: string) => void; //setEmail is a function that takes a string and returns nothing
  setPassword: (e: any) => void;
  setClassCode: (e: any) => void;
  setFirstName: (e: any) => void;
  setLastName: (e: any) => void;
  setTeacherProfile: (e: any) => void;
  isAdmin: any;
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
      indexNumber:0,
      specificEntry:[],
      date: " ",
      typeOfService: "",
      description: "",
      hours:0,
      status: "Pending",
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
      isAdmin: "",
      setServiceRequests: (entry) => {
        this.setState({serviceRequests: entry});
      },
      setBackArrowToggle: (e) => {
        this.setState({backArrowToggle: e});
      },
      setSpecificEntry: (entry) => {
        this.setState({specificEntry: entry});
      },
      setIndexNumber: (e) => {
        this.setState({indexNumber: e});
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

  //fetchTeacherStuff is called when you login
  //also call fetchTeacherStuff when you don't have information
  //component did mount-- make it so that renders empty array while waiting for teacherstuff fetch
  //token is unique identifier 
  
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

  // arrowHandler = () => {
    
  //   this.state.backArrowToggle === true
  //     ? this.setState({ backArrowToggle: false })
  //     : this.setState({ backArrowToggle: true });
  // };

  render() {
    console.log("[App.js] render");

    return (
      <div>
        {console.log(this.state.sessionToken)}

        <BrowserRouter>
          <Switch>
       
         
              <Route exact path="/mydashboard">
                <MyDashboard
                indexNumber={this.state.indexNumber}
                setIndexNumber={this.state.setIndexNumber}
                specificEntry={this.state.specificEntry}
                setSpecificEntry={this.state.setSpecificEntry}
                isAdmin={this.state.isAdmin}
                  firstName={this.state.firstName}
                  lastName={this.state.lastName}
                  sessionToken={this.state.sessionToken}
                  backArrowToggle={this.state.backArrowToggle}
                  // arrowHandler={this.arrowHandler}
                  key={this.state.sessionToken}
                  setIsAdminFalse={this.state.setIsAdminFalse}
                  clearToken={this.clearToken}
                  serviceRequests={this.state.serviceRequests}
               setServiceRequests={this.state.setServiceRequests}
               setBackArrowToggle={this.state.setBackArrowToggle}
            
                />
              </Route>
              <Route exact path="/admindash">
              <AdminDash
              setIsAdminTrue={this.state.setIsAdminTrue}
              setBackArrowToggle={this.state.setBackArrowToggle}
                sessionToken={this.state.sessionToken}
                teacherAccount={this.state.teacherAccount}
                backArrowToggle={this.state.backArrowToggle}
                // arrowHandler={this.arrowHandler}
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
                setIsAdminFalse={this.state.setIsAdminFalse}
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
              <Chart   serviceRequests={this.state.serviceRequests}
               setServiceRequests={this.state.setServiceRequests}
               sessionToken={this.state.sessionToken}
               setIndexNumber={this.state.setIndexNumber} 
               indexNumber={this.state.indexNumber}
               specificEntry={this.state.specificEntry}
               setSpecificEntry={this.state.setSpecificEntry}/>
            </Route>

            <Route exact path="/addservice">
              <AddServiceHours
              setBackArrowToggle={this.state.setBackArrowToggle}
              setIsAdminFalse={this.state.setIsAdminFalse}
               isAdmin={this.state.isAdmin}
                backArrowToggle={this.state.backArrowToggle}
                // arrowHandler={this.arrowHandler}
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
               specificEntry={this.state.specificEntry}
               setSpecificEntry={this.state.setSpecificEntry}
               serviceRequests={this.state.serviceRequests}
               setServiceRequests={this.state.setServiceRequests}
               setIsAdminFalse={this.state.setIsAdminFalse}
               isAdmin={this.state.isAdmin}
                backArrowToggle={this.state.backArrowToggle}
                // arrowHandler={this.arrowHandler}
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
                indexNumber={this.state.indexNumber}
                setBackArrowToggle={this.state.setBackArrowToggle}
               
              />
            </Route>
            <Route exact path="/events">
              <ViewEvents
              setBackArrowToggle={this.state.setBackArrowToggle}
               setIsAdminFalse={this.state.setIsAdminFalse}
               isAdmin={this.state.isAdmin}
                backArrowToggle={this.state.backArrowToggle}
                // arrowHandler={this.arrowHandler}
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
              setIsAdminTrue={this.state.setIsAdminTrue}
              setBackArrowToggle={this.state.setBackArrowToggle}
                backArrowToggle={this.state.backArrowToggle}
                // arrowHandler={this.arrowHandler}
                clearToken={this.clearToken}
                sessionToken={this.state.sessionToken}
              />
            </Route>
            <Route exact path="/manageaccounts">
              <ManageAccounts
               setIsAdminTrue={this.state.setIsAdminTrue}
                teacherAccount={this.state.teacherAccount}
                backArrowToggle={this.state.backArrowToggle}
                // arrowHandler={this.arrowHandler}
                clearToken={this.clearToken}
                sessionToken={this.state.sessionToken}
                setBackArrowToggle={this.state.setBackArrowToggle}
                classCode={this.state.classCode}
              />
            </Route>

            <Route exact path="/managehours">
              <ManageHoursTable
               setIsAdminTrue={this.state.setIsAdminTrue}
              
                sessionToken={this.state.sessionToken}
              
                classCode={this.state.classCode}
              />
            </Route>

            <Route exact path="/eventupdate">
              {/* <UpdateEvents  
              clearToken={this.clearToken}
                setIsAdminTrue={this.state.setIsAdminTrue}
                backArrowToggle={this.state.backArrowToggle}
                sessionToken={this.state.sessionToken}
                setBackArrowToggle={this.state.setBackArrowToggle}
             
              /> */}
            </Route>

            <Route exact path="/addevent">
              {/* <AddEvent  
              clearToken={this.clearToken}
                setIsAdminTrue={this.state.setIsAdminTrue}
                backArrowToggle={this.state.backArrowToggle}
                sessionToken={this.state.sessionToken}
                setBackArrowToggle={this.state.setBackArrowToggle}
             
              /> */}
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
