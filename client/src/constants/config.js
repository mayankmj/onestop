

// API NOTIFICATION MESSAGES
export const API_NOTIFICATION_MESSAGES = {
    loading:{
        title: 'Loading..',
        message: 'Data is being loader, Intejar kar'
    },
    success: {
        title: 'Maza aagya',
        message: 'Data aagya hai aram se'
    },
    responseFailure: {
        title: 'Error galti hogyi',
        message: 'Kuch error aagya tha ruko zara sabhar karo phir se try maario',
    },
    requestFailure: {
        title: "Error galti hogyi",
        message: 'kuch error aagya ruko zara backend se prblm hai'
    },
    networkError: {
        title: 'Error galti hogyi',
        message: 'Network dekh apna'
    }
}

// API SERVICE CALL
// SAMPLE REQ
// NEED SERVICE CALL: {URL: '/' , METHOD : 'POST/GET/PUT/DELETE' PARAMS: TRUE/FALSE, QUEERY TRUE /FASLE}
export const SERVICE_URLS = {
    userSignup: {url:'/signup' , method: 'POST'},

    userLogin: {url: '/login',method: 'POST'},

    uploadFile: {url: '/file/upload',method: 'POST'},

    createPost: {url: 'create' ,method: 'POST'},

    getAllPosts: {url: '/posts', method: 'GET' , params: true},

    getPostById: {url: '/post', method: 'GET', query: true},

    updatePost: {url: 'update', method: 'PUT' , query: true},

    deletePost: {url: 'delete' , method: 'DELETE' , query: true},

    newComment: {url: '/comment/new' , method: 'POST'},

    getAllComments: {url: 'comments' , method: 'GET' , query: true},

    deleteComment: {url: 'comment/delete' , method: 'DELETE' , query: true}
}
