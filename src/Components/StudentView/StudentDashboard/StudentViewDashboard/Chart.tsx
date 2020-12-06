// import React from "react";
// import clsx from "clsx";
// import {
//   createStyles,
//   lighten,
//   makeStyles,
//   Theme,
// } from "@material-ui/core/styles";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
// import TableHead from "@material-ui/core/TableHead";
// import TablePagination from "@material-ui/core/TablePagination";
// import TableRow from "@material-ui/core/TableRow";
// import TableSortLabel from "@material-ui/core/TableSortLabel";
// import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
// import Paper from "@material-ui/core/Paper";
// import Checkbox from "@material-ui/core/Checkbox";
// import IconButton from "@material-ui/core/IconButton";
// import Tooltip from "@material-ui/core/Tooltip";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Switch from "@material-ui/core/Switch";
// import DeleteIcon from "@material-ui/icons/Delete";
// import FilterListIcon from "@material-ui/icons/FilterList";
// import WarningIcon from "@material-ui/icons/Warning";
// import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
// import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
// import { positions } from "@material-ui/system";
// import Box from "@material-ui/core/Box";
// import Collapse from "@material-ui/core/Collapse";

// interface Data {
//   hours: number;
// status: string;
//   description: string;
//   name: string;

// }

// function createData(
//   name: string,
//  hours: number,
//   description: string,
//   status: string

// ): Data {
//   return { name, hours, description, status};
// }

// const rows = [
//   createData('George Smith', 5, "I babysat my little cousin.", 'Approved'),
//   createData('Dana Smith', 2, "I babysat my little cousin.", 'Approved'),
//   createData('Beth Smith', 2, "I babysat my little cousin.", 'Approved'),
//   createData('Cara Smith', 9, "I babysat my little cousin.", 'Denied'),
//   createData('Mark Smith', 6, "I babysat my little cousin.", 'Pending'),
//   createData('Amy Smith', 8, "I babysat my little cousin.", 'Approved'),
//   createData('Lulu Smith', 7, "I babysat my little cousin.",'Pending'),
//   createData('Todd Smith', 5, "I babysat my little cousin.", 'Pending'),
//   createData('Frank Smith', 8, "I babysat my little cousin.", 'Approved'),
//   createData('Marlo Smith', 2, "I babysat my little cousin.", 'Pending'),
//   createData('Marshmallow', 8, "I babysat my little cousin.", 'Pending'),
//   createData('Nougat', 3, "I babysat my little cousin.", 'Denied'),
//   createData('Oreo', 7, "I babysat my little cousin.", 'Denied'),
// ];

// function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// type Order = 'asc' | 'desc';

// function getComparator<Key extends keyof any>(
//   order: Order,
//   orderBy: Key,
// ): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
//   const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

// interface HeadCell {
//   disablePadding: boolean;
//   id: keyof Data;
//   label: string;
//   numeric: boolean;
// }

// const headCells: HeadCell[] = [
//   { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
//   { id: 'description', numeric: true, disablePadding: false, label: 'Description' },
//   { id: 'hours', numeric: true, disablePadding: false, label: 'Hours' },

//   { id: 'status', numeric: true, disablePadding: false, label: 'Status' },

// ];

// interface EnhancedTableProps {
//   classes: ReturnType<typeof useStyles>;
//   numSelected: number;
//   onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
//   onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
//   order: Order;
//   orderBy: string;
//   rowCount: number;
// }

// function EnhancedTableHead(props: EnhancedTableProps) {
//   const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
//   const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
//     onRequestSort(event, property);
//   };

//   return (
//     <TableHead>
//       <TableRow>
//         <TableCell padding="checkbox">
//           <Checkbox
//             indeterminate={numSelected > 0 && numSelected < rowCount}
//             checked={rowCount > 0 && numSelected === rowCount}
//             onChange={onSelectAllClick}
//             inputProps={{ 'aria-label': 'select all desserts' }}
//           />
//         </TableCell>
//         {headCells.map((headCell) => (
//           <TableCell
//             key={headCell.id}
//             align={headCell.numeric ? 'left' : 'left'}
//             padding={headCell.disablePadding ? 'none' : 'default'}
//             sortDirection={orderBy === headCell.id ? order : false}
//           >
//             <TableSortLabel
//               active={orderBy === headCell.id}
//               direction={orderBy === headCell.id ? order : 'asc'}
//               onClick={createSortHandler(headCell.id)}
//             >
//               {headCell.label}
//               {orderBy === headCell.id ? (
//                 <span className={classes.visuallyHidden}>
//                   {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
//                 </span>
//               ) : null}
//             </TableSortLabel>
//           </TableCell>
//         ))}
//       </TableRow>
//     </TableHead>
//   );
// }

