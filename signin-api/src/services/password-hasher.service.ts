import {inject} from '@loopback/core';
import {compare, genSalt, hash} from "bcrypt";
import {PasswordHasherBindings} from '../keys';
export type HashPassword = (
  password: string,
  rounds: number,
) => Promise<string>;

export async function hashPassword(
  password: string,
  rounds: number,
): Promise<string> {
  const salt = await genSalt(rounds);
  return hash(password, salt);
}
export interface PasswordHasher<T = string> {
  hashPassword(password: T): Promise<T>;
  comparePassword(providedPass: T, storePass: T): Promise<boolean>;
}
export class PasswordHasherService implements PasswordHasher<string> {
  constructor(
    @inject(PasswordHasherBindings.ROUNDS)
    private readonly rounds: number,
  ) {}

  /*
   * Add service methods here
   */
  async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(this.rounds);
    return hash(password, salt);
  }
  async comparePassword(
    providedPass: string,
    storedPass: string,
  ): Promise<boolean> {
    const passwordIsMatched = await compare(providedPass, storedPass);
    return passwordIsMatched;
  }
}
