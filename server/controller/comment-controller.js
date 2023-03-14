
// import Comments from "../../client/src/components/details/comments/Comments"

import comment from "../model/comment.js";
import Comment from "../model/comment.js"
export const newComment = async (request, response) =>{
    try {
       const comment = await new Comment(request.body);
       comment.save();

       return response.status(200).json({msg: 'Commment save successfully'});
    } catch (error) {
        response.status(500).json({error: error.message})
    }
}

export const getComments = async (request,response) =>{
    try {
       const comments = await Comment.find({ postId: request.params.id});

       return response.status(200).json(comments)
    } catch (error) {
        return response.status(500).json({error: error.message});
    }
}

export const deleteComment = async (request,response) => {
    try {
        const comment = await Comment.findById(request.params.id);
        await comment.delete();

        return response.status(200).json({ msg: 'comment deleted successfully'})
    } catch (error) {
        return response.status(500).json({error: error.message})
    }
}