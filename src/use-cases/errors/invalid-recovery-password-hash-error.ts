export class InvalidRecoveryPasswordHash extends Error {
  constructor() {
    super('Invalid recovery password hash.')
  }
}
