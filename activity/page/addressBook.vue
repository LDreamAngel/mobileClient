<template>
	<div class='addressBook'>
		<template  v-if="showSearch_" >
			<div v-show="showSearch_" class="search-input">
				<input type="search" ref="search" v-model="search"  />
				<!-- <img class='search-input-img' src="../assets/images/search.png" v-if="showSearch" /> -->
				<span class='close'  @click="cancel(true)">取消</span>
			</div>
			<div class='dep'>
				<div v-if="searchData.memberList  ? searchData.memberList.length : '' ">
					<p  class='memberList list'>成员</p>
					<ul class='member_list'>
						<li v-for="(item,index) in searchData.memberList" :key="item.id">
							<tree :addAddressCard='addAddressCard' :delAddressCard='delAddressCard' :selectClass='selectClass' :departmentList='item' :key="item.id" :index='index' :changeDepartmentList='changeDepartmentList'></tree>
						</li>
					</ul>
				</div>
				<div  v-else-if="searchData.departmentList ? searchData.departmentList.length : '' ">
					<p  class='departmentList list'>部门</p>
					<ul class='department_list'>
						<li v-for="(item,index) in searchData.departmentList" :key="item.id">
							<tree :addAddressCard='addAddressCard' :delAddressCard='delAddressCard' :selectClass='selectClass' :departmentList='item' :key="item.id" :index='index' :changeDepartmentList='changeDepartmentList'></tree>
						</li>
					</ul>
				</div>
				<p v-else class='nodep' >赞无查询结果</p>
			</div>
		</template>
		<template  v-else>
			<div class="search-input show-search">
				<div class='back' @click="dep.length > 1 ? back() : showAddressBook(null)"><div></div></div>
				<span class='depTitle ellipsis'>{{departmentList.name}}</span>
				<span @click="checkboxAll()">
					<img v-show="!checkboxCoreAll" src="../assets/images/checkAll.png" alt="">
					<img v-show="checkboxCoreAll" src="../assets/images/checkAll1.png" alt="">
				</span>
				<span class='showSearch'><img src="../assets/images/search1.png"  @click="cancel(false)"/></span>
			</div>
			<div class='dep' v-if="departmentList.hasChildren || (departmentList.attributes ? departmentList.attributes.hasMember : '')">
					<template v-for="(item,index) in departmentList.childrenPro" >
					<tree :addAddressCard='addAddressCard' :delAddressCard='delAddressCard' :selectClass='selectClass' :departmentList='item' :key="item.id" :index='index' :changeDepartmentList='changeDepartmentList'></tree>
				</template>
					<template v-for="(item,index) in departmentList.children" >
					<tree :addAddressCard='addAddressCard' :delAddressCard='delAddressCard' :selectClass='selectClass' :departmentList='item' :key="item.id" :index='index' :changeDepartmentList='changeDepartmentList'></tree>
				</template>
			</div>
			<div class='dep nodep' v-else>该部门下赞无子部门或成员</div>
		</template>
		<div class='addressCard' v-if="addressCard.length">
			<ul class='card_list'>
				<li class='card_item' v-for="item in addressCard" :key="item.id" @click="del(item)">
					<img class='depImg' v-if="item.depId" :src="item.avatar || avatardep" alt="">
					<img class='userImg' v-if="item.userId" :src="item.avatar || avataruser" alt="">
				</li>
			</ul>	
			<div class='submit' @click="showAddressBook(selectClass,addressCard)">确定({{addressCard.length}})</div>
		</div>
	</div>
