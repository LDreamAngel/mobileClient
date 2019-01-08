<template>
    <div class="testswitch">
        <input class="testswitch-checkbox" type="checkbox" v-model="onOff" @click="clickEvent($event.target.checked)">
        <label class="testswitch-label">
            <!--<span class="testswitch-inner" data-on="on" data-off="off"></span>-->
            <span class="testswitch-inner" data-on="" data-off=""></span>
            <span class="testswitch-switch"></span>
        </label>
    </div>
</template>

<script>
    export default {
        name: "switch-button",
        data () {
            return {
                onOff: false
            }
        },
        methods:{
            clickEvent (index) {
              this.$emit('on-click',index)
            }
        }
    }
</script>

<style scoped>
    .testswitch {
        position: relative;
        float: left;
        width: 1rem;
        height: .5rem;
        margin: 0;
        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select: none;
    }

    .testswitch-checkbox {
        /*display: none;*/
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        z-index: 100;
    }

    .testswitch-label {
        display: block;
        overflow: hidden;
        cursor: pointer;
        background: #0060d0;
        border-radius: .25rem;
        border: 1px solid #ccc;
        height: 100%;

    }

    .testswitch-inner {
        display: block;
        width: 200%;
        height: 100%;
        margin-left: -100%;
        transition: margin 0.3s ease-in 0s;
    }

    .testswitch-inner::before, .testswitch-inner::after {
        display: block;
        float: right;
        width: 50%;
        height: 100%;
        padding: 0;
        line-height: .5rem;
        font-size: 12px;
        color: white;
        font-family:
                Trebuchet, Arial, sans-serif;
        font-weight: bold;
        box-sizing: border-box;
    }

    .testswitch-inner::after {
        content: attr(data-on);
        padding-left: .1rem;
        background: #0060d0;
        color: #FFFFFF;
    }

    .testswitch-inner::before {
        content: attr(data-off);
        padding-right: .1rem;
        background-color: #EEEEEE;
        color: #999999;
        text-align: right;
    }

    .testswitch-switch {
        position: absolute;
        display: block;
        width: 50%;
        height: 100%;
        background: #FFFFFF;
        top: 0px;
        bottom: 0;
        right: 50%;
        border-radius: .25rem;
        transition: all 0.3s ease-in 0s;
        border: 1px solid #EEEEEE;
    }

    .testswitch-checkbox:checked + .testswitch-label .testswitch-inner {
        margin-left: 0px;
    }

    .testswitch-checkbox:checked + .testswitch-label .testswitch-switch {
        right: 0px;
    }
</style>