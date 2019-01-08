<template>
    <div class="ratify">
     <div class="noApproval">
        <p class="split" v-if="noApprovalList.length">选择待确认的同事，批准加入企业微信</p>
        <div class="each" v-for="(item,i) in noApprovalList" :key="item.id">
        <div class="btn" @click="passAppr(item,i)"><p v-if="isCheck[i]">✓</p></div>
          <div class="eachContent">
            <dl>
              <dt>{{item.name}}<span>{{item.position}}</span></dt>
              <dd class="ellipsis1">{{item.companyName}}</dd>
              <!--<dd class="ellipsis1">{{item.department}}</dd>-->
              <dd>{{item.mobile}}</dd>
              <dd>{{item.email}}</dd>
            </dl>
            <div class="pic">
               <img :src="defPic" alt="">
               <p @click="fixComp(fixCompData,i)">修改</p>
            </div>
          </div>
        </div>
     </div>
     <div class="approvaList">
        <p class="split"  v-if="approvalList.length">已批准加入的同事</p>
        <div class="eachContent"  v-for="item in approvalList" :key="item.id">
            <dl>
              <dt>{{item.name}}<span>{{item.position}}</span></dt>
               <dd class="ellipsis1">{{item.companyName}}</dd>
              <dd class="ellipsis1">{{item.department}}</dd>
              <dd>{{item.mobile}}</dd>
              <dd>{{item.email}}</dd>
            </dl>
           <figure>
              <img :src="defPic" alt="">
              <figcaption>{{item.modifiedTime}}</figcaption>
	      	</figure>
          </div>
     </div>
        <button @click="pushData">批准已选同事</button>
        <p class="empty" v-if="!noApprovalList.length&!approvalList.length">暂无</p>
    </div>
