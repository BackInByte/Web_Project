<template>
    <div>
        <h2>Login</h2>
        <v-form v-on:submit="login">
            <input placeholder='email' type="text" name="email" /><br>
            <input placeholder='password' type="password" name="password" /><br>
            <v-btn type="submit" value="Login">Valider</v-btn>
        </v-form>
    </div>
</template>

<script>
import router from '../router'
import axios from 'axios'
export default {
  name: 'Login',
  methods: {
    login: (e) => {
      e.preventDefault()
      let email = e.target.elements.email.value
      let password = e.target.elements.password.value
      let login = () => {
        let data = {
          email: email,
          password: password
        }
        axios.post('/api/login', data)
          .then((response) => {
            console.log('Logged in')
            router.push('/dashboard')// .catch(err => {})
          })
          .catch((errors) => {
            console.log('Cannot login')
          })
      }
      login()
    }
  }
}
</script>
