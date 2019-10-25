<template>
    <div>
        <h2>Dashboard</h2>
        <p>Login: {{ user.login }}</p>
        <router-link :to="{ name: 'Home'}">Home</router-link>
    </div>
</template>
<script>
import axios from 'axios'
import router from '../router'
export default {
  name: 'Login',
  data () {
    return {
      user: {
        login: ''
      }
    }
  },
  methods: {
    getUserData: function () {
      let self = this
      axios.get('/api/user')
        .then((response) => {
          console.log(response)
          self.$set(this.user, 'login', response.data.user.email)
          console.log(this.user)
          console.log(this.user.login)
        })
        .catch((errors) => {
          console.log(errors)
          router.push('/')
        })
    }
  },
  mounted () {
    this.getUserData()
  }
}
</script>
