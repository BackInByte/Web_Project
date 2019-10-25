<template>
  <v-row class="fill-height">
    <v-col>

      <p>Bye</p>
      <p>Login : {{ user.login }}</p>
      <li v-for="(message, index) in messageList" :item="message" :key="index">
        {{ message }}
      </li>

      <v-sheet height="64">

        <v-toolbar flat color="white">
          <v-btn outlined class="mr-4" @click="setToday">
            Today
          </v-btn>
          <v-btn fab text small @click="prev">
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab text small @click="next">
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
          <div class="flex-grow-1"></div>
          <v-menu bottom right>
            <template v-slot:activator="{ on }">
              <v-btn
                outlined
                v-on="on"
              >
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 days</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="user_events"
          :event-color="getEventColor"
          :event-margin-bottom="3"
          now="2019-01-08"
          value="2019-01-08"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
        ></v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          full-width
          offset-x
          @loadstart="saveEvent"
          @change="saveEvent"
          @click.native="greet"
        >
          <v-card
            color="grey lighten-4"
            min-width="350px"
            flat
          >
            <v-toolbar
              :color="selectedEvent.color"
              dark
            >
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <div class="flex-grow-1"></div>
              <v-btn id="greet" icon @click="saveEvent" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
              <PopupUpdate id="popupupdate" style="display:none" @newEvent2="updateEvent2"/>
              <v-btn @click="deleteEvent" icon>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-btn @click="saveEvent" icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <span v-html="selectedEvent.details"></span>
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="secondary"
                @click="selectedOpen = false"
              >
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import Popup from './Popup'
// import Home from '@/views/Home'
import PopupUpdate from './PopupUpdate'
export const event =
  {
    name: '',
    description: '',
    start: '',
    index: ''
  }

export default {
  name: 'Calendar',

  components: {
    Popup,
    PopupUpdate
  },

  props: {
    event: {
      name: '',
      description: '',
      event_date: ''
    },
    user: {
      login: ''
    }
  },

  data: () => ({
    today: '2019-01-01',
    focus: '2019-01-01',
    type: 'month',
    typeToLabel: {
      month: 'Month',
      week: 'Week',
      day: 'Day',
      '4day': '4 Days'
    },
    start: null,
    end: null,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    user_events: [{}],
    user1_events: [
      {
        name: 'event 4',
        start: '2019-01-14 19:00',
        color: '#4285F4'
      },
      {
        name: 'event 6',
        start: '2019-01-14 21:00',
        color: '#4285F4'
      },
      {
        name: 'event 7',
        start: '2019-01-14 22:00',
        color: '#4285F4'
      }
    ],
    user2_events: [
      {
        name: 'New Year',
        start: '2019-01-01',
        color: '#4285F4'
      },
      {
        name: 'Conference',
        start: '2019-01-21',
        color: '#4285F4'
      },
      {
        name: 'Hackathon',
        start: '2019-01-30',
        color: '#4285F4'
      }
    ],
    messageList: []
  }),
  computed: {
    title () {
      const { start, end } = this
      if (!start || !end) {
        return ''
      }

      const startMonth = this.monthFormatter(start)
      const endMonth = this.monthFormatter(end)
      const suffixMonth = startMonth === endMonth ? '' : endMonth

      const startYear = start.year
      const endYear = end.year
      const suffixYear = startYear === endYear ? '' : endYear

      const startDay = start.day + this.nth(start.day)
      const endDay = end.day + this.nth(end.day)

      switch (this.type) {
        case 'month':
          return `${startMonth} ${startYear}`
        case 'week':
        case '4day':
          return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`
        case 'day':
          return `${startMonth} ${startDay} ${startYear}`
      }
      return ''
    },
    monthFormatter () {
      return this.$refs.calendar.getFormatter({
        timeZone: 'UTC', month: 'long'
      })
    }
  },
  methods: {
    select_event_table (parameter) {
      if (parameter === 'user@email.com') {
        this.user_events = this.user2_events
        this.$refs.calendar.now = '2019-01-10'
        // this.forceUpdate()
        console.log(this.$refs.calendar.now)
        console.log(this.$refs.calendar)
        console.log(this.$refs.calendar.events)
        console.log(this.$refs.calendar)
        console.log(this.$refs.calendar.events)
        // this.$refs.calendar.checkChange()
        // this.updateRange()
        console.log('parameter' + parameter)
        console.log(this.$refs)
      } else {
        this.user_events = this.user1_events
        this.$refs.calendar.now = '2019-01-12'
        // .forceUpdate()
        console.log(this.$refs.calendar.now)
        console.log(this.$refs.calendar.events)
        console.log(this.$refs.calendar)
        // this.$refs.calendar.checkChange()
        // this.updateRange()
        console.log('parameter' + parameter)
        console.log(this.$refs)
      }
    },
    viewDay ({ date }) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor (event) {
      return event.color
    },
    setToday () {
      this.focus = this.today
    },
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        setTimeout(() => this.selectedOpen = true, 10)
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    updateRange ({ start, end }) {
      // You could load events from an outside source (like database) now that we have the start and end dates on the calendar
      this.start = start
      this.end = end
    },
    nth (d) {
      return d > 3 && d < 21
        ? 'th'
        : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10]
    },
    deleteEvent () {
      console.log('deleteEvent' + this.selectedEvent.name + 'name' + this.selectedEvent.name)
      var index = this.user_events.indexOf(this.selectedEvent)
      console.log('Index : ' + this.user_events.indexOf(this.selectedEvent))
      this.user_events.splice(index, 1)
    },
    updateEvent2 (evt) {
      console.log('Calendar update reçu : ' + evt.name + evt.start)
      var index = event.index
      console.log('Event avec index : ' + this.user_events[index].name)
      if (evt.name) {
        console.log('if name')
        this.user_events[index].name = evt.name
      }
      if (evt.description) {
        console.log('if description')
        this.user_events[index].description = evt.description
      }
      if (evt.start) {
        console.log('if start')
        this.user_events[index].start = evt.start
      }
      console.log('Event avec index après : ' + this.user_events[index].name, this.user_events[index].start)
      document.getElementById('popupupdate').style.display = 'none'
      document.getElementById('greet').style.display = 'block'
    },
    saveEvent: function () {
      console.log('Greet')
      document.getElementById('popupupdate').style.display = 'block'
      document.getElementById('greet').style.display = 'none'
      console.log('saveEvent : ' + this.selectedEvent.name, this.selectedEvent.start)
      event.name = this.selectedEvent.name
      event.description = this.selectedEvent.description
      event.start = this.selectedEvent.start
      console.log('saveEvent sauvegardé : ' + event.name, event.start)
      event.index = this.user_events.indexOf(this.selectedEvent)
      console.log('saveEvent index : ' + event.index)
    }
  },

  mounted () {
    this.$refs.calendar.checkChange()
    console.log(this.user.login)
    this.$root.$on('Calendar', (parameter) => {
      console.log('mounted de Calendar')
      this.select_event_table(parameter)
    })
  },

  watch: {
    event: function () {
      this.user_events.push({
        name: this.event.title,
        start: this.event.event_date,
        color: '#4285F4'
      })
    }
  }
}
</script>
