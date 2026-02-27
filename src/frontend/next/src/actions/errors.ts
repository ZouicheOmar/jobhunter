export class PostDataResolveError extends Error {
  constructor(message = 'Could not resolve post candid data from backend') {
    super(message);
    this.name = 'AuthenticationError';
    Object.setPrototypeOf(this, PostDataResolveError.prototype);
  }
}

export class ExtractDataFromDescriptionError extends Error {
  constructor(
    public message = 'Could not data from the provided description',
    public status: number
  ) {
    super(message);
    this.name = 'AuthenticationError';
    this.status = status;
    Object.setPrototypeOf(this, ExtractDataFromDescriptionError.prototype);
  }
}
