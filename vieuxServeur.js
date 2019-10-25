/**
 *
 * entrez la commande suivante:
 * npm install --save express express-session body-parser morgan cors
 */
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const session = require('express-session')

const app = express()

const cookieSession = require('cookie-session')
const passport = require('passport')

// getting the local authentication type
const LocalStrategy = require('passport-local').Strategy

app.use(session({
  secret: 'blablabla', // changez cette valeur
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // ne changez que si vous avez activé le https
}))
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())

app.use(cookieSession({
  name: 'mysession',
  keys: ['vueauthrandomkey'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.use(passport.initialize())
app.use(passport.session())

const publicRoot = 'C:/Users/Sébastien/Desktop/4A/Web/td1/premier-app/dist'

app.use(express.static(publicRoot))

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
    password: 'password2'
  }
]

app.get('/', (req, res, next) => {
  res.sendFile('index.html', { root: publicRoot })
})

app.get('/api/test', (req, res) => {
  console.log('coucou')
  res.json({
    message: "ceci est envoyé depuis l'API"
  })
})

/* app.get('/api/login', (req, res) => {
  if (!req.session.userId) {
    // connect the user
    req.session.userId = 1000 // connect the user, and change the id
    // res.sendFile('Login.vue', { root: __dirname })
    res.json({
      message: 'connected'
    })
  } else {
    res.status(401)
    res.json({
      message: 'you are already connected'
    })
  }
}) */

app.post('/api/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err)
    }

    if (!user) {
      return res.status(400).send([user, 'Cannot log in', info])
    }

    req.login(user, _err => {
      res.send('Logged in')
    })
  })(req, res, next)
})

app.get('/api/logout', (req, res) => {
  /* if (!req.session.userId) {
    res.status(401)
    res.json({
      message: 'you are already disconnected'
    })
  } else {
    req.session.userId = 0
    res.json({
      message: 'disconnected'
    })
  } */
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

  // console.log([user, req.session])

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

app.get('/api/admin', (req, res) => {
  if (!req.session.userId || req.session.isAdmin === false) {
    res.status(401)
    res.json({ message: 'Unauthorized' })
    return
  }

  res.json({
    message: 'congrats, you are connected'
  })
})

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`listening on ${port}`)
})
