// import React from 'react';

// const UserLogin = () => {
// 	return (
// 		<div>
// 			h
// 		</div>
// 	);
// };

// export default UserLogin;











import { Box, Paper, Typography } from "@mui/material";
import React, { useEffect, } from "react";
import useFirebase from "../../../Hooks/useFirebase";
import Navigation from "../../SharedRoute/Navigation/Navigation";
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import "./UserLogin.css";

const UserLogin = () => {
	const { googleSignIn, logInWithEmail, signUpWithEmail } = useFirebase();
	const location = useLocation()
	const navigate = useNavigate()
	const { register, watch, handleSubmit, formState: { errors } } = useForm();
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
	const handleSignUp = () => {
		//console.log(watch('signupEmail'));
		if (watch('signupEmail').length && watch('name').length && watch('signupPass').length >= 6) {
			signUpWithEmail({ name: watch('name'), email: watch('signupEmail'), password: watch('signupPass'), location, navigate })
		}
		else {
			alert('Wrong input ')
		}
	}

	const handleLogin = () => {
		if (watch('loginEmail').length && watch('loginPass').length >= 6) {
			logInWithEmail({ email: watch('loginEmail'), password: watch('loginPass'), location, navigate })
		}
		else {
			alert('Wrong input ')
		}
	}
	const onSubmit = () => {
	}
	return (
		<>
			<Navigation />

			<Box className="userLogin">

				<form onSubmit={handleSubmit(onSubmit)} className="form-structor" style={{ "marginTop": "150px" }}>


					<Box className="signup">

						<h2 className="form-title" id="signup"><span>or</span>Sign up</h2>

						<Box className="form-holder">
							<input type="text" className="input" placeholder="Name" {...register("name", { required: true })} />
							<input type="email" className="input" placeholder="Email"
								{...register("signupEmail")} />
							<input type="password" className="input" placeholder="Password"  {...register("signupPass", { required: true, minLength: 6 })} />
						</Box>

						<button onClick={handleSignUp} className="submit-btn">Sign up</button>
						<Typography variant="h5" ><button className="google-btn" onClick={() => googleSignIn(location, navigate)} >Google Login</button></Typography>

					</Box>

					<Box className="login slide-up">
						<Box className="center">
							<h2 className="form-title" id="login"><span>or</span>Log in</h2>
							<Box className="form-holder">
								<input type="email" className="input" placeholder="Email"
									{...register("loginEmail", { required: true })} />
								<input type="password" {...register("loginPass", { required: true })} className="input" placeholder="Password" />
							</Box>
							<button onClick={handleLogin} className="submit-btn">Log in</button>
							<Typography variant="h5" ><button onClick={() => googleSignIn(location, navigate)} className="google-btn">Google Login</button></Typography>
						</Box>
					</Box>

				</form>
			</Box>
		</>
	);
};

export default UserLogin;
