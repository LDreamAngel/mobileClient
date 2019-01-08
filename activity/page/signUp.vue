<template>
    <div class="signUp">
        <header>
            <p class="back" @click="$router.back()">
                <img src="@/assets/images/left.svg" alt="">
            </p>
            <span>活动内容</span>
            <div class="btnActive" v-if="list.registrationType== 'PASS'">
                <!--<button class="btn">进组</button>-->
            </div>
            <div class="btnActive" v-if="list.registrationType== 'NOT'">
                <button class="btn" @click="create">
                    报名
                </button>
            </div>
        </header>
        <section ref="contextWarp" @scroll="getMain()">
            <div>
                <div class="banner">
                    <img :src="list.images" alt="">
                    <p class="favorite" v-if="!list.ifEXTERNAL">
                        <img v-if="!isCollect" @click="isCollection(!isCollect)" src="../assets/images/a-collect.png" alt="">
                        <img v-else @click="isCollection(!isCollect)" src="../assets/images/s-collect.png" alt="">
                    </p>
                </div>
                <!-- <div class="oper">
                   <dl>
                       <dt>
                           <img src="../assets/images/title.png" alt="">
                       </dt>
                       <dd>分享</dd>
                   </dl>
                   <dl>
                       <dt>
                           <img src="../assets/images/title.png" alt="">
                       </dt>
                       <dd>签到</dd>
                   </dl>
                </div> -->
                <div class="detail">
                    <h4>{{list.title}}</h4>
                    <!-- <p class="des">{{list.description}}</p> -->
                    <p v-html="contentDeteail">
                        <!--{{list.content}}-->
                    </p>
                </div>
                <div class="willNum">
                    <div class="number">
                        <p>{{list.count?list.count:0}}人<span>已报名</span></p>
                        <!--<p class="blue"></p>-->
                    </div>
                    <div class="icons">
                        <div v-for="(item,index) in list.avatars" :key="index">
                            <img :src="item ?item : basePicShow" alt="">
                        </div>
                    </div>
                </div>
                <div class="messageGroup">
                    <p style="color: #ccc;">活动地点</p>
                    <p>{{list.address}}</p>
                    <!--<p class="site"></p>-->
                </div>
                <div class="messageGroup">
                    <p style="color: #ccc;">活动时间</p>
                    <p>
                        {{list.startDate?list.startDate.slice(0,-3): ''}}
                        -
                        {{list.endDate?list.endDate.slice(0,-3): ''}}
                    </p>
                </div>
                <div class="messageGroup">
                    <p style="color: #ccc;">报名时间</p>
                    <p>
                        {{list.registrationStartDate?list.registrationStartDate.slice(0,-3): ''}}
                        -
                        {{list.deadLine?list.deadLine.slice(0,-3): ''}}
                    </p>
                </div>
                <div class="messageGroup">
                    <p style="color: #ccc;">联系人</p>
                    <div class="linkManWarp">
                        <div class="linkMan" v-for="(item,index) in JSON.parse(list.contactUser?list.contactUser:'[]')" :key="index">
                            <p>{{item.name}}</p>
                            <p class="site phone">
                                <a :href="'tel:'+item.phone" style="display:inline-block;height: 100%;width: 100%;"></a>
                            </p>
                            <!--<p class="site letter"></p>-->
                        </div>
                    </div>
                </div>
                <div class="outUser" v-if="list.ifEXTERNAL">
                    <div class="contactsName">
                        <label for="contactsName">姓名</label>
                        <input type="text" id="contactsName" v-model="outUserName" name="contactsName" placeholder="请输入姓名">
                    </div>
                    <div class="contactsPhone">
                        <label for="contactsPhone">手机号</label>
                        <input type="number"
                               @input="outUserPhone.length>11?outUserPhone=outUserPhone.slice(0,11):''"
                               id="contactsPhone"
                               v-model="outUserPhone"
                               name="contactsPhone"
                               placeholder="输入手机号">
                    </div>
                </div>
                <div class="addGroup" v-if="list.registrationType== 'NOT'">
                <!--<div class="addGroup">-->
                    <button @click="create">我要报名</button>
                </div>
                <div class="addGroup" v-if="list.registrationType== 'REVIEW'">
                    <button>审核中</button>
                </div>
                <div class="addGroup not" v-if="list.registrationType== 'REFUSE'">
                    <button>审核未通过</button>
                </div>
                <div class="addGroup" v-if="list.registrationType== 'PASS'">
                    <!--<button>加入讨论组</button>-->
                    <button>已报名</button>
                </div>
            </div>
            <ul v-if="isComment && !list.ifEXTERNAL">
                <li v-if="!noComment">
                    <div style="width: 100%;text-align:center;color: #888;">当前还没有评论,赶快评论吧</div>
                </li>
                <li class="number" v-if="noComment">
                    <p>{{commentList.count}}条<span>评论</span></p>
                    <div @click="goComment">
                        全部
                        <p class="blue"></p>
                    </div>
                </li>
                <li v-for="(item,index) in commentList.commentRootList" :key="index" v-if="noComment">
                    <div class="imgWarp">
                        <img :src="item.insideUser.userInfo.avatar?item.insideUser.userInfo.avatar:require('@/assets/images/m1.jpg')" alt="">
                    </div>
                    <dl>
                        <dt>{{item.insideUser.userInfo.userName}}：</dt>
                        <dd>{{item.content}}</dd>
                        <dd>
                            <p style=" color: #d8d8d8;">
                                {{item.createTime ? item.createTime.slice(0,-3): ''}}
                            </p>
                            <!--<p style=" color: #0060d0;">展开</p>-->
                        </dd>
                    </dl>
                </li>
            </ul>
        </section>
         <footer v-if="isComment && !list.ifEXTERNAL">
            <input type="text" v-model="commitText" placeholder="有什么想要说的？">
            <p class="say" @click="commit"></p>
        </footer>
    </div>
