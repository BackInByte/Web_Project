<template>
  <div>
    <v-toolbar>
      <v-toolbar-title>Title</v-toolbar-title>

      <div class="flex-grow-1"></div>

      <v-toolbar-items>
      </v-toolbar-items>

      <template v-if="$vuetify.breakpoint.smAndUp">
        <router-link :to="{ name: 'Dashboard'}">Dashboard</router-link>
        &nbsp;
        <a href="/" v-on:click="logout"> Logout</a>
        <v-btn @click="about" icon>
          <v-icon>mdi-export-variant</v-icon>
        </v-btn>
        <router-link :to="{ name: 'About'}">ABOUT</router-link>
        <v-btn icon>
          <v-icon>mdi-delete-circle</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-plus-circle</v-icon>
        </v-btn>
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
      router.push('/About')
    },
    login () {
      router.push('/')
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
