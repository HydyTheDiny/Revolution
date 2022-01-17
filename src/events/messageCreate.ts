import ClientEvent from "@util/ClientEvent";
import ExtendedMessage from "@util/ExtendedMessage";
import { AnyThreadChannel, GuildTextableChannel, Message } from "eris";
import mongoose, { Schema, model} from 'mongoose';

export default new ClientEvent('messageCreate', async function(message) {
  const msg = new ExtendedMessage(message as Message<Exclude<GuildTextableChannel, AnyThreadChannel>>, this);
  const load = await msg.load();
  const { cmd } = msg;

  if ( load === false || cmd === null) return;

  void cmd.run.call(this, msg, cmd);
});