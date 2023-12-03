import React, { useState, useEffect } from "react";
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
  IconButton,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import axios from "axios";
import useAuth from "../../hooks/useAuth";


const StudentProfile = () => {
  const { user, isLoading } = useAuth();
  const [userDetails, setUserDetails] = useState();
  const [studentDetails, setStudentDetails] = useState();

  const fetchUserDetails = async () => {
    await axios
      .get(`http://localhost:8080/user/getUser?userId=${user.userId}`)
      .then((response) => {
        setUserDetails(response.data.data);
      })
      .catch((error) => {
        console.log("Fetching UserDetails Error: ", error);
      });
    await axios
      .get(
        `http://localhost:8080/student/getStudentByUserId?userId=${user.userId}`
      )
      .then((response) => {
        setStudentDetails(response.data.data);
      })
      .catch((error) => {
        console.log("Fetching Student Details Error: ", error);
      });
  };

  useEffect(() => {
    if (user.isAuthenticated) {
      
      fetchUserDetails();
    }
  }, [isLoading, user]);

  if (!userDetails || !studentDetails) {
    return "...";
  }

  const handleAddCertificate = async (file) => {
    try {
      const formDataForImage = new FormData();
      formDataForImage.append("file", file);
      formDataForImage.append("userId", user.userId);
      formDataForImage.append("name", "");
      const image = await axios.post(
        "http://localhost:8080/certificate/addCertificate",
        formDataForImage,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (image.status === 200) {
        fetchUserDetails()
        console.log("Certificate uploaded successfully!");
      }
    } catch (error) {
      console.error("Error adding Certificate", error.message);
    }
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

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
                src={`http://localhost:8080/user/${user.userId}/image`}
                sx={{ width: 60, height: 60 }}
              />
              <Typography variant="h5" fontWeight="bold">
                {userDetails.firstName} {userDetails.lastName}
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
                {studentDetails.skills}
              </Typography>
              <br />
              <Typography variant="h6" fontWeight="bold">
                Education
              </Typography>
              <Typography variant="h6" fontSize="17px">
                {studentDetails.education}
              </Typography>
              <br />
              <Typography variant="h6" fontWeight="bold">
                Email
              </Typography>
              <Typography variant="h6" fontSize="17px">
                {userDetails.email}
              </Typography>
              <br />
              <ButtonStyled component={Link} to="/editstudent">
                Edit Profile
              </ButtonStyled>
            </Box>
          </BoxStyled>
          {/* Certificates */}
          <BoxStyled display="flex" flexDirection="column">
            <Box height="70px" width="810px" display="flex" alignItems="center">
              <Box display="flex" justifyContent="center" width="200px">
                <Typography variant="h5" fontWeight="bold">
                  Certificates
                </Typography>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="end"
                width="580px"
              >
                <Button
                  component="label"
                  color="primary"
                  variant="contained"
                  startIcon={<AddCircleIcon />}
                  sx={{
                    backgroundColor: "white",
                    color: "#27374D",
                    "&:hover": { backgroundColor: "#142132", color: "white" },
                    borderRadius: "20px",
                    border: ".1px solid #27374D",
                    display: "flex",
                    width: 170,
                    whiteSpace: "nowrap",
                    fontSize: "10",
                  }}
                >
                  Add Certificate
                  <VisuallyHiddenInput
                    accept="image/*"
                    onChange={(e) => handleAddCertificate(e.target.files[0])}
                    name="certificates"
                    type="file"
                  />
                </Button>
              </Box>
            </Box>
            <Box
              display="flex"
              width="790px"
              height="200px"
              columnGap={10}
              paddingLeft="20px"
              sx={{overflowX: "scroll" }}
            >
              {studentDetails.certificates.map((certificate) => (
                <Box key={certificate.id} width="150px" height="200px">
                  <img
                    style={{ maxWidth: "200px", maxHeight: "200px" }}
                    src={`http://localhost:8080/certificate/getCertificate?id=${certificate.id}`}
                    alt=""
                  />
                </Box>
              ))}
            </Box>
          </BoxStyled>
          {/* Experiences */}
          <BoxStyled display="flex" flexDirection="column">
            <Box display="flex" padding="15px">
              <Typography variant="h5" fontWeight="bold" padding="15px">
                Experiences
              </Typography>
            </Box>
            <Typography sx={{ paddingLeft: "20px" }} variant="p">
              {studentDetails.experiences}
            </Typography>
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
            <ButtonStyled
              component={Link}
              to={`http://localhost:8080/student/getResume/${user.id}`}
              download
            >
              View Resume
            </ButtonStyled>
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
              <LinkStlyed>{userDetails.links}</LinkStlyed>
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