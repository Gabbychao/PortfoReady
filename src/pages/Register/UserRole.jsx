import React, {useState } from "react";
import background from "../../assets/bg-img.png";
import {
  Box,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  styled,
} from "@mui/material";
import studentlogo from "../../assets/student-logo.png";
import employerlogo from "../../assets/employer-logo.png";
import { Link } from "react-router-dom";

const UserRole = () => {
  const [alignment, setAlignment] = React.useState("student");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Typography variant="h4" fontWeight="bold" paddingBottom="30px">
        Select User Type
      </Typography>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        width="755px"
        height="450px"
        borderRadius="40px"
        sx={{
          backdropFilter: "blur(7px)",
          boxShadow: 10,
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#" : "rgb(255, 255, 255,0.5)",
          color: (theme) =>
            theme.palette.mode === "dark" ? "grey.300" : "grey.800",
        }}
      >
        <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={handleAlignment}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "755px",
          }}
        >
          <ToggleButton
            value="student"
            sx={{
              width: "245px",
              height: "170px",
              border: "2px solid #000000",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <img src={studentlogo} />
            <Typography>Student</Typography>
          </ToggleButton>

          <ToggleButton
            value="employer"
            sx={{
              width: "245px",
              height: "170px",
              border: "2px solid #000000",
              display: "flex",
              flexDirection: "column",
              
            }}
          >
            <img src={employerlogo} />
            <Typography>Employer</Typography>
          </ToggleButton>
        </ToggleButtonGroup>
        <Box
          width="755px"
          display="flex"
          justifyContent="center"
          marginTop="50px"
        >
          <LinkStyled to="/userrole/register" state={alignment}>
            <Typography variant="h5">Next</Typography>
          </LinkStyled>
        </Box>
      </Box>
    </Box>
  );
};

const LinkStyled = styled(Link)({
  width: "150px",
  height: "45px",
  backgroundColor: "#000000",
  color: "#FFFFFF",
  borderRadius: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textDecoration:"none"
});

export default UserRole;
