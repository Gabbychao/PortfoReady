import {
  Box,
  Collapse,
  Typography,
  ListItemButton,
  ListItemText,
  List,
  RadioGroup,
  Radio,
  FormControlLabel,
  Grid,
  styled,
  Avatar,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const JobList = () => {
  const [open, setOpen] = React.useState(true);
  const [posts, setPosts] = useState([]);
  const [selectedJobType, setSelectedJobType] = useState("all"); // Default to "all" or any other appropriate default value
  const { user, isLoading } = useAuth();

  const handleClick = () => {
    setOpen(!open);
  };
  const navigate = useNavigate();

  const getPosts = async () => {
    await axios
      .get(`http://localhost:8080/post/posts?userId=${user.userId}`)
      .then((response) => {
        setPosts(response.data.data.content);
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  const handleJobTypeChange = (event) => {
    setSelectedJobType(event.target.value);
  };

  useEffect(() => {
    if (user.isAuthenticated) {
      getPosts();
    }
  }, [isLoading, user]);

  return (
    <Box height="91.6vh" display="flex">
      <List component="div" disablePadding>
        <ListItemButton sx={{ pl: 4 }}>
          <RadioGroup
            name="job-list"
            defaultValue="all"
            value={selectedJobType}
            onChange={handleJobTypeChange}
          >
            <FormControlLabel value="all" control={<Radio />} label="All" />
            <FormControlLabel
              value="UI/UX Designer"
              control={<Radio />}
              label="UI/UX Designer"
            />
            <FormControlLabel
              value="Front-End Developer"
              control={<Radio />}
              label="Front-End Developer"
            />
            <FormControlLabel
              value="Back-End Developer"
              control={<Radio />}
              label="Back-End Developer"
            />
          </RadioGroup>
        </ListItemButton>
      </List>
      <Box marginTop={10} marginLeft={4}>
        <Grid
          container
          spacing={{ xs: 1, md: 4 }}
          columns={{ xs: 4, sm: 8, md: 6 }}
        >
          {posts
            .filter(
              (post) =>
                selectedJobType === "all" || post.job.name === selectedJobType
            )
            .map((post) => (
              <Grid
                item
                xs={4}
                sm={4}
                md={4}
                key={post.id}
              >
                <JobContainer
                  display="flex"
                  onClick={() => navigate(`/jobpage/${post.id}`)}
                  sx={{ cursor: "pointer" }}
                >
                  <Box
                    width="130px"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      sx={{ width: "50px", height: "50px" }}
                      src={`http://localhost:8080/user/${post.user.id}/image`}
                    ></Avatar>
                  </Box>
                  <Box
                    width="370px"
                    display="flex"
                    justifyContent="center"
                    alignItems="start"
                    flexDirection="column"
                    rowGap={1}
                  >
                    <Typography variant="h5" fontWeight="bold">
                      {post.title}
                    </Typography>
                    <Typography>Job Type: {post.job.name}</Typography>
                  </Box>
                </JobContainer>
              </Grid>
            ))}
        </Grid>
      </Box>
    </Box>
  );
};

const JobContainer = styled(Box)({
  width: "500px",
  height: "100px",
  borderRadius: "10px",
  border: "2px solid #000000",
});

export default JobList;
