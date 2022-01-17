import Revolt from "@Revolt";
import { AutocompleteInteraction, CommandInteraction, ComponentInteraction, PingInteraction } from "eris";

export default class ComponentInteractionCollector {
  static client: Revolt;
  static collectors = [] as Array<{
		channel: string;
		filter(interaction: ComponentInteraction): boolean;
		resolve(value: (ComponentInteraction) | Array<ComponentInteraction>): void;
		limit: number;
		interactions: Array<ComponentInteraction>;
		timeout: number;
		i: NodeJS.Timeout;
	}>;
  static setClient = (client: Revolt) => {
    this.client = client;
		this.client.on("interactionCreate", this.processInteraction.bind(this));
  }

  static processInteraction = (interaction: PingInteraction | ComponentInteraction | CommandInteraction | AutocompleteInteraction) => {
    let used = false;
		console.log('interaction')
    if (!(interaction instanceof ComponentInteraction)) return false;
		if (interaction.data === undefined) return false;
    const collectors = this.collectors.filter((col) => col.channel === interaction.channel.id);
    for (const collector of collectors) {
			if (collector && collector.filter(interaction)) {
				used = true;
				collector.interactions.push(interaction);
			}
			if (collector.interactions.length >= collector.limit) {
				clearTimeout(collector.i);
				collector.resolve(collector.limit === 1 ? collector.interactions[0] : collector.interactions);
			}
		}
    return used;
  }

  static async awaitInteractions(channelId: string, timeout: number, filter: (interaction: ComponentInteraction) => boolean, limit: number): Promise<Array<ComponentInteraction>>;
	static async awaitInteractions(channelId: string, timeout: number, filter?: (interaction: ComponentInteraction) => boolean, limit?: 1): Promise<ComponentInteraction | null>;
	static async awaitInteractions(channelId: string, timeout: number, filter: (interaction: ComponentInteraction) => boolean = (() => true), limit?: number): Promise<Array<ComponentInteraction | null> | (ComponentInteraction | CommandInteraction | null)> {
		return new Promise(resolve => {
			this.collectors.push({
				channel: channelId,
				filter,
				resolve,
				limit: limit || 1,
				interactions: [],
				timeout,
				i: setTimeout(resolve.bind(null, [undefined, 1].includes(limit) ? null : []), timeout)
			});
		});
	}
}