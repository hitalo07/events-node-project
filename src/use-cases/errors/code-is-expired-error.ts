export class CodeIsExpiredError extends Error {
  constructor() {
    super('Code is expired error.')
  }
}
