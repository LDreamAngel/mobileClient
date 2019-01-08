<template>
	<div class="newsTrends">
		<search :isBack='isBack'  id="commHed" :getList='getAllNews' ref='search'></search>
		<nav v-show="navList.length">
			<p :class="{active:categoryId==-1}">
				<span  @click="change(-1)">全部分类</span>
			</p>
			<p v-for="item in navList" :key="item.id" :class="{active:categoryId==item.id}">
				<span  @click="change(item.id)">{{item.name}}</span>
			</p>
		</nav>
		<div v-if="newsList.length" class="temp_style" :style="{ height: wrapperHeight + 'px' }"  style="overflow:scroll">
			<mt-loadmore 
			:auto-fill='false' 
			:top-method="loadTop" 
			:bottom-method="loadBottom" 
			:bottom-all-loaded="allLoaded" 
			ref="loadmore">
				<have-big-img v-if="list[0].start" :newsList="newsList"></have-big-img>
				<have-small-img v-else-if="list[1].start" :newsList="newsList"></have-small-img>
				<have-big-img v-else-if="list[0].start" :newsList="newsList"></have-big-img>
				<not-have-img v-else :newsList="newsList"></not-have-img>
				 <div slot="bottom" v-show="newsList.length > 16	" v-if="allLoaded" style="text-align: center;padding:5px 0 ;color:#666">暂无更多新闻</div> 
			</mt-loadmore>
		</div>
		<div v-else v-show="!loadBol" class="noNews">暂无新闻</div>
		<loading v-show="loadBol"></loading>
	</div>
</template>

<script>

import search from '../public/search';
import haveBigImg from './templates/haveBigImg';
import haveSmallImg from './templates/haveSmallImg';
import notHaveImg from './templates/notHaveImg';
import loading from '../public/loading'
import {wxjssdk} from '../../wxJsSdk/index.js'
import {getTenantSkin,newsList} from '../../api/news'

export default {
	name: 'newsTrends',
	data() {
		return {
			isBack:false,
			allLoaded:false,
			wrapperHeight:0,
			title: "新闻动态",
			navList: [],
			categoryId: "-1",
			flag: true,
			newsList: [],
			loadBol: false,
			limit:16,
			page:0,
			list: [{
				id: 1,
				start: false,
				name: 'have_big_img'
			},
			{
				id: 2,
				start: false,
				name: 'have_small_img'
			},
			{
				id: 3,
				start: false,
				name: 'notHaveImg'
			},
			],
		}
	},
	components: {
		search,
		haveBigImg,
		haveSmallImg,
		notHaveImg,
		loading,
	},
	methods: {
		change(id) {
			this.page = 0
			this.categoryId = id;
			this.allLoaded = false
			this.loadBol = true
			this.getAllNews(this.$refs.search.showData)
		},
		getAllNews() {//新闻
			this.newsList = [];
			let data = {
				limit: this.limit,
				offset: this.page * this.limit ,
				categoryId: this.categoryId == -1 ? "" : this.categoryId,
				title: this.$refs.search.showData || ''
			}
			newsList( data, r => {
				this.newsList = r.data.data
				if(r.data.data.length < this.limit){
					this.allLoaded = true
				}
				this.loadBol = false

			})
		},
		getLoadAllNews(type) {//上拉新闻
			let data = {
				limit: this.limit,
				offset: this.page * this.limit ,
				categoryId: this.categoryId == -1 ? "" : this.categoryId,
				title: this.$refs.search.showData || ''
			}
			newsList(data, r => {
				let data = r.data.data || []
				if(this.page == 0){
					this.newsList = data || []
					if(data.length < this.limit){
						this.allLoaded = true
					}
				}else{
					this.newsList.push(...data)
					if(this.newsList.length <= this.limit){
						this.allLoaded = true
					}
					if(data.length == 0){
						this.allLoaded = true
						this.wrapperHeight = document.documentElement.clientHeight - 90;
					}
				}
			})
			if(type=='top'){　　
				this.allLoaded = false
				this.$refs.loadmore.onTopLoaded();
				console.log(123123)
			}else if(type=='bottom'){
				console.log(123123)
				this.$refs.loadmore.onBottomLoaded();
			}
		},
		getTenantSkin() {//皮肤
			this.loadBol = true
			getTenantSkin(null,r=>{
				let data = r.data.data || {}
				this.navList = data.newsCategoryList
				this.list.forEach((item, index) => {
					if (data.newsSkins && item.name == data.newsSkins.template) {
						this.list[index].start = true
					}
				})
				this.getAllNews()
			})
		},
		loadTop() {
			this.page = 0
			this.getLoadAllNews('top')
		},
		loadBottom() {
			console.log(123)
			this.page+= 1
			this.getLoadAllNews('bottom')
		},
	},
	created() {
		this.$util.getUrlParam(this,'/index')
		this.getTenantSkin()
		// document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
		// 	// 通过下面这个API隐藏右上角按钮
		// 	WeixinJSBridge.call('hideOptionMenu');
		// });
	},
	mounted(){
		this.wrapperHeight = document.documentElement.clientHeight - 110;
		// this.getGroupTicket()
    	wxjssdk(location.href.split('#')[0],false,'')
	}
}
</script>

<style lang="scss" scoped>


.newsTrends {
	height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #eee;
  overflow: hidden;
  nav {
    width: 100%;
    height: 0.35rem;
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;
	overflow-x: scroll;
	position: relative;
	z-index: 999;
    p {
		flex: 1;
		white-space: nowrap;
		span {
			display: block;
			padding: 0 0.15rem;
			box-sizing: border-box;
			height: 100%;
			line-height: 0.35rem;
			font-size: 0.15rem;
			text-align: center;
		}
		&.active {
			color: #90222f;
			border-bottom: 1px solid #90222f;
		}
    }
  }
  .temp_style {
    flex: 1;
    width: 100%;
	margin-top: -16px;
	// padding-bottom: 16px;
	-webkit-overflow-scrolling:touch;
	.mint-loadmore-top{
		text-align: center;
	}
  }
  .sli {
    position: absolute;
  }
  .noNews{
	  padding-top: 20px;
	  color: #aaa;
	  text-align: center;
  }
}
</style>
