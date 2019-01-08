<template>
	<div class="newFile">
		<mt-datetime-picker ref="picker" type="datetime" :startDate="new Date()" @confirm="getTime" v-model="currentTime">
		</mt-datetime-picker>
		<header>
			<span class="back" @click="goback">
				<img src="@/assets/images/left.svg" alt="">
			</span>
			<div class="btnActive" @click="publish">
				<span style="color:#fff">
					发布
				</span>
			</div>
			新建活动
		</header>
		<section>
			<div class="itemTop">
				<div class="upload">
					<!-- v-if="!isUploadImg" <img class="addedImg" v-show="isUploadImg" :src="coverImg" ref="coverImg" alt="" > -->
					<img :class="[isUploadImg?'addedImg':'addImg']" :src="coverImg" ref="coverImg" alt="">
					<input ref="input_img" @change="uploadImg" type="file" accept="image/*">
				</div>
				<p ref="imgDes">添加封面图片</p>
			</div>
			<div class="itemTitle">
				<label for="title" ref="req_title">活动名称</label>
				<input type="text" v-model="formData.title" maxlength="36" ref="title" id="title" name="title" placeholder="编辑活动名称，不能超过36个字符">
			</div>
			<div class="itemTitle">
				<label for="description" ref="req_des">活动描述</label>
				<input type="text" v-model="formData.description" maxlength="72" ref="description" id="description" name="description" placeholder="简单描述活动摘要，不能超过72个字符">
			</div>
			<div class="itemArea content">
				<textarea ref="content" v-model="formData.content" maxlength="10000" placeholder="详细填写活动内容，让更多的人参与其中...">
				</textarea>
			</div>
			<!-- <div class="activityPic">
                <div class="activityPicTitle">
                    活动图片<span>最多支持上传9张图片</span>
                </div>
                <div class="activityPicShow">
                    <div class="activityPicShowWarp">
                        <img src="@/assets/images/user.png" alt="" v-for="(list,index) in 0" :key="index">
                        <span class="btn">
                            <img src="@/assets/images/addPic.png" alt="">
                            <input type="file"
                                   minlength="multiple"
                                   accept="image/*">
                        </span>
                    </div>
                </div>
            </div> -->
			<div class="itemTime">
				<div class="beginTime" @click="setStartTime">
					<span ref="req_startDate">活动开始时间</span>
					<a href="javascript:;">
						{{formData.startDate.substr(0,16)}}
						<img src="@/assets/images/right.svg" alt="">
					</a>
				</div>
				<div class="endTime" @click="setEndTime">
					<span ref="req_endDate">活动结束时间</span>
					<a href="javascript:;">
						<span v-if="formData.endDate.length==0">选择时间</span>
						<span v-else>{{formData.endDate.substr(0,16)}}</span>
						<img src="@/assets/images/right.svg" alt="">
					</a>
				</div>
			</div>
			<div class="itemEdit" ref="address">
				<label for="edit" ref="req_address">活动地址</label>
				<input type="text" id="edit" maxlength="36" v-model="formData.address" name="edit" placeholder="编辑活动地址">
			</div>
			<div class="contacts" v-for="(item,index) in contacts" :key="index">
				<div class="contactsName">
					<label for="contactsName" ref="req_name">联系人</label>
					<input type="text" id="contactsName"  v-model="item.name" name="contactsName" placeholder="输入联系人姓名">
				</div>
				<div class="contactsPhone">
					<label for="contactsPhone" ref="req_phone">联系方式</label>
					<input type="number" @input="islength(item.phone)" @blur="verifyPhone(item.phone)" id="contactsPhone" v-model="item.phone" name="contactsPhone" placeholder="输入联系人可用方式">
				</div>
			</div>
			<div ref="req_range" class="sendRange">
				<span>发送范围</span>
				<a class="con ellipsis" href="javascript:;" @click="showAddressBook('all',sendrange)">
					<template v-for="(item,index) in sendrange">
						<b v-if="index!=0" :key="item.id">，</b>{{item.name}}
					</template>
				</a>
				<a class='img'>
					<img src="@/assets/images/right.svg" alt="">
				</a>

			</div>
			<div class="more">
				<!--  @click="goSenior" -->
				<!-- <div> -->
				<span>高级选项</span>
				<a href="javascript:;">
					<!-- <img src="@/assets/images/right.svg" alt=""> -->

					<switchbtn @on-click="moreOptions"></switchbtn>
				</a>
				<!-- </div> -->
			</div>
			<section>
				<div class="more-options" v-show="this.isMore">
					<div class="more-time">
						<!-- @click="showDatePicker" -->
						<div class="endTime" @click="setRegStartTime">
							<span ref="req_registrationStartDate">报名开始时间</span>
							<a href="javascript:;">
								{{formData.registrationStartDate.substr(0,16)}}
								<img src="@/assets/images/right.svg" alt="">
							</a>
						</div>
						<div class="endTime" @click="setdeadLineTime">
							<span ref="req_deadLine">报名截止时间</span>
							<a href="javascript:;">
								{{formData.deadLine.substr(0,16)}}
								<img src="@/assets/images/right.svg" alt="">
							</a>
						</div>
						<div class="num">
							<label for="num">人数限制</label>
							<input type="number" id="num" v-model="max" name="num" placeholder="不填写即不设置上限">
						</div>
					</div>
					<div class="sure">
						<div class="needSure ">
							<span>需要审批</span>
							<a href="javascript:;">
								<switchbtn @on-click="verifyBtnCall"></switchbtn>
							</a>
						</div>
						<transition>
							<div ref="req_sendRange" v-show="verify" class="needSurePop sendRange">
								<span>审批人</span>
								<a class="con ellipsis" href="javascript:;" @click="showAddressBook('mem',surePop)">
									<template v-for="(item,index) in surePop">
										<b v-if="index!=0" :key="item.id">，</b>{{item.name}}
									</template>
								</a>
								<a href="javascript:;">
									<img src="@/assets/images/right.svg" alt="">
								</a>
							</div>
						</transition>
					</div>
					<!--<div class="share">-->
						<!--<div class="needShare">-->
							<!--<span>允许分享</span>-->
							<!--<a href="javascript:;">-->
								<!--<switchbtn @on-click="shareBtnCall"></switchbtn>-->
							<!--</a>-->
						<!--</div>-->
					<!--</div>-->
				</div>
			</section>
			<div class="sendBtn">
				<button @click="publish">发布</button>
			</div>
		</section>
		<addressBook v-if="isShowAddressBook" :showAddressBook='showAddressBook' :selectData='selectData' :selectClass='selectClass'></addressBook>
	</div>
