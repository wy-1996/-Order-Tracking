<template>
  <div class="container">
    <div class="top">
      <img :src="list.mImg" alt class="top-img" />
      <p class="top-pName">{{list.pName}}</p>
      <p class="top-price">￥{{list.orderPrice}}</p>
    </div>
    <div class="long"></div>
    <div class="order">
      <div class="order-data">
        <p>支付状态</p>
        <p>商品全称</p>
        <p>支付时间</p>
        <p>交易单号</p>
        <p>商家单号</p>
        <p>购买数量</p>
        <p>订单状态</p>
        <p>购买地点</p>
      </div>
      <div class="Data">
        <p>支付成功</p>
        <span class="pName">{{list.pName}}</span>
        <p>{{list.updateTime}}</p>
        <span class="pName">{{list.payCode}}</span>
        <span class="pName paycode">{{list.code}}</span>
        <span class="num">1</span>
        <span class="pay">已支付</span>
        <span class="place">良渚地铁站</span>
      </div>
    </div>
  </div>
</template>
<style scoped>
.num{
  position: absolute;
  display: block;
  top: 11.2rem;
}
.pay{
  position: absolute;
  display: block;
  top: 12.2rem;
  margin-top: 16px;
}
.place{
  display: block;
  position: absolute;
  top: 14.2rem;
  margin-top: 16px;
}
span.paycode {
  position: absolute;
  top:9rem;
}
.top {
  margin-top: 3rem;
  height: 20%;
}
.top-img {
  border-radius: 50%;
}
.top-pName {
  font-weight: 600;
  font-size: 15px;
}
.top-price {
  margin-right: 0.8rem;
  font-size: 25px;
  font-weight: 600;
  color: #ca3f3f;
}
.long {
  width: 95%;
  margin-left: 2%;
  border: 0.5px solid #ddd;
}
.order {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}
.pName {
  width: 100%;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-top: 4px;
  padding-bottom: 2px;
  box-sizing: border-box;
}
.order-data {
  margin-left: 1rem;
  font-size: 14px;
  color: #a5a5a9;
  display: inline-block;
  white-space: nowrap;
  width: 30%;
  overflow: hidden;
  text-overflow: ellipsis;
}
.Data {
  margin-top: 0.1rem;
  font-size: 13px;
  font-weight: 500;
   width: 70%;
  color: #000;
  text-align: left;
  position: relative;
}
</style>
<script>
import { detail } from "../../api/order";
export default {
  data() {
    return {
      list: [],
      id: 0,
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    // console.log(this.id)
    detail({ id: this.id }).then((res) => {
      this.list = res.data;
      // console.log(res.data);
    });
  },
};
</script>