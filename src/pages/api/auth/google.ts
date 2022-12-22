import type { NextApiRequest, NextApiResponse } from 'next'
import { google } from 'googleapis'
import { oAuth2Client } from '../../../utils/google'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.code == null || req.query.code == '') {
    return res.status(400).send('Bad Request')
  }

  const code = req.query.code

  const { tokens } = await oAuth2Client.getToken(code as string)
  oAuth2Client.setCredentials(tokens)

  const oauth2 = google.oauth2({ version: 'v2', auth: oAuth2Client })
  const response = await oauth2.userinfo.get()

  res.status(200).json(response.data)
}
