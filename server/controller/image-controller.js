import grid from 'gridfs-stream';
import mongoose from 'mongoose';
const url = 'onestop.up.railway.app'

let gfs,gridfsBucket; // gfg is used for storing
const conn = mongoose.connection;
conn.once('open',() =>{ // connection with db checker
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db,{
        bucketName: 'fs' // collection name on db
    });

    gfs = grid(conn.db,mongoose.mongo);
    gfs.collection('fs');
})
export const uploadImage = (request,response) => {
    if(!request.file){
        return response.status(404).json({msg: "file not found"});
    }

    const imageUrl = `${url}/file/${request.file.filename}`
    return response.status(200).json(imageUrl);
}


export const getImage = async(request,response) =>{ // call db
    try {
       const file = await gfs.files.findOne({filename: request.params.filename});
       const readStream = gridfsBucket.openDownloadStream(file._id); // returning chunks or stream
       readStream.pipe(response); // fetching chunks
    } catch (error) {
        return response.status(500).json({msg: error.message});
    }
}