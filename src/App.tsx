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
import { Select } from "@material-ui/core";




class App extends React.Component {
  constructor(props: any) {
    super(props);
    console.log("[App.js] Constructor");
  }

  static getDerivedStateFromProps(props: any, state: any) {
    console.log("[App.js] getDerivedStateFromProps", props);
    return state;
  }

  //Here we are calling the setState() method and updating our value of session token
  collectToken() {
    if (localStorage.getItem("token")) {
      this.setState({ sessionToken: localStorage.getItem("token") });
    } else{
    this.setState({
      sessionToken: ""
    })
  }}

  componentWillMount() {
    this.collectToken();
  };

  componentDidMount() {
    console.log("[App.js] component did mount");
    
  }



  render() {
    console.log("[App.js] render");
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route exact path="/selectrole">
              <SelectRole />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/adminsignup">
              <AdminSignup />
            </Route>
            <Route exact path="/studentpin">
              <StudentPin />
            </Route>
            <Route exact path="/teacherpin">
              <TeacherPin />
            </Route>
            <Route exact path="/chart">
              <Chart />
            </Route>
            <Route exact path="/mydashboard">
              <MyDashboard />
            </Route>
            <Route exact path="/addservice">
              <AddServiceHours />
            </Route>
            <Route exact path="/editservice">
              <UpdateServiceHours />
            </Route>
            <Route exact path="/events">
              <ViewEvents />
            </Route>
            <Route exact path="/admindash">
              <AdminDash />
            </Route>
            <Route exact path="/adminevent">
              <EventSchedule />
            </Route>
            <Route exact path="/manageaccounts">
              <ManageAccounts />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
