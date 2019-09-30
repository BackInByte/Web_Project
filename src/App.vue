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
      <router-view></router-view>
      <Popup @newEvent1="updateEvent1"/>
      <Calendar :event='evt'/>
      
      <p>Bonjour</p>
    </v-content>
  </v-app>
</template>

<script>
import Popup from './components/Popup'
import Calendar from './components/Calendar'

export default {
  name: 'App',
  components: {
    Popup,
    Calendar
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
