new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue.js!'
  }
})

var app2 = new Vue({
  el: '#app-2',
  data: {
    message: 'Vous avez affiché cette page le ' + new Date().toLocaleString()
  }
})

var app3 = new Vue({
  el: '#app-3',
  data: {
    seen: true
  }
})

var app4 = new Vue({
  el: '#app-4',
  data: {
    todos: [
      { text: 'Apprendre JavaScript' },
      { text: 'Apprendre Vue' },
      { text: 'Créer quelque chose de génial' }
    ]
  }
})

var app5 = new Vue({
  el: '#app-5',
  data: {
    message: 'Hello Vue.js !'
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('')
    }
  }
})

var app6 = new Vue({
  el: '#app-6',
  data: {
    message: 'Hello Vue !'
  }
})

Vue.component('todo-item', {
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})

var app7 = new Vue({
  el: '#app-7',
  data: {
    groceryList: [
      { id: 0, text: 'Légumes' },
      { id: 1, text: 'Fromage' },
      { id: 2, text: 'Tout ce que les humains sont supposés manger' }
    ]
  }
})

var vm = new Vue({
  el: '#example',
  data: {
    message: 'Bonjour'
  },
  computed: {
    // un accesseur (getter) calculé
    reversedMessage: function () {
      // `this` pointe sur l'instance vm
      return this.message.split('').reverse().join('')
    }
  }
})

var example2 = new Vue({
  el: '#example-2',
  data: {
    parentMessage: 'Parent',
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  }
})

new Vue({
  el: '#v-for-object',
  data: {
    object: {
      title: 'How to do lists in Vue',
      author: 'Jane Doe',
      publishedAt: '2016-04-10'
    }
  }
})

var example1 = new Vue({
  el: '#example-1',
  data: {
    counter: 0
  }
})

var example3 = new Vue({
  el: '#example-3',
  data: {
    name: 'Vue.js'
  },
  // Définissez les méthodes de l'objet
  methods: {
    greet: function (event) {
      // `this` fait référence à l'instance de Vue à l'intérieur de `methods`
      alert('Bonjour ' + this.name + ' !')
      // `event` est l'évènement natif du DOM
      if (event) {
        alert(event.target.tagName)
      }
    }
  }
})

new Vue({
  el: '#example-4',
  methods: {
    say: function (message) {
      alert(message)
    }
  }
})

new Vue({
  el: '#example-textarea',
  data: {
    message: ''
  }
})

new Vue({
  el: '#example-box',
  data: {
    checked: false
  }
})

new Vue({
  el: '#example-boxes',
  data: {
    checkedNames: []
  }
})

new Vue({
  el: '#example-select',
  data: {
    selected: ''
  }
})

// Définition d'un nouveau composant appelé `button-counter`
Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">Vous m\'avez cliqué {{ count }} fois.</button>'
})

new Vue({ el: '#components-demo' })

Vue.component('blog-post', {
  props: ['title'],
  template: '<h3>{{ title }}</h3>'
})

new Vue({
  el: '#blog-post-demo',
  data: {
    posts: [
      { id: 1, title: 'Mon initiation avec Vue' },
      { id: 2, title: 'Blogger avec Vue' },
      { id: 3, title: 'Pourquoi Vue est tellement cool' }
    ]
  }
})
