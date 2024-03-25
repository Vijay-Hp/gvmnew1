import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

export default function CustomizedSearchBox() {
  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        backgroundColor: "#312E47",
      }}
      fullWidth
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        style={{ color: "#fff" }}
        placeholder="Search"
        inputProps={{ "aria-label": "search google maps" }}
        fullWidth
      />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon style={{ color: "#fff" }} />
      </IconButton>
    </Paper>
  );
}