// const useToolbarStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       paddingLeft: theme.spacing(2),
//       paddingRight: theme.spacing(1),
//     },
//     highlight:
//       theme.palette.type === 'light'
//         ? {
//             color: theme.palette.primary.main,
//             backgroundColor: lighten(theme.palette.primary.light, 0.85),
//           }
//         : {
//             color: theme.palette.text.primary,
//             backgroundColor: theme.palette.primary.dark,
//           },
//     title: {
//       flex: '1 1 100%',
//     },
//   }),
// );

// interface EnhancedTableToolbarProps {
//   numSelected: number;
// }

// const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
//   const classes = useToolbarStyles();
//   const { numSelected } = props;

//   return (
//     <Toolbar
//       className={clsx(classes.root, {
//         [classes.highlight]: numSelected > 0,
//       })}
//     >
//       {numSelected > 0 ? (
//         <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
//           {numSelected} selected
//         </Typography>
//       ) : (
//         <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
//           Service Hours
//         </Typography>
//       )}
//       {numSelected > 0 ? (
//         <div>
//        <Tooltip title="Delete">
//           <IconButton aria-label="delete">
//             <AssignmentTurnedInIcon />
//           </IconButton>
//         </Tooltip>
//         <Tooltip title="Delete">
//           <IconButton aria-label="delete">
//             <WarningIcon />
//           </IconButton>
//         </Tooltip>
//         </div>

//       ) : (
//         <Tooltip title="Filter list">
//           <IconButton aria-label="filter list">
//             <FilterListIcon />
//           </IconButton>
//         </Tooltip>
//       )}
//     </Toolbar>
//   );
// };

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       width: '100%',
//     },
//     paper: {
//       width: '100%',
//       marginBottom: theme.spacing(2),
//     },
//     table: {
//       minWidth: 750,
//     },
//     visuallyHidden: {
//       border: 0,
//       clip: 'rect(0 0 0 0)',
//       height: 1,
//       margin: -1,
//       overflow: 'hidden',
//       padding: 0,
//       position: 'absolute',
//       top: 20,
//       width: 1,
//     },
//   }),
// );

// export default function EnhancedTable() {
//   const classes = useStyles();
//   const [order, setOrder] = React.useState<Order>('asc');
//   const [orderBy, setOrderBy] = React.useState<keyof Data>('hours');
//   const [selected, setSelected] = React.useState<string[]>([]);
//   const [page, setPage] = React.useState(0);
//   const [dense, setDense] = React.useState(false);
//   const [rowsPerPage, setRowsPerPage] = React.useState(5);

//   const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
//     const isAsc = orderBy === property && order === 'asc';
//     setOrder(isAsc ? 'desc' : 'asc');
//     setOrderBy(property);
//   };

//   const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.checked) {
//       const newSelecteds = rows.map((n) => n.name);
//       setSelected(newSelecteds);
//       return;
//     }
//     setSelected([]);
//   };

//   const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
//     const selectedIndex = selected.indexOf(name);
//     let newSelected: string[] = [];

//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, name);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(
//         selected.slice(0, selectedIndex),
//         selected.slice(selectedIndex + 1),
//       );
//     }

//     setSelected(newSelected);
//   };

//   const handleChangePage = (event: unknown, newPage: number) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setDense(event.target.checked);
//   };

//   const isSelected = (name: string) => selected.indexOf(name) !== -1;

//   const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

//   return (

