import React from "react";
import List from "@material-ui/core/List";
import ListItem, { ListItemProps } from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import AdminSitebar from "../Sitebar/AdminSitebar";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Redirect } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";

import EditStudentAccounts from "../AdminView/EditStudentAccounts";
import API_URL from "../../environment";

type AcceptedProps = {
  sessionToken?: any;
  backArrowToggle: any;
  classCode?: any;
  teacherAccount: any;
  // arrowHandler: any;
  clearToken: any;
  setBackArrowToggle: (e: any) => void;
  setIsAdminTrue: (e: any) => void;
};

type MyState = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  setFirstName: (e: any) => void;
  setLastName: (e: any) => void;
  setEmail: (e: any) => void;
  setPassword: (e: any) => void;
  studentAccounts: any;
  setStudentAccounts: (e: any) => void;
  userId: any;
  setUserId: (e: any) => void;
  setOpen: (e: any) => void;
  open: boolean;
  oneStudent: any;
  setOneStudent: (e: any) => void;
};

class ManageAccounts extends React.Component<AcceptedProps, MyState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      oneStudent: [],
      setOneStudent: (entry) => {
        this.setState({ oneStudent: entry });
      },
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      setFirstName: (entry) => {
        this.setState({ firstName: entry });
      },
      setLastName: (entry) => {
        this.setState({ lastName: entry });
      },
      setEmail: (entry) => {
        this.setState({ email: entry });
      },
      setPassword: (entry) => {
        this.setState({ password: entry });
      },

      userId: 800,
      setUserId: (entry) => {
        this.setState({ userId: entry });
      },
      open: false,
      setOpen: (entry) => {
        this.setState({ open: entry });
      },

      studentAccounts: [],
      setStudentAccounts: (entry) => {
        this.setState({ studentAccounts: entry });
      },
    };
  }

  handleClickOpen = () => {
    this.state.setOpen(true);
  };

  handleClickClose = () => {
    this.state.setOpen(false);
  };

  componentDidMount() {
    // this.props.arrowHandler();
    // this.props.setBackArrowToggle(true);
    this.props.setIsAdminTrue(true);

    this.fetchTeacherData();
  }

  //This function takes the argument id which is passed into the deleteEntryAsync2 function on line 140. The argument being passed into this function is the id associated with user name

  deleteEntryAsync2 = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/user/${id}`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: this.props.sessionToken,
        }),
      });
      const json = await response.json();
      console.log(json);

      this.props.setBackArrowToggle(true);
      this.fetchTeacherData();
    } catch (err) {
      console.log(err);
    }
  };

  //This fetch gets all information linked to the classId that is logged in. I then took the list of students and set it to the variable studentData. This is the variable I will use to map over the page.
  fetchTeacherData = () => {
    fetch(`${API_URL}/user/all`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        console.log(json.classId);
        this.state.setStudentAccounts(json);
        console.log(this.state.studentAccounts);
      });
  };

  fetchSpecificStudent = (id: any) => {
    fetch(`${API_URL}/user/${id}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        console.log(json.date);
        this.state.setOneStudent(json);
        this.state.setFirstName(this.state.userId.firstName);
        this.state.setLastName(this.state.userId.lastName);
        this.state.setEmail(this.state.userId.email);
        this.state.setPassword(this.state.userId.password);
      });
  };



  render() {
    return (
      <Box>
 

        <Container
          maxWidth="lg"
          style={{ height: "100vh", paddingLeft:"0"}}
          className="studentAccounts manageAccountMarginTop"
        >
          {" "}
          <Typography
            className="adminTitle "
            component="h2"
            variant="h5"
            style={{
              textAlign: "center",
              paddingTop: "30px",
              color: "black",
            }}
          >
            Student Accounts
          </Typography>
          {this.state.studentAccounts.length > 0 ? (
            this.state.studentAccounts.map((service: any, index: any) => (
              <Box style={{padding:"0px"}} width="auto" className="manageAccountMarginLeft" key={this.state.studentAccounts.id}>
                <List  style={{padding:"3px"}} component="nav" aria-label="main mailbox folders"></List>
                <ListItem style={{backgroundColor:"white"}} className="accountRows" button>
        
        
                  <ListItemText style={{padding:"0px"}}>
                    <h4 style={{ display: "inline" }}>
                      {" "}
                      {this.state.studentAccounts[index]?.firstName +
                        " " +
                        this.state.studentAccounts[index]?.lastName}{" "}
                    </h4>
                    <div style={{ display: "inline" }}>
                      {" "}
                
                    
                    </div>{" "}
                   {" "}
                    <br></br>
                    {this.state.studentAccounts[index]?.email}
                  
                  </ListItemText>
         
                  <div style={{padding:"0px"}}>
                    <EditStudentAccounts
                      setFirstName={this.state.setFirstName}
                      setLastName={this.state.setLastName}
                      setEmail={this.state.setEmail}
                      setPassword={this.state.setPassword}
                      fetchTeacherData={this.fetchTeacherData}
                      open={this.state.open}
                      userId={this.state.userId}
                      setOpen={this.state.setOpen}
                      sessionToken={this.props.sessionToken}
                      firstName={this.state.firstName}
                      lastName={this.state.lastName}
                      email={this.state.email}
                      password={this.state.password}
                    />
                  </div>
         
                <EditIcon
                       
                       onClick={() => {
                         this.handleClickOpen();

                         this.setState({
                           userId: this.state.studentAccounts[index],
                         });
                         this.fetchSpecificStudent(
                           this.state.studentAccounts[index].id
                         );
                       }}
                     />
               <DeleteIcon
               style={{marginRight:"0px"}}
                      onClick={() => {
                        try {
                          this.deleteEntryAsync2(
                            this.state.studentAccounts[index]?.id
                          );
                          console.log(this.state.studentAccounts[index]?.id);
                        } catch (err) {
                          console.log(err);
                        }
                      }}
                    />
                    
                </ListItem>
              </Box>
            ))
          ) : (
            <div>You don't currently have any students. </div>
          )}
        </Container>
      </Box>
    );
  }
}

export default ManageAccounts;
