import React , {useState , useContext} from 'react'
import { Box , TextField , Button , styled , Typography} from '@mui/material'
import {API} from '../../service/api';

import { DataContext } from '../../context/DataProvider';

import { useNavigate } from 'react-router-dom'; // navigation to home page , custom hook
// components
// navigation

const Component = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;
const Image = styled('img')({
    width : 100,
    margin : 'auto',
    display: 'flex',
    padding: '50px 0 0'
});
const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    flex-direction: column;
    & > div , & > Button, & >p{
        margin-top: 10px;
    }
`;

const Loginbutton = styled(Button)`
    text-transform: none;
    {/*background*/}
    {/*color */}
    height: 48px;
    border-radius: 2px;
`
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
    name :'',
    username :'',
    password :'',
};

const LoginInitialvalues = {
    username: '',
    password: ''
}
const Login = ({isUserAuthenticated}) =>{

    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';
    
    const [account ,ToggleAccount] = useState('login');

    const [login , setLogin] = useState(LoginInitialvalues);

    const [signup , setSignup] = useState(signupInitialvalues);

    const [error , SetError] = useState('');

    const {setAccount} = useContext(DataContext);

    const navigate = useNavigate();

    const entry = (props) =>{
        props.preventDefault();
        setSignup({...signup,[props.target.name] : props.target.value});
    };
    
    const setAcc = () =>{
          account === 'login' ? ToggleAccount('signup') : ToggleAccount('login'); 
    };
   
    const signupUser = async() =>{
    
        let response = await API.userSignup(signup);
        // console.log(response);
        if( response.isSuccess){
            SetError('');
            setSignup(signupInitialvalues);
            entry('login');
        }
        else{
            SetError('Something went wrong ! Try Again');
        }
    }

    const onValChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value});
    }

    const loginUser = async () =>{
          let response = await API.userLogin(login);
          if(response.isSuccess){
            SetError('');
            sessionStorage.setItem('accessToken',`Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken',`Bearer ${response.data.refreshToken}`);
            // we are using context api for storing name and usernmae as session..(above one ) is not a good method of storing personal data
                                  //name of blog uploader 
                             //username og blog uploader
             setAccount({username: response.data.username , name: response.data.name}); // global declare
             
             isUserAuthenticated(true); // for logined user returing true
             navigate('/');

          }
          else{
            SetError('something went wrong');
          }
    }
    return(
        <Component> 
        <Box> 
           <Image src={imageURL} alt='error'/> 
           {
           account === 'login' ?
           <Wrapper>
              <TextField variant='standard' value={login.username} onChange={(e) => onValChange(e)} name = "username" label ="Enter your Userid"/> {/* box type of input field*/}
              <TextField variant='standard' value={login.password} onChange={(e) => onValChange(e)} name = "password" label ="Enter your password"/> {/* label same as placeholder */}  
             
              {error && <Typography>{error}</Typography>}
              <Loginbutton variant="contained" onClick={() => loginUser()}>Login</Loginbutton> 
              <Typography style = {{textAlign: 'center'}}>OR</Typography>    {/* same <p> tag */}
              <SignInButton variant="contained" onClick = { () => setAcc()}>  Sign Up</SignInButton>
           </Wrapper>

           :
           <Wrapper>
              <TextField variant='standard' label ="Enter your Name" name='name' onChange = {(e) => entry(e)}/> {/* box type of input field*/}
              <TextField variant='standard' label ="Enter your username" name='username' onChange = {(e) =>entry(e)}/> {/* label same as placeholder */}  
              <TextField variant='standard' label ="Enter your password" name='password' onChange = {(e) =>entry(e)}/> {/* label same as placeholder */} 
             
             {error && <Typography>{error}</Typography>}

              <SignInButton variant="contained" onClick={() => signupUser()}>Signup</SignInButton> 
              <Typography style = {{textAlign: 'center'}}>OR</Typography>    {/* same <p> tag */}
              <Loginbutton variant="contained" onClick={() => setAcc()}>Already Have a account</Loginbutton>
           </Wrapper>
           }
        </Box>
       </Component>// same div
    );
};
export default Login