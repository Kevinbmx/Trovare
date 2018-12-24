<template>
    <div v-bind:class="{'open':openSuggestion}">
      
        <input class="form__input" type="text" :value="value" @input="updateValue($event.target.value)"
          @keydown.enter = 'enter'
          @keydown.down = 'down'
          @keydown.up = 'up'
          @keydown.esc= 'esc'
        >
        <input type="hidden" :id="id" ref="id">
        <ul class="dropdown-menu" v-bind:class="{'on_off':open}"  style="width:100%">
            <li v-for="(suggestion, index) in matches"
                v-bind:class="{'active': isActive(index)}"
                @click="suggestionClick(index)">
              <a href="#">{{ suggestion.value }} 
              </a>
            </li>
        </ul>
     <!-- {{$data}} -->
    </div>
</template>

<script>
export default {
props: ['nameVuexState','id','value'],
  // props: {

  //   id:{
  //     type: String,
  //     // required: true
  //   },
  //   value: {
  //     type: String,
  //     required: true
  //   },

  //   nameVuexState: {
  //     type: Array,
  //     required: true
  //   }

  // },

  data () {
    return {
      // id:'',
      // value:'',
      clickOutside: 0,
    clickInside: 0,
      open: false,
      current: 0
    }
  },

  computed: {
    // Filtering the suggestion based on the input
    matches() {
      return this.nameVuexState.filter((obj) => {
                // console.log('nameVuexState',obj)
        // return obj.value.match(this.value)
        return obj.value.indexOf(this.value) >= 0
        // return obj.city.indexOf(this.value) >= 0
      })
    },

    openSuggestion () {
      return this.selection !== '' &&
             this.matches.length !== 0 &&
             this.open === true
    },
    
  },
  methods: {
    outside: function(e) {
      this.open = false
    	this.clickOutside += 1
        console.log('clicked outside!')
      },
      inside: function(e) {
      this.clickInside += 1
        console.log('clicked inside!')
      },

    updateValue (value) {
      if (this.open === false) {
        this.open = true
        this.current = 0
      }
      this.$emit('input', value)
    },

    // When enter pressed on the input
    enter () {
      this.$emit('input', this.matches[this.current].city)
      this.open = false
    },

    // When up pressed while suggestions are open
    up () {
      if (this.current > 0) {
        this.current--
      }
    },

    // When up pressed while suggestions are open
    down () {
      if (this.current < this.matches.length - 1) {
        this.current++
      }
    },
    esc(){
      this.open = false;
    },
    // For highlighting element
    isActive (index) {
      return index === this.current
    },

    // When one of the suggestion is clicked
    suggestionClick (index) {
      console.log('index',this.matches[index].value)
      // this.value = this.matches[index].value
      // this.id = this.matches[index].id
      this.$emit('input', this.matches[index].value)
      this.$emit('id', this.matches[index].id)
      this.open = false
    },
       hide: function () { 
    	console.log('hide')
    	this.open = false
    },
   

  },
  // directives: {
  //   'click-outside': {
  //     bind: function(el, binding, vNode) {
  //       // Provided expression must evaluate to a function.
  //       if (typeof binding.value !== 'function') {
  //       	const compName = vNode.context.name
  //         let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`
  //         if (compName) { warn += `Found in component '${compName}'` }
          
  //         console.warn(warn)
  //       }
  //       // Define Handler and cache it on the element
  //       const bubble = binding.modifiers.bubble
  //       const handler = (e) => {
  //         if (bubble || (!el.contains(e.target) && el !== e.target)) {
  //         	binding.value(e)
  //         }
  //       }
  //       el.__vueClickOutside__ = handler

  //       // add Event Listeners
  //       document.addEventListener('click', handler)
	// 		},
      
  //     unbind: function(el, binding) {
  //       // Remove Event Listeners
  //       document.removeEventListener('click', el.__vueClickOutside__)
  //       el.__vueClickOutside__ = null

  //     }
  // }
  // },
 

}
</script>
<style>
.on_off{
  display: block;
}
</style>

