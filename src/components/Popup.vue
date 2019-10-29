<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on }">
        <v-btn v-on="on">
          Ajouter un événement
        </v-btn>
      </template>

      <v-card>
        <v-card-title>
          Ajouter un événement
        </v-card-title>

        <v-card-text>
          <v-form ref="Popup">

            Merci de remplir les champs suivants :
            <v-text-field placeholder="Entrez un titre" label="Titre" v-model="title" :rules="inputRules" @keyup.enter="submit"></v-text-field>
            <v-text-field placeholder="Entrez une description" label="Description" v-model="description" :rules="inputRules" @keyup.enter="submit"></v-text-field>

            <v-menu>

              <template v-slot:activator="{ on }">
                <v-btn :value="event_date" label="Cliquez ici pour choisir la date de l'événement" :rules="inputRules" v-on="on">Cliquez ici pour choisir la date de l'événement</v-btn>
              </template>

              <v-date-picker v-model="event_date" color="light blue"></v-date-picker>

            </v-menu>
            &nbsp;
            <div style="height:25px;display:block;"> </div>
            <div align="center">
            <v-btn class="success" @click="submit">
              Sauvegarder
            </v-btn>
            </div>

          </v-form>
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
      event_date: '',
      dialog: false,
      inputRules: [
        v => v.length > 0 || 'Champ requis'
      ]
    }
  },
  methods: {
    submit () {
      if (this.$refs.Popup.validate()) {
      // à terme utiliser les données récupérées pour les stocker avec d'autres évènements puis les afficher sous la forme d'un calendrier
        this.$emit('newEvent1', {
          title: this.title,
          description: this.description,
          event_date: this.event_date
        })
        this.title = ''
        this.description = ''
        this.event_date = ''
        this.dialog = false
      }
    }
  }
}
</script>
