<template>
    <div class="verify">
        <header>
            <!--<p class="back" @click="$router.back()">-->
                <!--<img src="@/assets/images/left.svg" alt="">-->
            <!--</p>-->
            <!--<p class="back">-->
                <!--<img src="@/assets/images/left.svg" alt="">-->
            <!--</p>-->
            <span>待审核报名</span>
            <div class="btnActive">
                <button class="btn" @click="seleAll">{{!isCheckAll?'取消全选' :'全选'}}</button>
            </div>
        </header>
        <section ref="list" @scroll="getMoreList()">
            <div class="listWarp">
                <div class="nodata" v-if="!noData">
                    <div>
                        <img src="@/assets/images/noData.png" alt="">
                        <p>暂时没有可用数据</p>
                    </div>
                </div>
                <div v-if="noData">
                    <div class="list" v-for="(item,index) in list" :key="index">
                        <div>
                            <input
                                    type="checkbox"
                                    class="checkbox1"
                                    :class="{'checkbox2':checkArr.indexOf(item.id) != '-1'}"
                                    v-model="checkArr"
                                    :value="item.id"
                            />
                        </div>
                        <!--<img :src="item.images" alt="">-->
                        <div class="imgWarp">
                            <img :src='item.initiateUser.userInfo.avatar||require("@/assets/images/m1.jpg")' alt="">
                        </div>
                        <div class="text">
                            <span class="textName">{{item.initiateUser.userInfo.userName || '-'}}</span>
                            <span class="textTime">{{item.createTime ? item.createTime.slice(0,-3):''}}</span>
                        </div>
                    </div>
                    <div class="addGroup">
                        <button @click="refuseClick">拒绝申请</button>
                        <button @click="allowClick">批准加入活动</button>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    // import {wxjssdk} from '@/wxJsSdk/index.js'
    import {verifyList,verifyPass} from '@/api/activity.js'
    export default {
        name: "verify",
        data () {
            return{
                list:[],  // 页面列表
                noData: true, // 是否显示数据
                limit:10,  // 每页显示多少条数据
                offset: 0, // 重第几条开始
                onOff: true, // 判断状态
                checkArr: [],  // 单选
                isCheckAll: true, // 判断是否全选
                refuseBtn: true, // 判断拒绝二次点击
                allowBtn: true, // 判断允许二次点击
            }
        },
        methods: {
            // 获取审核的列表
            getList () {
                var params = this.$route.params.id
                var data = {
                    id: params,
                    limit:this.limit,
                    offset:this.offset,
                }
                verifyList(data).then((res) => {
                    var resData = res.data || []
                    if(resData.code==0){
                        this.offset = this.offset + this.limit
                        if(this.offset>=resData.total){
                            this.onOff = false
                        }
                        var data = resData.data  || []
                        this.list.push(...data)
                        if(this.list.length==0){
                            this.noData = false
                        }
                    }
                    console.log(res)
                }).catch((err) => {
                    console.log(err)
                })
            },
            // 获取第一次审核列表
            getOneList () {
                var params = this.$route.params.id
                var data = {
                    id: params,
                    limit:this.limit,
                    offset:0,
                }
                verifyList(data).then((res) => {
                    var resData = res.data || []
                    if(resData.code==0){
                        this.offset = this.offset + this.limit
                        if(this.offset>=resData.total){
                            this.onOff = false
                        }
                        var data = resData.data  || []
                        this.list=data
                        if(this.list.length==0){
                            this.noData = false
                        }
                    }
                    console.log(res)
                }).catch((err) => {
                    console.log(err)
                })
            },
            // 瀑布流
            getMoreList(){
                let scrollTop = this.$refs.list.scrollTop;
                let scrollHeight = this.$refs.list.scrollHeight;
                let clientHeight = this.$refs.list.clientHeight;
                if (scrollHeight - clientHeight - scrollTop <= 45) {
                    if (this.onOff) {
                        this.onOff = false
                        setTimeout(()=>{
                            this.onOff = true
                        },500)
                        this.getList()
                    }
                }
            },
            // 全选
            seleAll () {
                this.checkArr=[]
                if(this.isCheckAll){
                    this.list.forEach((v,i) => {
                        this.checkArr.push(v.id)
                    })
                }
                this.isCheckAll = !this.isCheckAll
            },
            // 拒绝加入
            refuseClick () {
                if(this.checkArr<1){
                    this.$toast.center('请选择审核人')
                    return false
                }
                var data = {
                   ids:this.checkArr,
                   verifyType :'REFUSE'
                }
                if(!this.refuseBtn){
                    return false
                }
                this.refuseBtn = false
                // alert('拒绝加入'+ JSON.stringify(this.checkArr))
                verifyPass(data).then((res) => {
                    var resData = res.data || []
                    if(resData.code == 0){
                        this.$toast.center('审核未通过');
                        // this.list.forEach((v,i) => {
                            // setTimeout(() => {
                            //     if(this.checkArr.indexOf(v.id) != -1){
                            //         this.list.splice(i,1)
                            //         this.checkArr.splice(this.checkArr.indexOf(v.id),1)
                            //     }
                            // },5000)
                        // })
                        // if(this.list.length==0){
                        //     this.noData = false
                        // }
                        this.getOneList()
                    }else {
                        this.$toast.center(resData.message);
                    }
                    this.refuseBtn = true
                }).catch((err) => {
                    this.refuseBtn = true
                    console.log(err)
                })
            },
            // 允许加入
            allowClick () {
                if(this.checkArr<1){
                    this.$toast.center('请选择审核人')
                    return false
                }
                var data = {
                    ids:this.checkArr,
                    verifyType:'PASS'
                }
                // var ids=JSON.stringify(this.checkArr)
                // var verifyType = 'PASS'
                if(!this.allowBtn){
                    return false
                }
                this.allowBtn = false
                verifyPass(data).then((res) => {
                    // alert('允许加入'+ JSON.stringify(this.checkArr))
                    var resData = res.data || []
                    if(resData.code == 0){

                        // this.list.forEach((v,i) => {
                        //   setTimeout(() => {
                        //       if(this.checkArr.indexOf(v.id) != -1){
                        //           this.list.splice(i,1)
                        //           this.checkArr.splice(this.checkArr.indexOf(v.id),1)
                        //       }
                        //   },5000)
                        // })
                        // if(this.list.length==0){
                        //     this.noData = false
                        // }
                        this.$toast.center('审核通过');
                        this.getOneList()

                    } else {
                        this.$toast.center(resData.message);

                    }
                    this.allowBtn = true
                }).catch((err) => {
                    this.allowBtn = true
                    console.log(err)
                })
            },
            // 函数去抖
        //     debounce (func, wait, immediate) {
        //         var timeout, result;
        //         var debounced = function () {
        //             var context = this;
        //             var args = arguments;
        //             if (timeout) clearTimeout(timeout);
        //             if (immediate) {
        //                 // 如果已经执行过，不再执行
        //                 var callNow = !timeout;
        //                 timeout = setTimeout(function(){
        //                     timeout = null;
        //                 }, wait)
        //                 if (callNow) result = func.apply(context, args)
        //             }
        //             else {
        //                 timeout = setTimeout(function(){
        //
        //                     func.apply(context, args)
        //                 }, wait);
        //             }
        //             return result;
        //         };
        //         debounced.cancel = function() {
        //             clearTimeout(timeout);
        //             timeout = null;
        //         };
        //         return debounced;
        //     }
        // },
        // computed: {
        //     refuse () {
        //        return this.debounce(this.refuseClick,800,true)
        //     },
        //     allow () {
        //         return this.debounce(this.allowClick,800,true)
        //     }
        //
        },
        mounted () {
            this.getList()
            // wxjssdk(location.href.split('#')[0],false)
            // this.debounce(this.allowClick,500,false)()
        }
    }
