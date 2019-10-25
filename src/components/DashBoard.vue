<template>
    <div align="center">
        <h2>Dashboard</h2>
        <br>
        <p>Mail : {{ user.login }}</p>
        <br>
        <p>Nom : {{ user.name }}</p>
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
        login: '',
        name: ''
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
          self.$set(this.user, 'name', response.data.user.name)
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
