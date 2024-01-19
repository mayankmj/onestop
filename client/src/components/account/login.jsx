import React, { useState, useContext } from "react";
import { Box, TextField, Button, styled, Typography } from "@mui/material";
import { API } from "../../service/api";
import "./Login.css";
import { DataContext } from "../../context/DataProvider";
import logo1 from "./logo01.png";
import { useNavigate } from "react-router-dom"; // navigation to home page , custom hoo
import {  InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;
const Image = styled("img")({
  width: 100,
  margin: "auto",
  display: "flex",
  padding: "50px 0 0",
});
const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  flex-direction: column;
  padding-top: 20px;
  padding-buttom: 20px;
  & > div,
  & > Button,
  & > p {
    margin-top: 10px;
  }
`;

const Loginbutton = styled(Button)`
  text-transform: none;
  height: 48px;
  border-radius: 2px;
`;
const SignInButton = styled(Button)`
  padding: 10px;
  text-transform: none;
  background: #fff;
  color: #2874f8;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const signupInitialvalues = {
  name: "",
  username: "",
  password: "",
};

const LoginInitialvalues = {
  username: "",
  password: "",
};
const Login = ({ isUserAuthenticated }) => {
  const [account, ToggleAccount] = useState("login");

  const [login, setLogin] = useState(LoginInitialvalues);

  const [signup, setSignup] = useState(signupInitialvalues);

  const [loginError, setLoginError] = useState("");
  const [signupError, setSignupError] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const { setAccount } = useContext(DataContext);

  const navigate = useNavigate();

  const entry = (props) => {
    props.preventDefault();
    console.log("hello from entry");
    setSignup({ ...signup, [props.target.name]: props.target.value });
  };

  const setAcc = () => {
    account === "login" ? ToggleAccount("signup") : ToggleAccount("login");
  };

  const signupUser = async () => {
    try {
      const response = await API.userSignup(signup);
      console.log(response);
      if (response.isSuccess) {
        setSignup(signupInitialvalues);
        ToggleAccount("login");
        setSignupError("");
        ToggleAccount("login");
        navigate("/login");
      } else {
        setSignupError("Something went wrong! Try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setSignupError("Something went wrong! Try again.");
    }
   
  };

  const onValChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const loginUser = async () => {
    try{
    const response = await API.userLogin(login);
    if (response.isSuccess) {
    //   SetError("");
      sessionStorage.setItem(
        "accessToken",
        `Bearer ${response.data.accessToken}`
      );
      sessionStorage.setItem(
        "refreshToken",
        `Bearer ${response.data.refreshToken}`
      );
      // we are using context api for storing name and usernmae as session..(above one ) is not a good method of storing personal data
      //name of blog uploader
      //username og blog uploader
      setAccount({
        username: response.data.username,
        name: response.data.name,
      }); // global declare

      isUserAuthenticated(true); // for logined user returing true
      navigate('/');
    }
    }
    catch(error){
    console.error('Error during login:', error);
    setLoginError('Something went wrong! Try again.');
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <Component>
      <Box>
        <Image src={logo1} alt="error" className="login_logo" />
        {account === "login" ? (
          <Wrapper>
            <TextField
              variant="standard"
              value={login.username}
              onChange={(e) => onValChange(e)}
              name="username"
              label="Enter your Userid"
            />{" "}
            {/* box type of input field*/}
           <TextField
      variant="standard"
      type={showPassword ? 'text' : 'password'}
      value={login.password}
      onChange={(e) => onValChange(e)}
      name="password"
      label="Enter your password"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleTogglePasswordVisibility}
              onMouseDown={(e) => e.preventDefault()} // prevent focus on button click
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />{" "}
            {loginError && <Typography color="error">{loginError}</Typography>}
            <Loginbutton variant="contained" onClick={() => loginUser()}>
              Login
            </Loginbutton>
            <Typography style={{ textAlign: "center" }}>OR</Typography>{" "}
            <SignInButton variant="contained" onClick={() => setAcc()}>
              {" "}
              Sign Up
            </SignInButton>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField
              id="textfield_col"
              variant="standard"
              placeholder="Enter your Name"
              name="name"
              onChange={(e) => entry(e)}
            />{" "}
            <TextField
              id="textfield_col"
              variant="standard"
              placeholder="Enter your username"
              name="username"
              onChange={(e) => entry(e)}
            />{" "}
            <TextField
      id="textfield_col"
      variant="standard"
      type={showPassword ? 'text' : 'password'}
      placeholder="Enter your password"
      name="password"
      onChange={(e) => entry(e)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleTogglePasswordVisibility}
              onMouseDown={(e) => e.preventDefault()} 
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />{" "}
             {signupError && <Typography color="error">{signupError}</Typography>}
            <SignInButton variant="contained" onClick={() => signupUser()}>
              Signup
            </SignInButton>
            <Typography style={{ textAlign: "center" }}>OR</Typography>{" "}
            <Loginbutton variant="contained" onClick={() => setAcc()}>
              Already Have a account
            </Loginbutton>
          </Wrapper>
        )}
      </Box>
    </Component> 
  );
};
export default Login;
