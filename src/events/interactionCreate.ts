import ClientEvent from "@util/ClientEvent";
import Eris from "eris";

export default new ClientEvent("interactionCreate", async function(interaction) {
  if (interaction instanceof Eris.Interaction) {
		console.log("Type:", interaction.type);
		return;
	}
})