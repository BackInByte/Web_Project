<template>
  <div>
    <h1>Home Page</h1>
    <v-flex class="mt-4 mb-3">
      <Popup @newEvent1="updateEvent1"/>
      <Calendar :event='evt'/>
    </v-flex>
  </div>
</template>

<script>
// import HelloWorld from '../components/HelloWorld';
import Popup from '../components/Popup'
import Calendar from '../components/Calendar'

export default {
  name: 'Home',
  components: {
    // HelloWorld,
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
  }


}
</script>
