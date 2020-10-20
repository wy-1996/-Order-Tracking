<template>
<div>
  <div class="container">
    <div class="container-list" v-for="(p,i) in products" :key="i">
      <div class="product-list" v-for="(item,index) in p.list" :key="index" :style="'width:'+(products.length==1?60:90)+'%;'">
        <div class="product-img" @click="buyProduct(item)">
          <img v-if="item.storeNum==0" class="img1 gray" :src="item.img" />
          <img v-else class="img1" :src="item.img" />
          <!-- <img src="../../static/images/default.jpg" alt="" class="img1"> -->
          <img v-if="item.storeNum==0" style="position:absolute; top:0; left:0; width:60%;" src="../../static/images/sellout.png"/>
        </div>
        <div class="product-bottom">
          <div class="product-bottom-list">
            <div class="product-title">{{item.pName}}</div>
            <div class="product-buy-button">
              <!-- <button @click="buyProduct(item)">购买</button> -->
            </div>
          </div>
          <div class="product-bottom-list">
            <div class="product-price"><span style="font-size: 14px">¥&nbsp;</span>{{item.sellPrice}}</div>
            <div class="product-stock">库存 {{item.storeNum}}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="no-data" v-if="products.length==0">
      <img class="no-data-img" src="../../static/images/no_data.png">
      <div class="no-data-text">暂无数据</div>
    </div>
  </div>
     <mt-tabbar v-model="selectedTab" fixed>
        <mt-tab-item id="home">
            附近设备
            <img src="/static/images/ctiy.png" slot="icon" v-if="selectedTab == 'home'">
            <img src="/static/images/ctiy.png" slot="icon" >
        </mt-tab-item>
        <mt-tab-item id="center">
            个人中心
            <img src="" slot="icon" v-if="selectedTab == 'center'">
            <img src="/static/images/personal.png" slot="icon" v-else>
        </mt-tab-item>
    </mt-tabbar>
</div>
  
  
</template>

