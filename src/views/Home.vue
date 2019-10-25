<template>
  <div>
    <v-flex class="mt-4 mb-3">
      <p>Calendrier de {{ user.name }}</p>
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
        login: '',
        name: ''
      }
    }
  },
  methods: {
    updateEvent1 (evt) {
      this.evt = evt
      console.log('Home : ' + this.evt.title, this.evt.description, this.evt.event_date)
    },
    loginUser () {
      let self = this
      axios.get('/api/user')
        .then((response) => {
          console.log(response)
          self.$set(this.user, 'login', response.data.user.email)
          self.$set(this.user, 'name', response.data.user.name)
          console.log(this.user.login)
          this.load_Events_table(String(this.user.login))
        })
        .catch((errors) => {
          console.log(errors)
          // router.push('/')
        })
    },
    load_Events_table: function (parameter) {
      console.log('Appel fonction de Events')
      console.log('parameter' + parameter)
      this.$root.$emit('Calendar', parameter)
    }
  },
  mounted () {
    console.log('mounted de Home')
    this.loginUser()
    console.log(this.user.login)
    console.log(String(this.user.login))
  }

}
</script>
