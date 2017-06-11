<template lang="html">
  <div class="container">
    <div class="columns">
      <div class="column is-one-third">
      </div>
      <div class="column center">
        <div class="ui negative message" v-if="msg.length > 0">
          <i class="close icon" @click="msgClear"></i>
          <div class="header">Login Failed</div>
          <p>{{msg}}</p>
        </div>
        <h1>Log-in to your account</h1>
        <div class="ui center aligned basic segment">
          <button class="ui facebook button"><i class="facebook icon"></i> Facebook </button>
          <button class="ui google plus button"><i class="google plus icon"></i> Google Plus </button>
          <div class="ui horizontal divider">Or</div>
          <b-field>
            <b-input placeholder="Email"
            type="text"
            icon="email"
            v-model="email">
            </b-input>
          </b-field>
          <b-field>
            <b-input type="password"
            icon="lock"
            placeholder="Password"
            v-model="password"
            password-reveal>
            </b-input>
          </b-field>
          <button class="button is-primary" @click="signin">Sign In</button>

        </div>
      </div>
      <div class="column">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      email : '',
      password : '',
      msg:''
    }
  },
  methods:{
    msgClear(){
      this.msg=''
    },
    signin(){
      axios.post('http://localhost:3000/api/users/signin',{
        email : this.email,
        password : this.password,
      })
      .then(response=>{
        this.email = ''
        this.password = ''
        if(response.data.hasOwnProperty('msg')){
          this.msg = response.data.msg
        }else{
          var token = response.data.token
          localStorage.setItem('token',token)
          window.location.href = 'http://localhost:8080/#/'
          location.reload()
        }
      })
      .catch(err=>{
        console.log(err);
      })
    }
  }
}
</script>

<style lang="css">
.columns{
  margin-top: 20px;
}
.column.center{
  border-width:1px;
  border-style:ridge;
  text-align: center;
}
.button.is-primary{
  width: 100%;
}

</style>
