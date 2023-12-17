import {
    Box,
    CardHeader,
    Avatar,
    Typography,
    styled,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    Stack,
    Input,
    InputLabel,
  } from "@mui/material";
  import React, { useState, useEffect } from "react";
  import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
  import { useParams } from "react-router-dom";
  import axios from "axios";
  import useAuth from "../../hooks/useAuth";
  
  const JobPage = () => {
    const { user, isLoading } = useAuth();
    const [userDetails, setUserDetails] = useState();
    const [employerDetails, setEmployerDetails] = useState();
    const [postDetails, setPostDetails] = useState(null);
    const { postId } = useParams();
  
    useEffect(() => {
      const getPostDetails = async () => {
        await axios
          .get(`http://localhost:8080/post/${postId}`)
          .then((response) => {
            setPostDetails(response.data.data);
            console.log(response);
          })
          .catch((err) => console.log(err));
      };
      getPostDetails();
    }, [postId]);
  
    useEffect(() => {
      if (user.isAuthenticated) {
        const fetchUserDetails = async () => {
          await axios
            .get(
              `http://localhost:8080/user/getUser?userId=${postDetails.user.id}`
            )
            .then((response) => {
              setUserDetails(response.data.data);
            })
            .catch((error) => {
              console.log("Fetching UserDetails Error: ", error);
            });
          await axios
            .get(
              `http://localhost:8080/employer/getEmployerByUserId?userId=${postDetails.posterId}`
            )
            .then((response) => {
              setEmployerDetails(response.data.data);
            })
            .catch((error) => {
              console.log("Fetching EmployerDetails Error: ", error);
            });
        };
        fetchUserDetails();
      }
    }, [isLoading, user.isAuthenticated, postId, postDetails]);
  
    if (!userDetails || !employerDetails) {
      return "...";
    }
  
    return (
      // Container
      <Box display="flex" justifyContent="center">
        {/* Left-Side */}
        <Box display="flex" flexDirection="column" width="1000px" rowGap={3}>
          <CardHeader
            avatar={
              <Avatar
                sx={{ width: 80, height: 80 }}
                aria-label="recipe"
                src={`http://localhost:8080/user/${userDetails.id}/image`}
              ></Avatar>
            }
            titleTypographyProps={{ variant: "h4", fontWeight: "bold" }}
            title={`${userDetails.firstName} ${userDetails.lastName}`}
            subheaderTypographyProps={{ variant: "h6" }}
            subheader={userDetails.email}
          />
          <Typography variant="h4" fontWeight="bold">
            {postDetails.title}
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            Job Type:{postDetails.job.name}
          </Typography>
          <Box
            width="900px"
            height="470px"
            border="2px solid #000000"
            borderRadius="15px"
            padding="15px"
          >
            <Typography variant="h7" fontSize="21px">
              {postDetails.description}
            </Typography>
          </Box>
        </Box>
        {/* Right-Side */}
        <Box
          display="flex"
          flexDirection="column"
          height="100px"
          width="600px"
          marginTop="300px"
          alignItems="center"
        >
          <FactCheckOutlinedIcon sx={{ fontSize: "430px" }} />
          <TakeExam examId={postDetails.examId} postId={postId} />
        </Box>
      </Box>
    );
  };
  
  const TakeExam = ({ examId, postId }) => {
    const [TakeExam, setTakeExam] = React.useState(false);
    const handleTakeExam = () => setTakeExam(true);
    const handleCloseTakeExam = () => setTakeExam(false);
    const { user, isLoading } = useAuth();
    const [examQuestions, setExamQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
  
    const getExam = async () => {
      await axios
        .get(`http://localhost:8080/exam/getExam?examId=${examId}`)
        .then((response) => {
          setExamQuestions(response.data.data.questions);
          console.log(response);
        })
        .catch((err) => console.log(err));
    };
  
    useEffect(() => {
      if (user.isAuthenticated) {
        getExam();
      }
    }, [isLoading, user]);
  
    const handleAnswerChange = (index, value, id) => {
      const newAnswers = [...answers];
      newAnswers[index] = { questionId: id, answer: value };
      setAnswers(newAnswers);
    };
  
    const handleSubmit = async () => {
      console.log(answers);
      console.log(user.id, postId);
      try {
        await axios.post("http://localhost:8080/post/applyPost", {
          studentId: user.id,
          postId: postId,
          questionResponses: answers,
        });
      } catch (error) {
        console.error("Error submitting post application:", error);
      }
    };
  
    return (
      <>
        <ButtonStyled onClick={handleTakeExam}>
          <Typography fontWeight="bold">Take Exam</Typography>
        </ButtonStyled>
  
        <Dialog
          fullWidth
          maxWidth="md"
          open={TakeExam}
          onClose={handleCloseTakeExam}
        >
          <DialogTitle
            textAlign="center"
            borderBottom="2px solid #808080"
            fontSize="40px"
            fontWeight="bold"
          >
            Assessment
          </DialogTitle>
          <DialogContent>
            {examQuestions.map((question, i) => (
              <Stack key={question.id}>
                <InputLabel sx={{ paddingTop: "20px" }}>
                  <Typography variant="h6" paddingLeft="10px">
                    {question.question}
                  </Typography>
                </InputLabel>
                <InputStyled
                  disableUnderline={true}
                  placeholder="Answer"
                  onChange={(e) =>
                    handleAnswerChange(i, e.target.value, question.id)
                  }
                />
              </Stack>
            ))}
            <br />
            <Box display="flex" justifyContent="end">
              <ButtonStyled sx={{ width: "160px" }} onClick={handleSubmit}>
                <Typography fontWeight="bold">Submit</Typography>
              </ButtonStyled>
            </Box>
          </DialogContent>
        </Dialog>
      </>
    );
  };
  
  const ButtonStyled = styled(Button)({
    width: "385px",
    height: "40px",
    backgroundColor: "#000000",
    color: "#FFFFFF",
    borderRadius: "20px",
    textTransform: "none",
    "&:hover": { backgroundColor: "#000000" },
  });
  
  const InputStyled = styled(Input)({
    width: "800px",
    height: "70px",
    borderRadius: "20px",
    border: "1px solid #000000",
    paddingLeft: "20px",
  });
  
  export default JobPage;