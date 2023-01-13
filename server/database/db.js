import mongoose from 'mongoose';

const Connection = async (username,password) =>{
    const URL =`mongodb://${username}:${password}@ac-nzngqi0-shard-00-00.ha1fsqn.mongodb.net:27017,ac-nzngqi0-shard-00-01.ha1fsqn.mongodb.net:27017,ac-nzngqi0-shard-00-02.ha1fsqn.mongodb.net:27017/?ssl=true&replicaSet=atlas-oddruw-shard-0&authSource=admin&retryWrites=true&w=majority`;
    try {// exceptional handling
        mongoose.set('strictQuery', false);
        await mongoose.connect(URL ,{useNewUrlParser: true}) // for connection express with db // mongoose.connect takes 2 arguments (connection.url , object)// asyn function      
        console.log('Database connected Successfully -> good');
    } catch (error) {
        console.log('not correct',error);
        
    }
}
export default Connection;