//     <Box >
//     <div className={classes.root}>
//       <Paper className={classes.paper}>
//         <EnhancedTableToolbar numSelected={selected.length} />
//         <TableContainer>
//           <Table
//             className={classes.table}
//             aria-labelledby="tableTitle"
//             size={dense ? 'small' : 'medium'}
//             aria-label="enhanced table"
//           >
//             <EnhancedTableHead
//               classes={classes}
//               numSelected={selected.length}
//               order={order}
//               orderBy={orderBy}
//               onSelectAllClick={handleSelectAllClick}
//               onRequestSort={handleRequestSort}
//               rowCount={rows.length}
//             />
//             <TableBody>
//               {stableSort(rows, getComparator(order, orderBy))
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((row, index) => {
//                   const isItemSelected = isSelected(row.name);
//                   const labelId = `enhanced-table-checkbox-${index}`;

//                   return (
//                     <TableRow
//                       hover
//                       onClick={(event) => handleClick(event, row.name)}
//                       role="checkbox"
//                       aria-checked={isItemSelected}
//                       tabIndex={-1}
//                       key={row.name}
//                       selected={isItemSelected}

//                     >
//                       <TableCell padding="checkbox">
//                         <Checkbox
//                           checked={isItemSelected}
//                           inputProps={{ 'aria-labelledby': labelId }}
//                         />
//                       </TableCell>
//                       <TableCell component="th" id={labelId} scope="row" padding="none">
//                         {row.name}
//                       </TableCell>
//                       <TableCell align="left">{row.description}</TableCell>
//                       <TableCell align="left">{row.hours}</TableCell>

//                       <TableCell align="left">{row.status}</TableCell>

//                     </TableRow>
//                   );
//                 })}
//               {emptyRows > 0 && (
//                 <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
//                   <TableCell colSpan={6} />
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={rows.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onChangePage={handleChangePage}
//           onChangeRowsPerPage={handleChangeRowsPerPage}
//         />
//       </Paper>
//       <FormControlLabel
//         control={<Switch checked={dense} onChange={handleChangeDense} />}
//         label="Dense padding"
//       />
//     </div>
//     </Box>
//   );
// }

// interface Data {
//   hours: number;
//   status: string;
//   description: string;
//   name: string;
// }

// function createData(
//   name: string,
//   hours: number,
//   description: string,
//   status: string
// ): Data {
//   return { name, hours, description, status };
// }

// const rows = [
//   createData("George Smith", 5, "Tutoring", "Approved"),
//   createData("Dana Smith", 2, "Donation", "Approved"),
//   createData("Beth Smith", 2, "Babysitting", "Approved"),
//   createData("Cara Smith", 9, "Recycling", "Denied"),
//   createData("Mark Smith", 6, "Letter of Support", "Pending"),
//   createData("Amy Smith", 8, "Animal Shelter", "Approved"),
//   createData("Lulu Smith", 7, "Tutoring", "Pending"),
//   createData("Todd Smith", 5, "Tutoring", "Pending"),
//   createData("Frank Smith", 8,  "Recycling", "Approved"),
//   createData("Marlo Smith", 2, "Letter of Support", "Pending"),
//   createData("Marshmallow", 8, "Animal Shelter", "Pending"),
//   createData("Nougat", 3,  "Recycling", "Denied"),
//   createData("Oreo", 7, "Letter of Support", "Denied"),
// ];

// function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// type Order = "asc" | "desc";

// function getComparator<Key extends keyof any>(
//   order: Order,
//   orderBy: Key
// ): (
//   a: { [key in Key]: number | string },
//   b: { [key in Key]: number | string }
// ) => number {
//   return order === "desc"
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
//   const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

// interface HeadCell {
//   disablePadding: boolean;
//   id: keyof Data;
//   label: string;
//   numeric: boolean;
// }

// const headCells: HeadCell[] = [
//   {
//     id: "description",
//     numeric: true,
//     disablePadding: false,
//     label: "Service Type",
//   },
//   { id: "hours", numeric: true, disablePadding: false, label: "Hours" },

//   { id: "status", numeric: true, disablePadding: false, label: "Status" },
// ];

// interface EnhancedTableProps {
//   classes: ReturnType<typeof useStyles>;
//   numSelected: number;
//   onRequestSort: (
//     event: React.MouseEvent<unknown>,
//     property: keyof Data
//   ) => void;
//   onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
//   order: Order;
//   orderBy: string;
//   rowCount: number;
// }

// function EnhancedTableHead(props: EnhancedTableProps) {
//   const {
//     classes,
//     onSelectAllClick,
//     order,
//     orderBy,
//     numSelected,
//     rowCount,
//     onRequestSort,
//   } = props;
//   const createSortHandler = (property: keyof Data) => (
//     event: React.MouseEvent<unknown>
//   ) => {
//     onRequestSort(event, property);
//   };

//   return (
//     <TableHead>
//       <TableRow>
//         <TableCell padding="checkbox">
//           <Checkbox
//             indeterminate={numSelected > 0 && numSelected < rowCount}
//             checked={rowCount > 0 && numSelected === rowCount}
//             onChange={onSelectAllClick}
//             inputProps={{ "aria-label": "select all desserts" }}
//           />
//         </TableCell>
//         {headCells.map((headCell) => (
//           <TableCell
//             key={headCell.id}
//             align={headCell.numeric ? "left" : "left"}
//             padding={headCell.disablePadding ? "none" : "default"}
//             sortDirection={orderBy === headCell.id ? order : false}
//           >
//             <TableSortLabel
//               active={orderBy === headCell.id}
//               direction={orderBy === headCell.id ? order : "asc"}
//               onClick={createSortHandler(headCell.id)}
//             >
//               {headCell.label}
//               {orderBy === headCell.id ? (
//                 <span className={classes.visuallyHidden}>
//                   {order === "desc" ? "sorted descending" : "sorted ascending"}
//                 </span>
//               ) : null}
//             </TableSortLabel>
//           </TableCell>
//         ))}
//       </TableRow>
//     </TableHead>
//   );
// }

// const useToolbarStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       paddingLeft: theme.spacing(2),
//       paddingRight: theme.spacing(1),
//     },
//     highlight:
//       theme.palette.type === "light"
//         ? {
//             color: theme.palette.primary.main,
//             backgroundColor: lighten(theme.palette.primary.light, 0.85),
//           }
//         : {
//             color: theme.palette.text.primary,
//             backgroundColor: theme.palette.primary.dark,
//           },
//     title: {
//       flex: "1 1 100%",
//     },
//   })
// );

// interface EnhancedTableToolbarProps {
//   numSelected: number;
// }

// const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
//   const classes = useToolbarStyles();
//   const { numSelected } = props;

//   return (
//     <Toolbar
//       className={clsx(classes.root, {
//         [classes.highlight]: numSelected > 0,
//       })}
//     >
//       {numSelected > 0 ? (
//         <Typography
//           className={classes.title}
//           color="inherit"
//           variant="subtitle1"
//           component="div"
//         >
//           {numSelected} selected
//         </Typography>
//       ) : (
//         <Typography
//           className={classes.title}
//           variant="h6"
//           id="tableTitle"
//           component="div"
//         >
//           Service Hours
//         </Typography>
//       )}
//       {numSelected > 0 ? (
//         <div>
//           <Tooltip title="Delete">
//             <IconButton aria-label="delete">
//               <AssignmentTurnedInIcon />
//             </IconButton>
//           </Tooltip>
//           <Tooltip title="Delete">
//             <IconButton aria-label="delete">
//               <WarningIcon />
//             </IconButton>
//           </Tooltip>
//         </div>
//       ) : (
//         <Tooltip title="Filter list">
//           <IconButton aria-label="filter list">
//             <FilterListIcon />
//           </IconButton>
//         </Tooltip>
//       )}
//     </Toolbar>
//   );
// };

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       width: "100%",
//     },
//     paper: {
//       width: "100%",
//       marginBottom: theme.spacing(2),
//     },
//     table: {
//       minWidth: 750,
//     },
//     visuallyHidden: {
//       border: 0,
//       clip: "rect(0 0 0 0)",
//       height: 1,
//       margin: -1,
//       overflow: "hidden",
//       padding: 0,
//       position: "absolute",
//       top: 20,
//       width: 1,
//     },
//   })
// );

// export default function EnhancedTable() {
//   const classes = useStyles();
//   const [order, setOrder] = React.useState<Order>("asc");
//   const [orderBy, setOrderBy] = React.useState<keyof Data>("hours");
//   const [selected, setSelected] = React.useState<string[]>([]);
//   const [page, setPage] = React.useState(0);
//   const [dense, setDense] = React.useState(false);
//   const [rowsPerPage, setRowsPerPage] = React.useState(5);

//   const handleRequestSort = (
//     event: React.MouseEvent<unknown>,
//     property: keyof Data
//   ) => {
//     const isAsc = orderBy === property && order === "asc";
//     setOrder(isAsc ? "desc" : "asc");
//     setOrderBy(property);
//   };

//   const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.checked) {
//       const newSelecteds = rows.map((n) => n.name);
//       setSelected(newSelecteds);
//       return;
//     }
//     setSelected([]);
//   };

//   const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
//     const selectedIndex = selected.indexOf(name);
//     let newSelected: string[] = [];

//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, name);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(
//         selected.slice(0, selectedIndex),
//         selected.slice(selectedIndex + 1)
//       );
//     }

//     setSelected(newSelected);
//   };

//   const handleChangePage = (event: unknown, newPage: number) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setDense(event.target.checked);
//   };

//   const isSelected = (name: string) => selected.indexOf(name) !== -1;

//   const emptyRows =
//     rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

//   return (
//     <Box>
//       <div className={classes.root}>
//         <Paper className={classes.paper}>
//           <EnhancedTableToolbar numSelected={selected.length} />
//           <TableContainer>
//             <Table
//               className={classes.table}
//               aria-labelledby="tableTitle"
//               size={dense ? "small" : "medium"}
//               aria-label="enhanced table"
//             >
//               <EnhancedTableHead
//                 classes={classes}
//                 numSelected={selected.length}
//                 order={order}
//                 orderBy={orderBy}
//                 onSelectAllClick={handleSelectAllClick}
//                 onRequestSort={handleRequestSort}
//                 rowCount={rows.length}
//               />
//               <TableBody>
//                 {stableSort(rows, getComparator(order, orderBy))
//                   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                   .map((row, index) => {
//                     const isItemSelected = isSelected(row.name);
//                     const labelId = `enhanced-table-checkbox-${index}`;

//                     return (
//                       <TableRow
//                         hover
//                         onClick={(event) => handleClick(event, row.name)}
//                         role="checkbox"
//                         aria-checked={isItemSelected}
//                         tabIndex={-1}
//                         key={row.name}
//                         selected={isItemSelected}
//                       >
//                         <Collapse in={false} timeout="auto" unmountOnExit>
//                           <Box margin={1}>
//                             <Typography
//                               variant="h6"
//                               gutterBottom
//                               component="div"
//                             >
//                               History
//                             </Typography>
//                           </Box>
//                         </Collapse>
//                         <TableCell padding="checkbox">
//                           <Checkbox
//                             checked={isItemSelected}
//                             inputProps={{ "aria-labelledby": labelId }}
//                           />
//                         </TableCell>
//                         <TableCell>
//                         {row.description}
//                           <IconButton
//                             aria-label="expand row"
//                             size="small"

//                           >
//                     <KeyboardArrowUpIcon/>
//                           </IconButton>
//                         </TableCell>

//                         <TableCell align="left">{row.hours}</TableCell>

//                         <TableCell align="left">{row.status}</TableCell>
//                       </TableRow>
//                     );
//                   })}
//                 {emptyRows > 0 && (
//                   <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
//                     <TableCell colSpan={6} />
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           <TablePagination
//             rowsPerPageOptions={[5, 10, 25]}
//             component="div"
//             count={rows.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onChangePage={handleChangePage}
//             onChangeRowsPerPage={handleChangeRowsPerPage}
//           />
//         </Paper>
//         <FormControlLabel
//           control={<Switch checked={dense} onChange={handleChangeDense} />}
//           label="Dense padding"
//         />
//       </div>
//     </Box>
//   );
// }

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Chip from "@material-ui/core/Chip";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  Link
 } from "react-router-dom";


const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function createData(
  name: string,
  calories: number,
  fat: number,
  price: number
) {
  return {
    name,
    calories,
    fat,
    price,
    history: [
      { date: "2020-01-05", customerId: "11091700", amount: 3 },
      { date: "2020-01-02", customerId: "Anonymous", amount: 1 },
    ],
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment >
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="center">{row.calories}</TableCell>
        <TableCell align="center">{row.fat}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box style={{ padding: "5px" }} margin={1}>
          
              <Box className="editIcon"><h5 style={{marginRight:"auto"}}>Details</h5>
              <Link to="/editservice"><EditIcon style={{marginRight:"10px"}}  /></Link><DeleteIcon  /></Box>
              <p style={{ padding: "15px" }}>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed
                vitae ipsa natus laboriosam et odio deleniti.
              </p>
              
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  createData("Tutoring", 1, 6.0, 24),
  createData("Babysitting", 2, 9.0, 37),
  createData("Letter of Support", 2, 16.0, 24),
  createData("Animal Shelter", 3, 3.7, 67),
  createData("Recycling", 3, 16.0, 49),
];

export default function Chart() {
  return (
    <TableContainer style={{paddingLeft:"5px"}} component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Service Type</TableCell>
            <TableCell align="center">Hours</TableCell>
            <TableCell align="center">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
