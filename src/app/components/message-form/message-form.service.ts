import {Injectable} from '@angular/core';
import {Message} from '../../models';

@Injectable()
export class MessageFormService{

  public static message: string;

  getMessage(): string {
    return MessageFormService.message;
}
  setMessage(msg: string) {
    MessageFormService.message = msg;
  }
}
