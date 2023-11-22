import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  styled,
  Avatar,
  Typography,
  FormControl,
  OutlinedInput,
  FormLabel,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Button,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const StudentProfile = () => {
  return (
    <>
      <Box display="flex" justifyContent="center">
        {/* Left-Container */}
        <Box
          marginTop="60px"
          marginRight="30px"
          display="flex"
          flexDirection="column"
          rowGap={4.5}
        >
          {/* Profile Details */}
          <BoxStyled display="flex">
            {/* Right-Side */}
            <Box
              width="400px"
              display="flex"
              justifyContent="center"
              flexDirection="column"
              alignItems="center"
              rowGap={2}
            >
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 60, height: 60 }}
              />
              <Typography variant="h5" fontWeight="bold">
                Student Name
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                Front-End Developer
              </Typography>
            </Box>
            {/* Left-Side */}
            <Box
              display="flex"
              justifyContent="start"
              flexDirection="column"
              marginTop="20px"
            >
              <Typography variant="h6" fontWeight="bold">
                Skills
              </Typography>
              <Typography variant="h6" fontSize="17px">
                Front-End Development, Graphic Design
              </Typography>
              <br />
              <Typography variant="h6" fontWeight="bold">
                Education
              </Typography>
              <Typography variant="h6" fontSize="17px">
                Cebu Institute of Technology
              </Typography>
              <br />
              <Typography variant="h6" fontWeight="bold">
                Email
              </Typography>
              <Typography variant="h6" fontSize="17px">
                John.Doe@gmail.com
              </Typography>
              <br />
              <ButtonStyled>Edit Profile</ButtonStyled>
            </Box>
          </BoxStyled>
          {/* Certificates */}
          <BoxStyled display="flex">
            <Box width="370px" display="flex">
              <Typography variant="h5" fontWeight="bold" padding="15px">
                Certificates
              </Typography>
            </Box>
            <Box
              width="405px"
              display="flex"
              justifyContent="end"
              paddingTop="15px"
            >
              <AddCircleIcon />
            </Box>
          </BoxStyled>
          {/* Experiences */}
          <BoxStyled display="flex">
            <Box width="370px" display="flex">
              <Typography variant="h5" fontWeight="bold" padding="15px">
                Experiences
              </Typography>
            </Box>
            <Box
              width="405px"
              display="flex"
              justifyContent="end"
              paddingTop="15px"
            >
              <AddCircleIcon />
            </Box>
          </BoxStyled>
        </Box>
        {/* Right Container */}
        <Box
          display="flex"
          flexDirection="column"
          rowGap={4.5}
          marginTop="60px"
        >
          {/* Assessment */}
          <SmallBoxStyled
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            rowGap="20px"
          >
            <Typography fontWeight="bold" variant="h6">
              Take Assessment Now
            </Typography>
            <AssessmentCard />
          </SmallBoxStyled>
          {/* Applicaitons */}
          <SmallBoxStyled
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            rowGap="20px"
          >
            <Typography fontWeight="bold" variant="h6">
              Applications
            </Typography>
            <ApplicationCard />
          </SmallBoxStyled>
          {/* Contact Info */}
          <SmallBoxStyled
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            rowGap="20px"
          >
            <Typography fontWeight="bold" variant="h6">
              Resume
            </Typography>
            <ButtonStyled>Download</ButtonStyled>
          </SmallBoxStyled>
          {/* Resume */}
          <SmallBoxStyled
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography fontWeight="bold" variant="h6">
              Contact Info
            </Typography>
            <Typography>
              <LinkStlyed>Facebook.com/profile </LinkStlyed>
            </Typography>
            <Typography>
              <LinkStlyed>Twitter.com/profile</LinkStlyed>
            </Typography>
            <Typography>
              <LinkStlyed>Email.com/profile</LinkStlyed>
            </Typography>
          </SmallBoxStyled>
        </Box>
      </Box>
    </>
  );
};


