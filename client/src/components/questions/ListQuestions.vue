<template lang="html">
  <tr>
    <td width="5%">
      <div class="buttons" v-if="content.userId._id == idUser.id">
        <button class="danger button" @click="confirmDelete()">
          <span class="icon">
            <i class="fa fa-trash"></i>
          </span>
        </button>
        <button class="warning button" @click="confirmEdit()">
          <span class="icon">
            <i class="fa fa-edit"></i>
          </span>
        </button>
      </div>
    </td>
    <td width="80%" style="padding-left:25px;">
      <div class="">
        <a @click="detailQuestion">{{content.title}}</a>
      </div>
      <div class="">
        <small>{{content.userId.name}}</small>
      </div>
      <div class="">
        <a href="#">
        <i class="fa fa-reply"></i>
      </a>
      </div>
    </td>
    <td width="15%" style="text-align:center;">
      <a class=""><i class="fa fa-thumbs-up"></i></a>
      <div class="">
        {{content.vote}}
      </div>
      <a class=""><i class="fa fa-thumbs-down"></i></a>
    </td>
  </tr>
</template>

<script>
export default {
  props:['content'],
  data(){
    return{
      idUser : JSON.parse(localStorage.getItem('isLogin'))
    }
  },
  methods:{
    detailQuestion: function(){
      this.$emit('detail-question')
    },
    confirmDelete: function(){
      this.$emit('confirm-delete')
    },
    confirmEdit : function(){
      this.$emit('confirm-edit')
    }
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

</style>
