import jwt from 'jsonwebtoken'
import { Session } from '../..'

declare global {
  namespace Express {
    export interface Request {
      decodedToken: Session
    }
  }
}
