<template>
	<div class="inviteMsg">
		<div class="personMsg">
			<dl>
				<dt>{{user.userName}}</dt>
				<dd>
					<p>
						<span>{{user.deptName}}</span>
					</p>
					<p>
						<span>邀请您加入公司企业微信</span>&nbsp;&nbsp;
						<span>有效时间2小时</span>
           </p>
				</dd>
			</dl>
      <div>
			  <img :src="user.userPhoto || img" alt="">
      </div>
		</div>
		<section>
			<div class="input-group">
				<label>姓名</label>
				<input type="text" placeholder="请输入真实姓名" required v-model="userName">
			</div>
			<div class="input-group">
				<label :class="{ 'err' : isTelErr }">手机号码</label>
				<input type="text" id="" placeholder="有效可用的联系电话" required  v-model="phoneNum"  @blur="MpRegex()" :class="{ 'err' : isTelErr }">

			</div>
			<div class="input-group">
				<label  :class="{ 'err' : isEmailErr }">邮箱</label>
				<input type="text" placeholder="请输入有效的邮箱地址" required v-model="email"  @blur="emailRegex()" :class="{ 'err' : isEmailErr }">
			</div>
			<div class="input-group">
				<label  :class="{ 'err' : isIDErr }">身份证号</label>
				<input type="text" placeholder="真实身份证号码" required v-model="cardId" @blur="IDRegex()" :class="{ 'err' : isIDErr }">
			</div>
			<div class="input-group">
				<label>公司名称</label>
				<input type="text" placeholder="请输入公司全称" v-model="company" required>
			</div>
			<div class="input-group">
				<label>部门名称</label>
				<input type="text" placeholder="所属部门全称" v-model="depart" required>
			</div>
			<div class="input-group">
				<label>职位名称</label>
				<input type="text" placeholder="所属职位" v-model="jobTitle" required>
			</div>
			<button @click="saveMsg()">确定</button>
		</section>
    <div class="hint" v-if="isHint">
      <p>{{isHintTxt}}</p >
    </div>
  </div>
</template>
<script>
import img from "../../assets/images/defPic.png";
import {wxjssdk} from '../../wxJsSdk/index.js'
export default {
  name: "inviteMessage",
  data() {
    return {
      img,
      user: {},
      hintText: "",
      isTelErr: false,
      isEmailErr: false,
      isIDErr: false,
      corpId: "",
      userId: "",
      userName: "",
      phoneNum: "",
      email: "",
      cardId: "",
      company: "",
      depart: "",
      jobTitle: "",
      isHint: false,//打开提示
      isHintTxt:'',//提示信息
      offSet:true //禁止多次点击提交
    };
  },
  components: {},
  methods: {
    getUrlParam() {
      var name, value;
      var str = location.href; //取得整个地址栏
      var path = str;
      var num = str.indexOf("?");
      if (num > 0) {
        this.path = str.substr(0, num);
      }
      str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]
      var arr = str.split("&"); //各个参数放到数组里
      let json = {};
      for (var i = 0; i < arr.length; i++) {
        num = arr[i].indexOf("=");
        if (num > 0) {
          name = arr[i].substring(0, num);
          value = arr[i].substr(num + 1);
          json[name] = value;
        }
      }
      if (arr.length == 1) {
        return;
      }
      this.corpId = json.corpId;
      this.userId = json.userId;
      this.getInviteCode(json.corpId, json.userId);
    },
    getInviteCode(corpId, userId) {
      let data = {
        corpId,
        userId
      };
      this.$api.get("app/inviteMembers/getInviteCode", data, r => {
        this.user = r.data.data;
      });
    },
    //手机号码验证
    MpRegex() {
      let reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
      if (this.phoneNum) {
        if (!reg.test(this.phoneNum)) {
          this.isTelErr = true;
        } else {
          this.isTelErr = false;
        }
      }
    },
    //邮箱验证
    emailRegex() {
      let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (this.email) {
        if (!reg.test(this.email)) {
          this.isEmailErr = true;
        } else {
          this.isEmailErr = false;
        }
      }
    },
    //身份证号码验证
    IDRegex() {
      let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (this.cardId) {
        if (!reg.test(this.cardId)) {
          this.isIDErr = true;
        } else {
          this.isIDErr = false;
        }
      }
    },
    changeIsHint(txt){
      this.isHint = true
      this.isHintTxt = txt
      setTimeout(()=>{
        this.isHint = false
      },1000)
    },
    saveMsg() {
        if(!this.offSet){
          return
        }
        if(this.isTelErr == true){
            this.changeIsHint('请填写正确的手机号！')
            return
        }
        if(this.isIDErr == true){
            this.changeIsHint('请填写正确的身份证号！')
            return
        }
        if(this.isEmailErr == true){
            this.changeIsHint('请填写正确的邮箱！')
            return
        }
        if(this.userName == ""){
            this.changeIsHint('请填写您的姓名！')
            return
        }
        if(this.phoneNum == ""){
            this.changeIsHint('请填写您的手机号！')
            return
        }
        if(this.cardId == ""){
            this.changeIsHint('请填写您的身份证号！')
            return
        }
        if(this.email == ""){
            this.changeIsHint('请填写您的邮箱！')
            return
        }

        if(this.company == ""){
            this.changeIsHint('请填写公司名称！')
            return
        }
        if(this.depart == ""){
            this.changeIsHint('请填写部门名称！')
            return
        }
        if(this.jobTitle == ""){
            this.changeIsHint('请填写职位名称！')
            return
        }

        //提交信息
        let data = {
          corpId: this.corpId,
          userId: this.userId,
          name: this.userName,
          cardId: this.cardId,
          mobile: this.phoneNum,
          companyName: this.company,
          department: this.depart,
          position: this.jobTitle,
          email: this.email
        };
        this.offSet = false
        this.$api.post("/app/inviteMembers/save", data, r => {
          var drag = document.getElementsByClassName('err_drag')
          var con = document.getElementsByClassName('err_con')
          drag["0"].style.display = 'block'
          con["0"].innerHTML= '已提交审核'

          this.offSet = true

          this.userName = "";
          this.cardId = "";
          this.phoneNum = "";
          this.company = "";
          this.depart = "";
          this.jobTitle = "";
          this.email = "";
        },r=>{
             this.offSet = true
        });
    }
  },
  mounted() {
    this.getUrlParam();
    wxjssdk(location.href.split('#')[0],false,'')
  }
};
</script>

