<template>
  <v-app>
    <v-content>
      <Toolbar></Toolbar>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import router from './router'
import axios from 'axios'
import Toolbar from './components/Toolbar'

export default {
  name: 'App',
  components: {
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
  }
}
</script>
