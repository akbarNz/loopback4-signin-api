import {BindingKey} from '@loopback/core';
import {PasswordHasherService} from './services/password-hasher.service';


//this file contain all the keys we're gonna bind to our app

export namespace PasswordHasherBindings {
  export const PASSWORD_HASHER = BindingKey.create<PasswordHasherService>(
    'services.hasher',
  );
  export const ROUNDS = BindingKey.create<number>('services.hasher.round');
}
