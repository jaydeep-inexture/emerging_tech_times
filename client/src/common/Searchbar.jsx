import { TextField, Box } from "@mui/material";

const SearchBar = () => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 600,
        margin: "0 auto",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderRadius: 1,
        padding: 1,
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search for news articles..."
        InputProps={{
          sx: {
            borderRadius: 1,
            color: "text.primary",
            backgroundColor: "transparent",
          },
        }}
        InputLabelProps={{
          sx: { color: "text.secondary" },
        }}
      />
    </Box>
  );
};

export default SearchBar;
