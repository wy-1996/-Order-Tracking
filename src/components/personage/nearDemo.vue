<template>
  <div>
    <baidu-map
      class="map"
      :center="map.center"
      :zoom="map.zoom"
      @ready="handler"
      :scroll-wheel-zoom="true"
      :style="'height:' + screenHeight + 'px;'"
    >
      <bm-info-window
        v-for="marker in markers"
        :key="marker.id"
        :position="marker.geo"
        :show="infoWindow.show"
        @close="infoWindowClose"
        @open="infoWindowOpen(marker)"
        :data-id="marker.id"
      >
        <p v-text="marker.address"></p>
      </bm-info-window>
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
      <!--点-->
      <bm-marker
        v-for="marker in markers"
        :key="marker.id"
        :position="marker.geo"
        @click="handleMarkerClick(marker)"
        :dragging="true"
      >
      </bm-marker>
    </baidu-map>
  </div>
</template>
 
<script>
export default {
  name: "demo",
  data: () => ({
    map: {
      center: { lng: 119.999567, lat: 30.383796 },
      zoom: 15,
      show: true,
      dragging: true,
    },
    markers: [
      { id: 1, geo: { lng: 104.02281, lat: 30.67666 }, address: "设备1" },
      { id: 4, geo: { lng: 120.176142, lat: 30.317859 }, address: "设备4" },
      { id: 2, geo: { lng: 120.15014, lat: 30.32178 }, address: "设备2" },
      { id: 3, geo: { lng: 120.135611, lat: 30.341051 }, address: "设备3" },
    ],
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
      this.infoWindow.show = true;
    },
    infoWindowClose(e) {
      console.log("ccc", e);
      this.infoWindow.show = false;
    },
    infoWindowOpen(e) {
      console.log(e);
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