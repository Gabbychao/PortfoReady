import {
  Box,
  Typography,
  Avatar,
  Button,
  FormControl,
  FormLabel,
  TextField,
  Tabs,
  Tab,
  Input,
} from "@mui/material";
import { useState, useEffect } from "react";
import logo from "../../assets/portfoready-logo.png";
import { styled } from "@mui/material/styles";
import AddPhotoIcon from "@mui/icons-material/AddPhotoAlternate";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
  
const EditStudent = () => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const handleTabChange = (e, tabIndex) => {
    setCurrentTabIndex(tabIndex);
  };

  const { user, isLoading } = useAuth();
  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    if (user.isAuthenticated) {
      const fetchUserDetails = async () => {
        await axios
          .get(`http://localhost:8080/user/getUser?userId=${user.userId}`)
          .then((response) => {
            setUserDetails(response.data.data);
          })
          .catch((error) => {
            console.log("Fetching UserDetails Error: ", error);
          });
      };
      fetchUserDetails();
    }
  }, [isLoading, user]);

  if (!userDetails) {
    return "...";
  }
  
  return (
    <>
      {/* Header */}
      <Box
        height="100px"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          width="100px"
          height="100px"
          sx={{
            backgroundImage: `url(${logo})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        ></Box>
        <Typography variant="h4" fontWeight="bold">
          Edit Student Profile
        </Typography>
      </Box>
      {/* Name Text */}
      <Box marginLeft="400px" marginTop="50px">
        <Typography variant="h4" fontWeight="bold">
        {`${userDetails.firstName} ${userDetails.lastName}`} /Student Profile
        </Typography>
      </Box>
      <Box marginTop="50px" display="flex">
        {/* Left-Side */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="end"
          paddingRight="50px"
          textAlign="justify"
          width="600px"
          height="560px"
          marginTop="50px"
          sx={{ borderRight: "2px solid #000000" }}
        >
          <Tabs
            value={currentTabIndex}
            orientation="vertical"
            onChange={handleTabChange}
          >
            <Tab label="Edit User" />
            <Tab label="Edit Student Profile" />
          </Tabs>
        </Box>
        {/* Right- Side */}
        <Box
          width="800px"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          rowGap={1}
        >
          {currentTabIndex === 0 && <EditUserProfile userDetails={userDetails} />}
          {currentTabIndex === 1 && <EditStudentProfile />}
        </Box>
      </Box>
    </>
  );
};
  
  const EditUserProfile = () => {

    const { user, isLoading, onLogout } = useAuth();
    const [images, setImages] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const [firstNameValue, setFirstNameValue] = useState("");
    const [lastNameValue, setLastNameValue] = useState("");
    const [usernameValue, setUsernameValue] = useState("");
    const [emailvalue, setEmailValue] = useState("");
    const [passwordvalue, setPassowrdValue] = useState("");
    const [phoneNumbervalue, setPhoneNumberValue] = useState("");
    const [contactLinksValue, setContactLinksValue] = useState("");
    return (
      <>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          columnGap={2}
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            columnGap={2}
          >
            <Avatar sx={{ height: "70px", width: "70px" }} aria-label="recipe">
              B
            </Avatar>
            <ButtonStyled>
              <Typography>Upload New Picture</Typography>
            </ButtonStyled>
            <ButtonStyled sx={{ width: "120px" }}>
              <Typography>Delete</Typography>
            </ButtonStyled>
          </Box>
          <br />
          <FormControl>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="start"
              rowGap={3}
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <FormLabelStyled sx={{ paddingRight: "95px" }}>
                  Name:
                </FormLabelStyled>
                <TextField
                  InputProps={{
                    sx: {
                      borderRadius: 20,
                      height: "39px",
                      border: "1px solid #000000",
                    },
                  }}
                  sx={{
                    width: "205px",
                    "& fieldset": { border: "none" },
                    paddingRight: "15px",
                  }}
                />
                <TextField
                  InputProps={{
                    sx: {
                      borderRadius: 20,
                      height: "39px",
                      border: "1px solid #000000",
                    },
                  }}
                  sx={{ width: "205px", "& fieldset": { border: "none" } }}
                />
              </Box>
              <Box display="flex" alignItems="center">
                <FormLabelStyled sx={{ paddingRight: "50px" }}>
                  Username:
                </FormLabelStyled>
                <TextField
                  InputProps={{
                    sx: {
                      borderRadius: 20,
                      height: "39px",
                      border: "1px solid #000000",
                    },
                  }}
                  sx={{ width: "425px", "& fieldset": { border: "none" } }}
                />
              </Box>
              <Box display="flex" alignItems="center">
                <FormLabelStyled sx={{ paddingRight: "93px" }}>
                  Email:
                </FormLabelStyled>
                <TextField
                  InputProps={{
                    sx: {
                      borderRadius: 20,
                      height: "39px",
                      border: "1px solid #000000",
                    },
                  }}
                  sx={{ width: "425px", "& fieldset": { border: "none" } }}
                />
              </Box>
              <Box display="flex" alignItems="center">
                <FormLabelStyled sx={{ paddingRight: "56px" }}>
                  Password:
                </FormLabelStyled>
                <TextField
                  InputProps={{
                    sx: {
                      borderRadius: 20,
                      height: "39px",
                      border: "1px solid #000000",
                    },
                  }}
                  sx={{ width: "425px", "& fieldset": { border: "none" } }}
                />
              </Box>
              <Box display="flex" alignItems="center">
                <FormLabelStyled sx={{ paddingRight: "10px" }}>
                  Phone Number:
                </FormLabelStyled>
                <TextField
                  InputProps={{
                    sx: {
                      borderRadius: 20,
                      height: "39px",
                      border: "1px solid #000000",
                    },
                  }}
                  sx={{ width: "425px", "& fieldset": { border: "none" } }}
                />
              </Box>
              <Box display="flex" alignItems="center">
                <FormLabelStyled sx={{ paddingRight: "20px" }}>
                  Contact Links:
                </FormLabelStyled>
                <TextField
                  InputProps={{
                    sx: {
                      borderRadius: 20,
                      height: "39px",
                      border: "1px solid #000000",
                    },
                  }}
                  sx={{ width: "425px", "& fieldset": { border: "none" } }}
                />
              </Box>
            </Box>
            <Box marginTop="20px" display="flex" justifyContent="space-between">
              <Button
                sx={{
                  width: "200px",
                  height: "43px",
                  borderRadius: "20px",
                  backgroundColor: "#000000",
                  color: "#FFFFFF",
                  textTransform: "none",
                }}
              >
                <Typography>Save</Typography>
              </Button>
              <Button
                sx={{
                  width: "200px",
                  height: "43px",
                  borderRadius: "20px",
                  backgroundColor: "#000000",
                  color: "#FFFFFF",
                  textTransform: "none",
                }}
              >
                <Typography>Cancel</Typography>
              </Button>
            </Box>
          </FormControl>
        </Box>
      </>
    );
  };
  
  const EditStudentProfile = () => {
    return (
      <>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          columnGap={2}
        >
          <Avatar sx={{ height: "70px", width: "70px" }} aria-label="recipe">
            B
          </Avatar>
          <ButtonStyled>
            <Typography>Upload New Picture</Typography>
          </ButtonStyled>
          <ButtonStyled sx={{ width: "120px" }}>
            <Typography>Delete</Typography>
          </ButtonStyled>
        </Box>
        <FormControl>
          <FormLabelStyled>Education:</FormLabelStyled>
          <TextField
            InputProps={{
              sx: {
                borderRadius: 20,
                height: "39px",
                border: "1px solid #000000",
              },
            }}
            sx={{ width: "425px", "& fieldset": { border: "none" } }}
          />
          <br />
          <FormLabelStyled>Skills:</FormLabelStyled>
          <TextField
            InputProps={{
              sx: {
                borderRadius: 20,
                height: "39px",
                border: "1px solid #000000",
              },
            }}
            sx={{ width: "425px", "& fieldset": { border: "none" } }}
          />
          <br />
          <FormLabelStyled>Experiences:</FormLabelStyled>
          <TextField
            variant="outlined"
            multiline
            onFocus="none"
            rows={4}
            maxRows={5}
            InputProps={{
              sx: {
                borderRadius: 4,
                width: "390px",
                border: "1px solid #000000",
                width: "425px",
                "& fieldset": { border: "none" },
              },
            }}
          />
          <br />
          <FormLabelStyled>Resume:</FormLabelStyled>
          <TextField
            variant="outlined"
            multiline
            onFocus="none"
            rows={3}
            maxRows={3}
            InputProps={{
              sx: {
                borderRadius: 4,
                width: "390px",
                border: "1px solid #000000",
                width: "425px",
                "& fieldset": { border: "none" },
              },
            }}
          />
          <Box marginTop="20px" display="flex" justifyContent="space-between">
            <Button
              sx={{
                width: "200px",
                height: "43px",
                borderRadius: "20px",
                backgroundColor: "#000000",
                color: "#FFFFFF",
                textTransform: "none",
              }}
            >
              <Typography>Save</Typography>
            </Button>
            <Button
              sx={{
                width: "200px",
                height: "43px",
                borderRadius: "20px",
                backgroundColor: "#000000",
                color: "#FFFFFF",
                textTransform: "none",
              }}
            >
              <Typography>Cancel</Typography>
            </Button>
          </Box>
        </FormControl>
      </>
    );
  };
  
  const ButtonStyled = styled(Button)({
    width: "190px",
    height: "38px",
    borderRadius: "20px",
    border: "1px solid #000000",
    color: "#000000",
    textTransform: "none",
  });
  
  const FormLabelStyled = styled(FormLabel)({
    fontSize: "20px",
    fontWeight: "bold",
    color: "#000000",
  });
  
  export default EditStudent;