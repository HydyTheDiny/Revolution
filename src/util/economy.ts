import ExtendedMessage from "@util/ExtendedMessage";
import ClientEvent from "@util/ClientEvent";
import mongoose from 'mongoose';

export default new ClientEvent('messageCreate', async function (message) {
    if(message){
        await mongoose.connect("mongodb+srv://Revolution:<Revolution.Database.Admin.Access.Allowed>@cluster0.am9ut.mongodb.net/Database?retryWrites=true&w=majority");
      if(mongoose.connection){
        console.log('Connected to the Database');
      }
  } else return;
});