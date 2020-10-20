<template>
  <div>
    <baidu-map
      class="map"
      :center="map.center"
      :zoom="map.zoom"
      @ready="handler"
      :scroll-wheel-zoom="true"
      :style="'height:' + screenHeight + 'px;'"
      :map-click="false"
    >
      <!-- 弹框 -->
      <a href="">
        <bm-info-window
          :position="infoWindow.geo"
          :show="infoWindow.show"
          @close="infoWindowClose"
          @open="infoWindowOpen"
        >
        <a href="">
            <p v-text="infoWindow.content" style="fontSize:13px"></p>
        </a>
        
        </bm-info-window>
      </a>

      <div v-for="(marker, index) in markers" :key="index">
        <!--点-->
        <bm-marker
          :position="marker.geo"
          @click="handleMarkerClick(marker)"
          :dragging="false"
        >
          <!--缩放-->
          <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"></bm-navigation>
          <!--定位-->
          <bm-geolocation
            anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
            :showAddressBar="true"
            :autoLocation="true"
            :locationIcon="{
              url: '/static/images/coordinate.png',
              size: { width: 32, height: 32 },
            }"
          ></bm-geolocation>
        </bm-marker>
      </div>
    </baidu-map>
  </div>
</template>
 
<script>
import { BmlMarkerClusterer } from "vue-baidu-map";
import { near,wx_sdk } from '../../api/index';

export default {
  name: "demo",
  data: () => ({
    near: [],
    map: {
      center: { lng: 119.999567, lat: 30.383796 },
      zoom: 15,
      show: true,
      dragging: true,
    },
    markers: [],
    screenHeight: window.innerHeight,
    infoWindow: {
      show: false,
    },
  }),
  methods: {
    handler({ BMap, map }) {
      let me = this;
      //   console.log(map);
      // 鼠标缩放
      map.enableScrollWheelZoom(true);
      // 点击事件获取经纬度
      map.addEventListener("click", function (e) {
        // console.log(e.point.lng, e.point.lat);
      });
    },
    handleMarkerClick(marker) {
      this.infoWindow.content = marker.address;
      this.infoWindow.geo = marker.geo;
      this.infoWindow.show = true;
    },
    infoWindowClose(marker) {
      this.infoWindow.show = false;
    },
    infoWindowOpen(marker) {
      this.infoWindow.show = true;
    },
  },
  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        that.screenHeight = window.innerHeight;
      })();
    };
    near({ lat: "30.383796", lng: "119.999567" }).then((res)=>{
      // console.log(res.data);
      that.near=res.data.list;
      that.markers=[];
      that.near.map((item)=>{
        that.markers.push({
        id: item.id,
        geo: { lng: item.longitude, lat: item.latitude },
        address: item.address,
      })
      })
      // console.log(that.near);

    })
    let url=encodeURIComponent(window.location.href.split('#')[0]);
    wx_sdk({url:url}).then((res)=>{
      // console.log(res);  
      const _this = this
      this.wx.config({
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: res.appId, // 必填，公众号的唯一标识
    timestamp: res.timestamp, // 必填，生成签名的时间戳
    nonceStr: res.echostr, // 必填，生成签名的随机串
    signature: res.signature,// 必填，签名，见附录1
    // 必填，需要使用的JS接口列表，所有JS接口列表见官方js接口
    // 这里配置获取地理位置所需要的接口权限
    jsApiList: [
    	'openLocation',
    	'getLocation','checkJsApi', 'startRecord', 'stopRecord','translateVoice','scanQRCode', 'openCard'
    ]
      }),
     
     this.wx.ready((res) => {
        this.wx.getLocation({
          type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          success: function (res) {
            _this.latitude = 92 // 纬度，浮点数，范围为90 ~ -90
            _this.longitude = 180 // 经度，浮点数，范围为180 ~ -180。
            var speed = 13 // 速度，以米/每秒计
            var accuracy = 15 // 位置精度
            // console.log('纬度：' + _this.latitude + '经度：' + _this.longitude + 'accuracy：' + accuracy)

            let point = new BMap.Point(res.longitude, res.latitude)
            let gc = new BMap.Geocoder()
            gc.getLocation(point, function(rs){
              // console.log(rs)
              const addComp = rs.addressComponents
              // 获取省份
              const province = addComp.province
              if(province) {
              	// 如果这里需要操作this,那么需要在外部重新绑定一下this
                // _this.provinceName = province
              }

              alert('addComp json: ' + JSON.stringify(addComp))
              // console.log('province' + addComp.province)
            })
          },
          fail: function(res) {
             console.log(JSON.stringify(res))
          }
        })
      })
    })

    
 
    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。

 
this.wx.error(function(res){
 
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。

});
  },
  components: {
    BmlMarkerClusterer,
  },
  
};
</script>
 
<style scoped>
.map {
  width: 100%;
}
.baidumap > .BMap_cpyCtrl {
  display: none !important;
}
.baidumap > .anchorBL {
  display: none !important;
}
.show {
  position: absolute;
}
</style>