</template>
<script>
import defPic from "../../assets/images/defPic.png";
import axios from "axios";
import wx from "weixin-js-sdk";
// import {wxjssdk} from '../../wxJsSdk/index.js'
export default {
  name: "ratify",
  data() {
    return {
      isShow: false,
      isId: "",
      noApprovalList: [],
      approvalList: [],
      defPic: defPic,
      toAppr: [],
      fixCompData:{},
      isCheck: []
    };
  },
  components: {},
  methods: {
    passAppr(item, i) {
      this.isCheck[i] = !this.isCheck[i];
      this.$forceUpdate();
      let isHas = this.toAppr.some((r, i) => {
        if (item.id == r.id) {
          this.toAppr.splice(i, 1);
          return true;
        } else {
          return false;
        }
      });
      if (!isHas) {
        item.companyId = 1;
        this.toAppr.push(item);
      }
    },
    allListMsg() {
      //获取列表信息
      this.$api.get("/app/inviteMembers/list", null, r => {
        for (var i = 0; i < r.data.data.length; i++) {
          if (r.data.data[i].status == 0) {
            this.noApprovalList.push(r.data.data[i]);
          } else {
            this.approvalList.push(r.data.data[i]);
          }
        }
        this.isCheck.length = this.noApprovalList.length;
        this.isCheck.fill(false);
      });
    },
    pushData() {
      let config = {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: sessionStorage["token"]
        }
      };
      let data = JSON.stringify(this.toAppr);
      axios
        .post(
          "/weixin-user-server/app/inviteMembers/batchApproval",
          data,
          config
        )
        .then(r => {
           var drag = document.getElementsByClassName('err_drag')
          var con = document.getElementsByClassName('err_con')
          drag["0"].style.display = 'block'
          con["0"].innerHTML= '邀请成功！'

          this.toAppr.forEach((r, i) => {
            this.noApprovalList.forEach((m, n) => {
              if (r.id == m.id) {
                this.noApprovalList.splice(n, 1);
              }
            });
          });
          this.approvalList.unshift(...this.toAppr);
          this.toAppr = [];
          this.isCheck = [];
        });
    },
    getGroupTicket(index) {
      let data = {
        resultUrl: process.env.API_WEB_ROOT + "/news/ratify"
      };
      this.$api.get("wechat/ticket/getGroupTicket", data, r => {
        this.fixCompData = r.data
      });
    },
    fixComp(res, index) {
      wx.config({
        beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: res.corpid, // 必填，企业微信的corpID
        timestamp: res.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.noncestr, // 必填，生成签名的随机串
        signature: res.signature, // 必填，签名，见附录1
        jsApiList: ["selectEnterpriseContact"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
      var that = this;
      wx.ready(function() {
        wx.invoke(
          "selectEnterpriseContact",
          {
            fromDepartmentId: 0, // 必填，-1表示打开的通讯录从自己所在部门开始展示, 0表示从最上层开始
            mode: "single", // 必填，选择模式，single表示单选，multi表示多选
            type: ["department"] // 必填，选择限制类型，指定department、user中的一个或者多个
          },
          function(res) {
            if (res.err_msg == "selectEnterpriseContact:ok") {
              if (typeof res.result == "string") {
                res.result = JSON.parse(res.result); //由于目前各个终端尚未完全兼容，需要开发者额外判断result类型以保证在各个终端的兼容性
              }
              var selectedDepartmentList = res.result.departmentList; // 已选的部门列表
              for (var i = 0; i < selectedDepartmentList.length; i++) {
                var department = selectedDepartmentList[i];
                var departmentId = department.id; // 已选的单个部门ID
                var departemntName = department.name; // 已选的单个部门名称

                that.noApprovalList[index].companyName = departemntName;
                that.noApprovalList[index].companyId = departmentId;
                that.$forceUpdate();
              }
            }
          }
        );
      });
    }
  },
  mounted() {
    this.$util.getUrlParam(this,'/ratify')
    this.allListMsg();
    this.getGroupTicket();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.ratify {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  .noApproval,
  .approvaList {
    .split {
      margin: 0.17rem auto;
      text-align: center;
      font-size: 0.1rem;
      color: #888888;
    }
    .each {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .btn {
        position: relative;
        cursor: pointer;
        width: 0.25rem;
        height: 0.25rem;
        border-radius: 50%;
        border: #888888 1px solid;
        background-color: white;
        p {
          position: absolute;
          top: -1px;
          left: -1px;
          margin: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          text-align: center;
          line-height: 0.25rem;
          border: #2489c5 1px solid;
          font-size: 0.2rem;
          font-weight: 900;
          font-style: normal;
          color: white;
          background-color: #2489c5;
        }
      }
    }
    .eachContent {
      width: 3.05rem;
      height: 1.45rem;
      box-sizing: border-box;
      padding: 0.18rem 0.15rem;
      background-color: white;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      dl {
        margin-right: 0.1rem;
        dt {
          line-height: 0.3rem;
          font-size: 0.16rem;
          span {
            margin-left: 0.1rem;
            font-size: 0.12rem;
            color: #cccccc;
          }
        }
        dd {
          line-height: 0.21rem;
          font-size: 0.125rem;
          color: #888888;
        }
      }
      .pic img,
      figure img {
        width: 0.85rem;
        height: 0.85rem;
        border-radius: 50%;
      }
      .pic p {
        width: 0.35rem;
        height: 0.17rem;
        margin: 0.1rem auto 0;
        text-align: center;
        line-height: 0.17rem;
        border-radius: 0.085rem;
        background-color: #00a3ff;
        color: white;
        font-size: 0.12rem;
      }
      figure {
        margin: 0;
        text-align: center;
        figcaption {
          margin-top: 0.1rem;
          color: #cccccc;
        }
      }
    }
  }
  .noApproval .each,
  .approvaList .eachContent {
    width: 3.45rem;
    //  border: solid 1px;
    margin: 0 auto 0.15rem;
  }
  button {
    position: fixed;
    bottom: 0.25rem;
    left: 50%;
    transform: translateX(-50%);
    display: block;
    width: 1.5rem;
    height: 0.4rem;
    margin: 0.5rem auto 0;
    border: 0;
    border-radius: 0.25rem;
    box-shadow: 0 2px 0 #004db7;
    background: linear-gradient(top, #00e0ff, #0062ff);
    font-size: 0.13rem;
    color: white;
  }
  .empty {
    margin: 0.3rem auto;
    text-align: center;
    font-size: 0.1rem;
    color: #888888;
  }
}
</style>
