import { useContext } from 'react';

import {Box, Typography,styled} from '@mui/material';
import {Delete } from '@mui/icons-material'

import { DataContext } from '../../../context/DataProvider';
import { API } from '../../../service/api'

const Comment = ({comment, settoggle}) =>{

    const {account} = useContext(DataContext);

    const removeComment = async() => {
        let response = await API.deleteComment(comment._id);

        if(response.isSuccess){
            settoggle(prevState =>!prevState);
        }
    }
    return(
        // <div>This is a comment</div>
        <Component>
             {/*name and photo of the commenter */}
            <Container>
               <Name>{comment.name}</Name>
               <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>
               {comment.name === account.username && <DeleteIcon onClick={() => removeComment()}/>}
            </Container>

            {/* comment of the person */}

            <Box>
                <Typography>
                    {comment.comments}
                </Typography>
            </Box>
        </Component>
    )
}


// css
const Component = styled(Box)`
    margin-top: 30px;
    background: #F5F5F5;
    padding: 10px;
`;

const Container = styled(Box)`
    display: flex;
    margin-bottom: 5px;
`;

const Name = styled(Typography)`
    font-weight: 600;
    font-size: 18px;
    margin-right: 20px;
`;

const StyledDate = styled(Typography)`
    font-size: 14px;
    color: #878787;
`;

const DeleteIcon = styled(Delete)`
    margin-left: auto;
      transition: transform 0.2s;
    &:hover{
        cursor:pointer;
         transform: scale(1.02); /* Increase the size on hover */
       ${'' /* box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3); */}
        
    }
`;

export default Comment;