</template>
<script>
	import tree from './tree.vue'
	import {getDepartmentList,getSuiteMemberList,queryDeptUserTag} from '../api/activity.js'
	import avatardep from '../assets/images/avatar.svg'
	import avataruser from '../assets/images/user.png'

	export default {
		name: "addressBook",
		components:{tree},
		props:['showAddressBook','selectData','selectClass'],
		data() {
			return {
				avatardep,avataruser,
				search: "",//搜索内容
				searchData:{},//搜索结果
				showSearch:true,//搜索放大镜显示
				showSearch_:false,  
				departmentList:{},//部门
				index:-1,
				checkboxCoreAll:false,//是否全选，
				dep:[],//存储每一级的部门信息
				addressCard:[]// 选择的部门或成员
			};
		},
		methods:{
			//搜索 Or 取消搜索
			cancel(type){
				if(type){
					this.showSearch_ = false
					this.search = ''
					this.searchData=[]
					this.isSelset(true)
				}else{
					this.showSearch_ = true
					setTimeout(() => {
						if(this.$refs.search){
							this.$refs.search.focus()
						}
					}, 100);
				}
			},
			// 请求部门
			getDepartmentList(suiteId){
				getDepartmentList(suiteId,null).then(r=>{
					if(r.data.code != 0 ){
						return 
					}
					let data = r.data.data || {}
					this.departmentList = data
					
					this.getSuiteMemberList(suiteId,data.depId)
				}).catch(r=>{
					console.log(r)
				})
			},
			// 请求成员
			getSuiteMemberList(suiteId,depId){
				if(!depId){
					return
				}
				getSuiteMemberList(suiteId,depId).then(r=>{
					if(r.data.code != 0 ){
						return 
					}
					let data = r.data.data || {}
					data.forEach(r=>{
						r.checked = false
					})
					this.$set(this.departmentList,'childrenPro',data)
					this.dep.push(this.departmentList) 
					this.isSelset(true)
					this.$forceUpdate()
				}).catch(r=>{
					console.log(r)
				})
			},
			// 父进子
			changeDepartmentList(list){
				if(this.search){
					return 
				}
				this.departmentList = list
				console.log(list)
				this.checkboxCoreAll = false
				this.getSuiteMemberList(sessionStorage['activitySuiteId'],list.depId)

			},
			// 子退父
			back(){
				this.dep.pop()
				let length = this.dep.length - 1
				this.departmentList = this.dep[length]
				this.isSelset(true)
			},
			// 判断成员或者部门是否已经选择
			isSelset(type){
				if(!this.departmentList.children){
					return 
				}
				this.addressCard.forEach(item=>{
					this.departmentList.children.forEach(i => {
						if(item.id == i.id){
							i.checked = type
						}
					});
					// 成员
					this.departmentList.childrenPro.forEach(j => {
						if(item.id == j.id){
							j.checked = type
						}
					});
				})
				if(!this.addressCard.length){
					this.departmentList.children.forEach(i => {
							i.checked = false
					});
					// 成员
					this.departmentList.childrenPro.forEach(j => {
							j.checked = false
					});
				}
			},
			// 全选
			checkboxAll(){
				if(this.checkboxCoreAll){
					// 部门
					this.departmentList.children.forEach(item => {
						item.checked = false
						this.delAddressCard(item)
					});
					// 成员
					this.departmentList.childrenPro.forEach(item => {
						item.checked = false
						this.delAddressCard(item)
					});
					this.checkboxCoreAll = false
				}else{
					// 部门
					this.departmentList.children.forEach(item => {
						if(this.selectClass != 'mem'){
        					// 判断登录人是否有权限选择该部门
							if(item.attributes){
								if(item.attributes.selectable === false){
									return 
								}
							}
							item.checked = true
							this.addAddressCard(item)
						}
					});
					// 成员
					this.departmentList.childrenPro.forEach(item => {
						if(this.selectClass != 'dep'){
							item.checked = true
							this.addAddressCard(item)
						}
					});
					this.checkboxCoreAll = true
				}
				this.$forceUpdate();
			},
			// 添加选择的人或者部门
			addAddressCard(data){
				let isHas = this.addressCard.some(item => {
					if (item.id == data.id) {
						return true;
					} else {
						return false;
					}
				});
				if(!isHas){
					this.addressCard.push(data)
				}
			},
			// 点击列表   删除选择的人或者部门
			delAddressCard(data){
				this.addressCard.forEach((r,i)=>{
					if(r.id == data.id){
						this.addressCard.splice(i,1)
					}
				})
			},
			// 搜索结果
			queryDeptUserTag(keyWord){
				let data = {
					keyWord,
					types: this.selectClass == 'mem' ? 'mem' : 'mem,dep',
					suiteId:sessionStorage['activitySuiteId']
				}
				queryDeptUserTag(data).then(r=>{
					let data = r.data.data || {}
					if(this.selectClass != 'mem'){
						data.departmentList.forEach(i=>{
							i.checked = false
						})
					}
					data.memberList.forEach(j=>{
						j.checked = false
					})
					if(data){
						this.addressCard.forEach(item=>{
							// 判断搜索的结果是否已经选中  选中为true
							data.departmentList.forEach(i=>{
								if( item.id == i.id){
									i.checked = true
								}
							})
							data.memberList.forEach(j=>{
								if( item.id == j.id){
									j.checked = true
								}
							})
						})
					}
					this.searchData = data
				}).catch(r=>{
					console.log(r)
				})
			},
			// 点击选中的列表   删除选择的人或者部门
			del(item){
				// 部门
				this.departmentList.children.forEach(i => {
					if(item.id == i.id){
						i.checked = false
					}
				});
				// 成员
				this.departmentList.childrenPro.forEach(j => {
					if(item.id == j.id){
						j.checked = false
					}
				});
				// 选中的列表
				this.delAddressCard(item)

			}
		},
		mounted() {
			this.getDepartmentList(sessionStorage['activitySuiteId'])	
			this.selectData.forEach(item=>{
				this.addressCard.push(item)
			})
		},
		watch:{
			search(val){
				if(val.length == 0){
					this.searchData = []
					this.showSearch = true
				}
				if(val.length){
					this.showSearch = false
					this.queryDeptUserTag(val)
				}
			},
			departmentList:{
				handler(list){
					if(!list.childrenPro){
						return 
					}
					let isHas = list.children.every(item => {
						if (item.checked) {
							return true;
						} else {
							return false;
						}
					});
					
					let isHasPro = list.childrenPro.every(item => {
						if (item.checked) {
							return true;
						} else {
							return false;
						}
					});
					if(isHas && isHasPro){
						this.checkboxCoreAll = true
					}else{
						this.checkboxCoreAll = false
					}
				},
				deep:true,
			}
		}
	};
