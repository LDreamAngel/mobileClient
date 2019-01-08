<template>
    <div class="home">
       <header class='header'>
           <router-view></router-view>
       </header>
        <footer class="footer">
            <ul class="footerContent">
                <li class="know" @click="know">
                    <div class="imgwarp">
                        <img
                            :src="$route.name!='know' ? require('@/assets/images/know.png') :require('@/assets/images/knowActive.png')"
                            alt="">
                    </div>
                    <p :class="{active:$route.name == 'know'}">消息</p>
                </li>
                <!-- <li class="new" @click="newFile">
                    <div class="imgwarp">
                        <img src="@/assets/images/new.png" alt="">
                    </div>
                    <p :class="{active:$route.name == 'newFile'}">新建活动</p>
                </li> -->
                <li class="new"  >
                    <div @click="newFile" v-show="user_isAdmin">
                        <div class="imgwarp" >
                            <img src="@/assets/images/new.png" alt="">
                        </div>
                        <p :class="{active:$route.name == 'newFile'}">新建活动</p>
                    </div>
                </li>
                <li class="my" @click="my">
                    <div class="imgwarp">
                        <img
                                :src="$route.name!='my' ? require('@/assets/images/user.png') : require('@/assets/images/userActive.png')"
                                alt="">
                    </div>
                    <p :class="{active:$route.name == 'my'}">我的</p>
                </li>
            </ul>
        </footer>
    </div>
</template>

<script>
    import { isAdmin } from '@/api/activity.js'
    export default {
        name: "home",
       
        data() {
            return {
                user_isAdmin : false,
            }
        },
        methods: {
            know () {
                this.$router.push({
                    name:'know'
                })
            },
            newFile () {
                this.$router.push({
                    name:'newFile'
                })
            },
            my () {
                this.$router.push({
                    name:'my'
                })
            },
            getjurisdiction() {
                isAdmin().then(res=>{
                    if(res.data.data.isAdmin){
                        this.user_isAdmin = true;
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
        },
        created() {
            this.getjurisdiction();
        }
    }
</script>

<style scoped lang="scss">
    .home{
        height: 100%;
        width: 100%;
        display: flex;
        display: -webkit-flex;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-flex-direction:column;
        flex-direction: column;
        .header{
            display: flex;
            display: -webkit-flex;
            display:-webkit-box;
            -webkit-box-orient:vertical;
            -webkit-flex-direction:column;
            flex-direction: column;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 1.2rem;
            right: 0;
            /*flex: 1;*/
            overflow-y: auto;
        }
        .footer{
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            background: #fff;
            .footerContent{
                height: 1.2rem;
                display: flex;
                flex-direction: row;
                justify-content: center;
                text-align: center;
                font-size: 0.24rem;
                color: #ccc;
                -webkit-box-shadow: 0 2px 15px rgba(0,0,0,0.3);
                -moz-box-shadow: 0 2px 15px rgba(0,0,0,0.3);
                box-shadow: 0 2px 15px rgba(0,0,0,0.3);
                li{
                    height: 100%;
                    .imgwarp{
                        padding-top: .12rem;
                        text-align: center;
                        display: inline-block;
                        height: 0.65rem;
                        width: 0.65rem;
                    }
                    img{
                        height: 100%;
                        width: 100%;

                    }
                }
                .know{
                    width: 1.7rem;

                }
                .new{
                    width: 2.5rem;
                    .imgwarp{
                        height: 0.65rem;
                        width: 100%;
                        position: relative;
                    }
                    img{
                        height: 1.28rem;
                        width: 1.28rem;
                        position: absolute;
                        top: -0.7rem;
                        left: 50%;
                        margin-left: -0.69rem;

                    }
                }
                .my{
                    width: 1.7rem;

                }
                p{
                    height: 0.32rem;
                    line-height: 0.32rem;
                }
                .active{
                    color: #0160d0;
                }
            }
        }

    }
</style>