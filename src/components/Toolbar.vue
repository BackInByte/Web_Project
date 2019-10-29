<template>
  <div>
    <v-toolbar>
      <v-toolbar-title class="headline text-uppercase">Life Manager</v-toolbar-title>

      <div class="flex-grow-1"></div>

      <v-toolbar-items>
      </v-toolbar-items>

      <template v-if="$vuetify.breakpoint.smAndUp">
        <v-btn @click="calendar">Calendrier</v-btn>
        &nbsp;
        <v-btn @click="dashboard">Dashboard</v-btn>
        &nbsp;
        <v-btn @click="logout">Déconnexion</v-btn>
        &nbsp;
        <v-btn @click="about">A propos</v-btn>
      </template>
    </v-toolbar>
  </div>
</template>

<script>
import router from '../router'
import axios from 'axios'
export default {
  methods: {
    about () {
      router.push('/about')
    },
    login () {
      router.push('/')
    },
    calendar () {
      router.push('home')
    },
    dashboard () {
      router.push('/dashboard')
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
