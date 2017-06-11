<template>
  <div class="container">
    <div class="columns">
      <div class="column is-one-quarter">
        <b-field>
          <b-input placeholder="Belum Digunakan..."
          icon="search">
        </b-input>
      </b-field>
    </div>
    <div class="column">
      <b-notification has-icon v-if="msg.length > 0">
        {{msg}}
      </b-notification>
      <!--  Start Show Question  -->
      <div v-if="showQuestion == true">
        <div class="" style="display:flex; justify-content: flex-end; margin-bottom:2em;">
          <button class="button is-primary" v-on:click="ask" >Ask Questions</button>
        </div>
        <table class="table is-narrow minus">
          <tbody>
            <list-questions
            v-for="question in list_questions"
            :content="question"
            :key="question._id"
            @detail-question="detailQuestion(question._id)"
            @confirm-delete="confirmDeleteQuestion(question._id)"
            @confirm-edit="confirmEditQuestion(question._id)"
            @vote-up-question="voteUpQuestion(question)"
            @vote-down-question="voteDownQuestion(question)">
          </list-questions>
        </tbody>
      </table>
    </div>
    <!--  End Show Question  -->

    <!--  Start Show Detail Question  -->
    <div v-if="showAnswer==true">
      <div class="" style="display:flex; justify-content:space-between;">
        <a v-on:click="question"><i class="fa fa-arrow-left" aria-hidden="true"></i></a>
        <button class="button is-primary" v-on:click="ask">Ask Questions</button>
      </div>
      <table class="table is-narrow minus answer mid">
        <tr style="padding-bottom:5em; font-size:20px;">
          <td colspan="3" class="justify">
            <strong>{{detail_question.title}}</strong>
          </td>
        </tr>
        <tr>
          <td colspan="3" class="justify">
            <div class="" v-html="detail_question.question">
            </div>
            <div class="" style="margin-top:2em;">
              <small>Posted By : {{detail_question.userId.name}}</small>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="3" class="justify">
          </td>
        </tr>
      </table>
      <!--  End Show Detail Question  -->
      <!--  Start Show Answers  -->
      <table class="table is-narrow minus answer mid" v-if="list_answers.length>0">
        <tbody>
          <list-answer
          v-for="answer in detail_answers"
          :content="answer"
          :key="answer._id"
          @confirm-delete-answer=""
          @confirm-edit-answer=""
          @confirm-upvote-answer="voteUpAnswer(answer)"
          @confirm-downvote-answer="voteDownAnswer(answer)">
        </list-answer>
      </tbody>
    </table>
    <!--  End Show Answers  -->

    <!--  Start Show Answer to Question  -->
    <div class="minus answer mid container">
      <div class="">
        <strong>Your Answer</strong>
      </div>
      <div class="field">
        <p class="control">
          <vue-editor  v-model="replyAnswer"></vue-editor>
        </p>
      </div>
      <div class="">
        <button class="button is-primary is-outlined" @click="answerTheQuestion(idQuestionForAnswer)">
          Post Your Answer
        </button>
        <br>
      </div>
    </div>
  </div>
  <!--  End Show Answer to Question  -->

  <!--  Start Show Post your Question  -->
  <div v-if="showAsk==true">
    <a v-on:click="question">
      <i class="fa fa-arrow-left" aria-hidden="true"></i>
    </a>
    <br>
    <div class="askQuestion">
      <div class="field">
        <label class="label">Title</label>
        <p class="control">
          <input class="input" type="text" v-model="titleQuestion">
        </p>
      </div>
      <div class="field">
        <label class="label">Question</label>
        <p class="control">
          <vue-editor v-model="addQuestion"></vue-editor>
        </p>
      </div>
      <div class="field">
        <p class="control">
          <button class="button is-primary" @click="askQuestion">Post Your Question</button>
        </p>
      </div>
    </div>
  </div>
  <!--  End Show Post your Question  -->
  <!--  Start Show Post your Edit Question  -->
  <div v-if="showEditQuestion==true">
    <a v-on:click="question">
      <i class="fa fa-arrow-left" aria-hidden="true"></i>
    </a>
    <br>
    <div class="askQuestion">
      <div class="field">
        <label class="label">Title</label>
        <p class="control">
          <input class="input" type="text" v-model="editTitleQuestion">
        </p>
      </div>
      <div class="field">
        <label class="label">Question</label>
        <p class="control">
          <vue-editor v-model="editQuestion"></vue-editor>
        </p>
      </div>
      <div class="field">
        <p class="control">
          <button class="button is-primary" @click="updateQuestion(editForIdQuestion)">Update Your Question</button>
        </p>
      </div>
    </div>
  </div>
  <!--  End Show Post your Edit Question  -->
