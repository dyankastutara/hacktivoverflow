<template lang="html">
  <div class="container">
    <div class="columns">
      <div class="column is-one-third">
        <b-message title="Notification" type="is-success" has-icon v-if="msgSuccess.length > 0">
          {{msgSuccess}}
        </b-message>
        <b-message title="Notification" type="is-warning" has-icon v-if="msg.length > 0">
          {{msg}}
        </b-message>
        <b-message title="Notification" type="is-danger" has-icon v-if="msgErrors.length > 0">
          {{msgErrors}}
        </b-message>
      </div>
      <div class="column center">
        <h1>Create your Hacktiv8 Overflow account.</h1>
        <div class="ui center aligned basic segment">
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
          <!-- <b-field>
            <b-input placeholder="Image Url"
                type="text"
                icon="image"
                v-model="image">
            </b-input>
            <p class="control">
                <button class="button is-primary" >...</button>
            </p>
          </b-field> -->
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
      msg:'',
      msgSuccess:'',
      msgErrors:''
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
        if(response.data.hasOwnProperty('msg')){
          this.msg = response.data.msg
        }else if(response.data.hasOwnProperty('msgSuccess')){
          this.msgSuccess = response.data.msgSuccess
        }else{
          this.msgErrors = response.data.errors.email.message
        }
        this.email = ''
        this.password = ''
        this.name = ''
        this.image = ''
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
.justify{
  text-align: justify;
}
</style>
