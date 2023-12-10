import React from "react";
import {
  Box,
  Typography,
  styled,
  Input,
  TextField,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";

const ContactForm = () => {
  return (
    <>
      {/* Container */}
      <Box>
        <Box
          height="480px"
          sx={{
            backgroundColor: "black",
            borderBottomLeftRadius: "80px",
            borderBottomRightRadius: "80px",
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            width="1000px"
            textAlign="center"
            color="#FFFFFF"
          >
            <Typography
              fontSize="96px"
              fontFamily="'Macondo Swash Caps', cursive"
            >
              PortfoReady
            </Typography>
            <Typography fontFamily="'Marvel', sans-serif" fontSize="48px">
              Discover Your Dream Job,
            </Typography>
            <Typography fontFamily="'Marvel', sans-serif" fontSize="48px">
              One Swipe at a Time
            </Typography>
            <Typography fontFamily="'Marvel', sans-serif" fontSize="48px">
              Your Future, Your Choice!
            </Typography>
            <br />
            <br />
            <Typography textAlign="center">
              Your feedback, inquiries, and ideas are the lifeblood of our
              progress.
            </Typography>
            <Typography textAlign="center">
              Send us a message today, and let's make great things happen
              together.
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="end"
            alignItems="end"
            sx={{ top: "200px", left: "1000px", position: "absolute" }}
          >
            <Box
              width="600px"
              height="700px"
              border="1px solid #000000"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              rowGap={4}
              sx={{ backgroundColor: "white" }}
            >
              <InputStyled placeholder="Complete Name" />
              <InputStyled placeholder="Email Address" />
              <InputStyled placeholder="Subject" />
              <TextField
                placeholder="Message"
                variant="outlined"
                multiline
                onFocus="none"
                rows={5}
                maxRows={5}
                InputProps={{ sx: { borderRadius: 2, width: "390px" } }}
              />
              <Button
                sx={{
                  width: "150px",
                  height: "55px",
                  borderRadius: "20px",
                  backgroundColor: "#000000",
                  textTransform: "none",
                  color: "#FFFFFF",
                  "&:hover": { backgroundColor: "#000000" },
                }}
              >
                <Typography>Submit</Typography>
              </Button>
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="start"
            marginLeft="60px"
            marginTop="150px"
            width="300px"
            rowGap={2}
          >
            <Typography variant="h5" fontWeight="bold">
              Follow Us
            </Typography>
            <Box display="flex">
              <InstagramIcon />
              <LinkStyled>https://www.Instagram.com/portfoready/</LinkStyled>
            </Box>
            <Box display="flex">
              <FacebookIcon />
              <LinkStyled>https://www.Facebook.com/portfoready/</LinkStyled>
            </Box>
            <Box display="flex">
              <TwitterIcon />
              <LinkStyled>https://www.Twitter.com/portfoready/</LinkStyled>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

const InputStyled = styled(Input)({
  width: "390px",
  height: "55px",
  border: "1px solid #c8c8c8",
  borderRadius: "2px",
  paddingLeft: "10px",
});


export default ContactForm;