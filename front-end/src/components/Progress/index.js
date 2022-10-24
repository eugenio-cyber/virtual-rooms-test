import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function CircularIndeterminate() {
  return (
    <Box
      sx={{
        display: "flex",
        position: "absolute",
        top: "0px",
        left: "0px",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "white",
        width: 1,
        height: 1,
      }}
    >
      <CircularProgress />
    </Box>
  );
}
