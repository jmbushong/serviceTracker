import React, { Component } from "react";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Falcon from "../../Assets/FC_Mascot_update.png";
import World from "../../Assets/undraw_the_world_is_mine_nb0e (1).svg";
import { Redirect } from "react-router-dom";
import Switch from "@material-ui/core/Switch";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {
  Link
 
 } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container'


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © ServiceTracker "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

type AcceptedProps = {
  sessionToken: any;
  updateToken: any;
  email: any;
  firstName: string;
  lastName: string;
  password: any;
  setEmail: any;
  setPassword: any;
  classCode?: any;
  setClassCode?: any;
  setFirstName?: any;
  setLastName?: any;
  collectToken: any;
  isAdmin: boolean;
  setIsAdminTrue: any;
  setIsAdminFalse: any;
  setTeacherProfile: (e: any) => void,
};

class Login extends React.Component<AcceptedProps, {}> {
  constructor(props: AcceptedProps) {
    super(props);
  }
 
  handleSubmit = (event: any) => {
    event.preventDefault();
    fetch(`http://localhost:4000/user/login`, {
      method: "POST",
      body: JSON.stringify({
        studentUser: {
          firstName: this.props.firstName,
          lastName: this.props.lastName,
          email: this.props.email,
          password: this.props.password,
          classId: this.props.classCode,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("Login was successful");
        } else {
          console.log("Login in failed");
        }
        return response.json();
      })
      .then((json) => {
        this.props.setIsAdminFalse(false)
        this.props.updateToken(json.sessionToken);
        if(this.props.sessionToken){console.log('yes')}else{
        return fetch(`http://localhost:4000/teacheruser/login`, {
          method: "POST",
          body: JSON.stringify({
            teacherUser: {
              email: this.props.email,
              password: this.props.password
            },
          }),
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        })
          .then((response) => {
            if (response.status === 200) {
              console.log("Login was successful");
            } else {
              console.log("Login in failed");
            }
            return response.json();
          })
          .then((json) => {
              this.props.setIsAdminTrue(true);
               //taking information from the server and setting it to our state
              if (json !== undefined) {
                this.props.setTeacherProfile(json); //taking information from the server and setting it to our state
              } else {
                this.props.setTeacherProfile([]);
              }
            this.props.updateToken(json.sessionToken);
          });}
      });
  };

  checkForToken = () => {
    if (!this.props.sessionToken) {
      return <Redirect to="/" />;
    } else if (this.props.isAdmin === false) {
      return <Redirect to="/myDashboard" />;
    } else {
      return <Redirect to="/admindash" />;
    }
  };

  render() {
    return (
      <Grid container component="main" style={{height:'100vh'}} >
        <CssBaseline />
        
        <Grid item xs={false} sm={6} md={5} className="newLanding">
        
        
        </Grid>
        
        <Container component="main" maxWidth="xs">
  
            <CssBaseline />
            

            {/* <div className="falconpic">
              {" "}
              
              <img
                src={Falcon}
                style={{ width: "10em", borderRadius: "30%" }}
              ></img>
            </div> */}
            <div className="formPadding">
           
              <Typography className="signupTitle" style={{marginTop:"150px"}} component="h1" variant="h4">
            
              ServiceTracker
              </Typography>
              <br></br>
         
              <form onSubmit={this.handleSubmit} noValidate>
                <Grid container spacing={2}>
                
                  <Grid item xs={12} sm={6}></Grid>
                  <Grid item xs={12} sm={6}></Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      onChange={(e) => {
                        this.props.setEmail(e.target.value);
                        console.log(this.props.email);
                      }}
                      defaultValue={this.props.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      onChange={(e) => {
                        this.props.setPassword(e.target.value);
                        console.log(this.props.password);
                      }}
                      defaultValue={this.props.password}
                    />
                  </Grid>
                  <Grid item xs={12}></Grid>
                </Grid>
                {/* <Link to="./admindash"> */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Member Login
                </Button>
                <br></br>

                {/* </Link> */}

                <Grid container justify="flex-end">
                  <Grid item className="smallMarginTop">
                    <Link to="/selectrole"> {"Need an account? Sign up"}</Link> 
                  </Grid>
                </Grid>
              </form>

              <Box mt={5}>
                <Copyright />
              </Box>
            </div>
          </Container>
          {this.checkForToken()}
      </Grid>
    )}}

  export default Login;

//     return (
//       <div>
//         <div className="mainDiv" >
       
//           <Container className="auth" component="main" maxWidth="xs">
  
//             <CssBaseline />
            

//             <div className="falconpic">
//               {" "}
              
//               <img
//                 src={Falcon}
//                 style={{ width: "10em", borderRadius: "30%" }}
//               ></img>
//             </div>
//             <div className="formPadding">
//               <Typography className="signupTitle" component="h1" variant="h6">
//                 NJHS ServiceTracker
//               </Typography>
//               <br></br>
//               <form onSubmit={this.handleSubmit} noValidate>
//                 <Grid container spacing={2}>
                
//                   <Grid item xs={12} sm={6}></Grid>
//                   <Grid item xs={12} sm={6}></Grid>
//                   <Grid item xs={12}>
//                     <TextField
//                       variant="outlined"
//                       required
//                       fullWidth
//                       id="email"
//                       label="Email Address"
//                       name="email"
//                       autoComplete="email"
//                       onChange={(e) => {
//                         this.props.setEmail(e.target.value);
//                         console.log(this.props.email);
//                       }}
//                       defaultValue={this.props.email}
//                     />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <TextField
//                       variant="outlined"
//                       required
//                       fullWidth
//                       name="password"
//                       label="Password"
//                       type="password"
//                       id="password"
//                       autoComplete="current-password"
//                       onChange={(e) => {
//                         this.props.setPassword(e.target.value);
//                         console.log(this.props.password);
//                       }}
//                       defaultValue={this.props.password}
//                     />
//                   </Grid>
//                   <Grid item xs={12}></Grid>
//                 </Grid>
//                 {/* <Link to="./admindash"> */}
//                 <Button
//                   type="submit"
//                   fullWidth
//                   variant="contained"
//                   color="primary"
//                 >
//                   Member Login
//                 </Button>
//                 <br></br>

//                 {/* </Link> */}

//                 <Grid container justify="flex-end">
//                   <Grid item className="smallMarginTop">
//                     <Link to="/selectrole">{"Need an account? Sign up"}</Link>
//                   </Grid>
//                 </Grid>
//               </form>

//               <Box mt={5}>
//                 <Copyright />
//               </Box>
//             </div>
//           </Container>
          
//         </div>
//         {this.checkForToken()}
//       </div>
//     );
//   }
// }
//     }
