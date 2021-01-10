import React from "react";
import List from "@material-ui/core/List";
import ListItem, { ListItemProps } from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import Box from "@material-ui/core/Box";
import AdminSitebar from "../Sitebar/AdminSitebar";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

type AcceptedProps = {

  sessionToken?: any;
  backArrowToggle: any;
 classCode?: any;
 teacherAccount: any,
  // arrowHandler: any;
  clearToken: any;
  setBackArrowToggle: (e: any) => void;
 

};

type MyState={
  studentAccounts:any,
  setStudentAccounts:  (e: any) => void;
}

class ManageAccounts extends React.Component <AcceptedProps, MyState>  {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      studentAccounts:[],
      setStudentAccounts: (entry) => {
        this.setState({studentAccounts: entry});
      },
    };
 
  }


  componentDidMount(){
    // this.props.arrowHandler();
    this.props.setBackArrowToggle(true);
    console.log(this.props.teacherAccount.teacherUser.classId)
    this.fetchTeacherData()
    
  }

  //This fetch gets all information linked to the classId that is logged in. I then took the list of students and set it to the variable studentData. This is the variable I will use to map over the page. 
  fetchTeacherData = () => {
    fetch(`http://localhost:4000/teacherUser/${this.props.teacherAccount.teacherUser.classId}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        console.log(json.classId)
        this.state.setStudentAccounts(json.studentUsers); 
        console.log(this.state.studentAccounts);
      });
  };
  
  render() {
    return (
      <Box>
        <AdminSitebar
          backArrowToggle={this.props.backArrowToggle}
          // arrowHandler={this.props.arrowHandler}
          clearToken={this.props.clearToken}
          sessionToken={this.props.sessionToken}
        />
        <h2 style={{ textAlign: "center", margin: "30px" }}>
          Student Accounts
        </h2>

        <Box className="studentAccounts">
          {" "}
          <List component="nav" aria-label="main mailbox folders">
            <ListItem button>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText>Amy Baker</ListItemText>
              <ListItemText>baker@email.com</ListItemText>
              <EditIcon />
              <DeleteIcon />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText>Amy Baker</ListItemText>
              <ListItemText>baker@email.com</ListItemText>
              <EditIcon />
              <DeleteIcon />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText>Amy Baker</ListItemText>
              <ListItemText>baker@email.com</ListItemText>
              <EditIcon />
              <DeleteIcon />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText>Amy Baker</ListItemText>
              <ListItemText>baker@email.com</ListItemText>
              <EditIcon />
              <DeleteIcon />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText>Amy Baker</ListItemText>
              <ListItemText>baker@email.com</ListItemText>
              <EditIcon />
              <DeleteIcon />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText>Amy Baker</ListItemText>
              <ListItemText>baker@email.com</ListItemText>
              <EditIcon />
              <DeleteIcon />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText>Amy Baker</ListItemText>
              <ListItemText>baker@email.com</ListItemText>
              <EditIcon />
              <DeleteIcon />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText>Amy Baker</ListItemText>
              <ListItemText>baker@email.com</ListItemText>
              <EditIcon />
              <DeleteIcon />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText>Amy Baker</ListItemText>
              <ListItemText>baker@email.com</ListItemText>
              <EditIcon />
              <DeleteIcon />
            </ListItem>
          </List>
        </Box>
      </Box>
    );
  }
}

export default ManageAccounts;
