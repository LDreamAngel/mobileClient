<template>
	<div id="myRev">
		<div class="header">
			<search :isBack='isBack' :getList='getList' ref='search'></search>
		</div>
		<div class="wu" v-show="!loadBol" v-if="!list.length">
			暂无{{id == 1 ? '评论的新闻' : id == 2 ? '回复我的新闻': id == 3 ? '收藏的新闻' : id == 4 ? '点赞的新闻' : '数据' }}
		</div>
		<loading v-show="loadBol"></loading>
		<section class="content" v-if="list.length" :style="{ height: wrapperHeight + 'px' }" style="overflow:scroll">
			<mt-loadmore :auto-fill='false' :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
				<dl v-for="item in list" :key="item.id" @click="changeRouter(item.outlink,item.id,item.corp_id)">
					<dt><img :src="item.cover_image" alt=""></dt>
					<dd>
						<h2 class="ellipsis1">{{item.title}}</h2>
						<p>
							<span class="date_style">{{item.create_time.substr(0,16)}}</span>
						</p>
					</dd>
				</dl>
				<div slot="bottom" v-if="list.length<limit"></div>
				<div slot="bottom" v-if="allLoaded" class="wu">暂无更多数据</div>
			</mt-loadmore>
		</section>
	</div>
</template>

<script>
import search from "../public/search";
import loading from "../public/loading";
import { wxjssdk } from '../../wxJsSdk/index.js'

import {getMyCommentNewsList,getMyLikeNewsList,getMyStoreNewsList} from '../../api/news'

export default {
	name: "myRev",
	components: { search, scroll, loading },
	data() {
		return {
			isBack: true,
			allLoaded: false,
			wrapperHeight: 0,
			// title: "",
			list: [],
			id: this.$route.params.id,
			loadBol: true,
			limit: 15,
			page: 0
		};
	},
	methods: {
		//点赞
		getMyLikeNewsList(type, title) {
			let data = {
				limit: this.limit,
				offset: this.page * this.limit,
				title: title || ''
			};
			type ? (this.loadBol = '') : true;
			getMyLikeNewsList( data, r => {
				this.loadBol = false;
				this.assing(r.data.data);
			});
			this.updet(type);
		},
		//收藏
		getMyStoreNewsList(type, title) {
			let data = {
				limit: this.limit,
				offset: this.page * this.limit,
				title: title || ''
			};
			type ? (this.loadBol = "") : true;
			getMyStoreNewsList(data, r => {
				this.loadBol = false;
				this.assing(r.data.data);
			});
			this.updet(type);
		},
		//回复
		// getReplyMeNewsList(type, title) {
		// 	let data = {
		// 		limit: this.limit,
		// 		offset: this.page * this.limit,
		// 		title: title || ''
		// 	};
		// 	type ? (this.loadBol = "") : true;
		// 	this.$api.post("/app/news/getReplyMeNewsList", data, r => {
		// 		this.loadBol = false;
		// 		this.assing(r.data);
		// 	});
		// 	this.updet(type);
		// },
		//评论
		getMyCommentNewsList(type, title) {
			let data = {
				limit: this.limit,
				offset: this.page * this.limit,
				title: title || ''
			};
			type ? (this.loadBol = "") : true;
			getMyCommentNewsList(data, r => {
				this.loadBol = false;
				this.assing(r.data.data);
			});
			this.updet(type);
		},
		assing(data) {
			var data = data || []
			if (this.page == 0) {
				this.list = data;
				if (data.length == 0) {
					this.allLoaded = true
				}
			} else {
				this.list.push(...data);
				if (data.length == 0) {
					this.allLoaded = true;
				}
			}
		},
		changeRouter(outlink, id, corpId) {
			if (outlink.length) {
			} else {
				this.$router.push({ name: "contentDetails", params: { id, corpId } });
			}
		},
		getList(type, title) {
			if (this.id == 1) {
				this.getMyCommentNewsList(type, title);
			} else if (this.id == 2) {
				// this.getReplyMeNewsList(type, title);
			} else if (this.id == 3) {
				this.getMyStoreNewsList(type, title);
			} else if (this.id == 4) {
				this.getMyLikeNewsList(type, title);
			}
		},
		loadTop() {
			this.page = 0;
			this.getList("top");
			if (this.list.length < this.limit) {
				this.allLoaded = true;
			}
		},
		loadBottom() {
			this.page += 1;
			this.getList("bottom");
		},
		updet(type) {
			if (type == "top") {
				this.allLoaded = false;
				setTimeout(() => {
					this.$refs.loadmore.onTopLoaded();
				}, 1000);
			} else if (type == "bottom") {
				this.$refs.loadmore.onBottomLoaded();
			}
		}
	},
	mounted() {
		// this.changeTitle();
		this.wrapperHeight = document.documentElement.clientHeight;
		this.getList();
		wxjssdk(location.href.split('#')[0], false, '')
	},
	watch: {
		$route(to, from) {
			this.id = to.params.id
			this.getList();
		}
	}
};
</script>

<style lang="scss" scoped>
#myRev {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	background: #eee;
	.header {
		height: 0.45rem;
		position: relative;
		z-index: 1000;
	}
	.content {
		margin-top: -16px;
		flex: 1;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
		background: #eee;
		dl {
			height: 0.9rem;
			box-sizing: border-box;
			margin-top: 2px;
			display: flex;
			padding: 0.15rem;
			background: #fff;
			justify-content: space-between;
			align-items: center;
			dt {
				width: 0.6rem;
				height: 0.6rem;
				img {
					width: 0.6rem;
					height: 0.6rem;
				}
			}
			dd {
				width: 100%;
				height: 100%;
				text-align: left;
				margin-left: 0.15rem;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				h2 {
					text-align: left;
					font-size: 14px;
					color: #484848;
					font-weight: 500;
					font-family: "PingFangSC-Semibold", sans-serif;
				}
				p {
					text-align: right;
					color: #8b8b8b;
				}
			}
		}
		.nodata {
			display: block;
			width: 100%;
			margin: 0 auto;
			text-align: center;
			font-size: 14px;
			line-height: 60px;
		}
	}
	.date_style {
		font-size: 12px;
	}
	.slide {
		position: absolute;
		top: 0.45rem;
	}
	.wu {
		padding-top: 10px;
		text-align: center;
		color: #aaa;
	}
}
</style>
