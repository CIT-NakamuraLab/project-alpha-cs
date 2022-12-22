import type { NextApiRequest, NextApiResponse } from 'next'
import { oAuth2Client, scope } from '../../../utils/google'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scope
  })
  return res.send(authUrl)
}
