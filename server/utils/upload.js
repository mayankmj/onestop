import {GridFsStorage} from 'multer-gridfs-storage'
import dotenv from 'dotenv'
import multer from 'multer';

dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const storage = new GridFsStorage({
    url: `mongodb://${username}:${password}@ac-nzngqi0-shard-00-00.ha1fsqn.mongodb.net:27017,ac-nzngqi0-shard-00-01.ha1fsqn.mongodb.net:27017,ac-nzngqi0-shard-00-02.ha1fsqn.mongodb.net:27017/?ssl=true&replicaSet=atlas-oddruw-shard-0&authSource=admin&retryWrites=true&w=majority`,
    option:{ useNewUrlParser: true },
    file: (request,file) =>{
        const match = ["image/png", "image/jpg"];

        if(match.indexOf(file.memeType ) === -1) // memeType => extension checking from the above array
        {
            return `${Date.now()}-blog-${file.originalname}`;
        }
        return{
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }
}
)
// multer upload the file(image) on db
export default multer({storage});