import ExtendedMessage from "@util/ExtendedMessage";
import ClientEvent from "@util/ClientEvent";
import mongoose from 'mongoose';

export default new ClientEvent('messageCreate', async function (message) {
    if(message){
        await mongoose.connect("mongodb+srv://Incendiium:<TAWwjPta7Ie0HGm8>@cluster0.am9ut.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
      if(mongoose.connection){
        console.log('Connected to the Database');
      }
  } else return;
});