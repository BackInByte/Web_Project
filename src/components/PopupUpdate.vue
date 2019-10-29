<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
      :close-on-content-click="true"
    >
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </template>

      <v-card :close-on-content-click="true">
        <v-card-title>
          Mettre à jour un événement
        </v-card-title>

        <v-card-text>
          Complétez les champs des propriétés que vous souhaitez modifier.
          Seuls les champs complétés seront modifiés.
          <v-text-field placeholder="Entrez un titre" label="Titre" v-model="title" @keyup.enter="submit"></v-text-field>
          <v-text-field placeholder="Entrez une description" label="Description" v-model="description" @keyup.enter="submit"></v-text-field>

          <v-menu>

            <template v-slot:activator="{ on }">
              <v-text-field :value="event_date" label="Cliquez ici pour choisir la date de l'événement" v-on="on"></v-text-field>
            </template>

            <v-date-picker v-model="event_date" color="light blue"></v-date-picker>

          </v-menu>

          <v-btn class="success" @click="submit">
            Sauvegarder
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
      name: '',
      description: '',
      start: '',
      dialog: false
    }
  },
  methods: {
    submit () {
      console.log('Popup Update : ' + this.title, this.description, this.event_date)
      // à terme utiliser les données récupérées pour les stocker avec d'autres évènements puis les afficher sous la forme d'un calendrier
      this.$emit('newEvent2', {
        name: this.title,
        description: this.description,
        start: this.event_date
      })
      this.title = ''
      this.description = ''
      this.event_date = ''
      this.dialog = false
    }
  }
}
</script>
