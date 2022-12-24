import type { NextApiRequest, NextApiResponse } from 'next'
import { google } from 'googleapis'
import { oAuth2Client } from '../../../utils/google'
import { getServerAuthSession } from '../../../server/common/get-server-auth-session'
import { prisma } from '../../../server/db/client'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.code == null || req.query.code == '') {
    return res.status(400).json({ status: 'Bad Request', message: 'Code is missing' })
  }

  const session = await getServerAuthSession({ req, res })

  if (session) {
    const code = req.query.code

    const { tokens } = await oAuth2Client.getToken(code as string)
    oAuth2Client.setCredentials(tokens)

    const oauth2 = google.oauth2({ version: 'v2', auth: oAuth2Client })
    const response = await oauth2.userinfo.get()

    const user = response.data

    if (!user.email?.endsWith('@s.chibakoudai.jp')) {
      return res.status(403).json({ status: 'Error', message: 'Unsupported account type' })
    }

    const studentId = user.email.substring(1, 8)

    const result = await prisma.user.update({
      where: {
        id: session.user?.id
      },
      data: {
        student_id: studentId
      }
    })

    console.log(result)

    res.status(200).json({ status: 'OK', student_id: studentId })
  } else {
    res.status(401).json({ status: 'Unauthorized', message: ' Need to login with slack account' })
  }
}
