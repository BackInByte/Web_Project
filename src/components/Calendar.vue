<template>
  <v-row class="fill-height">
    <v-col>
      <!--<p>Calendrier de : {{ user.login }}</p>-->
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
          :now="today"
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
    PopupUpdate
  },

  props: {
    event: {
      name: '',
      description: '',
      event_date: ''
    },
    user: {
      login: '',
      name: ''
    }
  },

  data: () => ({
    today: '',
    focus: '2019-10-01',
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
    user_name: '',
    user_events: [{}],
    user1_events: [
      {
        name: 'Anniversaire Clémence',
        start: '2019-11-15',
        color: '#FD6C9E'
      },
      {
        name: 'Concert BTS',
        start: '2019-11-18 21:00',
        color: '#FD6C9E'
      },
      {
        name: 'Shopping avec Irene',
        start: '2019-11-14',
        color: '#FD6C9E'
      }
    ],
    user2_events: [
      {
        name: 'Soirée',
        start: '2019-11-07',
        color: '#4285F4'
      },
      {
        name: 'Picnic',
        start: '2019-11-21',
        color: '#4285F4'
      },
      {
        name: 'Projet Web',
        start: '2019-10-30',
        color: '#4285F4'
      }
    ],
    user3_events: [
      {
        name: 'Worlds',
        start: '2019-10-12',
        color: '#ED7F10'
      },
      {
        name: 'Quarts de finale',
        start: '2019-10-26',
        color: '#ED7F10'
      },
      {
        name: 'Demi finale',
        start: '2019-11-02',
        color: '#ED7F10'
      },
      {
        name: 'Final',
        start: '2019-11-10',
        color: '#ED7F10'
      }
    ],
    user4_events: [
      {
        name: 'LAN CS:GO',
        start: '2019-11-09',
        color: '#00FF00'
      },
      {
        name: 'Salle',
        start: '2019-11-12',
        color: '#00FF00'
      },
      {
        name: 'Restau avec les bros',
        start: '2019-11-18',
        color: '#00FF00'
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
        this.user_events = this.user1_events
        console.log('parameter' + parameter)
        console.log('load user1_events in user_events')
        console.log(this.user_events)
      }
      if (parameter === 'emma@email.com') {
        this.user_events = this.user2_events
        console.log('parameter' + parameter)
      }
      if (parameter === 'fnatic@email.com') {
        this.user_events = this.user3_events
        console.log('parameter' + parameter)
      }
      if (parameter === 'julien@email.com') {
        this.user_events = this.user4_events
        console.log('parameter' + parameter)
      }
    },
    updateUserEventsTable (parameter) {
      if (parameter === 'user@email.com') {
        // this.user1_events = []
        this.user1_events = this.user_events
        localStorage.setItem('user1_events', JSON.stringify(this.user1_events))
        console.log(this.user_events)
        console.log(this.user1_events)
        console.log('parameter' + parameter)
      }
      if (parameter === 'emma@email.com') {
        this.user2_events = this.user_events
        localStorage.setItem('user2_events', JSON.stringify(this.user2_events))
        console.log('parameter' + parameter)
      }
      if (parameter === 'fnatic@email.com') {
        this.user3_events = this.user_events
        localStorage.setItem('user3_events', JSON.stringify(this.user3_events))
        console.log('parameter' + parameter)
      }
      if (parameter === 'julien@email.com') {
        this.user4_events = this.user_events
        localStorage.setItem('user4_events', JSON.stringify(this.user4_events))
        console.log('parameter' + parameter)
      }
    },
    SetCurrentDate () {
      this.today = new Date().toJSON().slice(0, 10).replace(/-/g, '-')
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
      this.updateUserEventsTable(this.user_name)
      this.selectedOpen = false
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
      this.updateUserEventsTable(this.user_name)
      this.selectedOpen = false
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
      this.updateUserEventsTable(this.user_name)
      this.selectedOpen = false
    }
  },

  mounted () {
    this.$refs.calendar.checkChange()
    if (localStorage.getItem('user1_events')) {
      this.user1_events = JSON.parse(localStorage.getItem('user1_events'))
    }
    if (localStorage.getItem('user2_events')) {
      this.user2_events = JSON.parse(localStorage.getItem('user2_events'))
    }
    if (localStorage.getItem('user3_events')) {
      this.user3_events = JSON.parse(localStorage.getItem('user3_events'))
    }
    if (localStorage.getItem('user4_events')) {
      this.user4_events = JSON.parse(localStorage.getItem('user4_events'))
    }
    console.log(this.user.login + 'test')
    console.log('Mounted de Calendar')
    this.$root.$on('Calendar', (parameter) => {
      this.user_name = parameter
      console.log('this.user_name =' + this.user_name)
      console.log('mounted de Calendar')
      this.select_event_table(parameter)
    })
    this.SetCurrentDate()
  },

  watch: {
    event: function () {
      if (this.event.event_date && this.event.title) {
        console.log('Event ajouté')
        this.user_events.push({
          name: this.event.title,
          start: this.event.event_date,
          color: '#4285F4'
        })
        this.updateUserEventsTable(this.user_name)
      }
    }
    /* user1_events: function () {
      this.updateUserEventsTable(this.user_name)
    } */
  }
}
</script>
