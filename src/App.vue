<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        text
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <Toolbar></Toolbar>
      <router-view></router-view>
      <!--<Popup @newEvent1="updateEvent1"/>
      <Calendar :event='evt'/>-->

      <!--<p>Bonjour</p>-->
    </v-content>
    <div id="app">
        <img src="./assets/logo.png">
        <div>
            <router-link :to="{ name: 'Dashboard'}">Dashboard</router-link>
            <router-link :to="{ name: 'Login'}">Login</router-link>
            <a href="/" v-on:click="logout">Logout</a>
        </div>
    </div>
  </v-app>
</template>

<script>
// import Popup from './components/Popup'
// import Calendar from './components/Calendar'
import router from './router'
import axios from 'axios'
import Toolbar from './components/Toolbar'

export default {
  name: 'App',
  components: {
    /* Popup,
    Calendar */
    Toolbar
  },
  data: function () {
    return {
      evt: {
        title: '',
        description: '',
        event_date: ''
      }
    }
  },
  methods: {
    updateEvent1 (evt) {
      this.evt = evt
      console.log(this.evt.title, this.evt.description, this.evt.event_date)
    },
    logout: function (e) {
      axios
        .get('/api/logout')
        .then(() => {
          router.push('/')
        })
    }

    /*
    updateEvent2 (variable) {
      this.childData2 = variable
      console.log(this.childData2)
    },
    updateEvent3 (variable) {
      this.childData3 = variable
      console.log(this.childData3)
    }
    */
  }
}
</script>
