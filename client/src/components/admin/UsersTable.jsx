import CheckIcon from '@mui/icons-material/Check';
import Paper from '@mui/material/Paper';
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ClearIcon from '@mui/icons-material/Clear';
import AdminPanelSettings from '@mui/icons-material/AdminPanelSettings';
import {IconButton} from '@mui/material';

const StyledTableCell = styled(TableCell)(({theme}) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#0F172A',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const rows = [
  {
    id: 1,
    email: 'admin@gmail.com',
    username: 'admin',
    isAdmin: true,
  },
  {
    id: 2,
    email: 'test@gmail.com',
    username: 'test',
    isAdmin: false,
  },
];

export default function UsersTable() {
  return (
    <TableContainer component={Paper} sx={{mt: 8}}>
      <Table sx={{minWidth: 700}} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell>Id</StyledTableCell>
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell align='right'>Username</StyledTableCell>
            <StyledTableCell align='right'>IsAdmin</StyledTableCell>
            <StyledTableCell align='right'>Change</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell align='row'>{row.id}</StyledTableCell>
              <StyledTableCell scope='row'>{row.email}</StyledTableCell>
              <StyledTableCell align='right'>{row.username}</StyledTableCell>
              <StyledTableCell align='right'>
                {row.isAdmin ? (
                  <CheckIcon color='success' />
                ) : (
                  <ClearIcon color='info' />
                )}
              </StyledTableCell>
              <StyledTableCell align='right'>
                <IconButton>
                  <AdminPanelSettings sx={{color: '#0F172A'}} />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