</script>

<style scoped lang="scss">
    .verify {
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
        .checkbox1 {
            height: 15px;
            width: 15px;
            -webkit-appearance: none;
            vertical-align: middle;
            outline: none;
            border: none;
            background: url(../assets/images/check.png) no-repeat;
        }
        .checkbox2 {
            background: url(../assets/images/check.png) no-repeat left -19px;
        }
        header {
            height: 0.9rem;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #4f77aa;
            color: #fff;
            font-size: 0.32rem;
            position: relative;
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
            webkit-flex: 1;        /* Chrome */
            -ms-flex: 1;             /* IE 10 */
            flex: 1;                /* NEW, Spec - Opera 12.1, Firefox 20+ */
            -webkit-box-flex: 1;     /* OLD - iOS 6-, Safari 3.1-6 */
            -moz-box-flex: 1;
            position: absolute;
            top: .9rem;
            left: 0;
            bottom: 0;
            right: 0;
            overflow-y: auto;
            .listWarp{
                height: 100%;
                box-sizing: border-box;
            }
            .nodata{
                -webkit-flex: 1;        /* Chrome */
                -ms-flex: 1;             /* IE 10 */
                flex: 1;                /* NEW, Spec - Opera 12.1, Firefox 20+ */
                -webkit-box-flex: 1;     /* OLD - iOS 6-, Safari 3.1-6 */
                -moz-box-flex: 1;
                position: absolute;
                top: .9rem;
                left: 0;
                bottom: 0;
                right: 0;
                display: flex;
                display: -webkit-flex;
                display:-webkit-box;
                justify-content: center;
                -webkit-justify-content:center;
                -moz-box-pack:center;
                -webkit--moz-box-pack:center;
                box-pack:center;
                align-items:center;
                -webkit-align-items:center;
                box-align:center;
                -moz-box-align:center;
                -webkit-box-align:center;
                img{
                    height:1.28rem ;
                    width: 1.8rem;
                }
                p{
                    height: 1rem;
                    line-height: 1rem;
                    color: #ccc;
                }
            }
            .list{
                line-height: 1.6rem;
                border-bottom: 1px solid #eee;
                padding: 0 .3rem;
                background: #fff;
                display: flex;
                display: -webkit-flex;
                align-items: center;
                .imgWarp{
                    width: 1rem;
                    height: 1rem;
                    margin:0  0.2rem;
                    img{
                        width: 1rem;
                        height: 1rem;
                        border-radius: 50%;
                    }
                }
                .text{
                    flex: 1;
                    font-size: .28rem;
                    color: #4f4f4f;
                    .textTime{
                        float: right;
                    }
                }
            }
            .addGroup {
                padding-top: 0.3rem;
                padding-bottom: 0.5rem;
                text-align: center;
                button {
                    border: none;
                    width: 3rem;
                    height: 0.8rem;
                    text-align: center;
                    line-height: 0.7rem;
                    border-radius: 0.35rem;
                    background-color: #ff9d00;
                    box-shadow: 0 5px 0 #cc7e00;
                    font-size: 0.32rem;
                    color: white;
                    &:first-child{
                        background-color: #cc0001;
                        box-shadow: 0 5px 0 #ae0000;
                    }
                }

            }
        }
    }
</style>