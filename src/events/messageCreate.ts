import ClientEvent from "@util/ClientEvent";
import mongoose, { Schema, model} from 'mongoose';

export default new ClientEvent('messageCreate', async function(message) {
    await mongoose.connect(process.env.DATABASE!);
    const XPModel = model('XP', new Schema({
      user: { type: String, default: message.author.id },
      level: { type: Number, min: 1 },
      xp: { type: Number, min: 0 }
    }));

    const userXP = new XPModel();
    const a = userXP.save();

    let exp = Math.floor()
        
});