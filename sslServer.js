const { createServer } = require('https')
const { parse } = require('url')
const next = require('next')
const fs = require('fs')
const logController = require("./src/server/rest/logController");
const express = require("express");

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const expressApp = express()
const handle = app.getRequestHandler()

const httpsOptions = {
  key: fs.readFileSync('./certificates/localhost.key'),
  cert: fs.readFileSync('./certificates/localhost.crt')
}

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  }).listen(3000, (err) => {
    if (err) throw err
    console.log("> Next.js SSL supported dev Server is READY.")
  })

  createServer(httpsOptions, expressApp)
    .listen(8000, (err) => {
      if (err) throw err
      console.log("> Rest API Server is Ready.")
    })
  expressApp.use(express.json)
  expressApp.use("/api/v1", logController)
})