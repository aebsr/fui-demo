Vue.config.ignoredElements = [/^tmf-/];

var app = new Vue({
    el: '#app',
    data: {
        counter: 0
    },
    template: `<div>
        <h1>Vue Component</h1>
        <p>This is vue, but reuses native web components.</p>
        <tmf-button kind="tertiary" label="What's this?" onclick="alert('a web component rendered in vue!')" />
        <tmf-button kind="neutral" :label=counterLabel v-on:click="increment" />
        <tmf-button kind="success" label="Oh Snap!" onclick="alert('you clicked a vue button')" small />
    </div>`,
    methods: {
        increment() { 
            this.counter++
        }
    },
    computed: {
        counterLabel() {
            return `Clicked ${this.counter} times`
        }
    }
})