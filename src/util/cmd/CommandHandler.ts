import * as fs from 'fs-extra';
import Category from './Category';
import type Command from './Command';
export default class CommandHandler {
  private static commandMap = new Map<string, Command>()
  private static categoryMap = new Map<string, Category>()
  static categories = [] as Array<Category>;
  
  static get commands() { 
    return this.categories.reduce<Array<Command>>((a,b) => a.concat(b.commands), []); 
  }
	
  static get triggers() { 
    return this.commands.reduce<Array<string>>((a,b) => a.concat(b.triggers), []); 
  }

  static registerCategory = (category: Category) => {
    const cat = this.categories.find(cat => cat.name.toLowerCase() === category.name.toLowerCase())
    if (cat) throw new Error(`Duplicate Category name ${category.name.toLowerCase()}, ${cat.dir} found.`)
    this.categories.push(category);
    this.categoryMap.set(category.name, category);
    return category;
  }
  static getCategory = (name: string) => { 
    return this.categoryMap.get(name.toLowerCase()) ?? null; 
  }

  static loadCategoryCommands = (name: string, directory: string) => {
    const cat = this.getCategory(name);
    if (!cat) throw new Error(`No category found for ${name} (${directory})`)
    fs.readdirSync(directory).filter(file => file.startsWith('index.')).forEach(file => {
      const { default: cmd } = (require(`${directory}/${file}`) as { default: Command; });
      this.registerCommand(name, cmd, false);
    })
    console.log(`Loaded Commands from ${name} (${directory})`);
    return cat;
  }

  static registerCommand = (category: string, command: Command, log = true) => {
    if (command.triggers === undefined || command.triggers.length === 0 ) throw new Error(`Command ${command.file} has no triggers`);
    const cat = this.getCategory(category);
    if (!cat) throw new Error(`Invalid category "${category}" when registering the command ${command.triggers[0]} (${command.file})`);
    if (!fs.existsSync(command.file)) throw new Error(`Failed to find the file location for the command "${command.triggers[0]}" (cat: ${category}, dir: ${cat.dir})`);
    const dupe = this.triggers.find(trigger => command.triggers.some(trig => trigger === trig));  
    const dupeCmd = (dupe && this.commands.find(command => command.triggers.includes(dupe))) || undefined;
    if (dupe && dupeCmd) throw new Error(`Duplicate commands trigger "${dupe}" for command ${command.triggers[0]} (${command.file}) on command ${dupeCmd.triggers[0]} (${dupeCmd.file})`);
    if (log) console.log(`registed command ${command.triggers[0]} (${command.file})`);
    cat.commands.push(command);
    command.category = category;
    command.triggers.forEach(triggers => this.commandMap.set(triggers, command));
    return command;
  }
  static getCommand(cmd: string) { 
    return this.commandMap.get(cmd.toLowerCase()) ?? null; 
  }
}