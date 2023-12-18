import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  IconButton,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
  Box,
  Typography,
  Input,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import useAuth from "../hooks/useAuth";

const RootLayout = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [searchBarDialogOpen, setSearchBarDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const { user, onLogout, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.isAuthenticated && !isLoading) {
      navigate("/login");
    }
  }, [user.isAuthenticated, isLoading, navigate]);

  const getPosts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/post/posts?userId=${user.userId}&userType=${user.type}`
      );
      setPosts(response.data.data.content);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   if (user.isAuthenticated) {
  //     getPosts();
  //     const intervalId = setInterval(getPosts, 0.01 * 60 * 1000);
  //     return () => clearInterval(intervalId);
  //   }
  // }, [isLoading, user]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenSearchBarDialog = () => {
    const lowercaseSearchQuery = searchQuery.toLowerCase();
    setFilteredPosts(
      posts.filter(
        (post) =>
          post.title.toLowerCase().includes(lowercaseSearchQuery) ||
          post.job.name.toLowerCase().includes(lowercaseSearchQuery)
      )
    );
    setSearchBarDialogOpen(true);
  };

  const handleCloseSearchBarDialog = () => {
    setSearchBarDialogOpen(false);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchBarKeyPress = (event) => {
    if (event.key === "Enter") {
      handleOpenSearchBarDialog();
    }
  };

  return (
    <>
      {/* Navbar */}
      <Box
        height="80px"
        display="flex"
        alignItems="center"
        justifyContent="space-evenly"
        columnGap={10}
        borderBottom="2px solid #000000"
        position="relative"
      >
        <SearchBarStyled
          disableUnderline={true}
          placeholder="Explore"
          sx={{ paddingLeft: "20px" }}
          onChange={handleSearchInputChange}
          onKeyPress={handleSearchBarKeyPress}
          value={searchQuery}
        />
        <Dialog
          open={searchBarDialogOpen}
          onClose={handleCloseSearchBarDialog}
          PaperProps={{
            style: {
              width: "600px", // Set a max-width if needed
            },
          }}
        >
          <DialogTitle>Search Results</DialogTitle>
          <DialogContent>
            <List>
              {filteredPosts.map((post) => (
                <ListItem
                  key={post.id}
                  button
                  onClick={() => navigate(`/jobpage/${post.id}`)}
                >
                  <Avatar sx={{ width: "50px", height: "50px" }}>B</Avatar>
                  <Box
                    ml={2} // Adjust the margin as needed
                    display="flex"
                    flexDirection="column"
                    rowGap={1}
                  >
                    <Typography variant="h5" fontWeight="bold">
                      {post.title}
                    </Typography>
                    <Typography>Job Type: {post.job.name}</Typography>
                  </Box>
                </ListItem>
              ))}
            </List>
          </DialogContent>
        </Dialog>

        <LinkStyled to="/">
          <Typography>Home</Typography>
        </LinkStyled>
        <LinkStyled
          to={user.type === "employer" ? "/employerprofile" : "/studentprofile"}
        >
          <Typography>Profile</Typography>
        </LinkStyled>
        <LinkStyled to="/joblist">
          <Typography>Job List</Typography>
        </LinkStyled>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar
              alt="Remy Sharp"
              src={`http://localhost:8080/user/${user.userId}/image`}
            />
          </IconButton>
        </Tooltip>
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
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography textAlign="center">Profile</Typography>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleCloseUserMenu();
              onLogout();
            }}
          >
            <Typography textAlign="center">Logout</Typography>
          </MenuItem>
        </Menu>
      </Box>
      <Outlet />
    </>
  );
};

const SearchBarStyled = styled(Input)({
  width: "444px",
  height: "43px",
  backgroundColor: "#e5e5e5",
  borderRadius: "5px",
});

const LinkStyled = styled(Link)({
  textDecoration: "none",
  color: "#000000",
});

const JobContainer = styled(Box)({
  width: "100%", // Adjusted to take the full width
  height: "55px",
  borderRadius: "10px",
  border: "2px solid #000000",
});

export default RootLayout;