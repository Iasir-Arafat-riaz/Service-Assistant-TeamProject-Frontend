import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import useFirebase from "../../../Hooks/useFirebase";
import Navigation from "../../SharedRoute/Navigation/Navigation";
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import "./UserLogin.css";

const UserLogin = () => {
	const { googleSignIn, logInWithEmail } = useFirebase();
	const location = useLocation()
	const navigate = useNavigate()
	const { register, handleSubmit, formState: { errors } } = useForm();

	useEffect(() => {
		console.clear();

		const loginBtn = document.getElementById('login');
		const signupBtn = document.getElementById('signup');

		loginBtn.addEventListener('click', (e) => {
			let parent = e.target.parentNode.parentNode;
			Array.from(e.target.parentNode.parentNode.classList).find((element) => {
				if (element !== "slide-up") {
					parent.classList.add('slide-up')
				} else {
					signupBtn.parentNode.classList.add('slide-up')
					parent.classList.remove('slide-up')
				}
			});
		});

		signupBtn.addEventListener('click', (e) => {
			let parent = e.target.parentNode;
			Array.from(e.target.parentNode.classList).find((element) => {
				if (element !== "slide-up") {
					parent.classList.add('slide-up')
				} else {
					loginBtn.parentNode.parentNode.classList.add('slide-up')
					parent.classList.remove('slide-up')
				}
			});
		});
	}, [])

	return (
		<Box>
			<Navigation />
			<Box className="userLogin">
				<Box>
					<form class="form-structor" style={{ "marginTop": "150px" }}>
						<div class="signup">
							<h2 class="form-title" id="signup"><span>or</span>Sign up</h2>
							<div class="form-holder">
								<input type="text" class="input" placeholder="Name" />
								<input type="email" class="input" placeholder="Email" />
								<input type="password" class="input" placeholder="Password" />
							</div>
							<button class="submit-btn">Sign up</button>
							<Typography variant="h5" ><button class="google-btn" onClick={() => googleSignIn(location, navigate)} >Google Login</button></Typography>
						</div>
						<div class="login slide-up">
							<div class="center">
								<h2 class="form-title" id="login"><span>or</span>Log in</h2>
								<div class="form-holder">
									<input type="email" class="input" placeholder="Email" />
									<input type="password" class="input" placeholder="Password" />
								</div>
								<button class="submit-btn">Log in</button>
								<Typography variant="h5" ><button onClick={() => googleSignIn(location, navigate)} class="google-btn">Google Login</button></Typography>
							</div>
						</div>
					</form>
				</Box>
			</Box>
		</Box>
	);
};

export default UserLogin;
