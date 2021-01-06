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
  // arrowHandler: any;
  clearToken: any;

};

class ManageAccounts extends React.Component <AcceptedProps, {}>  {
  componentDidMount(){
    // this.props.arrowHandler();
  }
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