</template>

<script>
import addressBook from "./addressBook";
import { wxjssdk } from "@/wxJsSdk/index.js";
import coverImg from "../assets/images/addPic.png";
import { formatDate } from "../filters/DateFilter";
import "mint-ui/lib/style.css";
import { releaseActiveityDetails, upload } from "../api/activity";
import switchbtn from "@/component/switchButton";
import {
	photoCompress,
	dataURLtoFile,
	convertBase64UrlToBlob
} from "../common/js/imgCompress.js";
export default {
	name: "new-file",
	components: {
		switchbtn,
		addressBook
	},
	data() {
		return {
			coverImg,
			currentTime: "",
			buttonType: "",
			isMore: false,
			share: false, //是否分享
			verify: false, // 是否审批
			max: "", //报名人数
			otherOptions: "",
			contacts: [{ name: "", phone: "", status: false, btn: false }],
			sendrange: [], //发送范围综合
			surePop: [], // 审批人综合
			sendOrganizationDetailtest: [],
			sendRangeDetailtest: [],
			verifyUserDetail: [], //审批人详情
			formData: {
				startDate: formatDate(new Date(), "yyyy-MM-dd hh:mm:ss"), //开始时间
				endDate: "", //结束时间
				images: "", //封面图片
				title: "", //活动名称
				description: "", //活动描述
				content: "", //活动详情
				address: "", // 活动地址
				contactUser: "",
				status: "ENROLMENT",
				registrationStartDate: formatDate(new Date(), "yyyy-MM-dd hh:mm:ss"), //报名开始时间
				deadLine: "", // 报名截止时间
				sendRange: "", // 推送范围的选择
				sendRangeDetail: [], // 推送范围的详细信息
				sendOrganization: "", // 推送范围的机构
				sendOrganizationDetail: [], // 推送范围机构的详情
				share: false, //是否分享
				verify: false, // 是否审批
				verifyUserDetail: [], //审批人详情
				verifyUserId: "" //审批人id
			},
			isrequire: true,
			requierView: "",
			isUploadImg: false,
			isApply: false,
			isverifyPhone: true,
			selectData: [], //选择的成员部门信息
			selectClass: "all", //选择成员 or 部门  dep  部门  all 所有  mem  成员
			isShowAddressBook: false
		};
	},
	methods: {
		showAddressBook(type, data) {
			this.isShowAddressBook = !this.isShowAddressBook
			if (type === null) {
				return
			}
			if (type) {
				this.selectClass = type
				if (type == 'mem') {
					this.surePop = data
					this.selectData = data
				} else {
					this.selectData = data
					this.sendrange = data
				}
			}
		},
		goback() {
			this.$router.push({
				name: "list"
			});
		},
		goSenior() {
			//跳转到高级选项页面的时候需要将formData传递过去，返回的时候再带回来
			this.$router.push({
				name: "senior",
				params: { data: this.formData }
			});
		},
		// 高级选项
		moreOptions(index) {
			this.isMore = index;
		},
		// 上传封面图片
		uploadImg(event) {
			let _this = this;
			let fileImg = event.target.files[0];
			this.readImg(fileImg);
			let imgdata = new FormData();
			let filename = fileImg.name;
			// 图片大于1M压缩后在上传
			if (fileImg.size / 1024 > 1025) {
				photoCompress(fileImg, { quality: 0.1 }, function (base64Codes) {
					_this.isUploadImg = true;
					let file = dataURLtoFile(base64Codes, filename);
					imgdata.append("imgFile", file);
					upload(imgdata).then(res => {
						if (!res) {
							_this.$toast("图片上传失败，可能图片太大");
						}
						if (res.data.code == 0) {
							_this.$toast("图片上传成功");
							_this.isUploadImg = true;
							_this.formData.images = res.data.data;
							return;
						}
					});
				});
			} else {
				imgdata.append("imgFile", fileImg);
				upload(imgdata).then(res => {
					if (!res) {
						_this.$toast("图片上传失败");
					}
					if (res.data.code == 0) {
						this.$toast("图片上传成功");
						this.isUploadImg = true;
						this.formData.images = res.data.data;
					}
				});
			}
		},
		// 读取本地图片并显示
		readImg(file) {
			let _this = this;
			var reader = new FileReader(); //读取客户端上的文件
			reader.readAsDataURL(file);
			reader.onload = function () {
				var url = reader.result;
				_this.coverImg = url;
			};
		},
		//设置活动开始时间
		setStartTime() {
			this.$refs.picker.open();
			this.buttonType = "start";
		},
		// 设置活动结束之间
		setEndTime() {
			this.$refs.picker.open();
			this.buttonType = "end";
		},
		// 报名开始时间
		setRegStartTime() {
			this.$refs.picker.open();
			this.buttonType = "RegStart";
		},
		// 报名结束时间
		setdeadLineTime() {
			this.$refs.picker.open();
			this.buttonType = "deadLine";
		},
		// 点击日期插件上的确定调用的方法
		getTime() {
			if (!this.currentTime) return;
			if (this.buttonType === "start") {
				this.formData.startDate = formatDate(
					this.currentTime,
					"yyyy-MM-dd hh:mm:ss"
				);
			} else if (this.buttonType === "end") {
				this.formData.endDate = formatDate(
					this.currentTime,
					"yyyy-MM-dd hh:mm:ss"
				);
			} else if (this.buttonType === "RegStart") {
				this.formData.registrationStartDate = formatDate(
					this.currentTime,
					"yyyy-MM-dd hh:mm:ss"
				);
			} else if (this.buttonType === "deadLine") {
				this.formData.deadLine = formatDate(
					this.currentTime,
					"yyyy-MM-dd hh:mm:ss"
				);
			}
		},
		// 发布
		publish() {
			if (this.isApply) return;
			this.isApply = true;
			if (!this.isUploadImg) {
				//图片是否上传
				this.isrequire = false;
				this.requierView = this.$refs.coverImg;
				this.$refs.imgDes.style.color = "#c00";
			} else {
				this.$refs.imgDes.style.color = "#888";
			}

			if (this.formData.title === "") {
				//标题是否填写
				if (this.isrequire === true) {
					this.isrequire = false;
					this.requierView = this.$refs.title;
				}
				this.$refs.req_title.style.color = "#c00";
			} else {
				this.$refs.req_title.style.color = "#888";
			}
			if (this.formData.content === "") {
				//活动详情是否填写
				if (this.isrequire === true) {
					this.isrequire = false;
					this.requierView = this.$refs.content;
				}
				this.$refs.content.style.border = "#c00 1px solid";
			} else {
				this.$refs.content.style.border = "none";
			}
			if (this.formData.startDate === "") {
				//活动开始时间是否设置
				if (this.isrequire === true) {
					this.isrequire = false;
					this.requierView = this.$refs.req_startDate;
				}
				this.$refs.req_startDate.style.color = "#c00";
			} else {
				this.$refs.req_startDate.style.color = "#888";
			}
			if (this.formData.endDate === "") {
				//活动结束时间是否设置
				if (this.isrequire === true) {
					this.isrequire = false;
					this.requierView = this.$refs.req_endDate;
				}
				this.$refs.req_endDate.style.color = "#c00";
			} else {
				this.$refs.req_endDate.style.color = "#888";
			}
			if (this.formData.address === "") {
				//活动地址是否填写
				if (this.isrequire === true) {
					this.isrequire = false;
					this.requierView = this.$refs.req_address;
				}
				this.$refs.req_address.style.color = "#c00";
			} else {
				this.$refs.req_address.style.color = "#888";
			}
			if (this.contacts[0].phone === "") {
				//联系方式是否填写
				if (this.isrequire === true) {
					this.isrequire = false;
					this.requierView = this.$refs.req_phone;
				}
				this.$refs.req_phone[0].style.color = "#c00";
			} else {
				this.$refs.req_phone[0].style.color = "#888";
			}
			if (this.contacts[0].name === "") {
				//联系人是否填写
				if (this.isrequire === true) {
					this.isrequire = false;
					this.requierView = this.$refs.req_name;
				}
				this.$refs.req_name[0].style.color = "#c00";
			} else {
				this.$refs.req_name[0].style.color = "#888";
			}
			if (this.formData.registrationStartDate === "") {
				//报名开始时间是否填写
				if (this.isrequire === true) {
					this.isrequire = false;
					this.requierView = this.$refs.req_registrationStartDate;
				}
				this.$refs.req_registrationStartDate.style.color = "#c00";
			} else {
				this.$refs.req_registrationStartDate.style.color = "#888";
			}
			if (this.formData.deadLine === "") {
				//报名结束时间是否填写
				if (this.isrequire === true) {
					this.isrequire = false;
					this.requierView = this.$refs.req_deadLine;
				}
				this.$refs.req_deadLine.style.color = "#c00";
			} else {
				this.$refs.req_deadLine.style.color = "#888";
			}
			
			//设置发送范围
			var arrpro = [],
				arrdep = [];
			if(!this.sendrange.length){
				if (this.isrequire === true) {
					this.isrequire = false;
					this.requierView = this.$refs.req_range;
				}
				this.$refs.req_range.style.color = "#c00";
			} else {
				this.$refs.req_range.style.color = "#888";
			}
			this.sendrange.forEach((item, index) => {
				if (item.userId) {
					arrpro.push(item.userId);
					this.sendRangeDetailtest.push({
						id: item.id,
						name: item.name,
						num: "2",
						_id: item.userId
					});
				} else if (item.depId) {
					arrdep.push(item.depId);
					this.sendOrganizationDetailtest.push({
						id: item.id,
						name: item.name,
						num: "1",
						_id: item.depId
					});
				}
			});
			this.formData.sendRange = arrpro.join();
			this.formData.sendOrganization = arrdep.join();
			this.formData.sendRangeDetail = JSON.stringify(this.sendRangeDetailtest);
			this.formData.sendOrganizationDetail = JSON.stringify(
				this.sendOrganizationDetailtest
			);
			//审批人
			var arr = [];
			if (this.verify) {
				if(!this.surePop.length){
					if (this.isrequire === true) {
						this.isrequire = false;
						this.requierView = this.$refs.req_sendRange;
					}
					this.$refs.req_sendRange.style.color = "#c00";
				} else {
					this.$refs.req_sendRange.style.color = "#888";
				}
				this.surePop.forEach((item, index) => {
					arr.push(item.userId);
					this.verifyUserDetail.push({
						id: item.id,
						name: item.name,
						num: "1",
						_id: item.userId
					});
				});
			}
			this.formData.verifyUserId = arr.join();
			this.formData.verifyUserDetail = JSON.stringify(this.verifyUserDetail);
			if (this.isrequire === false) {
				this.$toast("请补全活动信息");
				this.requierView.scrollIntoView();
				this.isApply = false;
				this.isrequire = true;
				return;
			}
			if (this.isverifyPhone === false) {
				this.$toast("手机号不合法");
				this.isApply = false;
				return;
			}
			if (this.isMore) {
				this.formData.share = this.share;
				this.formData.verify = this.verify;
				this.formData.max = this.max;
			}

			this.formData.contactUser = JSON.stringify(this.contacts);

			releaseActiveityDetails(0, this.formData).then(res => {
				if (res.data.code === 0) {
					this.$router.push({ name: "list" });
					this.$toast('发布成功');
				} else {
					this.$toast('发布失败');
					this.isApply = false;
					console.log(res)
				}
			});
		},
		// 设置截止时间的默认值
		setDeadline() {
			let date = new Date();
			if (date.getMonth() < 12) date.setMonth(date.getMonth() + 1);
			else date.setYear(date.getFullYear() + 1);
			this.formData.deadLine = formatDate(date, "yyyy-MM-dd hh:mm:ss");
			this.formData.endDate = formatDate(date, "yyyy-MM-dd hh:mm:ss");
		},
		verifyBtnCall(index) {
			this.verify = index;
		},
		shareBtnCall(index) {
			this.share = index;
		},
		// 手机号的校验
		verifyPhone(phoneNum) {
			this.isverifyPhone = false;
			const reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
			if (reg.test(phoneNum)) {
				this.isverifyPhone = true;
			} else {
				this.$toast("手机号不合法");
				return;
			}
		},
		islength(phoneNum) {
			if (phoneNum.length > 11) {
				this.contacts[0].phone = phoneNum.substr(0, 11);
				this.$toast("手机号不能超过11位");
				return;
			}
		}
	},
	created() {
		this.setDeadline();
	},
	mounted() {
		if (JSON.stringify(this.$route.params) !== "{}") {
			this.formData = this.$route.params.baseOptions;
			let otherOptions = this.$route.params.otherOptions;
			for (var i in otherOptions) {
				this.formData[i] = otherOptions[i];
			}
			if (this.formData.coverImg != "") {
				this.coverImg = this.formData.images;
			}
		}
		wxjssdk(location.href.split("#")[0], false, "");
	},
	watch: {
		formData: {
			handler: function () {
				if (this.formData.title.length >= 36) {
					this.$toast('活动名称，不能超过36个字符')
				}
				if (this.formData.description.length >= 72) {
					this.$toast('活动描述，不能超过72个字符')
				}
				if (this.formData.address.length >= 36) {
					this.$toast('活动地址，不能超过36个字符')
				}
				if (this.formData.content.length >= 10000) {
					this.$toast('活动内容，不能超过10000个字符')
				}
				if (this.formData.content.length >= 10000) {
					this.$toast('活动内容，不能超过10000个字符')
				}
			},
			deep: true
		},
		contacts:{
			handler:function (val) {
				var username = /^[\u4E00-\u9FA5]+$/;
				val.forEach(r=>{
					if(!username.test(r.name)){
						this.$toast('请使用中文名字')
						r.name= ''
					}
					if(r.name.length > 10){
						this.$toast('名称字数不能超过10个字')
						r.name = r.name.substr(0,10)
					}
				})
			},
			deep:true
		},
		max() {
			if (this.max >= 5000) {
				this.max = 5000
				this.$toast('人数最大限制为5000人')
			}
		}
	}
};
</script>

