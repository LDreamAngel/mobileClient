<template>
    <div class="myActivity">
        <header>
            <span class="back" @click="goback">
                <img src="@/assets/images/left.svg" alt="">
            </span>
            我的活动
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
                    <div class="list" v-for="(item,index) in list" @click="goSignUp(item.id)" :key="index">
                        <img :src="item.images" alt="">
                        <div class="text">
                            <div class="titleText textWarp">
                                <span>
                                    已报名{{item.count}}人
                                </span>
                                <p>{{item.title}}</p>
                            </div>
                            <div class="adrText textWarp">
                                <span>
                                    {{item.startDate?item.startDate.slice(0,10): ''}}
                                </span>
                                <p>{{item.address}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import { myActiveity } from '@/api/activity.js'
    import {wxjssdk} from '@/wxJsSdk/index.js'
    export default {
        name: "my-activity",
        data () {
            return {
                list:[],  // 页面列表
                noData: true, // 是否显示数据
                limit:10,  // 每页显示多少条数据
                offset: 0, // 重第几条开始
                onOff: true, // 判断状态
            }
        },
        methods: {
            goback () {
                this.$router.back()
            },
            goSignUp (id) {
                this.$router.push({
                    name: 'signUp',
                    params: {
                        id: id
                    }
                })
            },
            // 获取关注的列表
            getList () {
                var data = {
                    limit:this.limit,
                    offset:this.offset
                }
                myActiveity(data).then((res) => {
                    var resData = res.data || []
                    if(resData.code==0){
                        this.offset = this.offset + this.limit
                        if(this.offset>=resData.total){
                            this.onOff = false
                        }
                        // this.list = resData.data || []
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
        mounted () {
            this.getList()
            wxjssdk(location.href.split('#')[0],false,'')
        }
    }
</script>

<style scoped lang="scss">
    .myActivity{
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
                padding: 0.3rem 0.3rem 0.6rem 0.3rem;
            }
            .nodata{
                -webkit-flex: 1;        /* Chrome */
                -ms-flex: 1;             /* IE 10 */
                flex: 1;                /* NEW, Spec - Opera 12.1, Firefox 20+ */
                -webkit-box-flex: 1;     /* OLD - iOS 6-, Safari 3.1-6 */
                -moz-box-flex: 1;
                position: absolute;
                top: 0.91rem;
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
                width: 100%;
                margin-bottom: .3rem;
                img{
                    width: 6.9rem;
                    height: 3.8rem;
                }
                .text{
                    padding: 0.1rem 0.22rem 0.1rem 0.22rem;
                    background: #fff;
                    .textWarp{
                        height: .5rem;
                        line-height: .5rem;
                        p{
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                        span{
                            float: right;
                        }
                    }
                    .titleText{
                        font-size: .28rem;
                        color: #000;
                    }
                    .adrText{
                        color: #888;
                        font-size: .24rem;
                    }
                }

            }
        }
    }
</style>