</template>

<script>
import { getDetail,getText,getCollection,createUser,addComment,getComment } from '@/api/activity.js'
import {wxjssdk} from '@/wxJsSdk/index.js'
export default {
  name: "sign-up",
  data(){
      return{
          isCollect:false, // 收藏状态
          activityId:'',  //活动详情id
          list:{}, // 叶面内容
          isDisabled: false, // 活动二次点击
          commitText: '',   //  评论
          onOff: true,  // 滚动开关
          isComment: false, // 是否显示评论
          noComment: false, // 是否有评论
          commentList: [],  // 评论列表
          outUserName: '',  // 姓名
          outUserPhone: '',  // 手机号
          contentDeteail: '', // 获取富文本html
          basePic:[
              require('@/assets/images/m1.jpg'),
              // require('@/assets/images/m4.jpg'),
              // require('@/assets/images/m5.jpg'),
              // require('@/assets/images/m6.jpg'),
              // require('@/assets/images/m7.jpg'),
              // require('@/assets/images/m8.jpg'),
              // require('@/assets/images/m9.jpg'),
          ],
      }
  },
  computed: {
      basePicShow () {
          // return this.basePic[Math.ceil(Math.random()*1)]
          return this.basePic[0]
      }
  },
  methods: {
      getListDetails () {
          if(!this.activityId){
              return false
          }
          return getDetail(this.activityId).then(res => {
              var resData =res.data || {}
              if(resData.code==0){
                  if (!resData.data) {
                      return false
                  }
                  this.list = resData.data
                  this.isCollect = resData.data.ifLike
              } else{
                  if(resData.code == 2302 || resData.code == 2305){
                    this.$set(this.list, 'ifEXTERNAL' ,true)
                  }
                  this.$toast.center(resData.message);
              }

          }).catch(err =>{
              console.log(err)
          })
      },
      // 收藏请求
      collection (param) {
          var data = this.activityId
          getCollection(data,param).then((res) => {
              if(res.data.code != 0){
                  this.isCollect = !this.isCollect
                  this.$toast.center(res.data.message);
              }else{
                  if(param == 'ACTIVE'){
                      this.$toast.center('收藏成功');
                  }
                  if(param == 'ARCHIVE'){
                      this.$toast.center('取消收藏成功');
                  }
              }
          }).catch((err) => {
              console.log(err)
              this.isCollect = !this.isCollect
          })
      },
      // 判断是否收藏
      isCollection (status) {
          this.isCollect = status
          var params = ''
          if(this.isCollect){
              params = 'ACTIVE'
          } else {
              params = 'ARCHIVE'
          }
          this.collection(params)
      },
      // 我要报名
      create () {
          // console.log(this.outUserPhone)
          if (this.list.ifEXTERNAL) {
              if (this.outUserName == '') {
                  this.$toast.center('姓名不能为空');
                  return false
              }
              var myreg=/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
              if (!myreg.test(this.outUserPhone)) {
                  this.$toast.center('请输入正确的手机号');
                  return false
              }
              var data = {
                  "applyId": this.activityId,
                  "mobile": this.outUserPhone,
                  "name": this.outUserName,
                  // "avatar": 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532961372657&di=191e63686404e42aecc1a1173534a1c1&imgtype=0&src=http%3A%2F%2Fimage.it168.com%2Fn%2F0x0%2F5%2F5364%2F5364349.jpg'
              }
          } else {
              var data = {
                  "applyId": this.activityId,
              }
          }
          if(this.isDisabled){
              return false
          }
          this.isDisabled=true
          createUser(data).then((res) => {
              var resData = res.data || []
              if(resData.code == 0){
                  this.getListDetails()
                  this.$toast.center('报名成功')
              }else {
                  this.$toast.center(resData.message)
              }
              this.isDisabled=false
              // console.log()
              // if (res) {
              //
              // }

          }).catch((err) => {
              this.isDisabled=false
              console.log(err)
          })
      },
      // 增加评论
      commit () {
          if(this.commitText == '') {
              return false
          }
          var data = {
              "applyId": this.activityId,
              "content": this.commitText
          }
          addComment(data).then((res) => {
              var resData = res.data
              if (resData.code == 0) {
                  this.$toast.center('评论成功')
                  this.commitText = ''
                  this.getCommentList ()
              } else {
                  this.$toast.center('评论失败')
              }
          }).catch((err)=>{
              console.log(err)
          })
      },
      // 评论列表
      getCommentList () {
          getComment(this.activityId).then((res) => {
              var resData = res.data || []
              this.commentList = resData.data || []
              // alert(JSON.stringify(this.commentList.commentRootList))
              if (this.commentList.commentRootList.length == 0) {
                  this.noComment = false
              } else {
                  this.noComment = true
              }
              console.log(res)
          }).catch((err) => {
              console.log(err)
          })
      },
      // 获取评论页面
      getMain () {
          let scrollTop = this.$refs.contextWarp.scrollTop;
          let scrollHeight = this.$refs.contextWarp.scrollHeight;
          let clientHeight = this.$refs.contextWarp.clientHeight;
          if (scrollHeight - clientHeight - scrollTop <= 45) {
              if (this.onOff) {
                  this.onOff = false
                  this.isComment = true
                  this.getCommentList()
              }
          }
      },
      // 获取页面的高度
      getHeightMain () {
          setTimeout(()=>{
              let mainHeight = this.$refs.contextWarp.offsetHeight;
              let scrollHeight = this.$refs.contextWarp.scrollHeight;
              if(mainHeight >= scrollHeight){
                  this.onOff = false
                  this.isComment = true
                  this.getCommentList()
              }
          },1000)
      },
      // 全部评论
      goComment () {
          this.$router.push({
              name:'comment',
              params:{
                  condition: this.activityId
              }
          })
      },
      // 全部审核
      goVerify () {
          this.$router.push({
              name:'verify'
          })
      },
      async getlist () {
          await this.getListDetails()
      },
      // 函数去抖
      // debounce (func, wait, immediate) {
      //     var timeout, result
      //     var debounced = function () {
      //         var context = this;
      //         var args = arguments;
      //         if (timeout) {
      //             clearTimeout(timeout);
      //         }
      //         if (immediate) {
      //             // 如果已经执行过，不再执行
      //             var callNow = !timeout;
      //             timeout = setTimeout(function(){
      //                 timeout = null;
      //             }, wait)
      //             if (callNow) result = func.apply(context, args)
      //         }
      //         else {
      //             timeout = setTimeout(function(){
      //                 func.apply(context, args)
      //             }, wait);
      //         }
      //         return result;
      //     };
      //     debounced.cancel = function() {
      //         clearTimeout(timeout);
      //         timeout = null;
      //     };
      //     return debounced;
      // }
  },
  mounted () {
      this.$nextTick(() => {
          this.activityId = this.$route.params.id
          // alert(this.activityId)
          // this.getListDetails()
          this.getHeightMain()
          this.getlist().then((res) => {
              var that = this
              // var img = this.list.images
              // function getBase64Image(img) {
              //     var canvas = document.createElement("canvas");
              //     canvas.width = img.width;
              //     canvas.height = img.height;
              //
              //     var ctx = canvas.getContext("2d");
              //     ctx.drawImage(img, 0, 0, img.width, img.height);
              //     var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
              //     var dataURL = canvas.toDataURL("image/"+ext);
              //     return dataURL;
              // }
              // var image = new Image();
              // image.crossOrigin = '';
              // image.src = img;
              // image.onload = function(){
              // var base64 = getBase64Image(image);
              // console.log(this.list.content)
                  getText(this.list.content).then((res) => {
                      this.contentDeteail=res.data || ''
                  })
                  wxjssdk(location.href.split('#')[0],that.list.share,that.list.corpId,{
                      title: that.list.title,
                      desc:that.list.description || '暂无活动说明',
                      link: location.origin+'/event-registration-server?redirect_url='+location.href.split('?')[0],
                      imgUrl :that.list.images
                  })

              // }
          }).catch((err) => {
              alert(err)
          })
          function isWeixinBrowser() {
              var agent = navigator.userAgent.toLowerCase();
              if (agent.match(/MicroMessenger/i) == "micromessenger") {
                  return true;
              } else {
                  return false;
              }
          }
          // if (!isWeixinBrowser()) {
          //     document.head.innerHTML = '<title>抱歉，出错了</title><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0"><link rel="stylesheet" type="text/css" href="https://res.wx.qq.com/connect/zh_CN/htmledition/style/wap_err1a9853.css">';
          //     document.body.innerHTML = '<div class="page_msg"><div class="inner"><span class="msg_icon_wrp"><i class="icon80_smile"></i></span><div class="msg_content">请在微信客户端打开链接</div></div></div>';
          // }
      })
  },
    created () {
        // function isWeixinBrowser() {
        //     var agent = navigator.userAgent.toLowerCase();
        //     if (agent.match(/MicroMessenger/i) == "micromessenger") {
        //         return true;
        //     } else {
        //         return false;
        //     }
        // }
    }
}
</script>

