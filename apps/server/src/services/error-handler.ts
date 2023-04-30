import { Request, Response } from 'express'

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: () => void,
) {
  res.status(res.statusCode && res.statusCode !== 200 ? res.statusCode : 500)
  res.send({
    message: err.message,
  })
}
