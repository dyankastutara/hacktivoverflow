<template lang="html">
  <nav class="nav has-shadow">
  <div class="container">
    <div class="nav-left">
      <div class="nav-item">
        <h3>Hacktiv8 Overflow</h3>
      </div>
        <router-link to="/"><a class="nav-item is-tab" id="routing" v-on:click="active(0)">Questions</a></router-link>
        <!-- <router-link to="/user"><a class="nav-item is-tab" id="routing" v-on:click="active(1)">Users</a></router-link> -->
    </div>
    <div class="nav-center">
      <div class="nav-item">
      </div>
    </div>
    <div class="nav-right nav-menu" v-if="login.id">
      <a class="nav-item is-tab" id="routing">Welcome, {{login.name}}</a>
      <a class="nav-item is-tab" id="routing" v-on:click="signout()">Sign Out</a>
    </div>
    <div class="nav-right nav-menu" v-else>
      <router-link to="/signin"><a class="nav-item is-tab" id="routing" v-on:click="active(2)">Sign In</a></router-link>
      <router-link to="/signup"><a class="nav-item is-tab" id="routing" v-on:click="active(3)">Sign Up</a></router-link>
    </div>
  </div>
</nav>
</template>

<script>

export default {
  props : ['login'],
  data(){
    return{
      msg : 'Test'
    }
  },
  methods: {
    signout(){
      localStorage.clear()
      location.reload()
    },
    active(n){
      var element = document.querySelectorAll("#routing")
      for(var i=0;i<element.length;i++){
        element[i].className="nav-item is-tab"
      }
      document.querySelectorAll("#routing")[n].className += " is-active";
    }
  }
}
</script>

<style lang="css" scope>
 h3 {
  font-weight: bold;
}
</style>
