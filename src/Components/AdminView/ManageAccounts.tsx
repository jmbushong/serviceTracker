import React from 'react';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import Box from '@material-ui/core/Box'
import AdminSitebar from '../Sitebar/AdminSitebar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Delete } from '@material-ui/icons';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

class ManageAccounts extends React.Component {


    render() { 
        return (   <Box >
            <AdminSitebar/>
            <h2 style={{textAlign:"center", margin:"30px"}}>Student Accounts</h2>
           
            <Box className="studentAccounts"> <List component="nav" aria-label="main mailbox folders">
              <ListItem button>
                <ListItemIcon>
                <AccountCircleIcon/>
                </ListItemIcon>
                <ListItemText>Amy Baker</ListItemText>
                <ListItemText>baker@email.com</ListItemText>
                <EditIcon/>
                <DeleteIcon/>
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                <AccountCircleIcon/>
                </ListItemIcon>
                <ListItemText>Amy Baker</ListItemText>
                <ListItemText>baker@email.com</ListItemText>
                <EditIcon/>
                <DeleteIcon/>
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                <AccountCircleIcon/>
                </ListItemIcon>
                <ListItemText>Amy Baker</ListItemText>
                <ListItemText>baker@email.com</ListItemText>
                <EditIcon/>
                <DeleteIcon/>
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                <AccountCircleIcon/>
                </ListItemIcon>
                <ListItemText>Amy Baker</ListItemText>
                <ListItemText>baker@email.com</ListItemText>
                <EditIcon/>
                <DeleteIcon/>
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                <AccountCircleIcon/>
                </ListItemIcon>
                <ListItemText>Amy Baker</ListItemText>
                <ListItemText>baker@email.com</ListItemText>
                <EditIcon/>
                <DeleteIcon/>
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                <AccountCircleIcon/>
                </ListItemIcon>
                <ListItemText>Amy Baker</ListItemText>
                <ListItemText>baker@email.com</ListItemText>
                <EditIcon/>
                <DeleteIcon/>
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                <AccountCircleIcon/>
                </ListItemIcon>
                <ListItemText>Amy Baker</ListItemText>
                <ListItemText>baker@email.com</ListItemText>
                <EditIcon/>
                <DeleteIcon/>
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                <AccountCircleIcon/>
                </ListItemIcon>
                <ListItemText>Amy Baker</ListItemText>
                <ListItemText>baker@email.com</ListItemText>
                <EditIcon/>
                <DeleteIcon/>
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                <AccountCircleIcon/>
                </ListItemIcon>
                <ListItemText>Amy Baker</ListItemText>
                <ListItemText>baker@email.com</ListItemText>
                <EditIcon/>
                <DeleteIcon/>
              </ListItem>
            </List>
            </Box>
           
          </Box>)
}}
 
export default ManageAccounts;