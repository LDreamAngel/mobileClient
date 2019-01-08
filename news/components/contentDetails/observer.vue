<template>
	<div class="observer">
		<div class="content" :style="{ height: wrapperHeight + 'px' }" style="overflow:scroll">
			<mt-loadmore :auto-fill='false' :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
				<news-comment ref="newsComment" :newsCommentList='newsCommentList' :isdelComment='isdelComment' :remove='remove'></news-comment>
				<div slot="bottom" v-if="newsCommentList.length<limit"></div>
			</mt-loadmore>
		</div>
		<loading v-show="loadBol"></loading>
		<footer :class="[issue ? 'textBig':'']">
			<a class="return" @click="$router.go(-1)"></a>
			<textarea  style="resize:none"  v-model="commentIssue" :class="[issue ? 'text':'']" @blur="blur" @focus="focus" type="text" placeholder="整点啥不？"></textarea>
			<p @click="submit" v-if="issue" :class="[activeIssue ? 'activeIssue':'']" class="issue">发布</p>
		</footer>
	</div>
</template>
<script>
import newsComment from "./newsComment";
import loading from "../public/loading";
import { wxjssdk } from '../../wxJsSdk/index.js'
import { newsCommentList,remove,commentNews } from '../../api/news'

export default {
	name: "observer",
	components: { newsComment, loading },
	data() {
		return {
			isdelComment:true,
			allLoaded: false,
			wrapperHeight: 0,
			commentIssue: '',
			issue: false,
			activeIssue: false,
			newsCommentList: [],
			loadBol: false,
			limit: 15,
			page: 0
		};
	},
	methods: {
		getNewsCommentList() {//获取评论
			this.newsCommentList = [];
			let data = {
				limit: this.limit,
				offset: this.page * this.limit,
				newsId: this.$route.params.id,
				corpId: this.$route.params.corpId
			};
			this.loadBol = true;
			newsCommentList(data, r => {
				this.newsCommentList = r.data.data || [];
				this.loadBol = false;
			});
		},
		//删除评论
		remove(id) {
			let data = {
				id,
				corpId: this.$route.params.corpId
			};
			this.isdelComment = false
			remove(data, r => {
				this.isdelComment = true
				this.newsCommentList.forEach((r, index) => {
					if (r.id == id) {
						this.newsCommentList.splice(index, 1);
					}
				});
			});
		},
		//获取更多评论
		getLoadNewsCommentList(type) {
			let data = {
				limit: this.limit,
				offset: this.page * this.limit,
				newsId: this.$route.params.id,
				corpId: this.$route.params.corpId
			};
			newsCommentList(data, r => {
				if (this.page == 0) {
					this.newsCommentList = r.data.data || [];
				} else {
					this.newsCommentList.push(...r.data.data || []);
					if (r.data.length == 0) {
						this.allLoaded = true;
					}
				}
			});
			if (type == "top") {
				this.allLoaded = false;
				this.$refs.loadmore.onTopLoaded();
			} else if (type == "bottom") {
				this.$refs.loadmore.onBottomLoaded();
			}
		},
		loadTop() {
			this.page = 0;
			this.getLoadNewsCommentList("top");
		},
		loadBottom() {
			this.page += 1;
			this.getLoadNewsCommentList("bottom");
		},
		focus() {//得焦
			this.issue = true;
			this.wrapperHeight = document.documentElement.clientHeight - 75;
		},
		blur() {//失焦
			if (this.commentIssue) {
				return;
			}
			this.wrapperHeight = document.documentElement.clientHeight - 25;
			this.issue = false;
			this.activeIssue = false;
		},
		submit() { //发布
			if (this.activeIssue) {
				let data = {
					newsId: this.$route.params.id,
					content: this.commentIssue,
					corpId: this.$route.params.corpId
				};
				commentNews(data, r => {
					this.getNewsCommentList();
					this.$refs.newsComment.isHeight();
				});
				this.commentIssue = "";
				this.blur()
			}
		},
	},
	mounted() {
		this.wrapperHeight = document.documentElement.clientHeight - 15;
		this.getNewsCommentList();
		wxjssdk(location.href.split('#')[0], false, '')
	},
	updated() {
		if (this.commentIssue.length) {
			this.activeIssue = true;
		}
	}
};
</script>
<style lang="scss" scoped>
.comm_del {
	position: absolute;
	top: 0.44rem !important;
}

.observer {
	display: flex;
	flex-direction: column;
	.content {
		flex: 1;
		overflow: auto;
		margin-top: -20px;
	}
	footer {
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		height: 0.45rem;
		width: 100%;
		background: #fff;
		padding-left: 0.14rem;
		line-height: 0.45rem;
		font-size: 12px;
		.return {
			position: absolute;
			bottom: 0.18rem;
			left: 0.16rem;
			border-left: 2px solid #cecece;
			border-top: 2px solid #cecece;
			transform: rotate(-45deg);
			display: inline-block;
			cursor: pointer;
			width: 8px;
			height: 8px;
		}
		textarea {
			position: absolute;
			top: 50%;
			left: 0.39rem;
			transform: translateY(-50%);
			padding-left: 0.1rem;
			height: 0.2rem;
			line-height: 0.2rem;
			width: 3.06rem;
			border-radius: 0.125rem;
			border: 1px solid #cccccc;
			color: #aaa;
		}
		.text {
			height: 0.72rem;
			width: 2.6rem;
		}
		.issue {
			font-size: 15px;
			color: #ccc;
			float: right;
			position: absolute;
			right: 0.15rem;
			bottom: 0rem;
		}
		.activeIssue {
			font-weight: 600;
			color: #26aff7;
		}
	}
	.textBig {
		height: 0.96rem !important;
	}
}
</style>
