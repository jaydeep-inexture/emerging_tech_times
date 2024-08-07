import AdminPanelSettings from "@mui/icons-material/AdminPanelSettings";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { Box, IconButton, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchUsers } from "@/helpers/api";
import { setNotification } from "@/redux/notificationSlice";
import { setLoading, setUsers } from "@/redux/userSlice";
import { grantAdminPermission } from "../../helpers/api";

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
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  const fetchUsersList = async () => {
    try {
      dispatch(setLoading(true));
      const data = await fetchUsers();

      dispatch(setUsers(data));
      dispatch(setLoading(false));
    } catch (error) {
      const errMessage =
        error.response.data.msg ||
        error.response.data?.errors?.[0]?.msg ||
        "An error occurred";
      dispatch(
        setNotification({
          type: "error",
          message: errMessage,
        }),
      );
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (!users) {
      fetchUsersList();
    }
  }, [dispatch]);

  const handlePermission = async (id) => {
    setLoading(true);

    try {
      const data = await grantAdminPermission(id);
      fetchUsersList();
      dispatch(
        setNotification({
          type: "success",
          message: data.msg,
        }),
      );
      setLoading(false);
    } catch (error) {
      const errMessage =
        error.response.data.msg ||
        error.response.data?.errors?.[0]?.msg ||
        "An error occurred";
      dispatch(
        setNotification({
          type: "error",
          message: errMessage,
        }),
      );
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>
      {users?.length > 0 ? (
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
              {users?.map((user) => (
                <StyledTableRow key={user._id}>
                  <StyledTableCell align="left">{user._id}</StyledTableCell>
                  <StyledTableCell scope="user">{user.email}</StyledTableCell>
                  <StyledTableCell align="right">
                    {user.username}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {user.isAdmin ? (
                      <CheckIcon color="success" />
                    ) : (
                      <ClearIcon color="info" />
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <IconButton onClick={() => handlePermission(user._id)}>
                      <AdminPanelSettings sx={{ color: "#0F172A" }} />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "60vh",
            textAlign: "center",
          }}
        >
          <Typography variant="h6" color="text.secondary">
            No Data to show
          </Typography>
        </Box>
      )}
    </Box>
  );
}
