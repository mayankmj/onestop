
import { AppBar , Toolbar, Typography, styled } from "@mui/material"

import { Link } from "react-router-dom";

const Component = styled(AppBar)`
    background: #FFFFFF;
    color: black;
    
`;

const Container = styled(Toolbar)`
    justify-content: center;
    & > a {
        padding: 20px;
        color: #000;
        text-decoration: none;
        &:hover {
         color: blue; /* Change the text color on hover */
        font-weight: bold;
    }
    }
     
`

const Header = () =>{

    return(
        <Component> {/* Appbar*/}
            <Container>  {/* toolbar*/}
                <Link to = '/'> HOME </Link>
                <Link to = '/about'>ABOUT</Link>
                <Link to = '/contact'>CONTACT</Link>
                <Link to = '/login'>LOGOUT</Link>
            </Container>
        </Component>
    )
}

export default Header