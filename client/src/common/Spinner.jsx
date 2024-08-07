import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";

export default function Spinner() {
  const usersLoading = useSelector((state) => state.user.loading);
  const postsLoading = useSelector((state) => state.post.loading);

  console.log({ postsLoading });
  return (
    <>
      {postsLoading ||
        (usersLoading && (
          <Box
            className="loading"
            sx={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0, 0, 0, 0.2)",
            }}
          >
            <CircularProgress />
          </Box>
        ))}
    </>
  );
}
