<template>
    <div class="comment">
        <header>
            <span class="back" @click="goback">
                <img src="@/assets/images/left.svg" alt="">
            </span>
            评论
        </header>
        <section>
            <div class="listWarp">
                <div class="nodata" v-if="!noData">
                    <div>
                        <img src="@/assets/images/noData.png" alt="">
                        <p>暂时没有可用数据</p>
                    </div>
                </div>
                <div v-if="noData">
                    <div class="item" v-for="(item,index) in commentList" :key="index">
                        <div class="imgPic">
                            <img :src="item.insideUser.userInfo.avatar?item.insideUser.userInfo.avatar:require('@/assets/images/m1.jpg')" alt="">
                        </div>
                        <div class="textPic">
                            <p class="textTop">{{item.insideUser.userInfo.userName}}:</p>
                            <div class="textMiddle" v-if="item.showMore">{{item.content}}</div>
                            <div class="textMiddle textMiddleMore" v-if="!item.showMore">{{item.content}}</div>
                            <div class="textBottomWarp">
                                <span @click="more(item.id)">
                                   {{!item.showMore ? '展开': '隐藏' }}
                                </span>
                                <p class="textBottom">{{item.createTime ? item.createTime.slice(0,-3) : ''}}</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import { getAllComment } from '@/api/activity.js'
    import {wxjssdk} from '@/wxJsSdk/index.js'
    export default {
        name: "comment",
        data () {
            return {
                activityId: '',  // 活动id
                commentList: [],  // 评论列表
                limit: 10,        // 评论的分页条数
                offset: 0,        // 评论的第几条
                onOff: true,      // 评论的判断状态
                noData: true,   // 是否显示数据
            }
        },
        methods: {
            goback () {
                this.$router.back()
            },
            more (id) {
                this.commentList.forEach((v,i) => {
                    if(v.id == id){
                        this.$set(v,"showMore",!v.showMore)
                        return false
                    }
                })
            },
            // 获取所有评论列表
            getIdComment (id) {
                getAllComment(id).then((res) => {
                    var resData = res.data || []
                    if(resData.code == 0) {
                        this.commentList = resData.data || []
                        this.commentList.forEach((v,i) => {
                            this.$set(v,"showMore",false)
                        })
                        if(this.commentList.length==0){
                            this.noData = false
                        }
                    }
                    console.log(res)
                }).catch((err) => {
                    console.log(err)
                })
            }
        },
        mounted(){
           this.activityId = this.$route.params.condition
           if(this.activityId){
               this.getIdComment(this.activityId)
           }
            wxjssdk(location.href.split('#')[0],false,'')
        }
    }
</script>

<style scoped lang="scss">
    .comment{
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
                background: #fff;
                .imgPic{
                    padding: .3rem;
                    height: 1.2rem;
                    width: 1.2rem;
                    img{
                        height: 1.2rem;
                        width: 1.2rem;
                    }
                }
                .textPic{
                    flex: 1;
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
                            color: #0a66d1;
                        }
                    }
                    .textTop{
                        height: .68rem;
                        line-height: .96rem;
                        font-size: .28rem;
                        color: #b2b2b2;
                    }
                    .textMiddle{
                        line-height: .42rem;
                        font-size: .24rem;
                        word-break: break-all;
                    }
                    .textMiddleMore{
                        /*height: .84rem;*/
                        overflow:hidden;
                        text-overflow: ellipsis;
                        display:-webkit-box;
                        -webkit-line-clamp:2;
                        -webkit-box-orient: vertical;
                        /*position: relative;*/
                        /*&:after {*/
                            /*content:"...";*/
                            /*font-weight:bold;*/
                            /*position: absolute;*/
                            /*bottom:0;*/
                            /*right:0;*/
                            /*padding:0 20px 1px 45px;*/
                            /*background:url(http://newimg88.b0.upaiyun.com/newimg88/2014/09/ellipsis_bg.png) repeat-y;*/
                        /*}*/
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