<template lang="html">
  <div class="container">
    <div class="columns">
      <div class="column is-one-third">
      </div>
      <div class="column center">
        <div id="message" class="ui message justify" v-if="msg.length > 0">
          <i class="close icon" @click="msgClear"></i>
          <p>{{msg}}</p>
        </div>
        <h1>Create your Hacktiv8 Overflow account.</h1>
        <div class="ui center aligned basic segment">
          <button class="ui facebook button"><i class="facebook icon"></i> Facebook </button>
          <button class="ui google plus button"><i class="google plus icon"></i> Google Plus </button>
          <div class="ui horizontal divider">Or</div>

          <b-field>
            <b-input placeholder="Name"
            type="text"
            icon="person"
            v-model="name">
            </b-input>
          </b-field>
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
          <b-field>

          </b-field>
          <b-field>
            <b-input placeholder="Image Url"
                type="text"
                icon="image"
                v-model="image">
            </b-input>
            <p class="control">
                <button class="button is-primary" >...</button>
            </p>
          </b-field>
          <button class="button is-primary" @click="signup">Sign Up</button>

        </div>
      </div>
      <div class="column">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return{
      name:'',
      email:'',
      password:'',
      image:'',
      msg:''
    }
  },
  methods:{
    signup(){
      axios.post('http://localhost:3000/api/users/signup',{
        name : this.name,
        email : this.email,
        password : this.password,
        image: this.image
      })
      .then(response=>{
        this.email = ''
        this.password = ''
        this.name = ''
        this.image = ''
        if(response.data.hasOwnProperty('msg')){
          this.msg = response.data.msg
        }else if(response.data.hasOwnProperty('message')){
          this.msg = response.data.message
        }else{
          console.log(response.data.token);
        }
      })
      .catch(err=>{
        console.log(err);
      })
    },
    msgClear(){
      var self = this
      self.msg = ''
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
.justify{
  text-align: justify;
}
</style>
