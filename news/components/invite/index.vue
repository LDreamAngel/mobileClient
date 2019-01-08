<template>
    <div class="invite">
      <div :class="[compBol?'blur':'']">
           <div class="personMsg">
                <div class="headPic">
                    <img :src="user.avatar || user.userPhoto" alt="">
                </div>
                <h3>{{user.name || user.userName}}</h3>
                <p>
                    <span v-if="user.deptName">{{user.deptName}}</span>&nbsp;&nbsp;
                    <span v-if="dep.name" @click="compBol=true">{{dep.name}}</span>&nbsp;&nbsp;
                </p>
                <p>
                    <span>邀请您加入公司企业微信</span>&nbsp;&nbsp;
                    <span>有效时间2小时</span>
                </p>
        </div>
        <div class="code">
            <div id="qrcode" ref="qrcode"></div>
        </div>
        <div class="foot">
            <div class="angle"></div>
            <p>扫描上方二维码接受我的邀请</p>
            <p>加入公司企业微信</p>
            <router-link tag="p" :to="{path:'/ratify'}" class="ang" v-if="dep.name">我的邀请记录</router-link>
        </div>
      </div>

        <div v-if="compBol" class="mask"></div>
        <div class="coms" v-if="compBol">
          <p>选择所属单位</p>
          <div class="comItem">
            <p @click="changeDep(item)" v-for="item in user.department_list" :key="item.id">{{item.name}}</p>
          </div>
        </div>
    </div>
</template>
<script>
import QRCode from "qrcodejs2";
import {wxjssdk} from '../../wxJsSdk/index.js'
export default {
  name: "invite",
  components: { QRCode },
  data() {
    return {
      user: {},
      corpId: "",
      userId: "",
      dep: [],
      compBol: false,
      offset: true //设置部门还是修改部门
    };
  },
  components: {},
  methods: {
    qrcode(corpId, userId) {
      let qrcode = new QRCode("qrcode", {
        width: 265, // 设置宽度
        height: 265, // 设置高度
        text:
          process.env.API_WEB_ROOT +
          "/news/inviteMessage?corpId=" +
          corpId +
          "&userId=" +
          userId
      });
    },
    getTokenMembers() {
      //用户信息
      this.$api.get("/app/inviteMembers/getMembers", null, r => {
        this.user = r.data;
        this.userId = r.data.userId;
        this.corpId = r.data.corpId;
        this.dep = r.data.department_list[0];
        if (r.data.department_list.length > 1) {
          this.compBol = true;
        } else {
          this.setDep(this.dep.name);
        }

        this.qrcode(r.data.corpId, r.data.userId);
        this.$router.push({
          path: "/invite?corpId=" + this.corpId + "&userId=" + this.userId
        });
      });
    },
    getNoTokenMembers() {
      //用户信息
      // this.$util.getUrlParam(this, "/invite");
      let data = {
        corpId: sessionStorage["corpId"],
        userId: sessionStorage["userId"]
      };
      this.$api.get("/app/inviteMembers/getInviteCode", data, r => {
        this.user = r.data.data;
        this.qrcode(r.data.data.corpId, r.data.data.userId);
      });
    },
    setDep(dep, userId, corpId) {
      //设置部门
      if (!this.offset) {
        let data = {
          deptName: dep,
          userId,
          corpId
        };
        this.$api.post("/app/inviteMembers/modifyDetpName", data, r => {
        });
      } else {
        let data = {
          departments: dep
        };
        this.$api.get("/app/inviteMembers/invite", data, r => {
          this.offset = false;
        });
      }
    },
    changeDep(dep) {
      //修改部门
      this.dep = dep;
      this.setDep(dep.name, this.userId, this.corpId);
      this.compBol = false;
    }
  },
  mounted() {
    this.$util.getUrlParam(this, "/invite");
    wxjssdk(location.href.split('#')[0],false,'')
    if (sessionStorage["token"] && sessionStorage["token"] != "undefined") {
      this.getTokenMembers();
    } else {
      this.getNoTokenMembers();
    }
  }
};
</script>
<style lang="scss" scoped>
.invite {
  width: 100%;
  height: 100%;
  padding-top: 0.54rem;
  background-color: #888888;
  box-sizing: border-box;
  overflow: auto;
  .personMsg {
    position: relative;
    width: 2.9rem;
    height: 1.4rem;
    box-sizing: border-box;
    padding-top: 0.5rem;
    margin: 0 auto 0.15rem;
    background-color: white;
    border-radius: 12px;
    text-align: center;
    box-shadow: 0 10px 20px #666666;
    .headPic {
      position: absolute;
      top: -0.42rem;
      left: 50%;
      transform: translateX(-50%);
      img {
        width: 0.85rem;
        height: 0.85rem;
        border: solid 4px #888888;
        border-radius: 50%;
      }
    }
    h3 {
      line-height: 0.4rem;
      font-size: 0.16rem;
      font-weight: 400;
    }
    p:first-of-type {
      //   line-height: 0.25rem;
      font-size: 0.13rem;
      color: #888888;
    }
    p:last-of-type {
      line-height: 0.3rem;
      font-size: 0.12rem;
      color: #cccccc;
    }
  }
  .code {
    width: 2.88rem;
    height: 2.88rem;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    border: solid 1px white;
    border-radius: 12px;
    box-shadow: 0 10px 15px #666666;
    img {
      width: 2.8rem;
      height: 2.8rem;
      border-radius: 10px;
    }
  }
  .foot {
    position: relative;
    width: 2.9rem;
    height: auto;
    margin: 0 auto;
    padding-top: 0.2rem;
    .angle {
      width: 0.5rem;
      height: 0.3rem;
      margin: 0 auto;
      background: url("../../assets/images/triangle.png") no-repeat;
      background-size: 100%;
    }
    p {
      line-height: 0.24rem;
      text-align: center;
      font-size: 0.13rem;
      color: white;
      text-shadow: 5px 5px 5px #333333;
    }
    .ang {
      width: 1.04rem;
      height: 0.32rem;
      margin: 0.18rem auto;
      border: solid 1px white;
      border-radius: 0.17rem;
      line-height: 0.32rem;
      text-align: center;
      text-shadow: 0 0 0 transparent;
    }
  }
  .coms {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    width: 3.2rem;
    height: auto;
    font-size: 15px;
    filter: blur(0);
    p {
      color: white;
      text-align: center;
      line-height: 0.5rem;
    }
    .comItem {
      width: 100%;
      height: auto;
      background-color: white;
      p {
        line-height: 0.5rem;
        text-align: center;
        color: #444444;
        border-bottom: solid 1px #f2f2f2;
      }
    }
  }
}
.blur {
  -webkit-filter: blur(2px);
  filter: blur(2px);
}
.mask {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba($color: #000000, $alpha: 0.2);
}
</style>
