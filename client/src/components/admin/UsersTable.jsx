import CheckIcon from "@mui/icons-material/Check";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ClearIcon from "@mui/icons-material/Clear";
import AdminPanelSettings from "@mui/icons-material/AdminPanelSettings";
import { Box, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchUsers } from "../../helpers/api";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#0F172A",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchUsers();
      setUsers(data);
      setDataLoaded(true)
    };

    if (!dataLoaded) {
      fetchData();
    }
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>
      <TableContainer component={Paper} sx={{ mt: 8 }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell align="right">Username</StyledTableCell>
              <StyledTableCell align="right">IsAdmin</StyledTableCell>
              <StyledTableCell align="right">Change</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <StyledTableRow key={user._id}>
                <StyledTableCell align="user">{user._id}</StyledTableCell>
                <StyledTableCell scope="user">{user.email}</StyledTableCell>
                <StyledTableCell align="right">{user.username}</StyledTableCell>
                <StyledTableCell align="right">
                  {user.isAdmin ? (
                    <CheckIcon color="success" />
                  ) : (
                    <ClearIcon color="info" />
                  )}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton>
                    <AdminPanelSettings sx={{ color: "#0F172A" }} />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
