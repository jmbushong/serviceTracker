import React from 'react';

import './App.css';
import Signup from './Components/Home/Signup';
import {
  BrowserRouter,
 Switch,
  Route,

} from "react-router-dom";


import Chart from './Components/StudentView/StudentDashboard/StudentViewDashboard/Chart'

import Login from "./Components/Home/Login"
import SelectRole from './Components/Home/SelectRole';
import StudentPin from './Components/Home/StudentPin';
import AdminSignup from './Components/Home/AdminSignup';
import TeacherPin from './Components/Home/TeacherPin'
import MyDashboard from './Components/StudentView/StudentDashboard/MyDashboard';
import AddServiceHours from './Components/StudentView/StudentDashboard/AddServiceHours';
import UpdateServiceHours from './Components/StudentView/StudentDashboard/UpdateServiceHours'
import ViewEvents from './Components/StudentView/ViewEvents';





class App extends React.Component {
  render(){
    return <div> 

  

  <BrowserRouter>
  <Switch>
    <Route exact path="/" component={Login}/>
    <Route exact path="/selectrole" component={SelectRole}/>
    <Route exact path="/signup" component={Signup}/>
    <Route exact path="/adminsignup" component={AdminSignup}/>
    <Route exact path="/studentpin" component={StudentPin}/>
    <Route exact path="/teacherpin" component={TeacherPin}/>
    <Route exact path="/chart" component={Chart}/>
    <Route exact path="/mydashboard" component={MyDashboard}/>
    <Route exact path="/addservice" component={AddServiceHours}/>
    <Route exact path="/editservice" component={UpdateServiceHours}/>
    <Route exact path="/events" component={ViewEvents}/>
    

  </Switch>
  </BrowserRouter>



  </div>


  }
}

export default App;


