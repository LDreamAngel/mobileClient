<template>
    <div class='tree'>
        <div class='item' >
            <div class='checkbox' v-if="!selectable || selectClass == 'mem' && departmentList.depId" ><span @click="checkbox(false)" class='checkbox-core'></span></div>
            <div class='checkbox' v-else ><input type="checkbox" @click="checkbox(true)" v-model="departmentList.checked"><span class='checkbox-core'></span></div>
            <div class='itemNatar' v-if="departmentList.depId"><img  :src="avatar" alt=""></div>
            <div class='itemNatar' v-else><img class="avatar" :src="departmentList.avatar || geavatar" alt=""></div>
            <div class='itemName ellipsis' @click="departmentList.depId ? changeDepartmentList(departmentList): checkbox(true)"> {{departmentList.name}}</div>
            <div class='back' v-if="departmentList.depId"  @click="changeDepartmentList(departmentList)"><div></div></div>
        </div>
        <!-- <template v-for="(item,index) in departmentList.children" >
            <tree  :departmentList='item' :key="item.id" :index='index' :changeDepartmentList='changeDepartmentList'></tree>
        </template> -->
    </div>
</template>
<script>
import { getSuiteMemberList } from "../api/activity.js";
import avatar from '../assets/images/avatar.svg'
import geavatar from '../assets/images/user.png'
export default {
    name: "tree",
    props: ["departmentList", "index", "changeDepartmentList","selectClass",'addAddressCard' ,'delAddressCard'],
    data() {
        return {
            avatar,
            geavatar,
            selectable:true
        };
    },
    methods: {
        checkbox(type){
            if(!this.selectable){
                this.$toast.center('您暂无权限选择该部门！')
                return
            }
            if(!type){
                this.$toast.center('请选择成员！')
                return
            }
           
            if(this.departmentList.checked){
                this.delAddressCard(this.departmentList)
                this.departmentList.checked = false
                this.$forceUpdate()
            }else{
                this.addAddressCard(this.departmentList)
                this.departmentList.checked = true
                this.$forceUpdate()
            }
        }
    },
    mounted() {
        // 判断登录人是否有权限选择该部门
        if(this.departmentList.attributes){
            if(this.departmentList.attributes.selectable === false){
                this.selectable = false
            }
        }
    },
};
</script>
<style lang="scss" scoped>
.tree {
  width: 100%;
  .item {
    padding: 0.3rem;
    background: #fff;
    margin-bottom: 0.02rem;
    overflow: hidden;
    display: flex;
    .checkbox {
      width: 0.6rem;
      position: relative;
      input {
        position: absolute;
        top: 0.2rem;
        height: 0.38rem;
        width: 0.38rem;
        z-index: 1;
      }
      input:checked + .checkbox-core {
        background-color: rgb(0, 207, 255);
        border-color: rgb(0, 207, 255);
      }
      .checkbox-core {
        position: absolute;
        top: 0.2rem;
        display: inline-block;
        background-color: #fff;
        border-radius: 100%;
        border: 1px solid #ccc;
        position: relative;
        width: 20px;
        height: 20px;
        vertical-align: middle;
        box-sizing: border-box;
      }
      input:checked + .checkbox-core:after {
        border-color: #fff;
        transform: rotate(45deg) scale(1);
      }
      .checkbox-core:after {
        border: 2px solid transparent;
        border-left: 0;
        border-top: 0;
        content: " ";
        top: 3px;
        left: 6px;
        position: absolute;
        width: 4px;
        height: 8px;
        transform: rotate(45deg) scale(0);
        transition: transform 0.2s;
      }
    }
    .itemNatar {
      height: 0.8rem;
      width: 1.12rem;
      img {
        height: 0.8rem;
        width: 0.8rem;
        border-radius: 0.2rem;
      }
      .avatar {
        border-radius: 50%;
      }
    }
    .itemName {
      flex: 1;
      height: 0.8rem;
      line-height: 0.8rem;
      color: #000;
      font-size: 0.26rem;
      font-weight: 600;
    }
    .back {
        height: 100%;
        padding-top: 0.31rem;
        div{
            height: 0.12rem;
            width: 0.12rem;
            border:2px solid #0060d0;
            transform: rotate(-135deg);
            border-color:  transparent transparent  #0060d0 #0060d0; ;
        }	
    }
  }
}
</style>