<style scoped lang="scss">
.newFile {
    height: 100%;
    display: flex;
    flex-direction: column;
    header {
        height: 0.9rem;
        line-height: 0.9rem;
        text-align: center;
        background: #fff;
        color: #0060d0;
        font-size: 0.32rem;
        position: relative;
        border-bottom: 1px solid #eee;
        .back {
            position: absolute;
            top: 0;
            left: 0;
            height: 0.9rem;
            width: 0.72rem;
            img {
                height: 0.9rem;
                width: 0.36rem;
            }
        }
        .btnActive {
            position: absolute;
            top: 0;
            right: 0;
            span {
                margin-top: 0.2rem;
                margin-right: 0.2rem;
                height: 0.5rem;
                line-height: 0.5rem;
                width: 1.1rem;
                display: inline-block;
                box-shadow: 0 3px 0 0px rgba(0, 0, 0, 0.1);
                background: #ff9d00;
                border-radius: 0.25rem;
            }
        }
    }
    section {
        flex: 1;
        overflow-y: auto;
        color: #888888;
        font-size: 0.28rem;
        .itemTop {
            height: 4rem;
            // padding-top: 0.98rem;
            // padding-top: 0.1rem;
            border-bottom: 1px solid #eeeeee;
            text-align: center;
            background: #fff;
            position: relative;
            .upload {
                width: 100%;
                height: 100%;
                position: absolute;
                .addImg {
                    left: 50%;
                    top: 1rem;
                    transform: translateX(-50%);
                    height: 80px;
                    width: 80px;
                    position: absolute;
                }
                .addedImg {
                    width: 100%;
                    height: 100%;
                    left: 0;
                    top: 0;
                    position: absolute;
                }
                input {
                    opacity: 0;
                    position: absolute;
                    transform: translateX(-50%);
                    height: 100%;
                    width: 100%;
                    left: 50%;
                }
            }

            p {
                padding-top: 2.9rem;
                height: 0.76rem;
                line-height: 0.76rem;
            }
        }
        .itemTitle {
            height: 0.38rem;
            padding: 0.3rem 0;
            border-bottom: 1px solid #eeeeee;
            background: #fff;
            label {
                line-height: 0.38rem;
                padding: 0 0.3rem;
                width: 1.2rem;
                display: inline-block;
            }
            input {
                height: 0.38rem;
                width: 5.3rem;
                padding-left: 0.05rem;
                border: none;
                outline: none;
            }
        }
        .itemArea {
            padding: 0.3rem;

            background: #fff;
            textarea {
                height: 1.4rem;
                width: 100%;
                line-height: 0.42rem;
                resize: none;
                border: none;
                outline: none;
            }
        }
        .content {
            margin-bottom: 0.3rem;
        }
        .activityPic {
            height: 2.8rem;
            background: #fff;
            border-bottom: 1px solid #eeeeee;
            padding-left: 0.3rem;
            .activityPicTitle {
                line-height: 0.98rem;
                height: 0.88rem;
                span {
                    padding-left: 0.1rem;
                    color: #cccccc;
                    font-size: 0.24rem;
                }
            }
            .activityPicShow {
                overflow: hidden;
                white-space: nowrap;
                img {
                    height: 1.6rem;
                    width: 1.6rem;
                    margin-right: 0.2rem;
                }
                .btn {
                    height: 1.6rem;
                    width: 1.6rem;
                    position: relative;
                    display: inline-block;
                    input {
                        height: 1.6rem;
                        width: 1.6rem;
                        position: absolute;
                        top: 0;
                        left: 0;
                        opacity: 0;
                    }
                }
                .activityPicShowWarp {
                    overflow-x: auto;
                }
            }
        }
        .itemTime {
            background: #fff;
            margin-bottom: 0.3rem;
            .beginTime,
            .endTime {
                padding: 0 0.3rem;
                height: 0.98rem;
                line-height: 0.98rem;
                a {
                    float: right;
                    color: #0563d0;
                    height: 0.98rem;
                    img {
                        height: 0.5rem;
                        width: 0.3rem;
                        vertical-align: middle;
                    }
                }
            }
            .beginTime {
                border-bottom: 1px solid #eeeeee;
            }
        }
        .itemEdit {
            height: 0.38rem;
            padding: 0.3rem 0;
            border-bottom: 1px solid #eeeeee;
            background: #fff;
            margin-bottom: 0.3rem;
            label {
                line-height: 0.38rem;
                padding: 0 0.3rem;
                width: 1.2rem;
                display: inline-block;
            }
            input {
                height: 0.38rem;
                width: 5.3rem;
                padding-left: 0.05rem;
                border: none;
                outline: none;
            }
        }
        .contacts {
            margin-bottom: 0.3rem;
            background: #fff;
            .contactsName,
            .contactsPhone {
                height: 0.38rem;
                padding: 0.3rem 0;
                border-bottom: 1px solid #eeeeee;
                label {
                    line-height: 0.38rem;
                    padding: 0 0.3rem;
                    width: 1.2rem;
                    display: inline-block;
                }
                input {
                    height: 0.38rem;
                    width: 5.3rem;
                    padding-left: 0.05rem;
                    border: none;
                    outline: none;
                }
            }
        }
        .sendRange {
            padding: 0 0.3rem;
            height: 0.98rem;
            line-height: 0.98rem;
            background-color: #fff;
            margin-bottom: 0.3rem;
            display: flex;
            span {
                width: 1.65rem;
            }
            .con {
                flex: 1;
                color: #0563d0;
            }
            .img {
                color: #0563d0;
                text-align: right;
                img {
                    height: 0.5rem;
                    width: 0.3rem;
                    vertical-align: middle;
                }
            }
        }
        .more {
            background: #fff;
            margin-bottom: 0.3rem;
            padding: 0 0.3rem;
            height: 0.98rem;
            line-height: 0.98rem;
            a {
                float: right;
                color: #0563d0;
                margin-top: 0.24rem;
                // height: 0.98rem;
                // img {
                // height: 0.5rem;
                // width: 0.3rem;
                // vertical-align: middle;
                // }
            }
        }
        .sendBtn {
            text-align: center;
            padding-bottom: 1rem;
            button {
                height: 0.7rem;
                width: 2.1rem;
                background: #ff9d00;
                border-radius: 0.35rem;
                box-shadow: 0 5px 0px #cc7e00;
                border: none;
                color: #fff;
            }
        }
    }
    .more-options {
        margin-bottom: 0.3rem;
        > .more-time {
            // background: #fff;
            margin-bottom: 0.3rem;
            .endTime {
                padding: 0 0.3rem;
                height: 0.98rem;
                line-height: 0.98rem;
                background: #fff;
                // margin-bottom: 0.3rem;
                a {
                    float: right;
                    color: #0563d0;
                    img {
                        height: 0.5rem;
                        width: 0.3rem;
                        vertical-align: middle;
                    }
                }
            }
            .endTime {
                border-bottom: 1px solid #eeeeee;
            }
            .num {
                height: 0.38rem;
                padding: 0.3rem 0;
                border-bottom: 1px solid #eeeeee;
                background: #fff;
                margin-bottom: 0.3rem;
                label {
                    line-height: 0.38rem;
                    padding: 0 0.3rem;
                    width: 1.2rem;
                    display: inline-block;
                }
                input {
                    height: 0.38rem;
                    width: 5.3rem;
                    padding-left: 0.05rem;
                    border: none;
                    outline: none;
                }
            }
        }
        .sure {
            background: #fff;
            margin-bottom: 0.3rem;
            .needSure,
            .needSurePop {
                padding: 0 0.3rem;
                height: 0.98rem;
                line-height: 0.98rem;
                a {
                    float: right;
                    color: #0563d0;
                    img {
                        height: 0.5rem;
                        width: 0.3rem;
                        vertical-align: middle;
                    }
                }
            }
            .needSure {
                border-bottom: 1px solid #eeeeee;
                a {
                    padding-top: 0.24rem;
                }
            }
        }
        .share {
            background: #fff;
            .needShare {
                padding: 0 0.3rem;
                height: 0.98rem;
                line-height: 0.98rem;
                a {
                    padding-top: 0.24rem;
                    float: right;
                    color: #0563d0;
                }
            }
        }
    }
    .ismust {
        color: #c00;
    }
}
</style>