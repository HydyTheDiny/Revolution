import { Client, ClientOptions } from 'eris';

export default class Revolt extends Client { 
  constructor (token: string, options: ClientOptions) {
    super(token, options);
  }

  launch = async () => {
    
    await this.connect();
  }
}