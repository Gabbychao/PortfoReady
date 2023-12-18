import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import dashboard from "../../assets/dashboard-logo.png";
import logout from "../../assets/logout-logo.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Dashboard = () => {
  const [countStudent, setCountStudent] = useState();
  const [countEmployer, setEmployerStudent] = useState();
  const [countPosts, setCountPosts] = useState();
  const [users, setUsers] = useState([]);
  const { user, onLogout, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentCount = async () => {
      await axios
        .get("http://localhost:8080/student/count")
        .then((response) => {
          setCountStudent(response.data.data);
        });
    };
    const fetchEmployerCount = async () => {
      await axios
        .get("http://localhost:8080/employer/count")
        .then((response) => {
          setEmployerStudent(response.data.data);
        });
    };
    const fetchPostsCount = async () => {
      await axios.get("http://localhost:8080/post/count").then((response) => {
        setCountPosts(response.data.data);
      });
    };
    const fetchUsers = async () => {
      await axios.get("http://localhost:8080/user/all").then((response) => {
        setUsers(response.data.data);
      });
    };
    fetchStudentCount();
    fetchEmployerCount();
    fetchPostsCount();
    fetchUsers();
  }, []);

  return (
    <Box display="flex">
      <Box width="280px" height="100vh" sx={{ backgroundColor: "#1F2027" }}>
        <Box
          width="280px"
          height="100px"
          marginLeft="20px"
          display="flex"
          justifyContent="start"
          alignItems="center"
          columnGap={2}
        >
          <Box
            width="50px"
            height="50px"
            sx={{ backgroundImage: `url(${dashboard})` }}
          ></Box>
          <Typography color="#FFFFFF" fontSize="24px">
            Dashboard
          </Typography>
        </Box>
        <Box
          width="280px"
          height="100px"
          marginTop="700px"
          marginLeft="20px"
          display="flex"
          justifyContent="start"
          alignItems="center"
          columnGap={2}
        >
          <Box
            width="50px"
            height="50px"
            sx={{ backgroundImage: `url(${logout})` }}
          ></Box>
          <Button
            component={Link}
            to="/login"
            onClick={() => {
              onLogout();
            }}
          >
            <Typography color="#FFFFFF" fontSize="24px">
              Logout
            </Typography>
          </Button>
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="start"
        alignItems="center"
        marginLeft="100px"
      >
        <Box width="1200px" height="850px">
          <Box marginBottom="80px">
            <Typography variant="h3">Hello, Admin</Typography>
          </Box>
          <Box
            width="1000px"
            height="356px"
            display="flex"
            justifyContent="space-between"
          >
            <Box
              width="300px"
              height="300px"
              borderRadius="15px"
              sx={{ backgroundColor: "#1F2027" }}
            >
              <Typography
                paddingTop="15px"
                fontSize="20px"
                color="#FFFFFF"
                textAlign="center"
              >
                No. of Students <br /> Registered
              </Typography>
              <Typography
                paddingTop="60px"
                fontSize="40px"
                color="#FFFFFF"
                textAlign="center"
              >
                {countStudent}
              </Typography>
            </Box>
            <Box
              width="300px"
              height="300px"
              borderRadius="15px"
              sx={{ backgroundColor: "#1F2027" }}
            >
              <Typography
                paddingTop="15px"
                fontSize="20px"
                color="#FFFFFF"
                textAlign="center"
              >
                No. of Employers <br /> Registered
              </Typography>
              <Typography
                paddingTop="60px"
                fontSize="40px"
                color="#FFFFFF"
                textAlign="center"
              >
                {countEmployer}
              </Typography>
            </Box>
            <Box
              width="300px"
              height="300px"
              borderRadius="15px"
              sx={{ backgroundColor: "#1F2027" }}
            >
              <Typography
                paddingTop="15px"
                fontSize="20px"
                color="#FFFFFF"
                textAlign="center"
              >
                No. of Posts made by <br /> Employers
              </Typography>
              <Typography
                paddingTop="60px"
                fontSize="40px"
                color="#FFFFFF"
                textAlign="center"
              >
                {countPosts}
              </Typography>
            </Box>
          </Box>
          <Box
            width="1000px"
            height="356px"
            borderRadius="15px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ backgroundColor: "#1F2027" }}
          >
            <Box
              height="300px"
              width="900px"
              display="flex"
              flexDirection="column"
              rowGap={1}
              sx={{overflowY:"auto"}}
            >
              <Typography fontSize="20px" color="#FFFFFF" paddingBottom="20px">
                All Users
              </Typography>
              <Box width="880px" height="25px" display="flex" columnGap={10}>
                <Box
                  width="40px"
                  borderRadius="5px"
                  sx={{ backgroundColor: "#FDFDFD" }}
                >
                  <Typography fontSize="20px" textAlign="center">
                    ID
                  </Typography>
                </Box>
                <Box
                  width="113px"
                  borderRadius="5px"
                  sx={{ backgroundColor: "#FDFDFD" }}
                >
                  <Typography fontSize="20px" textAlign="center">
                    Firstname
                  </Typography>
                </Box>
                <Box
                  width="113px"
                  borderRadius="5px"
                  sx={{ backgroundColor: "#FDFDFD" }}
                >
                  <Typography fontSize="20px" textAlign="center">
                    Lastname
                  </Typography>
                </Box>
                <Box
                  width="260px"
                  borderRadius="5px"
                  sx={{ backgroundColor: "#FDFDFD" }}
                >
                  <Typography fontSize="20px" textAlign="center">
                    Email
                  </Typography>
                </Box>
                <Box
                  width="109px"
                  borderRadius="5px"
                  sx={{ backgroundColor: "#FDFDFD" }}
                >
                  <Typography fontSize="20px" textAlign="center">
                    Gender
                  </Typography>
                </Box>
              </Box>
              {users.map((user) => (
                <Box
                  width="880px"
                  height="25px"
                  display="flex"
                  columnGap={10}
                  key={user.id}
                >
                  <Box width="40px">
                    <Typography
                      fontSize="20px"
                      textAlign="center"
                      color="#FFFFFF"
                    >
                      {user.id}
                    </Typography>
                  </Box>
                  <Box width="113px">
                    <Typography
                      fontSize="20px"
                      textAlign="center"
                      color="#FFFFFF"
                    >
                      {user.firstName}
                    </Typography>
                  </Box>
                  <Box width="113px">
                    <Typography
                      fontSize="20px"
                      textAlign="center"
                      color="#FFFFFF"
                    >
                      {user.lastName}
                    </Typography>
                  </Box>
                  <Box width="260px">
                    <Typography
                      fontSize="20px"
                      textAlign="center"
                      color="#FFFFFF"
                    >
                      {user.email}
                    </Typography>
                  </Box>
                  <Box width="109px">
                    <Typography
                      fontSize="20px"
                      textAlign="center"
                      color="#FFFFFF"
                    >
                      HE HE
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;