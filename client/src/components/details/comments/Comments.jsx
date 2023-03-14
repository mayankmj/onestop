
import { Box , TextareaAutosize , Button ,styled} from "@mui/material"
import { useState, useContext, useEffect} from "react"

import { DataContext } from "../../../context/DataProvider"

import {API} from "../../../service/api"
import Comment from './Comment'

const initialValues = {
    name: '',
    postId: '',
    comments: '',
    date: new Date()
}
export const Comments = ({post}) =>{

    const url = 'https://picsum.photos/200/300/' // needed person image or dp like icon

    const [comment , setComments] = useState(initialValues);

    const [comments,setComment] = useState([]);

    const [toggle,settoggle] = useState(false);

    const {account} = useContext(DataContext) // extracting the user info from data context

    useEffect( () =>{
        const getData = async () => {
           let response = await API.getAllComments(post._id);

           if(response.isSuccess){
            setComment(response.data);
           }
        }
        getData();
    },[post,toggle])

    const handleChange = (e) =>{
        setComments({
            ...comment,
            name: account.username,
            postId: post._id,
            comments:e.target.value
        });
    }

    const addComment = async (e) =>{
        let response = await API.newComment(comment);

        if(response.isSuccess){
            setComments(initialValues);
        }
        settoggle(prevState => !prevState)
    }
    return(
       <Box>
           {/*user enter comment */}
           <Container>
                <Image src={url} alt = "dp" />
                <StyledTextArea
                    minRows={5}
                    placeholder="whats on your mind ?"
                    value={comment.comments}
                    onChange={(e) => handleChange(e)}
                />
                <Button 
                variant="contained" 
                size="medium" 
                style={{height: 40}}
                onClick = {(e) => addComment(e)}
                >Post</Button>
           </Container>

           {/*user comment display */}
           <Box>
               {
                 comments && comments.length > 0 && comments.map(comment => (
                    <Comment comment = {comment} settoggle = {settoggle}/>
                 ))
               }
           </Box>
       </Box>
    )
}





const Container = styled(Box)`
    margin-top: 100px;
    display: flex;
`;

const Image = styled('img')({
    width: 50,
    height: 50,
    borderRadius: '50%'
});

const StyledTextArea = styled(TextareaAutosize)`
    height: 100px !important;
    width: 100%; 
    margin: 0 20px;
`;

// const initialValue = {
//     name: '',
//     postId: '',
//     date: new Date(),
//     comments: ''
// }
export default Comments