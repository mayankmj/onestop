import { useState ,useEffect,useContext} from "react";
import { Box , styled , FormControl , InputBase , Button , TextareaAutosize} from "@mui/material";
import {AddCircle as Add} from "@mui/icons-material"
import { useLocation, useNavigate , useParams} from "react-router-dom";
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
    createdDate: new Date() 
}

const Update = () =>{

    

    const [post,setPost] = useState(initialPost);
    const [file,setFile] = useState('');

    const {account} = useContext(DataContext);

    const location = useLocation();
    const navigate = useNavigate();
    const {id} = useParams();

    const url = post.picture ? post.picture : "https://cdn.pixabay.com/photo/2015/12/12/17/52/building-1089861__340.jpg"


    // for edit the data should be copied to the edit page
   useEffect(()=> {
    const fetchData = async () =>{
        let response = await API.getPostById(id);
        if(response.isSuccess){
            setPost(response.data);
        }
      }
      fetchData();
    } ,[])
   

    // for changing the image of the blog
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

    const updateBlogPost = async() => { // updating post api
        let response = await API.updatePost(post);
        if(response.isSuccess){
            navigate(`/details/${id}`);
        }
    }
    return(
        <Container>
            <Image src={url} alt="banner"/>
            <StyledFormControl>
                <label htmlFor="fileinput"><Add fontSize="large"  color="action"/></label>
                <input type="file" id='fileinput' style={{display:'none'}} onChange={(e) => setFile(e.target.files[0])} />
                
                {/*value in the title field will be picked from the blog page ,(as this the edit }*/}
                <InputTextField placeholder="Title" value ={post.title}onChange={(e) => handleChange(e)} name="title"/>
                <Button variant="contained"  onClick = {() => updateBlogPost()}>Update</Button>
            </StyledFormControl>

            <Textarea 
                minRows={5}
                placeholder="Tell your stry.."
                onChange={(e) => handleChange(e)}
                name="description"
                value={post.description}
            />
        </Container>
    )
}

export default Update;