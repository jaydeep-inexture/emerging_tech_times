import { Person } from "@mui/icons-material";
import { Box, Chip, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Spinner from "@/common/Spinner";
import { fetchPostDetails } from "@/helpers/api";
import { useIsMobile } from "@/hooks/useIsMobile";
import { setNotification } from "@/redux/notificationSlice";
import { setLoading, setSelectedPost } from "@/redux/postSlice";

const ArticleDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { isMobile } = useIsMobile();
  const { selectedPost, loading } = useSelector((state) => state.post);

  useEffect(() => {
    const fetchPostInfo = async () => {
      dispatch(setLoading(true));

      try {
        const data = await fetchPostDetails(id);
        dispatch(setSelectedPost(data));
        dispatch(setLoading(false));
      } catch (error) {
        const errMessage =
          error.response?.data?.msg ||
          error.response?.data?.errors?.[0]?.msg ||
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

    if (id) {
      fetchPostInfo();
    }

    return () => {
      dispatch(setSelectedPost(null));
    };
  }, [dispatch, id]);

  return (
    <>
      {loading && <Spinner />}
      <Box
        sx={{
          paddingX: "10%",
          marginBottom: isMobile ? "10%" : "5%",
          marginTop: "2%",
          minHeight: "70vh",
        }}
      >
        <Box>
          <Typography variant={isMobile ? "h4" : "h2"} fontWeight={800}>
            {selectedPost?.title}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              my: 3,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Person sx={{ mr: 1 }} />
              <Typography color="text.secondary" fontSize={20}>
                {`By ${selectedPost?.author.name} on ${new Date(
                  selectedPost?.createdAt,
                ).toLocaleDateString()}`}
              </Typography>
            </Box>
            {selectedPost?.category && (
              <Chip label={selectedPost?.category} variant="outlined" />
            )}
          </Box>

          <Typography fontSize={20} mt={1} whiteSpace="pre-wrap">
            <img
              src={selectedPost?.imageUrl}
              alt={selectedPost?.title}
              style={{
                width: isMobile ? "100%" : "65%",
                height: "100%",
                float: isMobile ? "none" : "right",
                padding: isMobile ? "8px 0" : "8px",
              }}
            />
            {selectedPost?.description}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default ArticleDetails;
