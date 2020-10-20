<template>
  <div class="container">
    <div class="hear">
      <img src="http://47.100.235.10/upload/logo.png" alt="杭州品实智能设备有限公司" title="杭州品实智能设备有限公司" />
    </div>
    <div class="company">
      <p>公司简介</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;品实智能是杭州品实智能设备有限公司旗下智能终端品牌,专业致力于智能自助终端的研发与生产,公司至今有近十几项智能自助终端的核心专利,实现了将物联网,自动化,智能化,手机支付集成一体,企业形成了从软硬件研发,设备生产组装,运营等一系列产业链条.</p>
    </div>
    <div class="Contact">
      <p>联系我们</p>
      <p>地址: 杭州市余杭区瓶窑镇羊城路2号</p>
      <p>邮箱: pinshizhineng@sina.com</p>
      <p>电话: 400-168-0677</p>
      <p>手机: 18368811377</p>
      <p>周一至周六 9:00~18:00</p>
    </div>
  </div>
</template>
<style scoped>
.container {
  background: url("/static/images/blue.jpg") no-repeat;
  margin: 0px;
  background-size: 100% 100%;
  background-attachment: fixed;
  height: 42rem;
}
.hear img{
  width: 55%;
  margin-top: 30px;
}
.company {
  margin-top: 15%;
  color: #222;
}
.company p:first-child {
  display: flex;
  font-size: 23px;
  color: rgb(178, 46, 29);
  font-weight: 600;
  margin-left:0.5rem;
}
.company p:last-child {
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  margin-left:0.5rem;
  margin-right:0.5rem;
}
.Contact {
  margin-top: 20%;
}
.Contact p:first-child {
  color: #007fd0;
  font-weight: 600;
  font-size: 20px;
}
.Contact {
  color: #003;
  font-size: 14px;
}
</style>