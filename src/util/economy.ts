import ExtendedMessage from "@util/ExtendedMessage";
import ClientEvent from "@util/ClientEvent";
import mongoose from 'mongoose';

export default new ClientEvent('messageCreate', async function (message) {
    if(message){
        await mongoose.connect("mongodb+srv://Revolution:<ITbO3v8ZWhmtivy1>@incendiium.x4f5o.mongodb.net/test");
      if(mongoose.connection){
        console.log('Connected to the Database');
      }
  } else return;
});