<template lang="html">
  <div class="container">
    <div class="columns">
      <div class="column is-one-third">
        <b-message title="Notification" type="is-warning" has-icon v-if="msg.length > 0">
          {{msg}}
        </b-message>
      </div>
      <div class="column center">
        <h1>Log-in to your account</h1>
        <div class="ui center aligned basic segment">
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
    signin(){
      var self = this
      axios.post('http://localhost:3000/api/users/signin',{
        email : self.email,
        password : self.password,
      })
      .then(response=>{
        console.log(response.data);
        if(response.data.hasOwnProperty('msg')){
          self.msg = response.data.msg
        }else{
          var token = response.data.token
          localStorage.setItem('token',token)
          window.location.href = 'http://localhost:8080/#/'
          location.reload()
        }
        self.email = ''
        self.password = ''
        self.msg=''
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
