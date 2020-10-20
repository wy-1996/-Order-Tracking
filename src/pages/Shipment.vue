<template>
    <div class="shipment-box">
        <img class="shipment-img" src="../../static/images/shipment.png"/>
        <div style="font-size:26px">出货中...{{time}} S</div>
    </div>
</template>
<script>
import {outLink} from '../api/index'
export default {
    data () {
        return{
            id: '',
            successJump: false,
            failJump: false,
            advertUri: '',
            time: 4
        }
    },
    created(){
        let that = this;
        that.id = that.$route.query.id;
        outLink({code: that.id}).then(res =>{
            that.successJump = res.data.successJump == 1;
            that.failJump = res.data.failJump == 1;
            that.advertUri = res.data.adUrl;
        })
        that.timer(that.time);
    },
    methods:{
        timer(t){
            let that = this;
            that.time = t-1;
            setTimeout(function(){
                if(that.time > 0){
                    that.timer(that.time);
                }else{
                    if(that.successJump){
                        window.location.href = that.advertUri;
                    }else{
                        that.$router.replace({path: '/', query: {id: that.id}})
                    }
                }
            }, 1000)
        }
    }
}
</script>
<style scoped>
.shipment-box{padding: 30px;}
.shipment-text{font-size: 30px;}
.shipment-img{ width: 30%;}
</style>