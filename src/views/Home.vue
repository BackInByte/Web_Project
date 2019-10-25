<template>
  <div>
    <h1>Home Page</h1>
    <v-flex class="mt-4 mb-3">
      <p>Name: {{ user.login }}</p>
      <Popup @newEvent1="updateEvent1"/>
      <Calendar :event='evt' :user='user'/>
      <p>Calendrier pour test :</p>
      <Events ref='RefEvents'></Events>
      Events.select_event_table(2)
    </v-flex>
  </div>
</template>

<script>
// import HelloWorld from '../components/HelloWorld';
// import router from '@/router'
import axios from 'axios'
import Popup from '../components/Popup'
import Calendar from '../components/Calendar'
import Events from '../components/Events'

export default {
  name: 'Home',
  components: {
    // HelloWorld,
    Popup,
    Calendar,
    Events
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
      console.log('Home : ' + this.evt.title, this.evt.description, this.evt.event_date)
    },
    loginUser () {
      let self = this
      axios.get('/api/user')
        .then((response) => {
          console.log(response)
          self.$set(this.user, 'login', response.data.user.email)
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
