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
	OutlinedInput,
	InputLabel,
	Select,
	TextField,
	Input,
	DialogActions,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const postSettings = ["Update"];

const Home = () => {
	const [posts, setPosts] = useState([]);
	const { user, isLoading } = useAuth();
	const [userDetails, setUserDetails] = useState();
	const [employerDetails, setEmployerDetails] = useState();
	const [studentDetails, setStudentDetails] = useState();
	const [unfollowedUsers, setUnfollowedUsers] = useState([]);
	const [recommendedJobs, setRecommendedJobs] = useState([]);

	const getPosts = async () => {
		await axios
			.get(`http://localhost:8080/post/posts?userId=${user.userId}`)
			.then(response => {
				setPosts(response.data.data.content);
				console.log(response);
			})
			.catch(err => console.log(err));
	};

	const followUser = async userId => {
		await axios
			.put(
				`http://localhost:8080/user/followUser?from=${user.userId}&to=${userId}`
			)
			.then(() => {
				getPeopleYouMayKnow();
			})
			.catch(err => console.log(err));
	};

	const getPeopleYouMayKnow = async () => {
		await axios
			.get(
				`http://localhost:8080/user/getPeopleYouMayKnow?userId=${user.userId}`
			)
			.then(response => {
				setUnfollowedUsers(response.data.data);
			})
			.catch(error => {
				console.log("Fetching Unfollowed Users Error: ", error);
			});
	};

	const getRecommendedJobs = async () => {
		await axios
			.get(`http://localhost:8080/post/recommended`)
			.then(response => {
				setRecommendedJobs(response.data.data);
			})
			.catch(error => {
				console.log("Fetching Unfollowed Users Error: ", error);
			});
	};

	useEffect(() => {
		if (user.isAuthenticated) {
			getPosts();
			const fetchUserDetails = async () => {
				await axios
					.get(`http://localhost:8080/user/getUser?userId=${user.userId}`)
					.then(response => {
						setUserDetails(response.data.data);
					})
					.catch(error => {
						console.log("Fetching UserDetails Error: ", error);
					});
				await axios
					.get(
						`http://localhost:8080/employer/getEmployerByUserId?userId=${user.id}`
					)
					.then(response => {
						setEmployerDetails(response.data.data);
					})
					.catch(error => {
						console.log("Fetching Employer Details Error: ", error);
					});
			};
      getRecommendedJobs();
			fetchUserDetails();
			getPeopleYouMayKnow();
		}
	}, [isLoading, user]);

	if (!userDetails || !employerDetails) {
		return "...";
	}

	return (
		<>
			{/* Container */}
			<Box
				display="flex"
				justifyContent="center"
				columnGap={5}
				marginTop="30px"
				marginBottom="30px">
				{/* Left-Container */}
				<Box
					width="1100px"
					display="flex"
					flexDirection="column"
					rowGap={13}>
					<Box
						display="flex"
						justifyContent="start"
						flexDirection="column"
						rowGap={3}>
						<Typography variant="h2">
							Hello, {userDetails.firstName} {userDetails.lastName}
						</Typography>
						<Box>
							{user.type === "employer" && <PostCard getPosts={getPosts} />}
						</Box>
					</Box>
					{/* Job-Container */}
					<Box
						display="flex"
						flexDirection="column"
						rowGap={5}>
						{posts.map(post => (
							<JobPost
								post={post}
								getPosts={getPosts}
								key={post.id}
							/>
						))}
					</Box>
				</Box>

				{/* Right-Container */}
				<Box
					width="500px"
					display="flex"
					flexDirection="column"
					rowGap={5}>
					<SmallContainer
						display="flex"
						flexDirection="column"
						justifyContent="center"
						alignItems="center">
						<CardHeader
							avatar={
								<Avatar
									sx={{ width: 56, height: 56 }}
									alt="testing"
									src={`http://localhost:8080/user/${user.userId}/image`}
								/>
							}
						/>
						<CardContent sx={{ textAlign: "center" }}>
							<Typography
								variant="h4"
								fontWeight="bold">
								{userDetails.firstName} {userDetails.lastName}
							</Typography>
							<Typography variant="h6">{userDetails.Email}</Typography>
						</CardContent>
					</SmallContainer>
					<SmallContainer sx={{ height: "270px" }}>
						<Box sx={{ padding: "20px" }}>
							<Typography>People You May Know</Typography>
							{unfollowedUsers.map(user => (
								<>
									<CardHeader
										key={user.id}
										avatar={
											<Avatar
												sx={{}}
												aria-label="recipe"
												src={`http://localhost:8080/user/${user.userId}/image`}></Avatar>
										}
										title="John Doe"
										subheader="John.doe@cit.edu"
									/>
									<Button
										onClick={() => followUser(user.id)}
										sx={{
											width: "100px",
											height: "30px",
											backgroundColor: "#f0f0f0",
											borderRadius: "50px",
											border: "2px solid #000000",
											color: "#000000",
											fontWeight: "bold",
										}}>
										+ Follow
									</Button>
								</>
							))}
						</Box>
					</SmallContainer>
					<SmallContainer>
						<Box
							padding="20px"
							display="flex"
							flexDirection="column"
							rowGap={1}>
							<Typography>Recommended Jobs</Typography>
							{recommendedJobs.map(post => (
								<Card key={post.id}>
									<CardHeader
										avatar={
											<Avatar
												sx={{}}
												aria-label="recipe">
												{post.user.username}
											</Avatar>
										}
										title={post.title}
										subheader={post.job.name}
									/>
								</Card>
							))}
						</Box>
					</SmallContainer>
				</Box>
			</Box>
		</>
	);
};