<style lang="scss" scoped>
.inviteMsg {
  height: 100%;
  overflow: auto;
  .personMsg {
    width: 3.45rem;
    height: 1.2rem;
    margin: 0.2rem auto;
    border-radius: 5px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    dl {
      dt {
        line-height: 0.3rem;
        font-size: 0.15rem;
      }
      dd {
        p:first-of-type {
          line-height: 0.23rem;
          font-size: 0.13rem;
          color: #888888;
        }
        p:last-of-type {
          line-height: 0.23rem;
          font-size: 0.12rem;
          color: #cccccc;
        }
      }
    }
    img {
      width: 0.7rem;
      height: 0.7rem;
      margin-left: 0.2rem;
      border-radius: 50%;
    }
  }
  section {
    .input-group {
      width: 100%;
      height: auto;
      padding: 0.1rem 0;
      background-color: white;
      margin-bottom: 1px;
      display: flex;
      label {
        display: block;
        width: 0.85rem;
        height: 0.3rem;
        line-height: 0.3rem;
        padding-left: 0.15rem;
        margin-right: 0.15rem;
        font-size: 0.15rem;
        color: #888888;
      }
      .err {
        // font-size: 0.1rem;
        color: #c90606;
      }
      input {
        width: 65%;
        height: 0.3rem;
        padding-left: 5px;
        border: 0;
        outline: none;
        font-size: 0.13rem;
      }
      input::-ms-input-placeholder,
      input::-webkit-input-placeholder,
      input::-moz-input-placeholder {
        color: #cccccc !important;
      }
    }
    .input-group:nth-of-type(4) {
      margin-bottom: 0.15rem;
    }
    button {
      display: block;
      width: 2.25rem;
      height: 0.5rem;
      margin: 0.3rem auto;
      border: 0;
      border-radius: 0.25rem;
      box-shadow: 0 7px 0 #004db7;
      background: linear-gradient(top, #00e0ff, #0062ff);
      font-size: 0.16rem;
      color: white;
    }
  }
  .shade {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    .hint {
      width: 2rem;
      height: 1rem;
      margin: 2.5rem auto;
      text-align: center;
      border-radius: 5px;
      box-shadow: 0 0 10px #333333;
      background-color: white;
      p {
        line-height: 0.6rem;
        font-size: 15px;
        color: #333333;
      }
      button {
        padding: 0.05rem 0.2rem;
        border-radius: 10px;
        border: 0;
        background-color: #c90606;
        color: white;
        font-size: 15px;
      }
    }
  }
}
.hint {
  position: fixed;
  bottom: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.6);
  width: 1.45rem;
  text-align: center;
  border-radius: 5px;
  box-shadow: 0 5px 15px #bdbdbd;

  p {
    color: white;
    font-size: 0.15rem;
  }
}
</style>
