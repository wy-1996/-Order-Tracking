<template>
  <div class="container">
    <div id="use">
        <mt-navbar v-model="active" fixed>
      <mt-tab-item style='font-size:15px;' :id="item.id" v-for="(item,index) in select" :key="index"><span style='font-size:15px;'>{{item.name}}</span></mt-tab-item>
    </mt-navbar>
    </div>
  
    <div class="details-data">
      <div
        :style="'height:'+curHeight+'px; overflow-y: auto;overflow:scroll;'"
        class="panel"
        infinite-scroll-distance="10"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="busy"
        infinite-scroll-immediate-check="true"
      >
        <mt-tab-container v-model="active">
          <mt-tab-container-item :id="item.id" v-for="(item,index) in select" :key="index">
            <div v-for="(item,index) in list" :key="index">
              <div class="navigation" @click="detail(item.id)">
                <div class="nav">
                  <p class="navigation-name">{{item.pName}}</p>
                  <p class="navigation-Time">{{item.updateTime}}</p>
                </div>
                <div class="nav">
                  <img src="/static/images/next.png" alt class="navigation-next" />
                  <p class="navigation-price">￥{{item.orderPrice.toFixed(2)}}</p>
                </div>
              </div>
            </div>
            <div class="not-more-data" v-if="isLastPage">没有更多了...</div>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
    </div>
  </div>
</template>
<script>
import { orders } from "../../api/order";

export default {
  data() {
    return {
      orderState: 0,
      // 选项卡默认值
      active: 1,
      // 服务器返回值
      list: [],
      // 用于服务器当前可以处理请求
      busy: false,
      // 存储当前页码
      page: 1,
      // 存储服务器返回的总页码数
      pages: 0,
      // 屏幕的高度
      curHeight: 0,
      isLastPage: false,
      select: [
        { id: 1, name: "全部" },
        { id: 2, name: "未出货" },
        { id: 3, name: "已出货" },
      ],
    };
    //
  },
  watch: {
    active() {
  
      switch (this.active) {
        case 1:
          this.orderState = 0;
          break;
        case 2:
          this.orderState = 1;
          break;
        case 3:
          this.orderState = 2;
          break;
      }    
      // console.log(this.active);
      //切换顶部选项卡时,清空之前存储的文章数据
      this.list = [];
      this.isLastPage=false;
      //切换顶部选项卡时,页码初始值为1
      this.page = 1;
      //加载数据
      this.loadData();
    },
  },
  created() {
    this.beforeMount(49);
  },
  mounted() {
    this.loadData();
  },
  methods: {
    selectItem(item, num) {
      // console.log(num);
      this.$emit("select", item);
    },
    detail(id) {
      this.$router.push("/orders?id=" + id);
    },
    // 向下滚动时触发的加载更多数据的函数
    loadMore() {
      // console.log("loadMore");

      // 页码累加
      this.page++;
      //如果当前页码在总页数范围内则继续发送请求
      if (this.page <= this.pages) {
        //加载数据
        this.loadData();
      }
    },
    loadData() {
      let that = this;
      that.busy = true;
      that.$indicator.open("加载中...");
      // setTimeout(function () {
        orders({
          memberId: 323931,
          pageNum: that.page,
          pageSize: 10,
          orderStatus: that.orderState,
        }).then((res) => {
          that.$indicator.close();
          // console.log(res.data);
          that.busy = false;
          that.list = that.list.concat(res.data.list);
          that.pages = res.data.pages;
          that.isLastPage = res.data.isLastPage;
          // console.log(that.isLastPage);
        });
      // }, 500);
    },
    beforeMount(height) {
      var h =
        document.documentElement.clientHeight || document.body.clientHeight;

      this.curHeight = h - height; //减去页面上固定高度height
      // console.log(this.curHeight)
    },
  },
};
</script>
<style scoped>
.details-data {
  position: fixed;
  width: 100%;
}
.panel {
  margin-top: 3rem;
  margin-bottom: 55px;
}
.router-link-active {
  text-decoration: none;
}
a {
  text-decoration: none;
}
.container {
  margin: 0;
  padding: 0;
}
/* 底部选项卡 */
.navigation {
  background: #a5a5a5;
  display: flex;
  justify-content: space-between;
  height: 5rem;
  background: #fff;
  margin-bottom: 0.5rem;
  border-radius: 2%;
  margin-top: 0.3rem;
}
.nav {
  height: 1rem;
}
.navigation-next {
  margin-top: 1.6rem;
  margin-left: 3rem;
  height: 2rem;
}
.navigation-name {
  margin-left: 0.5rem;
  font-size: 15px;
  font-weight: 600;
  color: #000;
  text-decoration: none;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  display: inline-block;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}
.navigation-price {
  font-size: 19px;
  font-weight: 600;
  margin-top: -0.8rem;
  margin-right: 3.5rem;
  color: #ca3f3f;
  text-decoration: none;
}
.navigation-Time {
  color: #a5a5a5;
  font-weight: 600;
  font-size: 12px;
  position: absolute;
  left: 13px;
  margin-top: 3px;
  text-decoration: none;
}
.not-more-data {
  height: 50px;
  text-align: center;
  color: #a5a5a5;
  margin-top: 10px;
  font-size: 14px;
}
</style>