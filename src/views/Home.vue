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
        <!-- 轮播图END -->

        <div class="main-box">
            <div class="main">
                <!-- 手机商品展示区域 -->
                <div class="phone">
                    <div class="box-hd">
                        <div class="title">手机</div>
                    </div>
                    <div class="box-bd">
                        <div class="promo-list">
                            <router-link to>
                                <img :src="$target + 'public/imgs/phone/phone.png'" />
                            </router-link>
                        </div>
                        <div class="list">
                            <MyList :list="phoneList" :isMore="true"></MyList>
                        </div>
                    </div>
                </div>
                <!-- 手机商品展示区域END -->
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import MyList from '@/components/MyList'
export default {
    name: 'Home',
    components: { MyList },
    data() {
        return {
            carousel: '', // 轮播图数据
            phoneList: '', // 手机商品列表
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

        // 获取各类商品数据
        this.getPromo('手机', 'phoneList')
    },
    methods: {
        // 获取各类商品数据方法封装
        getPromo(categoryName, val, api) {
            api = api != undefined ? api : '/api/product/getPromoProduct'
            this.$axios
                .post(api, {
                    categoryName,
                })
                .then((res) => {
                    // this.phoneList 等于 this[val]
                    this[val] = res.data.Product
                })
                .catch((err) => {
                    return Promise.reject(err)
                })
        },
    },
}
</script>
<style scoped>
@import '../assets/css/index.scss';
</style>
