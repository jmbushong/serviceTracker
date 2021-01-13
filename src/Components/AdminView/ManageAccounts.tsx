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
  teacherAccount: any;
  // arrowHandler: any;
  clearToken: any;
  setBackArrowToggle: (e: any) => void;
  setIsAdminTrue: (e: any) => void;
};

type MyState = {
  studentAccounts: any;
  setStudentAccounts: (e: any) => void;
  userId:any;
  setUserId: (e: any) => void;
};

class ManageAccounts extends React.Component<AcceptedProps, MyState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      userId:800,
      setUserId: (entry) => {
        this.setState({ userId: entry });
      },

      studentAccounts: [],
      setStudentAccounts: (entry) => {
        this.setState({ studentAccounts: entry });
      },
    };
  }

  componentDidMount() {
    // this.props.arrowHandler();
    this.props.setBackArrowToggle(true);
    this.props.setIsAdminTrue(true);

    this.fetchTeacherData();
  }

  //RIGHT NOW THIS DELETE TAKES TWO CLICKS FOR IT TO WORK ---FIX THIS:

  deleteEntryAsync2 = async () => {
    if(this.state.userId !== 800){
      try { 
        const response = await fetch(
          `http://localhost:4000/user/${this.state.userId}`,
          {
            method: "DELETE",
            headers: new Headers({
              "Content-Type": "application/json",
              Authorization: this.props.sessionToken,
            }),
          }
        );
        const json = await response.json();
        console.log(json);
        
        this.props.setBackArrowToggle(true);
        this.fetchTeacherData();
        this.state.setUserId(800);
      } catch (err) {
        console.log(err);
      }
    }
   
  };


  //This fetch gets all information linked to the classId that is logged in. I then took the list of students and set it to the variable studentData. This is the variable I will use to map over the page.
  fetchTeacherData = () => {
    fetch(`http://localhost:4000/teacherUser`, {
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
          {this.state.studentAccounts.length > 0 ? (
            this.state.studentAccounts.map((service: any, index: any) => (
              <Box width="auto" key={this.state.studentAccounts.id}>
                <List component="nav" aria-label="main mailbox folders"></List>
                <ListItem className="accountRows" button>
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText>
                    {this.state.studentAccounts[index]?.firstName +
                      " " +
                      this.state.studentAccounts[index]?.lastName}
                  </ListItemText>
                  <ListItemText>
                    {" "}
                    {this.state.studentAccounts[index]?.email}
                  </ListItemText>
                  <EditIcon />
                  <DeleteIcon 
                  onClick={() => {
                   
                    try{  this.state.setUserId(this.state.studentAccounts[index]?.id)
                   
                      this.deleteEntryAsync2()
                      console.log(this.state.userId)
                      
                      ;} 
                    catch (err) {
                      console.log(err);
                    }}
                  
                  }
                  
                  />
                </ListItem>
              </Box>
            ))
          ) : (
            <div >You don't currently have any students. </div>
          )}
        </Box>
      </Box>
    );
  }
}

export default ManageAccounts;