<script>
    import axios from 'axios';
    import {products, wxPay, baseInfo} from '../api/index'
    export default {
        name: "Index",
        data () {
            return{
                id: '',
                mid: 0,
                appID: '',
                products: [],
                unionlist: [],
                redirect_uri: '',
                selectedTab:'/'
            }
        },
        
    watch:{
    selectedTab(){
       switch(this.selectedTab){
          case 'home':
            this.$router.push('/near');
            break;
          case 'center':
            this.$router.push('/centered');
            break;
       }
    }
  },
        created() {
          // console.log('index created')
            let that = this;
            let isWeiXin = () => {
                return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
            }
            if (!isWeiXin()) {
                alert('请在微信端打开')
                return false
            }
            that.init();

        },
        methods:{
          centered:function(){
            this.$router.replace('/centered')
        },
            list: function (id) {
                let that = this;
                that.bus.$emit('loading', true);
                products({imei:id}).then(res => {
                    that.bus.$emit('loading', false);
                    if(res.httpCode === 200){
                        let list = that.unionChannel(res.data);
                        let takeNum = that.setColumns(list);
                        for (let i = 1;i < list.length + 1; i++){
                            if(i % takeNum == 0){
                              that.products[that.products.length - 1].list.push(list[i-1])
                            }else{
                              that.products[(i % takeNum) - 1].list.push(list[i-1])
                            }
                        }
                    }else{
                        that.bus.$emit('tips', {
                          show: true,
                          title: res.message
                        })
                    }
                })
            },
            setColumns: function(list){
                let that = this;
                that.products.push({list: []})
                if(list.length > 2){
                    that.products.push({list: []})
                }
                if(list.length > 8){
                    that.products.push({list: []})
                }
                return that.products.length;
            },
            unionChannel: function(list){
              let unionlist = [];
              for (let i = 0;i < list.length; i++){
                var item = list[i];
                var unionItem = unionlist.find(f => f.pId == item.pId && f.sellPrice == item.sellPrice);
                if(unionItem){
                  unionItem.storeNum = unionItem.storeNum + item.storeNum;
                  unionItem.list.push(item);
                }else{
                  unionlist.push({
                    pId: item.pId,
                    pName: item.pName,
                    img: item.img,
                    imgUrls: item.imgUrls.length > 0 ? item.imgUrls : [item.img],
                    imgTextUrls: item.imgTextUrls,
                    sellPrice: item.sellPrice,
                    storeNum: item.storeNum,
                    unit: item.unit,
                    list: [item]
                  })
                }
              }
              this.unionlist = unionlist;
              return unionlist;
            },
            getQueryVariable: function(variable){
                let query = window.location.search.substring(1);
                let vars = query.split("&");
                for (let i=0;i<vars.length;i++) {
                    let pair = vars[i].split("=");
                    if(pair[0] == variable){return pair[1];}
                }
                return(false);
            },
            buyProduct: function(item) {
                let that = this;
              
                // if(that.mid == 0){
                //     window.location.reload();
                // }
                item = that.findMaxProducts(item);
                if(item == null) return;
                that.bus.$emit('loading', true);
                setTimeout(function(){
                    wxPay({
                        memberId: that.mid,
                        fee: item.sellPrice,
                        imei: that.id,
                        seq: item.seqNum,
                        channelId: item.cId,
                        mType: 3
                    }).then(res => {
                        that.bus.$emit('loading', false);
                        if(res.httpCode === 200) {
                            const pay_params = res.data
                            if (typeof WeixinJSBridge == "undefined"){
                                if( document.addEventListener ){
                                    document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                                }else if (document.attachEvent){
                                    document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                                    document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                                }
                            }else{
                                that.onBridgeReady(pay_params);
                            }
                        }else{
                            that.bus.$emit('tips', {
                              show: true,
                              title: res.message
                            })
                        }
                    })
                },500)
            },
            findMaxProducts: function(item){
                let that = this;
                let tmpObj = that.unionlist.find(o => o.pId == item.pId && o.sellPrice == item.sellPrice);
                if(!tmpObj.storeNum > 0){
                  that.bus.$emit('tips', {
                    show: true,
                    title: '商品已售罄'
                  })
                  return null;
                }
                let maxObj = tmpObj.list[0];
                for(let i=0; i<tmpObj.list.length-1; i++){
                  var o1 = maxObj, o2 = tmpObj.list[i + 1];
                  if (o2.storeNum > o1.storeNum) {
                    maxObj = o2;
                  }
                }
                return maxObj;
            },
            onBridgeReady: function(params) {
                let that = this;
                WeixinJSBridge.invoke(
                    'getBrandWCPayRequest', {
                        "appId": params.appId,  //公众号名称，由商户传入
                        "timeStamp": params.timeStamp,  //时间戳，自1970年以来的秒数
                        "nonceStr": params.nonceStr,  //随机串
                        "package": params.packageValue,
                        "signType": params.signType,  //微信签名方式：
                        "paySign": params.paySign  //微信签名
                    },
                    function(res){
                        if(res.err_msg === "get_brand_wcpay_request:ok" ) {
                            that.$router.replace({path: '/shipment', query: {id: that.id}})
                        }else{

                        }
                    });
            },
            authUserInfo: function(){
                let that = this;
                that.id = that.getQueryVariable("id");
                let midPara = that.getQueryVariable("mid");
                let memberId = window.localStorage.__memberId__;
                // if (!memberId && !midPara) {
                //     that.redirect_uri = that.redirect_uri+'?id='+that.id;
                //     let _shareUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${that.appID}&redirect_uri=${that.redirect_uri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
                //     window.location.href = _shareUrl
                // }else{
                //     that.mid = (memberId?memberId:midPara)
                //     window.localStorage.__memberId__ = that.mid;
                // }
                that.list(that.id);
            },
            getBaseInfo: function(){
                let that = this;
                baseInfo({}).then(res => {
                    if(res.httpCode === 200){
                        that.appID = res.data.appID;
                        that.redirect_uri = res.data.redirect_uri;
                        that.authUserInfo();
                    }else{
                        alert(res.message)
                    }
                })
            },
            init: function () {
                let that = this;

                // document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
                //     WeixinJSBridge.call('hideOptionMenu');
                // });

                // window.alert = function (message) {
                //   let iframe = document.createElement("IFRAME");
                //   iframe.style.display = "none";
                //   iframe.setAttribute("src", 'data:text/plain,');
                //   document.documentElement.appendChild(iframe);
                //   let alertFrame = window.frames[0];
                //   let iwindow = alertFrame.window;
                //   if (iwindow == undefined) {
                //       iwindow = alertFrame.contentWindow;
                //   }
                //   iwindow.alert(message);
                //   iframe.parentNode.removeChild(iframe);
                // }

                // 图片加载成功时触发error事件，成功不会触发
                document.addEventListener("error", function (event) {
                  // let ev = event?event:window.event
                  let elem = event.target;
                  if (elem.tagName.toLowerCase() =='img') { 
                    // 图片加载失败  --替换为默认 
                    //  document.removeEventListener("error");
                    elem.src = '/static/images/default.jpg'
                  // console.log(1)
                    // window.removeEventListener('error',add);
                    // window.onerror=null
                     
                  }
                  
                }, true);

                that.getBaseInfo();
                
            }
        }
    }
