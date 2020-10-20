<template>
  <div id="app">
<!--    <img src="./assets/logo.png">-->
    <router-view/>
    <loading></loading>
    <tips></tips>
  </div>
</template>

<script>
import loading from './components/Loading'
import tips from './components/Tips'
export default {
  name: 'App',
  components:{loading, tips}
}
</script>

<style>
body{
  background-color: #EEEEEE;
  margin:0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
