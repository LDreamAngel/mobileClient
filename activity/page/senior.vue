<template>
    <div class="senior">
        <mt-datetime-picker
          ref="picker"
          type="datetime"
          :startDate="new Date()"
          @confirm ="getTime"
          v-model="currentTime">
        </mt-datetime-picker>
        <header>
            <span class="back" @click="goback">
                <img src="@/assets/images/left.svg" alt="">
            </span>
            活动高级选项
        </header>
        <section>
            <div class="item">
                <div class="itemTime">
                    <div class="endTime" @click="showDatePicker">
                        <span>报名截止时间</span>
                        <a href="javascript:;">
                            {{otherOptions.deadLine | formatDate('yyyy.MM.dd hh:mm')}}
                            <img src="@/assets/images/right.svg" alt="">
                        </a>
                    </div>
                    <div class="num">
                        <label for="num">人数限制</label>
                        <input type="text" id="num" v-model="otherOptions.max" name="num" placeholder="不填写即不设置上限">
                    </div>
                </div>
                <div class="sure">
                    <div class="needSure">
                        <span>需要审批</span>
                        <a href="javascript:;">
                            <switchbtn @on-click="verifyBtnCall"></switchbtn>
                        </a>
                    </div>
                    <transition>
                        <div v-show="otherOptions.verify" class="needSurePop">
                            <span>审批人</span>
                            <a href="javascript:;">
                                吴权洪
                                <img src="@/assets/images/right.svg" alt="">
                            </a>
                        </div>
                    </transition>
                </div>
                <div class="share">
                    <div class="needShare">
                        <span>允许分享</span>
                        <a href="javascript:;">
                            <switchbtn @on-click="shareBtnCall"></switchbtn>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { wxjssdk } from "@/wxJsSdk/index.js";
import switchbtn from "@/component/switchButton";
import "mint-ui/lib/style.css";
import {formatDate} from "../filters/DateFilter";
export default {
  name: "senior",
  components: {
    switchbtn
  },
  data() {
    return {
      currentTime: "",
      otherOptions: {
        share: false, //是否分享
        verify: false, // 是否审批
        deadLine: "", // 报名截止时间
        max: '', //报名人数
      }
    };
  },
  methods: {
    goback() {
      this.$router.push({
          name: 'newFile',
          params: {
              baseOptions: this.$route.params.data,
              otherOptions: this.otherOptions,
          }
      })
    },
    verifyBtnCall(index) {
      this.otherOptions.verify = index;
    },
    shareBtnCall(index) {
      this.otherOptions.share = index;
    },
    // 显示日期插件
    showDatePicker() {
      this.$refs.picker.open();
    },

    getTime() {
      if (this.currentTime) {
        this.otherOptions.deadLine = formatDate(this.currentTime,'yyyy-MM-dd hh:mm:ss');
      }
    },
    // 设置截止时间的默认值
    setDeadline() {
      let date = new Date();
      if (date.getMonth() < 12) date.setMonth(date.getMonth() + 1);
      else date.setYear(date.getFullYear() + 1);
      this.otherOptions.deadLine = formatDate(date,'yyyy-MM-dd hh:mm:ss');;
    }
  },
  created() {
    this.setDeadline();
    console.log(this.$route.params);
  },
  mounted() {
    wxjssdk(location.href.split("#")[0], false, "");
  }
};
</script>

<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
  transition: all 0.3s;
}
.senior {
  height: 100%;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  header {
    height: 0.9rem;
    line-height: 0.9rem;
    text-align: center;
    background: #4f77aa;
    color: #fff;
    font-size: 0.32rem;
    position: relative;
    .back {
      position: absolute;
      top: 0;
      left: 0;
      height: 0.9rem;
      width: 0.72rem;
      img {
        height: 0.9rem;
        width: 0.36rem;
      }
    }
  }
  section {
    flex: 1;
    overflow-y: auto;
    color: #888888;
    font-size: 0.28rem;
    .item {
      .itemTime {
        background: #fff;
        margin-bottom: 0.3rem;
        .endTime {
          padding: 0 0.3rem;
          height: 0.98rem;
          line-height: 0.98rem;
          a {
            float: right;
            color: #0563d0;
            img {
              height: 0.5rem;
              width: 0.3rem;
              vertical-align: middle;
            }
          }
        }
        .endTime {
          border-bottom: 1px solid #eeeeee;
        }
        .num {
          height: 0.38rem;
          padding: 0.3rem 0;
          border-bottom: 1px solid #eeeeee;
          background: #fff;
          margin-bottom: 0.3rem;
          label {
            line-height: 0.38rem;
            padding: 0 0.3rem;
            width: 1.2rem;
            display: inline-block;
          }
          input {
            height: 0.38rem;
            width: 5.3rem;
            padding-left: 0.05rem;
            border: none;
            outline: none;
          }
        }
      }
      .sure {
        background: #fff;
        margin-bottom: 0.3rem;
        .needSure,
        .needSurePop {
          padding: 0 0.3rem;
          height: 0.98rem;
          line-height: 0.98rem;
          a {
            float: right;
            color: #0563d0;
            img {
              height: 0.5rem;
              width: 0.3rem;
              vertical-align: middle;
            }
          }
        }
        .needSure {
          border-bottom: 1px solid #eeeeee;
          a {
            padding-top: 0.24rem;
          }
        }
      }
      .share {
        background: #fff;
        .needShare {
          padding: 0 0.3rem;
          height: 0.98rem;
          line-height: 0.98rem;
          a {
            padding-top: 0.24rem;
            float: right;
            color: #0563d0;
          }
        }
      }
    }
  }
}
</style>