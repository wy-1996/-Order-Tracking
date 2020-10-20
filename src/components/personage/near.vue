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
      map.enableScrollWheelZoom(true);
      map.addEventListener("click", function (e) {
         console.log(e.point.lng, e.point.lat);
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
      console.log(res.data);
      that.near=res.data.list;
      that.markers=[];
      that.near.map((item)=>{
        that.markers.push({
        id: item.id,
        geo: { lng: item.longitude, lat: item.latitude },
        address: item.address,
      })
      })
      console.log(that.near);

    })
    let url=encodeURIComponent(window.location.href.split('#')[0]);
    wx_sdk({url:url}).then((res)=>{
      console.log(res);  
      const _this = this
      this.wx.config({
    debug: true, 
    appId: res.appId, 
    timestamp: res.timestamp, 
    nonceStr: res.echostr, 
    signature: res.signature,
    jsApiList: [
    	'openLocation',
    	'getLocation','checkJsApi', 'startRecord', 'stopRecord','translateVoice','scanQRCode', 'openCard'
    ]
      }),
     
     this.wx.ready((res) => {
        this.wx.getLocation({
          type: 'wgs84', 
          success: function (res) {
            _this.latitude = 92 
            _this.longitude = 180 
            var speed = 13 
            var accuracy = 15 
            console.log('纬度：' + _this.latitude + '经度：' + _this.longitude + 'accuracy：' + accuracy)

            let point = new BMap.Point(res.longitude, res.latitude)
            let gc = new BMap.Geocoder()
            gc.getLocation(point, function(rs){
              console.log(rs)
              const addComp = rs.addressComponents
              // 获取省份
              const province = addComp.province
              if(province) {

                 _this.provinceName = province
              }

              alert('addComp json: ' + JSON.stringify(addComp))
              console.log('province' + addComp.province)
            })
          },
          fail: function(res) {
            console.log(JSON.stringify(res))
          }
        })
      })
    })

    
 
    

 
this.wx.error(function(res){
 


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