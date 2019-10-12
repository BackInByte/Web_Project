<template>
  <div>
    <h1>Home Page</h1>
    <v-flex class="mt-4 mb-3">
      <p>Name: {{ user.login }}</p>
      <Popup @newEvent1="updateEvent1"/>
      <Calendar :event='evt' :user='user'/>
    </v-flex>
  </div>
</template>

<script>
// import HelloWorld from '../components/HelloWorld';
// import router from '@/router'
import axios from 'axios'
import Popup from '../components/Popup'
import Calendar from '../components/Calendar'

export default {
  name: 'Home',
  components: {
    // HelloWorld,
    Popup,
    Calendar
  },
  data () {
    return {
      evt: {
        title: '',
        description: '',
        event_date: ''
      },
      user: {
        login: ''
      }
    }
  },
  methods: {
    updateEvent1 (evt) {
      this.evt = evt
      console.log(this.evt.title, this.evt.description, this.evt.event_date)
    },
    loginUser () {
      let self = this
      axios.get('/api/user')
        .then((response) => {
          console.log(response)
          self.$set(this.user, 'login', response.data.user.email)
        })
        .catch((errors) => {
          console.log(errors)
          // router.push('/')
        })
    }
  },
  mounted () {
    this.loginUser()
    console.log(this.user.login)
  }

}
</script>
