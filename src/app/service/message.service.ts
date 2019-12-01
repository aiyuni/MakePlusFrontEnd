import { Injectable } from '@angular/core';

/** roots */
@Injectable({
  providedIn: 'root'
})
export class MessageService {

  /** message to display the api call result */
  messages: string[] = [];

  constructor() { }

  /** add message */
  add(message: string){
    this.messages.push(message);
  }

  /** clear message */
  clear(){
    this.messages = [];
  }
}
