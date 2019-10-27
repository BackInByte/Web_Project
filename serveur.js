const express = require('express')

const app = express()
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
const passport = require('passport')

const LocalStrategy = require('passport-local').Strategy

app.use(bodyParser.json())

app.use(cookieSession({
  name: 'mysession',
  keys: ['vueauthrandomkey'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.use(passport.initialize())

app.use(passport.session())

const publicRoot = 'dist'

app.use(express.static(publicRoot))

// const path = require('path')
// app.use(express.static(path.join(__dirname, 'dist/')))

let users = [
  {
    id: 1,
    name: 'Jude',
    email: 'user@email.com',
    password: 'password'
  },
  {
    id: 2,
    name: 'Emma',
    email: 'emma@email.com',
    password: 'emma02'
  },
  {
    id: 3,
    name: 'Fnatic',
    email: 'fnatic@email.com',
    password: 'thebest'
  },
  {
    id: 4,
    name: 'Julien',
    email: 'julien@email.com',
    password: 'lebro'
  }
]

app.get('/', (req, res, next) => {
  res.sendFile('index.html', { root: publicRoot })
})

app.post('/api/login', (req, res, next) => {
  console.log('API Login')
  // res.status(401)
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.log('Erreur')
      return next(err)
    }

    if (!user) {
      return res.status(400).send([user, 'Cannot log in', info])
    }

    req.login(user, err_ => {
      console.log('Logged in')
      res.send('Logged in')
    })
  })(req, res, next)
})

app.get('/api/logout', function (req, res) {
  req.logout()

  console.log('logged out')

  return res.send()
})

const authMiddleware = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.status(401).send('You are not authenticated')
  } else {
    return next()
  }
}

app.get('/api/user', authMiddleware, (req, res) => {
  let user = users.find(user => {
    return user.id === req.session.passport.user
  })

  console.log([user, req.session])

  res.send({ user: user })
})

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },

    (username, password, done) => {
      let user = users.find((user) => {
        return user.email === username && user.password === password
      })

      if (user) {
        done(null, user)
      } else {
        done(null, false, { message: 'Incorrect username or password' })
      }
    }
  )
)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  let user = users.find((user) => {
    return user.id === id
  })

  done(null, user)
})

app.listen(4000, () => {
  console.log('Application lancée sur le port 4000')
})