</script>
<style lang="scss" scoped>
	.addressBook {
		height: 100%;
		width: 100%;
		background: #eeeeee;
		display: flex;
		flex-direction: column;
		position: absolute;
		top: 0;
		.search-input {
			height: .56rem;
			padding: 0.3rem;
			position: relative;
			background-color: #CCCCCC;
			input {
				width: 5.8rem;
				height: 0.52rem;
				outline: none;
				border: 0;
				border-radius: 0.26rem;
				font-size: 14px;
				background: #fff;
				padding-left: 0.2rem;
				color: #ccc;
			}
			.search-input-img {
				position: absolute;
				top: 50%;
				left: 50%;
				margin-left: -0.52rem;
				margin-top: -0.15rem;
				width: 0.3rem;
				height: 0.3rem;
			}
			.close{
				margin-left: 0.2rem;
				font-size: 14px;
				color: #fff;
			}
		}
		.show-search{
			padding: 0;
			height: 1.16rem;
			display: flex;
			line-height: 1.3rem;
			font-size: 20px;
			img{
				width: 0.4rem;
				height: 0.4rem;
			}
			.back {
				height: 100%;
				padding: 0.42rem 0 0.4rem 0.4rem;
				div{
					height: 0.2rem;
					width: 0.2rem;
					border:2px solid #fff;
					transform: rotate(45deg);
					border-color:  transparent transparent #fff #fff ;
				}	
			}
			.depTitle{
				padding-left: 0.2rem;
				flex:1;
				line-height: 1.16rem;
				color: #fff;
			}
			.showSearch{
				width: 0.8rem;
				margin-left: 0.4rem;
			}
		}
		.dep{
			flex:1;
			overflow: auto;
			.list{
				height: 0.8rem;
				line-height: 0.8rem;
				font-size: 14px;
				color: #fff;
				padding-left: 0.3rem;
			}
		}
		.nodep{
			padding-top: 1rem;
			color: #aaa;
			font-size: 14px;
			text-align: center;
		}
		.addressCard{
			height: 1rem;
			display: flex;
			padding: 0.08rem;
			background: #fff;
			border-top: 1px solid #eee;
			.card_list{
				flex: 1;
				display: flex;
				padding: 0.1rem;
				overflow: auto;
				.card_item{
					margin-right: 0.15rem;
					img{
						height: 0.8rem;
						width: 0.8rem;
						border-radius: 50%;
						background: #ccc;
					}
					.depImg{
						border-radius: 0.2rem;
						
					}
				}
			}
			.submit{
				min-width: 1.2rem;
				height: 0.7rem;
				padding: 0 0.1rem;
				margin-top: 0.15rem;
				margin-left: 0.1rem;
				background: #0060d0;
				border-radius: 0.1rem;
				line-height: 0.7rem;
				text-align: center;
				font-size: 14px;
				color: #fff;
				white-space:nowrap
			}
		}
	}
</style>
