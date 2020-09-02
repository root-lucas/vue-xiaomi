<template>
    <div class="home" id="home" name="home">
        <!-- 轮播图 -->
        <div class="block">
            <el-carousel height="460px">
                <el-carousel-item v-for="item in carousel" :key="item.carousel_id">
                    <img style="height:460px;" :src="$target + item.imgPath" :alt="item.describes" />
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src

export default {
    name: 'Home',
    data() {
        return {
            carousel: [],
        }
    },
    created() {
        // 获取轮播图数据
        this.$axios
            .post('/api/resources/carousel', {})
            .then((res) => {
                this.carousel = res.data.carousel
            })
            .catch((err) => {
                return Promise.reject(err)
            })
    },
}
</script>
<style scoped>
@import '../assets/css/index.scss';
</style>
