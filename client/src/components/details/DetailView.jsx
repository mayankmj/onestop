
import {Box , Typography ,styled} from '@mui/material'

import { useParams,Link, useNavigate } from 'react-router-dom';

import { useEffect , useState , useContext} from 'react';

import {API} from '../../service/api'

import {Edit , Delete} from '@mui/icons-material'

import {DataContext} from '../../context/DataProvider' 

import Comments from './comments/Comments';

// dataContext and usecontext is use to veriffy whether the viewer is the owner of the blog or not

const DetailView = () => {

    const [post, setPost] = useState({});
    const { id } = useParams();

    const {account} = useContext(DataContext);

    const navigate = useNavigate();

    const url = post.picture ? post.picture : 'https://picsum.photos/seed/picsum/200/300';
    // api call on id(search param waali) change
    useEffect( () => {
        const fetchData = async() => {
            let response =await API.getPostById(id);

            if(response.isSuccess){
                setPost(response.data);
                // console.log("aa");
            }
        }
        fetchData();
    }, []);

    const deleteBlog = async () =>{
        let response = await API.deletePost(post._id);

        if(response.isSuccess){
            navigate('/');
        }
    }

    return(
        <Container>
           <Image src={url} alt="blog" />
            

            <Box style={{float: 'right'}}>
            { // verfication to show edit , delete option to only the user who has posted it
                account.username === post.username && 
                <>
                <Link to={`/update/${post._id}`}><EditIcon color="primary"/> </Link>
                <DeleteIcon onClick={ () => deleteBlog()} color="error"/>
                </>
            }
                
            </Box>
           <Heading>{post.title}</Heading>

           <Author>
              <Typography>Author : <Box component="spam" style = {{fontWeight: 600}}>  {post.username} </Box></Typography>
              <Typography style={{marginLeft: 'auto'}}>{new Date(post.createdDate).toDateString() }</Typography>
           </Author>

           <Typography>{post.description}</Typography>
           <Comments post = {post} />
        </Container>
    )
}



// css

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    },
}));

const Image = styled('img')({
    width: '100%',
    height: '100vh',
    objectFit: 'cover',
    marginTop:'10px'
});

const EditIcon = styled(Edit)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
     transition: transform 0.2s;
    &:hover{
        cursor:pointer;
         transform: scale(1.02); /* Increase the size on hover */
       box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        
    }
`;

const DeleteIcon = styled(Delete)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
      transition: transform 0.2s;
    &:hover{
        cursor:pointer;
         transform: scale(1.02); /* Increase the size on hover */
       box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        
    }
`;

const Heading = styled(Typography)`
    font-size: 38px;
    font-weight: 600;
    text-align: center;
    margin: 50px 0 10px 0;
    word-break: break-word;
`;

const Author = styled(Box)(({ theme }) => ({
    color: '#878787',
    display: 'flex',
    margin: '20px 0',
    [theme.breakpoints.down('sm')]: {
        display: 'block'
    },
}));

export default DetailView;