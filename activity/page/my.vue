<template>
    <div class="my">
        <header>
            <span class="back" @click="goback">
                <img src="@/assets/images/left.svg" alt="">
            </span>
            我的
        </header>
        <div class="box">
            <div class="item" @click="goFollow">
                <img src="@/assets/images/gaunzhu.png" alt="">
                <p>
                    我的关注
                </p>
            </div>
            <div class="item" @click="goMyActivity">
                <img src="@/assets/images/huodong.png" alt="">
                <p>
                    我的活动
                </p>
            </div>

        </div>
    </div>
</template>

<script>
    import {wxjssdk} from '@/wxJsSdk/index.js'
    export default {
        name: "my",
        data () {
            return {

            }
        },
        methods:{
            goback () {
                this.$router.push({
                    name:'list'
                })
            },
            goFollow () {
                this.$router.push({
                    name: 'follow'
                })
            },
            goMyActivity () {
                this.$router.push({
                    name: 'myActivity'
                })
            }
        },
        mounted () {
            wxjssdk(location.href.split('#')[0],false,'')
        }
    }
</script>

<style scoped lang="scss">
    .my{
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
        .box{
            -webkit-flex: 1;        /* Chrome */
            -ms-flex: 1;             /* IE 10 */
            flex: 1;                /* NEW, Spec - Opera 12.1, Firefox 20+ */
            -webkit-box-flex: 1;     /* OLD - iOS 6-, Safari 3.1-6 */
            -moz-box-flex: 1;
            position: absolute;
            top: .9rem;
            left: 0;
            bottom: 1.2rem;
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
            .item{
                height: 1.85rem;
                width: 2.1rem;
                padding-top: .25rem;
                background: #0060d0;
                color: #fff;
                text-align: center;
                border-radius: .3rem;
                &:last-child{
                    margin-left: .3rem;
                }
                img{
                    height: 1.22rem;
                    width: 1.22rem;
                }
                p{
                    height: .46rem;
                    line-height: .46rem;
                    font-size: .26rem;
                }
            }
        }
    }

</style>