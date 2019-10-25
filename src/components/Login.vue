<template>
    <div align="center" style="height:1000px" v-bind:style="{ backgroundColor : '#0080ff'}">
        <font size="+3">Bienvenue sur Life Manager !</font>
        <br>
        <font size="+2">Le site qui va vous simplifier la vie</font>
        <div style="height:150px;display:block;"> </div>
        <h2>Login</h2>
        <v-form v-on:submit="login">
            <input placeholder='email' type="text" name="email" /><br>
            <input placeholder='password' type="password" name="password" /><br>
            <v-btn align="center" type="submit" value="Login">Valider</v-btn>
        </v-form>
    </div>
</template>

<style>
fieldset {
    width: 250px;
    box-sizing: border-box;
    margin-left: 136px;
    border: 1px solid #999;
}

input[type="text"], input[type="password"] {
    font: 1em sans-serif;
    background-color : #d1d1d1;
    width: 250px;
    box-sizing: border-box;
    border: 1px solid #999;
}
</style>

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
            router.push('/home')// .catch(err => {})
          })
          .catch((errors) => {
            console.log('Cannot login')
            alert('Mauvais identifiant')
          })
      }
      login()
    }
  }
}
</script>
