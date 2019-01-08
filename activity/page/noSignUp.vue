<template>
    <div class="signUp">
        <header>
            <p class="back" @click="$router.back()"></p>
            <span>活动内容</span>
            <p class="btn">报名</p>
        </header>
        <section>
            <div class="banner">
                <img src="../assets/images/title.png" alt="">
                <p class="favorite">
                    <img v-if="isCollect" @click="isCollect=!isCollect" src="../assets/images/a-collect.png" alt="">
                    <img v-else @click="isCollect=!isCollect" src="../assets/images/s-collect.png" alt="">
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
                <h4>前轱辘不转后顾轮一定转的大型研讨会</h4>
                <p>自爱人尅是你的和封闭式的借口不错符文是谁都不是的速度度假的财富日是一个 不规范的属性它没有出现在 CSS 规范草案中。限制在一个块元素显示的文本的行数。 为了实现该效果，它需要组合其他外来的WebKit属性。常见结合属性：
                </p>
            </div>
            <div class="willNum">
                <div class="number">
                    <p>526人<span>已报名</span></p>
                    <p class="blue"></p>
                </div>
                <div class="icons">
                    <div v-for="item in 10" :key="item.id">
                        <img src="../assets/images/title.png" alt="">
                    </div>
                </div>
            </div>
            <div class="messageGroup">
                <p>北京市朝阳区新源南路6号京城大厦B303</p>
                <p class="site"></p>
            </div>
            <div class="messageGroup">
                <p style="color: #ccc;">活动时间</p>
                <p>2018.07.11 13:06 - 2018.08.11 24:00</p>
            </div>
            <div class="messageGroup">
                <p style="color: #ccc;">报名截止时间</p>
                <p>2018.07.24 24:00</p>
            </div>
            <div class="messageGroup">
                <p style="color: #ccc;">联系人</p>
                <div class="linkMan">
                    <p>冯春妹</p>
                    <p class="site phone"></p>
                    <p class="site letter"></p>
                </div>
            </div>
            <div class="addGroup">
                <p>我要报名</p>
            </div>
            <!-- <ul>
                <li class="number" >
                    <p>256人<span>评论</span></p>
                    <div>
                        全部
                        <p class="blue"></p>
                    </div>
                </li>
                <li v-for="i in 1" :key="i.id">
                    <div>
                        <img src="../assets/images/title.png" alt="">
                    </div>
                    <dl>
                        <dt>周为昊：</dt>
                        <dd>和本次生产地的打火机就奇偶的答复你和你先吃饭吧北京房产你的从v尽可能次日人不和本次生产地的打火机就奇偶的答复你和你先吃饭吧北京房产你的从v尽可能次日人不</dd>
                        <dd>
                            <p style=" color: #d8d8d8;">2018-07-02</p>
                            <p style=" color: #0060d0;">展开</p>
                        </dd>
                    </dl>
                </li>
            </ul> -->
        </section>
        <!-- <footer>
            <input type="text" placeholder="有什么想要说的？">
            <p class="say"></p>
        </footer> -->
    </div>
</template>

<script>
    export default {
        name: "no-sign-up",
        data(){
            return{
                isCollect:true,
            }
        }
    };
</script>

<style scoped lang="scss">
    .signUp {
        height: 100%;
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        header {
            height: 0.9rem;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #fff;
            color: #0060D0;
            border-bottom: 1px solid #eee;
            font-size: 0.32rem;
            position: relative;
            .back {
                position: absolute;
                left: 0.3rem;
                height: 0.2rem;
                width: 0.2rem;
                border-top: solid 2px #fff;
                border-left: solid 2px #fff;
                transform: rotate(-45deg);
            }
            .btn {
                position: absolute;
                right: 0.2rem;
                width: 1.1rem;
                height: 0.5rem;
                line-height: 0.5rem;
                text-align: center;
                background-color: #ff9d00;
                border-radius: 0.25rem;
                box-shadow: 0 4px 0 #004ca6;
                font-size: 0.24rem;
            }
        }

        section {
            flex: 1;
            width: 100%;
            height: auto;
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
            .messageGroup {
                margin-bottom: 1px;
                padding: 0.35rem 0.3rem;
                background-color: white;
                display: flex;
                justify-content: space-between;
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
                .linkMan {
                    display: flex;
                    align-items: center;
                    p {
                        margin-left: 0.65rem;
                    }
                }
            }
            .addGroup {
                padding-top: 0.3rem;
                padding-bottom: 0.5rem;
                p {
                    margin: auto;
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
                    >div{
                        margin-right: 0.3rem;
                        img{
                            width: 1rem;
                            height: 1rem;
                            border-radius: 50%;
                        }
                    }
                    >dl{
                        font-size: 0.2rem;
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