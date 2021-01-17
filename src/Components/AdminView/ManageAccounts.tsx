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
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


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
  setOpen: (e: any) => void;
  open:any;
};

class ManageAccounts extends React.Component<AcceptedProps, MyState>{
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      userId:800,
      setUserId: (entry) => {
        this.setState({ userId: entry });
      },
      open:false,
      setOpen: (entry) => {
        this.setState({ open: entry });
      },

      studentAccounts: [],
      setStudentAccounts: (entry) => {
        this.setState({ studentAccounts: entry });
      },
    };
  }

  handleClickOpen=()=>{
    this.state.setOpen(true)
  }

  handleClickClose=()=>{
    this.state.setOpen(false)
  }

  componentDidMount() {
    // this.props.arrowHandler();
    this.props.setBackArrowToggle(true);
    this.props.setIsAdminTrue(true);

    this.fetchTeacherData();
  }

  //This function takes the argument id which is passed into the deleteEntryAsync2 function on line 140. The argument being passed into this function is the id associated with user name

  deleteEntryAsync2 = async (id:number) => {

      try { 
        const response = await fetch(
          `http://localhost:4000/user/${id}`,
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
       
      } catch (err) {
        console.log(err);
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
        <Typography className="adminTitle" component="h2"
            variant="h5"  style={{ textAlign: "center",  margin: "30px"  }}>Student Accounts</Typography>
    

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
                  <EditIcon onClick={()=>{this.handleClickOpen()}} />
                  <div>
    
      <Dialog open={this.state.open}>
        <DialogTitle  id="form-dialog-title"><Typography className="adminTitle" component="h2"
            variant="h5"  style={{ textAlign: "center" }}>Edit Student User Information</Typography></DialogTitle>
        <DialogContent>
    
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="First Name"
            type="email"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Last Name"
            type="email"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
           <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Password"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{this.handleClickClose()}} >
            Cancel
          </Button>
          <Button  >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
                  <DeleteIcon 
                  onClick={() => {
                   
                    try{ 
                     
                      this.deleteEntryAsync2(this.state.studentAccounts[index]?.id)
                      console.log(this.state.studentAccounts[index]?.id)
                      
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
