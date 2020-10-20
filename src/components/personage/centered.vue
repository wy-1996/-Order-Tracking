<template>
  <div>
    <div class="container">
      <!-- 头部区域 -->
      <div class="hearder">
        <div class="head"></div>
        <p class="username">{{name}}</p>
      </div>

      <!-- 下部区域 -->
      <div class="classificationText">
        <div class="order_state" @click="order()">
          <img src="/static/images/index.png" class="order_state-img" />
          <p>我的订单</p>
          <img src="/static/images/next.png" class="arrow" />
        </div>
        <div class="order_state" @click="Business()">
          <img src="/static/images/about.png" class="order_state-img" />
          <p>关于我们</p>
          <img src="/static/images/next.png" class="arrow" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "小可爱",
    };
  },
  methods: {
    order: function () {
      this.$router.push("/personal");
    },
    Business:function(){
      this.$router.push('/Business');
    }
  },
};
</script>
<style scoped>
.container {
  position: relative;
  background: url("/static/images/blue.jpg");
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-width: 1000px;
  z-index: -10;
  zoom: 1;
  background-color: #fff;
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center0;
}
.hearder {
  height: 150px;
  width: 100%;
  border-radius: 1%;
}
.head {
  position: absolute;
  height: 50px;
  width: 50px;
  top: 50px;
  left: 50px;
  border-radius: 50%;
  background: #000;
}
.username {
  position: absolute;
  top: 50px;
  left: 120px;
  font-weight: 600;
}
.classificationText {
  width: 100%;
  position: absolute;
  top: 10rem;
  border-radius: 4px;
  height: 80%;
}
.order_state {
  margin-top:3px;
  display: flex;
  margin-bottom: 10px;
  height: 50px;
  border-bottom:1px solid rgb(189, 211, 216);
  border-radius: 6px;
}
.order_state:first-child{
  border-top:1px solid rgb(189, 211, 216);
}
.order_state p {
  position: absolute;
  margin-top: 13px;
  left: 40px;
  font-size: 20px;
  color: #055;
}
.order_state-img {
  height: 23px;
  width: 23px;
  position: absolute;
  margin-top: 15px;
  margin-left: 5px;
}
.arrow {
  height: 35px;
  width: 35px;
  position: relative;
  position: absolute;
  margin-top: 10px;
  left: 23rem;
}
</style>