<template>
    <div class="loading" v-show="loading">
        <div class="loading-box">
            <img src="../../static/images/loading.gif">
        </div>
    </div>
</template>
<script>
export default {
    name: 'loading',
    data() {
        return {
            loading: false
        }
    },
    created() {
        var that = this;
        this.bus.$on('loading', function(data) {
            that.loading = !!data;
        })
    }
}
</script>
<style scoped lang="scss">
.loading {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    color: #fff;
    background-color: rgba(0, 0, 0, 0);
    p {
        padding: .15rem .15rem .2rem;
        color: #fff;
        font-size: .16rem;
    }
    img {
        width: 50px;
        height: 50px;
    }
}
.loading-box{
    padding: 20px;
    padding-bottom: 14px;
    background-color: rgba(0, 0, 0, 0.897);
    border-radius: 10px;
}
</style>
