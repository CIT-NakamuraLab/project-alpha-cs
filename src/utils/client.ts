import crypto from "crypto";

export const generateClientId = () => {
  const N = 16
  return crypto.randomBytes(N).toString('base64').substring(0, N)
}

export const generateClientToken = () => {
  const N = 32
  return crypto.randomBytes(N).toString('base64').substring(0, N)
}

export const generateHashedToken = (token: string) => {
  return crypto.createHash('sha256').update(token).digest('hex')
}