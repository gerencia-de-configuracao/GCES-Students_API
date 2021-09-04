export interface HttpError {
  status: number,
  json?: HttpErrorJSON,
}

export interface HttpErrorJSON {
  message: string,
}
