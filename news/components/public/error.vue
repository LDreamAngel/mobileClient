<template>
    <section class='error'>
        <div class="content">
            <div class="box">
                <p class="p1">浩瀚宇宙一片虚无，您这是要奔哪去</p>
                <img src="../../assets/images/error.png" alt="">
                <p class="p2">没有找到您要浏览的页面</p>
                <p class="p3">滚滚长江东逝水，浪花淘尽英雄</p>
                <p class="p4">是非成败转头空，青山依旧在，几度夕阳红</p>
                <div class="btn">
                    <span id="goBack" @click="$router.push({name:'newsTrends'})">返回首页</span>
                    <!-- <span id="consult">咨询客服</span> -->
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'error',
    data() {
        return {

        }
    }
}
</script>

<style  lang='scss' scoped>
section {
    height: 100%;
    background: #eeeeee;
    .content {
        height: 100%;
        width: 100%;
        margin: 0 auto;
        .box {
            width: 100%;
            margin: 0 auto;
            text-align: center;
            position: relative;
            top: 50%;
            transform: translateY(-50%);
            img {
                width: 2.9rem;
            }
            .p1 {
                font-size: 0.16rem;
                font-weight: 500;
                color: #444444;
                margin: 0 0 0.18rem;
            }
            .p2 {
                font-size: 0.14rem;
                color: #969696;
            }
            .p3 {
                color: #d0d0d0;
                font-size: 0.12rem;
                margin-top: 0.16rem;
            }
            .p4 {
                color: #d0d0d0;
                font-size: 0.12rem;
                margin-top: 0.1rem;
                margin-bottom: 0.2rem;
            }
            .btn {
                height: 32px;
                span {
                    display: inline-block;
                    height: 0.32rem;
                    width: 0.96rem;
                    color: #f3c2c2;
                    background: #cc0000;
                    margin: 0 0.16rem;
                    line-height: 0.32rem;
                    border-radius: 0.16rem;
                    font-size: 12px;
                }
            }
        }
    }
}
</style>
