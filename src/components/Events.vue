<template>
  <v-sheet height="500">
    <v-calendar
      ref="calendar2"
      type="month"
      now="2019-01-08"
      value="2019-01-08"
      :events="user_events"
    ></v-calendar>
  </v-sheet>
</template>

<script>
// :events="events"
export default {
  data: () => ({

    user_events: [{}],
    user1_events: [
      {
        name: 'Vacation',
        start: '2018-12-30',
        end: '2019-01-02'
      },
      {
        name: 'Meeting',
        start: '2019-01-07'
      },
      {
        name: '30th Birthday',
        start: '2019-01-03'
      }
    ],

    user2_events: [
      {
        name: 'New Year',
        start: '2019-01-01'
      },
      {
        name: 'Conference',
        start: '2019-01-21'
      },
      {
        name: 'Hackathon',
        start: '2019-01-30',
        end: '2019-02-01'
      }
    ]
  }),
  methods: {
    select_event_table (parameter) {
      if (parameter === "user@email.com") {
        this.user_events = this.user1_events
        this.now = "2019-01-10"
        console.log('parameter' + parameter)
        console.log(this.user_events)
      } else {
        this.user_events = this.user2_events
        this.now = "2019-01-12"
        console.log('parameter' + parameter)
        console.log(this.user_events)
      }
    }
  },

  mounted () {
    this.$root.$on('Events', (parameter) => {
      console.log('mounted de Events')
      this.select_event_table(parameter)
    })
  }

}
</script>
