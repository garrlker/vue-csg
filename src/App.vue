<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <part>
      <cube :size="5" :center="true">
        <cube :size="50" />
      </cube>
    </part>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Cube from './components/Primitives/Cube.vue'
import Part from './components/Part.vue'

export default {
  name: 'app',
  provide () {
    return {
      parentReady: new Promise(resolve => resolve())
    }
  },
  components: {
    HelloWorld,
    Cube,
    Part
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
