<template>
    <div class="remind">
        <header>
            <span class="back" @click="goback">
                <img src="@/assets/images/left.svg" alt="">
            </span>
            活动提醒
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
                    <div class="item" v-for="(item,index) in list" :key="index">
                        <div class="imgPic">
                            <img :src="item.images" alt="">
                        </div>
                        <div class="textPic">
                            <p class="textTop">{{item.title}}</p>
                            <div class="textMiddle">活动剩余{{item.startResidue}}开始,{{item.deadLineResidue}}后结束报名请抓紧时间</div>
                            <div class="textBottomWarp">
                                <span>
                                    {{item.startDate ?item.startDate.slice(0,10): ''}}
                                </span>
                                <p class="textBottom">{{item.address}}</p>
                            </div>

                        </div>
                    </div>
                 </div>
            </div>
        </section>
    </div>
</template>

<script>
    import { activeityNotice } from '@/api/activity.js'
    import {wxjssdk} from '@/wxJsSdk/index.js'
    export default {
        name: "remind",
        data () {
            return {
                list: [],  // 评论列表
                limit: 10,        // 用户评论的分页条数
                offset: 0,        // 用户评论的第几条
                onOff: true,      // 用户评论的判断状态
                noData: true,   // 是否显示数据
            }
        },
        methods: {
            goback () {
                this.$router.back()
            },
            // 获取所有评论列表
            getList () {
                var data = {
                    limit:this.limit,
                    offset:this.offset
                }
                activeityNotice(data).then((res) => {
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
            }
        },
        mounted(){
            this.getList()
            wxjssdk(location.href.split('#')[0],false,'')
        }
    }
</script>

<style scoped lang="scss">
    .remind{
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
        header{
            height: .9rem;
            line-height: .9rem;
            text-align: center;
            background: #fff;
            color: #0060D0;
            font-size: .32rem;
            border-bottom: 1px solid #eee;
            position: relative;
            .back{
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
        }
        section {
            /*flex: 1;*/
            -webkit-flex: 1;        /* Chrome */
            -ms-flex: 1;             /* IE 10 */
            flex: 1;                /* NEW, Spec - Opera 12.1, Firefox 20+ */
            -webkit-box-flex: 1;     /* OLD - iOS 6-, Safari 3.1-6 */
            -moz-box-flex: 1;
            position: absolute;
            top: .91rem;
            left: 0;
            bottom: 0;
            right: 0;
            overflow-y: auto;
            background: #fff;
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
                top: 0.9rem;
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
            .item{
                display: flex;
                display: -webkit-flex;
                border: 1px solid #eee;
                .imgPic{
                    padding: .3rem;
                    img{
                        height: 1.2rem;
                        width: 1.2rem;
                    }
                }
                .textPic{
                    flex: 1;
                    overflow: hidden;
                    p{
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;

                    }

                    .textBottomWarp{
                        height: .52rem;
                        line-height: .52rem;
                        font-size: .24rem;
                        color: #d9d9d9;
                        span{
                            float: right;
                            line-height:.52rem;
                            padding-right: 0.2rem;
                        }
                    }
                    .textTop{
                        height: .68rem;
                        line-height: .96rem;
                        font-size: .28rem;
                    }
                    .textMiddle{
                        line-height: .42rem;
                        font-size: .24rem;
                        color: #b2b2b2;
                    }
                    .textBottom{
                        height: .52rem;
                        overflow: hidden;
                    }
                }
            }
        }
    }
</style>