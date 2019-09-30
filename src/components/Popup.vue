<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on }">
        <p>Hola</p>
        <v-btn v-on="on">
          Add new event
        </v-btn>
      </template>

      <v-card>
        <v-card-title>
          Add a new event
        </v-card-title>

        <v-card-text>
          Please fill the following fields :
          <v-text-field placeholder="enter title" label="Title" v-model="title" @keyup.enter="submit"></v-text-field>
          <v-text-field placeholder="enter description" label="description" v-model="description" @keyup.enter="submit"></v-text-field>

          <v-menu>

            <template v-slot:activator="{ on }">
              <v-text-field :value="event_date" label="Event date" v-on="on"></v-text-field>
            </template>

            <v-date-picker v-model="event_date" color="light blue"></v-date-picker>

          </v-menu>
          
          <v-btn class="success" @click="submit">
            Save
          </v-btn>


        </v-card-text>

      </v-card>

    </v-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      description: '',
      event_date: ''
    }
  },
  methods: {
    submit () {
      // console.log(this.title, this.description, this.event_date)
      // à terme utiliser les données récupérées pour les stocker avec d'autres évènements puis les afficher sous la forme d'un calendrier
      this.$emit('newEvent1', {
        title: this.title,
        description: this.description,
        event_date: this.event_date
      })
      //, this.description, this.event_date)
      // this.$emit('newEvent2', this.description)
      // this.$emit('newEvent3', this.event_date)
      this.title = ''
      this.description = ''
      this.event_date = ''
    }
  }
}
</script>
