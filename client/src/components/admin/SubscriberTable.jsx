import { Box, Typography } from "@mui/material";
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
import { fetchSubscriber } from "@/helpers/api";
import { setNotification } from "@/redux/notificationSlice";
import { setdata } from "../../redux/subscriberSlice";
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

export default function SubscriberTable() {
  const dispatch = useDispatch();
  const { subscriber } = useSelector((state) => state.subscriber);
  const fetchSubscriberList = async () => {
    try {
      const data = await fetchSubscriber();
      dispatch(setdata(data));
    } catch (error) {
      const errMessage =
        error.response.data.msg ||
        error.response.data?.errors?.[0]?.msg ||
        "An error occurred";
      dispatch(
        setNotification({
          type: "error",
          message: errMessage,
        })
      );
    }
  };

  useEffect(() => {
    fetchSubscriberList();
  }, []);

  return (
    <>
      <Box sx={{ p: 2, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Subscribers
        </Typography>
        {subscriber?.length > 0 ? (
          <TableContainer component={Paper} sx={{ mt: 6 }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Id</StyledTableCell>
                  <StyledTableCell>Email</StyledTableCell>
                  <StyledTableCell align="right">Username</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {subscriber?.map((user) => (
                  <StyledTableRow key={user._id}>
                    <StyledTableCell align="left">{user._id}</StyledTableCell>
                    <StyledTableCell scope="user">{user.email}</StyledTableCell>
                    <StyledTableCell align="right">
                      {user.username}
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
    </>
  );
}
