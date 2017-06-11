<template>
  <div id="app">
    <navbar :login="decodedToken" :key="decodedToken._id"></navbar>
    <div  class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
export default {
  name: 'app',
  data(){
    return{
      decodedToken :[]
    }
  },
  components : {
    Navbar
  },
  created(){
    var self = this

    axios.get('http://localhost:3000/api/users/validate',{
      headers:{
        token : localStorage.getItem('token')
      }
    })
    .then(response=>{
      self.decodedToken = response.data
      localStorage.setItem('isLogin', JSON.stringify(response.data))
    })
    .catch(err=>{
      console.log(err);
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
#container{
  margin-top: 20px;
}

</style>