</script>

<style scoped>

  .container{
    display: flex;
    padding: 0;
    margin: 0;
  }
  .container-list{
    flex-direction: column;
    flex:1;
  }
  .product-list{
    position: relative;
    margin: 10% auto;
    box-shadow: #EEEEEE 6px 6px 6px 6px;
    border-radius: 8px;
    background-color: #FFFFFF;
  }
  .product-img .img1{
    border: 0px;
    width: 100%;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  .product-bottom{
    padding: 0 8px 5px 8px;
    /* background-color: #FFFFFF; */
  }
  .product-bottom-list{
    display: flex;
  }
  .product-title{
    font-size: 14px;
    text-align: left;
    flex-direction: column;
    flex:1;
  }
  .product-stock{
    font-size: 12px;
    color: #A0A0A0;
  }
  .product-price{
    font-size: 18px;
    width: 60%;
    text-align: left;
    flex-direction: column;
    flex: 1;
    color: red;
    font-size: 18px;
  }
  .product-buy-button button{
    padding: 3px 10px;
    color:#FFFFFF;
    background: #42b983;
    border: 0px;
    border-radius: 5px;
  }

/* 图片灰色 */
.gray {     
  -webkit-filter: grayscale(100%);   
  -moz-filter: grayscale(100%);  
  -ms-filter: grayscale(100%);   
  -o-filter: grayscale(100%);     
  filter: grayscale(100%); 	     
  filter: gray; 
}

  .no-data{
    margin: 40px auto;
  }
  .no-data-img{
    width: 100px;
    margin: 0 auto;
  }
  .no-data-text{
    font-size: 14px;
    color: darkgray;
  }
  /* 底部导航 */
  .top-data{
    display: flex;
    justify-content: space-between;
    border-radius: 2%;
    position: fixed;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    background: #ddd;
  }
  .top-nearby{
  width: 50%;
  }
  .nearby{
    position: absolute;
    top: 8px;
    left: 22%;
    height: 18px;
    width: 18px;
  }
  .per{
    position: absolute;
      top: 8px;
    right: 23%; 
    height: 20px;
    width: 20px;
  }
  .long{
    height: 3rem;
    border-right: 1px solid #a5a5a5;
  }
 .facility{
    height: 3rem;
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    width: 100%;
    color: #000;
    font-size: 12px;
    border: 0;
    outline: 0;
  }
  .facility p{
    position: absolute;
    /* right:10%; */
    margin-left:18%;
    margin-top: 8%;
  }
</style>
