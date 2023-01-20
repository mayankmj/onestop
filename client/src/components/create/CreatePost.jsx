import { useState ,useEffect,useContext} from "react";
import { Box , styled , FormControl , InputBase , Button , TextareaAutosize} from "@mui/material";
import {AddCircle as Add} from "@mui/icons-material"
import { useLocation, useNavigate } from "react-router-dom";
import {DataContext} from '../../context/DataProvider'
import {API} from '../../service/api'

const Image = styled('img')({
 width: '100%',
 height: '70vh',
 objectFit: 'cover'
})

const Container = styled(Box)`
   margin: 50px 100px
`

const StyledFormControl = styled(FormControl)`
     margin-top: 10px;
     display: flex;
     flex-direction: row
`

const InputTextField = styled(InputBase)`
  flex: 1;
  margin: 0 30px;
  font-size: 25

`

const Textarea = styled(TextareaAutosize)`
  width: 100%;
  margin-top: 50px;
  font-size: 18px
`

const initialPost = {
    title: '',
    description:'',
    picture: '',
    username: '',
    categories:'',
    createddate: new Date() 
}

const CreatePost = () =>{

    

    const [post,setPost] = useState(initialPost);
    const [file,setFile] = useState('');

    const {account} = useContext(DataContext);

    const location = useLocation();
    const navigate = useNavigate();

    const url = post.picture ? post.picture : "https://cdn.pixabay.com/photo/2015/12/12/17/52/building-1089861__340.jpg"

    useEffect(() =>{
        const getImage = async () => {
            if (file) {
                const data = new FormData();
                data.append("name",file.name);
                data.append("file",file);

                //api call
               const response = await API.uploadFile(data); // api request sent to image-controller -> 2 aruguments 1/ file name and file
                post.picture = response.data
            }
        }  
        getImage();
        post.categories = location.search?.split('=')[1] || 'All';
        post.username = account.username;
    } , [file])

    const handleChange = (e) =>{
        setPost({...post , [e.target.name] : e.target.value })
    }

    const savePost = async() => { // saving the written data to db
        let response = await API.createPost(post);
        if(response.isSuccess){
            navigate('/');
        }
    }
    return(
        <Container>
            <Image src={url} alt="banner"/>
            <StyledFormControl>
                <label htmlFor="fileinput"><Add fontSize="large"  color="action"/></label>
                <input type="file" id='fileinput' style={{display:'none'}} onChange={(e) => setFile(e.target.files[0])} />

                <InputTextField placeholder="Title" onChange={(e) => handleChange(e)} name="title"/>
                <Button variant="cointained" style = {{color: '#2874f8'}}  onClick = {() => savePost()}>Publish</Button>
            </StyledFormControl>

            <Textarea 
                minRows={5}
                placeholder="Tell your stry.."
                onChange={(e) => handleChange(e)}
                name="description"
            />
        </Container>
    )
}

export default CreatePost;