const AssessmentCard = () => {
  const [openAssessment, setOpenAssessment] = React.useState(false);
  const handleOpenAssessment = () => setOpenAssessment(true);
  const handleCloseAssessment = () => setOpenAssessment(false);

  return (
    <>
      <ButtonStyled onClick={handleOpenAssessment}>Answer</ButtonStyled>
      <Dialog
        fullWidth
        maxWidth="md"
        open={openAssessment}
        onClose={handleCloseAssessment}
      >
        <DialogTitle textAlign="center" borderBottom="2px solid #808080">
          <Typography
            variant="h6"
            component="h2"
            sx={{
              fontSize: "32px",
              fontWeight: "bold",
            }}
          >
            Assesment
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box padding="20px">
            <FormControl
              sx={{
                display: "flex",
                justifyContent: "center",
                rowGap: "10px",
              }}
            >
              <FormLabelStyled>
                1. How long have you been working as a Front End Developer?
              </FormLabelStyled>
              <OutlinedInputStyled onFocus="none" />
              <FormLabelStyled>
                2. Do you have any experience when it comes to solving real
                world problems in the IT Field?
              </FormLabelStyled>
              <OutlinedInputStyled onFocus="none" />
              <FormLabelStyled>
                3. Do you have any experience when it comes to solving real
                world problems in the IT Field?
              </FormLabelStyled>
              <OutlinedInputStyled onFocus="none" />
              <FormLabelStyled>
                4. How long have you been working as a Front End Developer?
              </FormLabelStyled>
              <OutlinedInputStyled onFocus="none" />
              <FormLabelStyled>
                5. How long have you been working as a Front End Developer?
              </FormLabelStyled>
              <OutlinedInputStyled onFocus="none" />
              <Box
                display="flex"
                alignItems="center"
                justifyContent="end"
                paddingTop="15px"
              >
                <Button
                  sx={{
                    width: "160px",
                    height: "40px",
                    borderRadius: "20px",
                    backgroundColor: "#000000",
                    color: "#FFFFFF",
                    textTransform: "none",
                    "&:hover": { backgroundColor: "#000000" },
                  }}
                >
                  <Typography variant="h6" fontWeight="bold">
                    Submit
                  </Typography>
                </Button>
              </Box>
            </FormControl>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

const ApplicationCard = () => {
  const [openApplication, setOpenApplication] = React.useState(false);
  const handleOpenApplication = () => setOpenApplication(true);
  const handleCloseApplication = () => setOpenApplication(false);
  return (
    <>
      <ButtonStyled onClick={handleOpenApplication}>View</ButtonStyled>
      <Dialog
        fullWidth
        maxWidth="md"
        open={openApplication}
        onClose={handleCloseApplication}
      >
        <DialogTitle textAlign="center" borderBottom="2px solid #808080">
          <Typography variant="h4" fontWeight="bold">
            My Applications
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Stack
            spacing={3}
            justifyContent="center"
            alignItems="center"
            paddingTop="20px"
          >
            <Box
              width="800px"
              height="126px"
              border="2px solid #808080"
              borderRadius="20px"
              display="flex"
              alignItems="center"
              paddingLeft="30px"
            >
              <Stack direction="row" columnGap="180px" alignItems="center">
                <Typography variant="h4" fontWeight="bold">
                  Application for Pixel Perfect
                </Typography>
                <Box textAlign="center">
                  <Typography variant="h6" fontWeight="bold">
                    Status
                  </Typography>
                  <Typography color="#00f700" variant="h5" fontWeight="bold">
                    Accepted
                  </Typography>
                </Box>
              </Stack>
            </Box>
            <Box
              width="800px"
              height="126px"
              border="2px solid #808080"
              borderRadius="20px"
              display="flex"
              alignItems="center"
              paddingLeft="30px"
            >
              <Stack direction="row" columnGap="180px" alignItems="center">
                <Typography variant="h4" fontWeight="bold">
                  Application for Pixel Perfect
                </Typography>
                <Box textAlign="center">
                  <Typography variant="h6" fontWeight="bold">
                    Status
                  </Typography>
                  <Typography color="#FF0000" variant="h5" fontWeight="bold">
                    Rejected
                  </Typography>
                </Box>
              </Stack>
            </Box>
            <Box
              width="800px"
              height="126px"
              border="2px solid #808080"
              borderRadius="20px"
              display="flex"
              alignItems="center"
              paddingLeft="30px"
            >
              <Stack direction="row" columnGap="180px" alignItems="center">
                <Typography variant="h4" fontWeight="bold">
                  Application for Pixel Perfect
                </Typography>
                <Box textAlign="center">
                  <Typography variant="h6" fontWeight="bold">
                    Status
                  </Typography>
                  <Typography color="#c8c8c8" variant="h5" fontWeight="bold">
                    Pending
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};

const OutlinedInputStyled = styled(OutlinedInput)({
  width: "800px",
  height: "55px",
  borderRadius: "20px",
});

const FormLabelStyled = styled(FormLabel)({
  fontsize: "20px",
  fontWeight: "bold",
});

const LinkStlyed = styled(Link)({
  color: "#20A4E6",
});

const BoxStyled = styled(Box)({
  width: "810px",
  height: "300px",
  border: "2px solid #000000",
  borderRadius: "10px",
});

const SmallBoxStyled = styled(Box)({
  width: "320px",
  height: "130px",
  border: "2px solid #000000",
  borderRadius: "15px",
});

const ButtonStyled = styled(Button)({
  width: "130px",
  textAlign: "center",
  height: "30px",
  borderRadius: "15px",
  border: "3px solid #20A4E6",
  color: "#20A4E6",
  textTransform: "none",
});

export default StudentProfile;