<style scoped lang="scss">
 button:disabled{
     background: #888;
 }
.signUp {
  /*height: 100%;*/
  /*display: flex;*/
  /*display: -webkit-flex;*/
  /*flex-direction: column;*/
    height: 100%;
    display: flex;
    display: -webkit-flex;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-flex-direction:column;
    flex-direction: column;
  header {
    height: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    color: #0060d0;
    border-bottom: 1px solid #eee;
    font-size: 0.32rem;
    position: relative;
    /*.back {
      position: absolute;
      left: 0.3rem;
      height: 0.2rem;
      width: 0.2rem;
      border-top: solid 2px #fff;
      border-left: solid 2px #fff;
      transform: rotate(-45deg);
    }*/
      .back{
          text-align: center;
          position: absolute;
          top: 0;
          left: 0;
          height: .9rem;
          width: .72rem;
          img{
              height: .9rem;
              width: .36rem;
          }
      }
      .btnActive{
          position: absolute;
          top: 0;
          right: 0;
          .btn{
              margin-top: .2rem;
              margin-right: .2rem;
              height: .5rem;
              width: 1.1rem;
              box-shadow: 0 3px 0 0px rgba(0,0,0,0.1);
              background: #ff9d00;
              border-radius: 0.25rem;
              border: none;
              outline: none;
              font-size: 0.24rem;
          }
      }
    /*.btn {*/
      /*border: none;*/
      /*outline: none;*/
      /*position: absolute;*/
      /*right: 0.2rem;*/
      /*width: 1.1rem;*/
      /*height: 0.5rem;*/
      /*line-height: 0.5rem;*/
      /*text-align: center;*/
      /*background-color: #ff9d00;*/
      /*border-radius: 0.25rem;*/
      /*box-shadow: 0 4px 0 #004ca6;*/
      /*font-size: 0.24rem;*/
    /*}*/
  }

  section {
    /*flex: 1;*/
    width: 100%;
      -webkit-flex: 1;        /* Chrome */
      -ms-flex: 1;             /* IE 10 */
      flex: 1;                /* NEW, Spec - Opera 12.1, Firefox 20+ */
      -webkit-box-flex: 1;     /* OLD - iOS 6-, Safari 3.1-6 */
      -moz-box-flex: 1;
      /*position: absolute;*/
      /*top: .9rem;*/
      /*left: 0;*/
      /*bottom: 0;*/
      /*right: 0;*/

    overflow-y: auto;
    .banner {
      position: relative;
      width: 100%;
      height: 4.2rem;
      img {
        width: 100%;
        height: 100%;
      }
      .favorite {
        position: absolute;
        right: 0.3rem;
        bottom: 0.3rem;
        width: 0.5rem;
        height: 0.5rem;
        // background-color: #ff9d00;
        // border-radius: 50%;
      }
    }
    .oper {
      display: flex;
      justify-content: space-around;
      background-color: white;
      margin-bottom: 1px;
      dl {
        padding-bottom: 0.15rem;
        padding-top: 0.2rem;
        dt {
          width: 0.5rem;
          height: 0.5rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        dd {
          font-size: 0.23rem;
          color: #0060d0;
        }
      }
    }
    .detail {
      padding: 0.3rem 0.45rem 0.3rem 0.3rem;
      margin-bottom: 1px;
      background-color: white;
      h4 {
        line-height: 0.5rem;
        font-size: 0.25rem;
        font-weight: 400;
      }
      p {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        line-height: 0.35rem;
        font-size: 0.2rem;
        color: #cccccc;
      }
    }
    .number {
      padding: 0.3rem;
      display: flex;
      justify-content: space-between;
      p {
        font-size: 0.25rem;
        color: #0060d0;
        span {
          margin-left: 5px;
          font-size: 0.2rem;
          color: #ccc;
        }
      }
      > div {
        display: flex;
        align-items: center;
        font-size: 0.25rem;
        color: #0060d0;
      }
      .blue {
        width: 0.15rem;
        height: 0.15rem;
        border-top: solid 1px #0060d0;
        border-left: solid 1px #0060d0;
        transform: rotate(135deg);
      }
    }
    .willNum {
      margin-bottom: 1px;
      padding-bottom: 0.3rem;
      background-color: white;
      .icons {
        width: 100%;
        height: auto;
        display: flex;
        flex-wrap: nowrap;
        overflow-y: auto;
        img {
          margin-left: 0.3rem;
          width: 0.9rem;
          height: 0.9rem;
          border-radius: 50%;
        }
      }
    }
    .outUser{
        margin-bottom: .3rem;
        background: #fff;
        color: #ccc;
        .contactsName,.contactsPhone{
            height: .38rem;
            padding: .3rem 0;
            border-bottom: 1px solid #eeeeee;
            label{
                line-height: .38rem;
                padding: 0 .3rem;
                width: 1.2rem;
                display: inline-block;
            }
            input{
                height: .38rem;
                width: 5.3rem;
                padding-left: .05rem;
                border: none;
                outline: none;
            }
        }
    }
    .messageGroup {
      margin-bottom: 1px;
      padding: 0.35rem 0.3rem;
      background-color: white;
      display: flex;
      justify-content: space-between;
        align-items: center;
        /*overflow: hidden;*/
      p {
        color: #0060d0;
        font-size: 0.25rem;
      }
      .site {
        width: 0.4rem;
        height: 0.4rem;
         background: url("../assets/images/site.png") no-repeat center;
        background-size: 100%;
      }
      .phone{
           background: url("../assets/images/phone.png") no-repeat center;
            background-size: 100%;
      }
      .letter{
           background: url("../assets/images/letter.png") no-repeat center;
            background-size: 100%;
      }
        .linkManWarp{
            flex: 1;
        }
      .linkMan {
          line-height: .5rem;
        display: flex;
        align-items: center;
          justify-content: flex-end;

        p {
          margin-left: 0.65rem;
        }
      }
    }
    .addGroup {
      padding-top: 0.3rem;
      padding-bottom: 0.5rem;
      text-align: center;
      .not{
          background-color: #cccccc;
      }
      button {
        border: none;
        width: 2.9rem;
        height: 0.7rem;
        text-align: center;
        line-height: 0.7rem;
        border-radius: 0.35rem;
        background-color: #ff9d00;
        box-shadow: 0 5px 0 #cc7e00;
        font-size: 0.32rem;
        color: white;
      }
    }
    ul {
      background: white;
      li{
        padding: 0.3rem;
         border-bottom: solid 1px #eee;
         display: flex;
          .imgWarp{
              width: 1rem;
              height: 1rem;
              margin-right: 0.3rem;
              img{
                  width: 1rem;
                  height: 1rem;
                  border-radius: 50%;
              }
          }
         >dl{
             font-size: 0.2rem;
             width: 100%;
            dt{
                line-height: 0.4rem;
                color: #888;
            }
            dd:nth-child(2){
                margin-bottom: 0.1rem;
                 word-break: break-all;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
            dd{
                display: flex;
                justify-content: space-between;
                line-height: 0.35rem;
            }
         }
      }
    }
  }
  footer {
    display: flex;
    justify-content: space-between;
    height: 1rem;
    padding: 0.3rem;
    box-sizing: border-box;
    background-color: white;
      border: 1px solid #eee;
    input {
      width: 85%;
      height: 0.4rem;
      border: 0;
      font-size: 0.25rem;
    }
    p {
      width: 0.4rem;
      height: 0.4rem;
      background: url("../assets/images/s-know.png") no-repeat center;
      background-size: 100%;
    }
  }
}
</style>