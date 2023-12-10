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
  import React, { useState } from "react";
  import WorkIcon from "@mui/icons-material/Work";
  import ListItemIcon from "@mui/material/ListItemIcon";
  import ExpandLess from "@mui/icons-material/ExpandLess";
  import ExpandMore from "@mui/icons-material/ExpandMore";
  import PersonIcon from "@mui/icons-material/Person";
  
  const JobList = () => {
    const [open, setOpen] = React.useState(true);
  
    const handleClick = () => {
      setOpen(!open);
    };
  
    return (
      // Container
      <Box height="91.6vh" display="flex">
        <Box
          display="flex"
          flexDirection="column"
          height="100%"
          width="300px"
          boxShadow={13}
          rowGap={1}
          sx={{ backgroundColor: "white", backdropFilter: "blur" }}
        >
          <Box display="flex" alignItems="end" height="50px" paddingLeft="10px">
            <Typography variant="h5">Filters</Typography>
          </Box>
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="People" />
            </ListItemButton>
  
            <ListItemButton onClick={handleClick}>
              <ListItemIcon>
                <WorkIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <RadioGroup name="job-list" defaultValue="first">
                    <FormControlLabel
                      value="UI/UX designer"
                      control={<Radio />}
                      label="UI/UX designer"
                    />
                    <FormControlLabel
                      value="Web designer"
                      control={<Radio />}
                      label="Web designer"
                    />
                    <FormControlLabel
                      value="Engineer"
                      control={<Radio />}
                      label="Engineer"
                    />
                    <FormControlLabel
                      value="Product designer"
                      control={<Radio />}
                      label="Product designer"
                    />
                    <FormControlLabel
                      value="Specialist"
                      control={<Radio />}
                      label="Specialist"
                    />
                  </RadioGroup>
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </Box>
        <Box>
          <Box width="1000px" height="100px" display="flex" padding="30px">
            <Typography variant="h3" fontWeight="bold">
              Job List
            </Typography>
          </Box>
          <Box
            width="1620px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            paddingLeft="20px"
          >
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {Array.from(Array(12)).map((_, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                  <JobContainer display="flex">
                    <Box
                      width="130px"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Avatar sx={{ width: "50px", height: "50px" }}>B</Avatar>
                    </Box>
                    <Box width="370px" display="flex" paddingLeft="20px" paddingTop="10px" flexDirection="column" rowGap={1}>
                      <Typography variant="h5" fontWeight="bold">Job Title</Typography>
                      <Typography>Job Type:</Typography>
                    </Box>
                  </JobContainer>
                </Grid>
              ))}
            </Grid>
          </Box>
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