</div>
</div>
</div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import ListQuestions from './questions/ListQuestions'
import ListAnswer from './answers/ListAnswer'
export default {
  components :{
    ListQuestions,
    ListAnswer,
    VueEditor
  },
  data(){
    return {
      idQuestionForAnswer:null,
      detail_answers : [],
      detail_question:{
        _id : null,
        title:null,
        question:null,
        userId:{
          _id:null,
          name:null,
          email:null,
          password:null,
          image:null
        },
        voteUp:[],
        voteDown:[]
      },
      list_questions: [{
        _id : null,
        title:null,
        question:null,
        userId:{
          _id:null,
          name:null,
          email:null,
          password:null,
          image:null
        },
        voteUp:[],
        voteDown:[]
      }],
      list_answers:[],
      showAsk:false,
      showQuestion:true,
      showAnswer:false,
      showEditQuestion:false,
      replyAnswer : '',
      addQuestion:'',
      titleQuestion:'',
      editForIdQuestion : '',
      editTitleQuestion : '',
      editQuestion : '',
      msg : ''
    }
  },
  methods:{
    voteUpQuestion(quest){
      var self = this
      var userId =JSON.parse(localStorage.getItem('isLogin'))
      if(userId.id==quest.userId._id){
        this.msg = "You Can't vote your questions";
      }else{
        var arrVoteUp = []
        var listVoteDown = []
        for(let i=0;i<=self.list_questions.length-1;i++){
          if(quest._id == self.list_questions[i]._id){
            for(let j = 0; j<= self.list_questions[i].voteUp.length-1; j++){
              if(self.list_questions[i].voteUp[j]==userId.id){
                return alert("")
              }
            }
            if(self.list_questions[i].voteUp.length>0){
              arrVoteUp.push(self.list_questions[i].voteUp)
            }

            for(let j =0;j<=self.list_questions[i].voteDown.length-1;j++){
              if(self.list_questions[i].voteDown[j]==userId.id){
                self.list_questions[i].voteDown.splice(j,1)
                listVoteDown = self.list_questions[i].voteDown
              }
            }
          }
        }
        arrVoteUp.push(userId.id)
        axios.patch('http://localhost:3000/api/questions/voteDown/'+quest._id,{
          voteDown : listVoteDown,
          voteUp : arrVoteUp,
          vote : arrVoteUp.length - listVoteDown.length
        },{
          headers : {
            token : localStorage.getItem('token')
          }
        })
        .then(response=>{
          self.list_questions = response.data.result
          for(let i=0;i<=self.list_questions.length-1;i++){
            if(self.list_questions[i]._id == quest._id){
              for(let j=0;j<=self.detail_questions.length-1;j++){
                if(self.detail_questions[j]._id == self.list_questions[i]._id){
                  self.detail_questions.splice(j,1,self.list_questions[i])
                }
              }
            }
          }
        })
        .catch(err=>{
          console.log(err);
        })
      }
    },
    voteDownQuestion(quest){
      var self = this
      var userId =JSON.parse(localStorage.getItem('isLogin'))
      if(userId.id==quest.userId._id){
        this.msg = "You Can't vote your questions";
      }else{
        var arrVoteDown = []
        var listVoteUp = []
        for(let i=0;i<=self.list_questions.length-1;i++){
          if(quest._id == self.list_questions[i]._id){
            for(let j = 0; j<= self.list_questions[i].voteDown.length-1; j++){
              if(self.list_questions[i].voteDown[j]==userId.id){
                return {
                  msg : "Udah Vote"
                }
              }
            }
            if(self.list_questions[i].voteDown.length>0){
              arrVoteDown.push(self.list_questions[i].voteDown)
            }

            for(let j =0;j<=self.list_questions[i].voteUp.length-1;j++){
              if(self.list_questions[i].voteUp[j]==userId.id){
                self.list_questions[i].voteUp.splice(j,1)
                listVoteUp = self.list_questions[i].voteUp
              }
            }
          }
        }
        arrVoteDown.push(userId.id)
        axios.patch('http://localhost:3000/api/questions/voteDown/'+quest._id,{
          voteDown : arrVoteDown,
          voteUp : listVoteUp,
          vote : listVoteUp.length - arrVoteDown.length
        },{
          headers : {
            token : localStorage.getItem('token')
          }
        })
        .then(response=>{
          self.list_questions = response.data.result
          for(var i=0;i<=self.list_questions.length-1;i++){
            if(self.list_questions[i]._id == quest._id){
              for(var j=0;j<=self.detail_questions.length-1;j++){
                if(self.detail_questions[j]._id == self.list_questions[i]._id){
                  self.detail_questions.splice(j,1,self.list_questions[i])
                }
              }
            }
          }
        })
        .catch(err=>{
          console.log(err);
        })
      }
    },
    voteUpAnswer(ans){
      var self = this
      var userId =JSON.parse(localStorage.getItem('isLogin'))
      if(userId.id==ans.userId._id){
        this.msg = "You Can't vote your answer";
      }else{
        var arrVoteUp = []
        var listVoteDown = []
        for(let i=0;i<=self.list_answers.length-1;i++){
          if(ans._id == self.list_answers[i]._id){
            for(let j = 0; j<= self.list_answers[i].voteUp.length-1; j++){
              if(self.list_answers[i].voteUp[j]==userId.id){
                return {
                  msg : "Udah Vote"
                }
              }
            }
            if(self.list_answers[i].voteUp.length>0){
              arrVoteUp.push(self.list_answers[i].voteUp)
            }

            for(let j =0;j<=self.list_answers[i].voteDown.length-1;j++){
              if(self.list_answers[i].voteDown[j]==userId.id){
                self.list_answers[i].voteDown.splice(j,1)
                listVoteDown = self.list_answers[i].voteDown
              }
            }
          }
        }
        arrVoteUp.push(userId.id)
        axios.patch('http://localhost:3000/api/answers/voteDown/'+ans._id,{
          voteDown : listVoteDown,
          voteUp : arrVoteUp,
          vote : arrVoteUp.length - listVoteDown.length
        },{
          headers : {
            token : localStorage.getItem('token')
          }
        })
        .then(response=>{
          self.list_answers = response.data.result
          for(let i=0;i<=self.list_answers.length-1;i++){
            if(self.list_answers[i]._id == ans._id){
              for(let j=0;j<=self.detail_answers.length-1;j++){
                if(self.detail_answers[j]._id == self.list_answers[i]._id){
                  self.detail_answers.splice(j,1,self.list_answers[i])
                }
              }
            }
          }
        })
        .catch(err=>{
          console.log(err);
        })
      }
    },
    voteDownAnswer(ans){
      var self = this
      var userId =JSON.parse(localStorage.getItem('isLogin'))
      if(userId.id==ans.userId._id){
        this.msg = "You Can't vote your answer";
      }else{
        var arrVoteDown = []
        var listVoteUp = []
        for(let i=0;i<=self.list_answers.length-1;i++){
          if(ans._id == self.list_answers[i]._id){
            for(let j = 0; j<= self.list_answers[i].voteDown.length-1; j++){
              if(self.list_answers[i].voteDown[j]==userId.id){
                return {
                  msg : "Udah Vote"
                }
              }
            }
            if(self.list_answers[i].voteDown.length>0){
              arrVoteUp.push(self.list_answers[i].voteDown)
            }

            for(let j =0;j<=self.list_answers[i].voteUp.length-1;j++){
              if(self.list_answers[i].voteUp[j]==userId.id){
                self.list_answers[i].voteUp.splice(j,1)
                listVoteUp = self.list_answers[i].voteUp
              }
            }
          }
        }
        arrVoteDown.push(userId.id)
        axios.patch('http://localhost:3000/api/answers/voteDown/'+ans._id,{
          voteDown : arrVoteDown,
          voteUp : listVoteUp,
          vote : listVoteUp.length - arrVoteDown.length
        },{
          headers : {
            token : localStorage.getItem('token')
          }
        })
        .then(response=>{
          self.list_answers = response.data.result
          for(var i=0;i<=self.list_answers.length-1;i++){
            if(self.list_answers[i]._id == ans._id){
              for(var j=0;j<=self.detail_answers.length-1;j++){
                if(self.detail_answers[j]._id == self.list_answers[i]._id){
                  self.detail_answers.splice(j,1,self.list_answers[i])
                }
              }
            }
          }
        })
        .catch(err=>{
          console.log(err);
        })
      }
    },
    updateQuestion(id){
      var self = this
      axios.put(`http://localhost:3000/api/questions/${id}`,{
        title : self.editTitleQuestion,
        question : self.editQuestion
      },{
        headers : {
          token : localStorage.getItem('token')
        }
      })
      .then(response=>{
        var result = response.data.result
        for(var j=0;j<self.list_questions.length;j++){
          if(id == self.list_questions[j]._id){
            var data = {
              _id : result._id,
              title:self.editTitleQuestion,
              question:self.editQuestion,
              userId:{
                _id:result.userId._id,
                name:result.userId.name,
                email:result.userId.email,
                password:result.userId.password,
                image:result.userId.image
              },
              vote : result.vote,
              voteUp:result.voteUp,
              voteDown:result.voteDown
            }
            self.list_questions.splice(j,1,data)
          }
        }
        self.editTitleQuestion=''
        self.editQuestion=''
        self.editForIdQuestion =''
      })
      .catch(err=>{
        console.log(err);
      })
    },
    confirmEditQuestion(id){
      this.list_questions.findIndex(question=>{
        if(question._id == id){
          this.editTitleQuestion = question.title
          this.editQuestion = question.question
          this.editForIdQuestion = question._id
        }
      })
      this.showAsk=false
      this.showQuestion=false
      this.showAnswer=false
      this.showEditQuestion = true
    },
    confirmDeleteQuestion(qId) {
      var self = this
      this.$dialog.confirm({
        title: 'Deleting Question',
        message: 'Are you sure you want to <strong>delete</strong> your question? This action cannot be undone.',
        confirmText: 'Delete Question',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          axios.delete('http://localhost:3000/api/answers/question/'+qId,{
            headers : {
              token : localStorage.getItem('token')
            }
          })
          .then(result=>{
            var arrAnswerByQuestionId =[]
            this.list_answers.map(list_answers=>{
              if(list_answers.questionId._id == qId){
                arrAnswerByQuestionId.push(list_answers)
              }
            })
            for(var i=0;i<arrAnswerByQuestionId.length;i++){
              for(var j=0;j<self.list_answers.length;j++){
                if(arrAnswerByQuestionId[i]._id == self.list_answers[j]._id){
                  self.list_answers.splice(j,1)
                }
              }
            }
            axios.delete('http://localhost:3000/api/questions/'+qId,{
              headers : {
                token : localStorage.getItem('token')
              }
            })
            .then(response=>{
              for(var j=0;j<self.list_questions.length;j++){
                if(qId == self.list_questions[j]._id){
                  self.list_questions.splice(j,1)
                }
              }
              this.$toast.open('Question deleted!')
            })
            .catch(err=>{
              console.log(err);
            })
          })
          .catch(err=>{
            console.log(err);
          })
        }
      })
    },
    ask(){
      if(localStorage.getItem('token')==null){
        alert("not login")
        console.log("Not Login");
      }else{
        this.showAsk=true
        this.showQuestion=false
        this.showAnswer=false
        this.showEditQuestion = false
      }
    },
    question(){
      this.showAsk=false
      this.showQuestion=true
      this.showAnswer=false
      this.showEditQuestion = false
    },
    detailQuestion(id){
      var arrQuestion = []
      var arrAnswer = []
      this.list_questions.map(list_questions=>{arrQuestion.push(list_questions._id)})
      function checkIdQuestion(qId) {
        return qId == id;
      }
      this.list_answers.map(list_answers=>{
        if(list_answers.questionId._id == id){
          arrAnswer.push(list_answers)
        }
      })
      this.detail_answers = arrAnswer
      var indexQuestion = arrQuestion.findIndex(checkIdQuestion)
      this.detail_question = this.list_questions[indexQuestion]
      this.idQuestionForAnswer = id
      this.showAnswer = true
      this.showQuestion = false
      this.showAsk = false
      this.showEditQuestion = false
    },
    askQuestion(){
      var self = this
      axios.post(`http://localhost:3000/api/questions/`,{
        title : self.titleQuestion,
        question : self.addQuestion
      },{
        headers : {
          token : localStorage.getItem('token')
        }
      })
      .then(response=>{
        self.list_questions.push(response.data.result)
        self.replyAnswer = ''
        self.addQuestion='',
        self.titleQuestion=''
      })
      .catch(err=>{
        console.log(err);
      })
    },
    answerTheQuestion(qId){
      var self = this
      axios.post(`http://localhost:3000/api/answers/`,{
        answer : self.replyAnswer,
        questionId : qId
      },{
        headers : {
          token : localStorage.getItem('token')
        }
      })
      .then(response=>{
        self.list_answers.push(response.data.result)
        self.replyAnswer = ''
        self.addQuestion='',
        self.titleQuestion=''
      })
      .catch(err=>{
        console.log(err);
      })
    }
  },
  created(){
    var self = this
    axios.get('http://localhost:3000/api/questions')
    .then(response=>{
      self.list_questions = response.data
      axios.get('http://localhost:3000/api/answers')
      .then(response=>{
        self.list_answers = response.data
      })
      .catch(err=>{
        console.log(err);
      })
    })
    .catch(err=>{
      console.log(err);
    })
  }
}
</script>

<style scoped>
.columns{
  margin-top: 20px;
}
.is-one-quarter{
  border-width:1px;
  border-style:ridge;
  margin-right: 5px;
}
.column{
  border-width:1px;
  border-style:ridge;
}
.minus{
  margin-top: 15px;
}
.answer{
  margin-left: 5%;
}
.mid{
  width:95%;
}
.justify{
  text-align: justify;
}
.askQuestion{
  width: 90%;
}
</style>