export const PostCard = ({ getPosts }) => {
	const [openPost, setOpenPost] = useState(false);
	const handleOpenPost = () => setOpenPost(true);
	const handleClosePost = () => setOpenPost(false);
	const [userDetails, setUserDetails] = useState();

	const handleChange = event => {
		setJob(event.target.value);
	};

	const [titleValue, setTitleValue] = useState("");
	const [job, setJob] = useState("");
	const [descriptionValue, setdescriptionValue] = useState("");
	const [question1, setquestion1] = useState("");
	const [question2, setquestion2] = useState("");
	const [question3, setquestion3] = useState("");
	const [question4, setquestion4] = useState("");
	const [question5, setquestion5] = useState("");

	const { user, isLoading } = useAuth();

	const AddPost = async () => {
		await axios
			.post("http://localhost:8080/post/addPost", {
				title: titleValue,
				jobId: job,
				description: descriptionValue,
				posterId: user.id,
				questions: [question1, question2, question3, question4, question5],
			})
			.then(() => {
				getPosts();
				setTitleValue("");
				setdescriptionValue("");
				setJob("");
				setquestion1("");
				setquestion2("");
				setquestion3("");
				setquestion4("");
				setquestion5("");
			});
	};

	useEffect(() => {
		if (user.isAuthenticated) {
			getPosts();
			const fetchUserDetails = async () => {
				await axios
					.get(`http://localhost:8080/user/getUser?userId=${user.id}`)
					.then(response => {
						setUserDetails(response.data.data);
					})
					.catch(error => {
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
			<ButtonStyled onClick={handleOpenPost}>Post a Job</ButtonStyled>
			<Dialog
				fullWidth
				maxWidth="md"
				open={openPost}
				onClose={handleClosePost}>
				<DialogTitle
					textAlign="center"
					borderBottom="2px solid #808080"
					fontSize={30}
					fontWeight="bold">
					Create Job Posting
				</DialogTitle>
				<DialogContent>
					<CardHeader
						avatar={
							<Avatar
								src={`http://localhost:8080/user/${user.userId}/image`}
								sx={{ height: "60px", width: "60px" }}
								aria-label="recipe"></Avatar>
						}
						title={`${userDetails.firstName} ${userDetails.lastName}`}
						subheader={userDetails.email}
					/>
					<Stack
						justifyContent="center"
						alignItems="center"
						rowGap={2}
						zIndex={100}>
						<Box>
							<Typography fontWeight="bold">Title</Typography>
							<InputStyled
								value={titleValue}
								onChange={e => setTitleValue(e.target.value)}
								disableUnderline={true}
							/>
						</Box>
						<FormControl sx={{ width: "300px" }}>
							<InputLabel>Job Type</InputLabel>
							<Select
								value={job}
								label="job type"
								onChange={handleChange}>
								<MenuItem value={1}>UI/UX Designer</MenuItem>
								<MenuItem value={2}>Front-End Developer</MenuItem>
								<MenuItem value={3}>Back-End Developer</MenuItem>
							</Select>
						</FormControl>
						<Box>
							<Typography fontWeight="bold">Description</Typography>
							<textarea
								value={descriptionValue}
								onChange={e => setdescriptionValue(e.target.value)}
								style={{
									width: "650px",
									height: "150px",
									resize: "none",
									borderRadius: "20px",
									fontSize: "15px",
									padding: "20px",
								}}
							/>
						</Box>
						<Box
							display="flex"
							flexDirection="column"
							width="800px"
							height="300px"
							border="1px solid #c4c4c4"
							borderRadius="20px">
							<Box>
								<Typography
									variant="h5"
									fontWeight="bold"
									textAlign="center"
									borderBottom="1px solid #c4c4c4">
									Create Exam
								</Typography>
								<Box sx={{ height: "260px", overflowY: "auto" }}>
									<Stack
										spacing={3}
										alignItems="center"
										paddingTop="20px"
										paddingBottom="20px">
										<InputStyled
											value={question1}
											onChange={e => setquestion1(e.target.value)}
											disableUnderline={true}
											placeholder="Question 1"
										/>
										<InputStyled
											value={question2}
											onChange={e => setquestion2(e.target.value)}
											disableUnderline={true}
											placeholder="Question 2"
										/>
										<InputStyled
											value={question3}
											onChange={e => setquestion3(e.target.value)}
											disableUnderline={true}
											placeholder="Question 3"
										/>
										<InputStyled
											value={question4}
											onChange={e => setquestion4(e.target.value)}
											disableUnderline={true}
											placeholder="Question 4"
										/>
										<InputStyled
											value={question5}
											onChange={e => setquestion5(e.target.value)}
											disableUnderline={true}
											placeholder="Question 5"
										/>
									</Stack>
								</Box>
							</Box>
							<Box
								display="flex"
								justifyContent="end"
								marginTop="20px">
								<Button
									onClick={AddPost}
									sx={{
										width: "160px",
										height: "42px",
										borderRadius: "20px",
										backgroundColor: "#000000",
										color: "#FFFFFF",
										"&:hover": { backgroundColor: "#000000" },
										textTransform: "none",
									}}>
									<Typography
										variant="h6"
										fontWeight="bold">
										Post
									</Typography>
								</Button>
							</Box>
						</Box>
					</Stack>
				</DialogContent>
			</Dialog>
		</>
	);
};

export const JobPost = ({ post, getPosts }) => {
	const navigate = useNavigate();
	const [anchorElUser, setAnchorElUser] = useState(null);
	const [openEditPost, setOpenEditPost] = useState(false);
	const handleOpenEditPost = () => setOpenEditPost(true);
	const handleCloseEditPost = () => setOpenEditPost(false);
	const { user, isLoading } = useAuth();
	const [userDetails, setUserDetails] = useState();
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
	const [confirmUpdateDialog, setConfirmUpdateDialog] = useState(false);

	const [titleValue, setTitleValue] = useState("");
	const [jobValue, setJobValue] = useState("");
	const [descriptionValue, setdescriptionValue] = useState("");
	const [question1Value, setquestion1Value] = useState("");
	const [question2Value, setquestion2Value] = useState("");
	const [question3Value, setquestion3Value] = useState("");
	const [question4Value, setquestion4Value] = useState("");
	const [question5Value, setquestion5Value] = useState("");

	const handleOpenUserMenu = event => {
		setAnchorElUser(event.currentTarget);
	};
	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleOpenDeleteDialog = () => setOpenDeleteDialog(true);
	const handleCloseDeleteDialog = () => setOpenDeleteDialog(false);
	const handleConfirmUpdateDialog = () => setConfirmUpdateDialog(true);
	const handleCloseConfirmUpdateDialog = () => setConfirmUpdateDialog(false);

	const deletePost = async () => {
		handleCloseDeleteDialog();
		await axios
			.delete(`http://localhost:8080/post/deletePost?postId=${post.id}`)
			.then(() => {
				getPosts();
			})
			.catch(err => console.log(err));
	};

	const updatePost = async () => {
		try {
			const response = await axios.put(
				`http://localhost:8080/post/updatePost?postId=${post.id}`,
				{
					title: titleValue,
					jobId: jobValue,
					description: descriptionValue,
					posterId: user.id,
					questions: [
						{ id: 1, question: question1Value },
						{ id: 2, question: question2Value },
						{ id: 3, question: question3Value },
						{ id: 4, question: question4Value },
						{ id: 5, question: question5Value },
					],
				}
			);
			getPosts();
			setTitleValue("");
			setdescriptionValue("");
			setJobValue("");
			setquestion1Value("");
			setquestion2Value("");
			setquestion3Value("");
			setquestion4Value("");
			setquestion5Value("");
			console.log(response.data);
		} catch (error) {
			console.error("Error updating post!", error);
		}
	};

	useEffect(() => {
		if (user.isAuthenticated) {
			getPosts();
			const fetchUserDetails = async () => {
				await axios
					.get(`http://localhost:8080/user/getUser?userId=${user.id}`)
					.then(response => {
						setUserDetails(response.data.data);
					})
					.catch(error => {
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
		<JobContainer key={post.id}>
			<Box
				display="flex"
				flexDirection="column"
				paddingLeft="40px"
				paddingTop="20px"
				rowGap={1}>
				<Box display="flex">
					<Box
						onClick={() => navigate(`/jobpage/${post.id}`)}
						sx={{ cursor: "pointer" }}>
						<Typography
							variant="h3"
							width="900px">
							{post.title}
						</Typography>
					</Box>
					<Box
						display="flex"
						justifyContent="end"
						width="120px">
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
							onClose={handleCloseUserMenu}>
							{["Delete", "Edit"].map(action => (
								<MenuItem
									key={action}
									onClick={() => {
										setAnchorElUser(null);
										action === "Delete"
											? handleOpenDeleteDialog()
											: handleOpenEditPost();
									}}
									sx={{
										display: "flex",
										flexDirection: "column",
										rowGap: "10px",
									}}>
									{action}
								</MenuItem>
							))}
						</Menu>
						<Dialog
							open={openDeleteDialog}
							onClose={handleCloseDeleteDialog}
							maxWidth="sm"
							fullWidth>
							<DialogTitle>Delete Post</DialogTitle>
							<DialogContent>
								<Typography>
									Are you sure you want to delete this post?
								</Typography>
							</DialogContent>
							<DialogActions>
								<Button
									onClick={handleCloseDeleteDialog}
									color="primary">
									Cancel
								</Button>
								<Button
									onClick={deletePost}
									color="primary">
									Delete
								</Button>
							</DialogActions>
						</Dialog>
						<Dialog
							fullWidth
							maxWidth="md"
							open={openEditPost}
							onClose={handleCloseEditPost}>
							<DialogTitle
								textAlign="center"
								borderBottom="2px solid #808080"
								fontSize={30}
								fontWeight="bold">
								Edit Job Posting
							</DialogTitle>
							<DialogContent>
								<CardHeader
									avatar={
										<Avatar
											sx={{ height: "80px", width: "80px" }}
											src={`http://localhost:8080/user/${post.user.id}/image`}></Avatar>
									}
									title={`${post.user.firstName} ${post.user.lastName}`}
									subheader={post.user.email}
								/>
								<Stack
									justifyContent="center"
									alignItems="center"
									rowGap={2}
									zIndex={100}>
									<Box>
										<Typography fontWeight="bold">Title</Typography>
										<InputStyled
											disableUnderline={true}
											value={titleValue}
											onChange={e => setTitleValue(e.target.value)}
										/>
									</Box>
									<FormControl sx={{ width: "300px" }}>
										<InputLabel>Job Type</InputLabel>
										<Select
											label="job type"
											value={jobValue}
											onChange={e => setJobValue(e.target.value)}>
											<MenuItem value={1}>UI/UX Designer</MenuItem>
											<MenuItem value={2}>Front-End Developer</MenuItem>
											<MenuItem value={3}>Back-End Developer</MenuItem>
										</Select>
									</FormControl>
									<Box>
										<Typography fontWeight="bold">Description</Typography>
										<textarea
											value={descriptionValue}
											onChange={e => setdescriptionValue(e.target.value)}
											style={{
												width: "650px",
												height: "150px",
												resize: "none",
												borderRadius: "20px",
												fontSize: "15px",
												padding: "20px",
											}}
										/>
									</Box>
									<Box
										display="flex"
										flexDirection="column"
										width="800px"
										height="300px"
										border="1px solid #c4c4c4"
										borderRadius="20px">
										<Box>
											<Typography
												variant="h5"
												fontWeight="bold"
												textAlign="center"
												borderBottom="1px solid #c4c4c4">
												Create Exam
											</Typography>
											<Box sx={{ height: "260px", overflowY: "auto" }}>
												<Stack
													spacing={3}
													alignItems="center"
													paddingTop="20px"
													paddingBottom="20px">
													<InputStyled
														disableUnderline={true}
														placeholder="Question 1"
														value={question1Value}
														onChange={e => setquestion1Value(e.target.value)}
													/>
													<InputStyled
														disableUnderline={true}
														placeholder="Question 2"
														value={question2Value}
														onChange={e => setquestion2Value(e.target.value)}
													/>
													<InputStyled
														disableUnderline={true}
														placeholder="Question 3"
														value={question3Value}
														onChange={e => setquestion3Value(e.target.value)}
													/>
													<InputStyled
														disableUnderline={true}
														placeholder="Question 4"
														value={question4Value}
														onChange={e => setquestion4Value(e.target.value)}
													/>
													<InputStyled
														disableUnderline={true}
														placeholder="Question 5"
														value={question5Value}
														onChange={e => setquestion5Value(e.target.value)}
													/>
												</Stack>
											</Box>
										</Box>
										<Box
											display="flex"
											justifyContent="end"
											marginTop="20px">
											<Button
												onClick={handleConfirmUpdateDialog}
												sx={{
													width: "160px",
													height: "42px",
													borderRadius: "20px",
													backgroundColor: "#000000",
													color: "#FFFFFF",
													"&:hover": { backgroundColor: "#000000" },
													textTransform: "none",
												}}>
												<Typography
													variant="h6"
													fontWeight="bold">
													Update Post
												</Typography>
											</Button>
										</Box>
									</Box>
								</Stack>
							</DialogContent>
						</Dialog>
						<Dialog
							open={confirmUpdateDialog}
							onClose={handleCloseConfirmUpdateDialog}
							fullWidth
							maxWidth="sm">
							<DialogTitle>Confirm Update</DialogTitle>
							<DialogContent>
								<Typography>
									Are you sure you want to update this post?
								</Typography>
							</DialogContent>
							<Box
								sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
								<Button onClick={handleCloseConfirmUpdateDialog}>Cancel</Button>
								<Button
									onClick={() => {
										handleCloseConfirmUpdateDialog();
										updatePost(); // Call the actual update function when confirmed
									}}
									variant="contained">
									Confirm Update
								</Button>
							</Box>
						</Dialog>
					</Box>
				</Box>
				<Typography variant="h5">{post.job.name}</Typography>
				<CardHeader
					avatar={
						<Avatar
							src={`http://localhost:8080/user/${post.user.id}/image`}></Avatar>
					}
					title={`${post.user.firstName} ${post.user.lastName}`}
					subheader={post.user.email}
				/>
				<Box width="1020px">
					<Typography
						variant="body1"
						textAlign="start"
						sx={{ wordBreak: "break-word", whiteSpace: "pre-line" }}>
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

const TextFieldStyled = styled(TextField)({
	width: "700px",
	height: "60px",
	paddingLeft: "10px",
});

export default Home;