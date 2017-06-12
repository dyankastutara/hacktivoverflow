<template lang="html">
  <tr>
    <td width="5%">
      <div class="buttons" v-if="content.userId._id == idUser.id">
        <button class="danger button" @click="confirmDeleteAnswer">
          <span class="icon">
            <i class="fa fa-trash"></i>
          </span>
        </button>
        <button class="warning button" @click="confirmEditAnswer">
          <span class="icon">
            <i class="fa fa-edit"></i>
          </span>
        </button>
      </div>
    </td>
    <td width="75%" style="padding-left:25px;">
      <div class="justify"  v-html="content.answer">
      </div>
      <div class="justify">
        <small>{{content.userId.name}}</small>
      </div>
      </div>
    </td>
    <td width="10%" style="text-align:center;">
      <a class="" @click="confirmUpVoteAnswer"><i class="fa fa-thumbs-up"></i></a>
      <div class="">
        {{content.vote}}
      </div>
      <a class="" @click="confirmDownVoteAnswer"><i class="fa fa-thumbs-down"></i></a>
    </td>
  </tr>
</template>

<script>
export default {
  data(){
    return{
      idUser : {
        id:null,
        name:null,
        email:null,
        img:null,
        iat:null
      }
    }
  },
  props:['content'],
  methods:{
    confirmDeleteAnswer: function(){
      this.$emit('confirm-delete-answer')
    },
    confirmEditAnswer : function(){
      this.$emit('confirm-edit-answer')
    },
    confirmUpVoteAnswer: function(){
      this.$emit('confirm-upvote-answer')
    },
    confirmDownVoteAnswer : function(){
      this.$emit('confirm-downvote-answer')
    }
  },
  mounted(){
    this.idUser = JSON.parse(localStorage.getItem('isLogin'))
  }
}
</script>

<style lang="css">
.button{
  border-radius: 0em;
}
.danger:hover{
  border-color: red;
  color:red;
}
.warning:hover{
  border-color: orange;
  color: orange;
}
.justify{
  text-align: justify;
}
</style>
