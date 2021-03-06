'use strict'

const express = require('express')
const jsonParser = require('body-parser').json

const app = express()

let lastGong

app.use('/gong', express.static(__dirname + '/static'))

app.get('/gong/gong', (req, res, next) => {
  res.json(lastGong || null)
})

app.post('/gong/gong'
  , jsonParser()
  , (req, res, next) => {
      const body = req.body
      const loc = body.loc || {}
      lastGong =
        { name: String(body.name || '')
        , location:
          { latitude: parseFloat(loc.latitude)
          , longitude: parseFloat(loc.longitude)
          }
        , timestamp: new Date()
        }
      res.json({ ok: true })
  })

app.listen(2355)
