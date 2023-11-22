import { Box, Button, Typography } from "@mui/material";
import React from "react";
import landingbg from "../../assets/landing-bg.png";
import logo from "../../assets/logo.png";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    // Container
    <Box display="flex" height="100vh">
      {/* Left-Container */}
      <Box
        position="absolute"
        borderBottom="3px solid #000000"
        top={0}
        left={0}
        width="100%"
        height="40px"
        zIndex="100"
      >
      </Box>
      <Box position="absolute" borderLeft="3px solid #000000" top={0} right={0} width="40px" height="100%" zIndex="100"></Box>
      <Box
        width="40%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        rowGap={15}
      >
        <Box
          width="560px"
          height="255px"
          borderRadius="20px"
          display="flex"
          sx={{
            boxShadow: 3,
            bgcolor: (theme) =>
              theme.palette.mode === "dark" ? "#101010" : "#fff",
            color: (theme) =>
              theme.palette.mode === "dark" ? "grey.300" : "grey.800",
          }}
        >
          {/* Welcome Text */}
          <Box
            width="390px"
            height="255px"
            display="flex"
            alignItems="center"
            textAlign="center"
          >
            <Typography
              paddingLeft="10px"
              fontSize="60px"
              fontWeight="bold"
              color="#000000"
            >
              Welcome to PortfoReady
            </Typography>
          </Box>
          {/* Logo */}
          <Box
            width="230px"
            height="255px"
            sx={{
              backgroundPosition: "center",
              backgroundImage: `url(${logo})`,
            }}
          ></Box>
        </Box>
        <Box>
          <Typography variant="h6" fontWeight="bold">
            Explore Career Pathways
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            Engage with Potential Employers
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            Seize Oppurtunities
          </Typography>
        </Box>
        <LinkStyled to="/login">
          Get Started
        </LinkStyled>
      </Box>
      {/* Right-Container */}
      <Box
        width="60%"
        sx={{
          backgroundImage: `url(${landingbg})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      ></Box>
    </Box>
  );
};

const ButtonStlyed = styled(Button)({
  width:"377px",
  height:"74px",
  borderRadius:"10px",
  backgroundColor:"#000000",
  color:"#FFFFFF",
  fontWeight:"bold",
  fontSize:"35px",
  textTransform: "none",
})

const LinkStyled = styled(Link)({
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  width:"377px",
  height:"74px",
  borderRadius:"10px",
  backgroundColor:"#000000",
  color:"#FFFFFF",
  fontWeight:"bold",
  fontSize:"35px",
  textDecoration:"none"
})

export default LandingPage;