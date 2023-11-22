import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Box,
  Typography,
  CardHeader,
  CardContent,
  Button,
  styled,
  Card,
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  FormControl,
  FormLabel,
  OutlinedInput,
  InputLabel,
  Select,
  TextField,
  Input
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link, useNavigate } from "react-router-dom";

const postSettings = ["Edit", "Delete"];

const Home = () => {
  const [posts, setPosts] = useState([]);


  const getPosts = async () => {
    await axios
      .get("http://localhost:8080/post/posts?userId=3")
      .then((response) => {
        setPosts(response.data.data.content);
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

    const AddPost = async () => {
    await axios.post("http://localhost:8080/post/addPost", {
      title: titleValue,
      jobId: 1,
      description: descriptionValue,
      posterId: 1,
      questions: [question1, question2, question3, question4, question5],
    });
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      {/* Container */}
      <Box
        display="flex"
        justifyContent="center"
        columnGap={5}
        marginTop="30px"
        marginBottom="30px"
      >
        {/* Left-Container */}
        <Box width="1100px" display="flex" flexDirection="column" rowGap={13}>
          <Box
            display="flex"
            justifyContent="start"
            flexDirection="column"
            rowGap={3}
          >
            <Typography variant="h2">Hello, John</Typography>
            <Box>
              <PostCard />
            </Box>
          </Box>
          {/* Job-Container */}
          <Box display="flex" flexDirection="column" rowGap={5}>
            {posts.map((post) => (
              <JobPost post={post} getPosts={getPosts} />
            ))}
          </Box>
        </Box>

        {/* Right-Container */}
        <Box width="500px" display="flex" flexDirection="column" rowGap={5}>
          <SmallContainer
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <CardHeader
              avatar={
                <Avatar
                  sx={{ width: 56, height: 56 }}
                  alt="testing"
                  src={`https://ui-avatars.com/api/?background=random&name`}
                />
              }
            />
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h4" fontWeight="bold">
                John Doe
              </Typography>
              <Typography variant="h6">Front-End Developer</Typography>
            </CardContent>
          </SmallContainer>
          <SmallContainer sx={{ height: "270px" }}>
            <Box sx={{ padding: "20px" }}>
              <Typography>People You May Know</Typography>
              <CardHeader
                avatar={
                  <Avatar sx={{}} aria-label="recipe">
                    B
                  </Avatar>
                }
                title="John Doe"
                subheader="John.doe@cit.edu"
              />
              <Button
                sx={{
                  width: "100px",
                  height: "30px",
                  backgroundColor: "#f0f0f0",
                  borderRadius: "50px",
                  border: "2px solid #000000",
                  color: "#000000",
                  fontWeight: "bold",
                }}
              >
                + Follow
              </Button>
              <CardHeader
                avatar={
                  <Avatar sx={{}} aria-label="recipe">
                    B
                  </Avatar>
                }
                title="John Doe"
                subheader="John.doe@cit.edu"
              />
              <Button
                sx={{
                  width: "100px",
                  height: "30px",
                  backgroundColor: "#f0f0f0",
                  borderRadius: "50px",
                  border: "2px solid #000000",
                  color: "#000000",
                  fontWeight: "bold",
                }}
              >
                + Follow
              </Button>
            </Box>
          </SmallContainer>
          <SmallContainer>
            <Box
              padding="20px"
              display="flex"
              flexDirection="column"
              rowGap={1}
            >
              <Typography>Recommended Jobs</Typography>
              <Card>
                <CardHeader
                  avatar={
                    <Avatar sx={{}} aria-label="recipe">
                      B
                    </Avatar>
                  }
                  title="Job Title"
                  subheader="Job Type"
                />
              </Card>
              <Card>
                <CardHeader
                  avatar={
                    <Avatar sx={{}} aria-label="recipe">
                      B
                    </Avatar>
                  }
                  title="Job Title"
                  subheader="Job Type"
                />
              </Card>
            </Box>
          </SmallContainer>
        </Box>
      </Box>
    </>
  );
};

export const PostCard = () => {
  const [openPost, setOpenPost] = React.useState(false);
  const handleOpenPost = () => setOpenPost(true);
  const handleClosePost = () => setOpenPost(false);
  const handleChange = (event) => {
    setJob(event.target.value);
  };

  const [titleValue, setTitleValue] = useState("");
  const [descriptionValue, setdescriptionValue] = useState("");
  const [question1, setquestion1] = useState("");
  const [question2, setquestion2] = useState("");
  const [question3, setquestion3] = useState("");
  const [question4, setquestion4] = useState("");
  const [question5, setquestion5] = useState("");

  return (
    <>
      <ButtonStyled onClick={handleOpenPost}>Post a Job</ButtonStyled>
      <Dialog fullWidth maxWidth="md" open={openPost} onClose={handleClosePost}>
        <DialogTitle textAlign="center" borderBottom="2px solid #808080">
          <Typography variant="h4" fontWeight="bold">
            Create Job Posting
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box>
            <CardHeader
              avatar={<Avatar aria-label="recipe">B</Avatar>}
              title="John Doe"
              subheader="John.doe@cit.edu"
            />
            <Stack justifyContent="center" alignItems="center">
              <FormControl
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "20px",
                }}
              >
                <Box display="flex" flexDirection="column">
                  <FormLabel>
                    <Typography
                      variant="h7"
                      fontWeight="bold"
                      paddingLeft="13px"
                    >
                      Title
                    </Typography>
                  </FormLabel>
                  <OutlinedInputStyled
                    value={titleValue}
                    onChange={(e) => setTitleValue(e.target.value)}
                    onFocus="none"
                  />
                </Box>
                <Box>
                  <FormControl sx={{ width: "300px" }}>
                    <InputLabel>Job Type</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Job Type"
                      onChange={handleChange}
                    >
                      <MenuItem value={1}>UI/UX Designer</MenuItem>
                      <MenuItem value={2}>Front-End Developer</MenuItem>
                      <MenuItem value={3}>Back-End Developer</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box display="flex" flexDirection="column">
                  <FormLabel>
                    <Typography
                      variant="h7"
                      fontWeight="bold"
                      paddingLeft="13px"
                    >
                      Description
                    </Typography>
                  </FormLabel>
                  <TextField
                    value={descriptionValue}
                    onChange={(e) => setdescriptionValue(e.target.value)}
                    multiline
                    onFocus="none"
                    rows={5}
                    maxRows={5}
                    InputProps={{ sx: { borderRadius: 6 } }}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  width="800px"
                  height="300px"
                  border="1px solid #c4c4c4"
                  borderRadius="20px"
                >
                  <Box>
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      textAlign="center"
                      borderBottom="1px solid #c4c4c4"
                    >
                      Create Exam
                    </Typography>
                    <Box sx={{ height: "260px", overflowY: "auto" }}>
                      <Stack
                        spacing={3}
                        alignItems="center"
                        paddingTop="20px"
                        paddingBottom="20px"
                      >
                        <InputStyled
                          value={question1}
                          onChange={(e) => setquestion1(e.target.value)}
                          onFocus="none"
                          disableUnderline={true}
                          placeholder="Question 1"
                        />
                        <InputStyled
                          value={question2}
                          onChange={(e) => question2(e.target.value)}
                          onFocus="none"
                          disableUnderline={true}
                          placeholder="Question 2"
                        />
                        <InputStyled
                          value={question3}
                          onChange={(e) => setquestion3(e.target.value)}
                          onFocus="none"
                          disableUnderline={true}
                          placeholder="Question 3"
                        />
                        <InputStyled
                          value={question4}
                          onChange={(e) => setquestion4(e.target.value)}
                          onFocus="none"
                          disableUnderline={true}
                          placeholder="Question 4"
                        />
                        <InputStyled
                          value={question5}
                          onChange={(e) => setquestion5(e.target.value)}
                          onFocus="none"
                          disableUnderline={true}
                          placeholder="Question 5"
                        />
                      </Stack>
                    </Box>
                  </Box>
                </Box>
                <Box display="flex" justifyContent="end">
                  <Button
                    sx={{
                      width: "160px",
                      height: "42px",
                      borderRadius: "20px",
                      backgroundColor: "#000000",
                      color: "#FFFFFF",
                      "&:hover": { backgroundColor: "#000000" },
                      textTransform: "none",
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold">
                      Post
                    </Typography>
                  </Button>
                </Box>
              </FormControl>
            </Stack>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export const JobPost = ({ post, getPosts }) => {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const deletePost = async () => {
    await axios
      .delete(`http://localhost:8080/post/deletePost?postId=${post.id}`)
      .then(() => {
        getPosts();
      })
      .catch((err) => console.log(err));
  };

  return (
    <JobContainer key={post.id}>
      <Box
        display="flex"
        flexDirection="column"
        paddingLeft="40px"
        paddingTop="20px"
        rowGap={1}
      >
        <Box display="flex">
          <Box onClick={() => navigate("/jobpage")} sx={{ cursor: "pointer" }}>
            <Typography variant="h3" width="900px">
              {post.title}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="end" width="120px">
            <IconButton onClick={handleOpenUserMenu}>
              <MoreHorizIcon />
            </IconButton>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {postSettings.map((postSettings) => (
                <MenuItem key={postSettings} onClick={handleCloseUserMenu}>
                  <button onClick={deletePost}>Delete</button>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Box>
        <Typography variant="h5">{post.job.name}</Typography>
        <CardHeader
          avatar={<Avatar>B</Avatar>}
          title="Human Resources"
          subheader="John.doe@cit.edu"
        />
        <Box width="1020px">
          <Typography variant="body1" textAlign="start">
            {post.description}
          </Typography>
        </Box>
      </Box>
    </JobContainer>
  );
};

const OutlinedInputStyled = styled(OutlinedInput)({
  width: "800px",
  height: "55px",
  borderRadius: "20px",
});

const ButtonStyled = styled(Button)({
  width: "950px",
  height: "60px",
  borderRadius: "20px",
  border: "1px solid #000000",
  display: "flex",
  justifyContent: "start",
  paddingLeft: "30px",
  color: "#808080",
});

const JobContainer = styled(Box)({
  width: "1100px",
  height: "540px",
  border: "1px solid #000000",
  borderRadius: "5px",
});

const SmallContainer = styled(Box)({
  width: "450px",
  height: "220px",
  borderRadius: "5px",
  border: "1px solid #000000",
});

const InputStyled = styled(Input)({
  width: "700px",
  height: "60px",
  borderRadius: "20px",
  border: "1px solid #c4c4c4",
  paddingLeft: "10px",
});

export default Home;