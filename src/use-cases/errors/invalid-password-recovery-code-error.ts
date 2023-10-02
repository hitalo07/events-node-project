export class InvalidPasswordRecoveryCodeError extends Error {
  constructor() {
    super('Invalid password recovery code.')
  }
}
