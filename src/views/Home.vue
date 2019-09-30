<template>
  <div>
    <h1>Home Page</h1>
    <v-flex class="mt-4 mb-3">
      <Popup />
      <Calendar />
    </v-flex>
  </div>
</template>

<script>
// import HelloWorld from '../components/HelloWorld';
import Popup from '../components/Popup'
import Calendar from '../components/Calendar'

export default {
  components: {
    // HelloWorld,
    Popup,
    Calendar
  }
}
</script>
