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



    const updateUser = async () => {
      try {
        const response = await axios.put(
          `http://localhost:8080/user/updateUser/${user.userId}`,
          {
            firstName: firstNameValue.length > 0 ? firstNameValue : userDetails.firstName,
            lastName: lastNameValue.length > 0 ? lastNameValue : userDetails.lastName,
            username: usernameValue.length > 0 ? usernameValue : userDetails.username,
            email: emailvalue.length > 0 ? emailvalue : userDetails.email,
            password: passwordvalue.length > 0 ? passwordvalue : userDetails.password,
            phoneNumber: phoneNumbervalue.length > 0 ? phoneNumbervalue : userDetails.phoneNumber,
            contact: contactLinksValue.length > 0 ? contactLinksValue : userDetails.contact,
          }
        );
  
        console.log(response.data);
      } catch (error) {
        console.error("Error updating user:", error);
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
  
    const handleAddProfile = async () => {
      try {
        const formDataForImage = new FormData();
        formDataForImage.append("file", images);
        const image = await axios.put(
          `http://localhost:8080/user/uploadImage/${user.userId}`,
          formDataForImage,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (image.status === 200) {
          console.log("Image uploaded successfully!");
        } else {
          console.error("Error uploading image:", image.statusText);
        }
      } catch (error) {
        console.error("Error adding profile picture", error.message);
      }
    };
  
    const handleSave = async () => {
      try {
        updateUser();
        handleAddProfile();
        onLogout();
      } catch (error) {
        console.error("Error Update Profile", error.message);
      }
    };  

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
            <Avatar
              src={
                images
                  ? URL.createObjectURL(images)
                  : `http://localhost:8080/user/${user.userId}/image`
              }
              sx={{ height: "70px", width: "70px" }}
            ></Avatar>
            <Button
              component="label"
              color="primary"
              variant="contained"
              startIcon={<AddPhotoIcon />}
              sx={{
                backgroundColor: "white",
                color: "#27374D",
                "&:hover": { backgroundColor: "#142132", color: "white" },
                borderRadius: "20px",
                border: ".1px solid #27374D",
                display: "flex",
                width: 150,
                whiteSpace: "nowrap",
                fontSize: "10",
              }}
            >
              add photo
              <VisuallyHiddenInput
                name="images"
                type="file"
                onChange={(e) => setImages(e.target.files[0])}
              />
            </Button>
          </Box>
          <br />
          <Box sx={{ width: "600px", height: "525px", display: "flex" }}>
            <Box width="200px" display="flex" flexDirection="column" rowGap={6}>
              <Typography fontWeight="bold" variant="h5" marginTop="10px">
                Name:
              </Typography>
              <Typography fontWeight="bold" variant="h5">
                Username:
              </Typography>
              <Typography fontWeight="bold" variant="h5">
                Email:
              </Typography>
              <Typography fontWeight="bold" variant="h5">
                Password:
              </Typography>
              <Typography fontWeight="bold" variant="h5">
                Phone Number:
              </Typography>
              <Typography fontWeight="bold" variant="h5">
                Contact Link:
              </Typography>
            </Box>
            <Box width="400px" display="flex" flexDirection="column" rowGap={3}>
              <Box height="50px" display="flex">
                <TextFeidStyled
                  value={firstNameValue}
                  onChange={(e) => setFirstNameValue(e.target.value)}
                  placeholder="First Name"
                  size="medium"
                  sx={{ marginRight: "20px" }}
                  InputProps={{
                    style: {
                      borderRadius: "20px",
                    },
                  }}
                />
                <TextFeidStyled
                  value={lastNameValue}
                  onChange={(e) => setLastNameValue(e.target.value)}
                  placeholder="Last Name"
                  size="medium"
                  InputProps={{
                    style: {
                      borderRadius: "20px",
                    },
                  }}
                />
              </Box>
              <TextFeidStyled
                value={usernameValue}
                onChange={(e) => setUsernameValue(e.target.value)}
                placeholder="e.g. John123"
                InputProps={{
                  style: {
                    borderRadius: "20px",
                  },
                }}
              />
              <TextFeidStyled
                value={emailvalue}
                onChange={(e) => setEmailValue(e.target.value)}
                placeholder="e.g. JohnDoe@email.com"
                InputProps={{
                  style: {
                    borderRadius: "20px",
                  },
                }}
              />
              <TextFeidStyled
                value={passwordvalue}
                onChange={(e) => setPassowrdValue(e.target.value)}
                placeholder="*******"
                InputProps={{
                  style: {
                    borderRadius: "20px",
                  },
                }}
              />
              <TextFeidStyled
                value={phoneNumbervalue}
                onChange={(e) => setPhoneNumberValue(e.target.value)}
                placeholder="e.g. +63342345312"
                InputProps={{
                  style: {
                    borderRadius: "20px",
                  },
                }}
              />
              <TextFeidStyled
                value={contactLinksValue}
                onChange={(e) => setContactLinksValue(e.target.value)}
                placeholder="www.facebook/PortfoReady.com"
                InputProps={{
                  style: {
                    borderRadius: "20px",
                  },
                }}
              />
              <Box marginTop="10px" display="flex">
                <Button
                  component={Link}
                  to="/employerprofile"
                  onClick={handleSave}
                  sx={{
                    width: "200px",
                    height: "43px",
                    borderRadius: "20px",
                    backgroundColor: "#000000",
                    color: "#FFFFFF",
                    textTransform: "none",
                    marginRight: "30px",
                  }}
                >
                  <Typography>Save</Typography>
                </Button>
                <Button
                  component={Link}
                  to="/studentprofile"
                  sx={{
                    width: "200px",
                    height: "43px",
                    borderRadius: "20px",
                    border: "1px solid #000000",
                    color: "#000000",
                    textTransform: "none",
                  }}
                >
                  <Typography>Cancel</Typography>
                </Button>
              </Box>
            </Box>
          </Box>
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