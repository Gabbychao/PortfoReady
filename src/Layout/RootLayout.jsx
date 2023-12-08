import React from "react";
import {
  IconButton,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
  Box,
  Typography,
  Input,
} from "@mui/material";
import { Link, Outlet, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";

const settings = ["Profile", "Logout"];

const RootLayout = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [searchBarDialogOpen, setSearchBarDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const { user, onLogout, isLoading } = useAuth();
  const navigate = useNavigate();
  
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const location = useLocation();

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
      >
        <SearchBarStyled
          disableUnderline={true}
          placeholder="Explore"
          sx={{ paddingLeft: "20px" }}
        />
        <LinkStyled to="/home">
          <Typography>Home</Typography>
        </LinkStyled>
        <LinkStyled>
          <Typography >Profile</Typography>
        </LinkStyled>
        <LinkStyled to="/contact">
          <Typography>Contact Us</Typography>
        </LinkStyled>
        <LinkStyled>
          <Typography >Notification</Typography>
        </LinkStyled>
        <LinkStyled>
          <Typography>Job List</Typography>
        </LinkStyled>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
          {settings.map((setting) => (
            <MenuItem key={setting} onClick={handleCloseUserMenu}>
              <Typography textAlign="center">{setting}</Typography>
            </MenuItem>
          ))}
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

export default RootLayout;
