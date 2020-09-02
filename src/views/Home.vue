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

                <!-- 家电商品展示区域 -->
                <div class="appliance" id="promo-menu">
                    <div class="box-hd">
                        <div class="title">家电</div>
                        <div class="more" id="more">
                            <MyMenu :val="3" @fromChild="getChildMsg">
                                <span slot="1">热门</span>
                                <span slot="2">电视影音</span>
                            </MyMenu>
                        </div>
                    </div>
                    <div class="box-bd">
                        <div class="promo-list">
                            <ul>
                                <li>
                                    <img :src="$target + 'public/imgs/appliance/appliance-promo1.png'" />
                                </li>
                                <li>
                                    <img :src="$target + 'public/imgs/appliance/appliance-promo2.png'" />
                                </li>
                            </ul>
                        </div>
                        <div class="list">
                            <MyList :list="applianceList" :isMore="true"></MyList>
                        </div>
                    </div>
                </div>
                <!-- 家电商品展示区域END -->
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import MyList from '@/components/MyList'
import MyMenu from '@/components/MyMenu'
export default {
    name: 'Home',
    components: { MyList, MyMenu },
    data() {
        return {
            carousel: '', // 轮播图数据
            phoneList: '', // 手机商品列表
            miTvList: '', // 小米电视商品列表
            applianceList: '', // 家电商品列表
            applianceHotList: '', //热门家电商品列表
            applianceActive: 1, // 家电当前选中的商品分类
        }
    },
    watch: {
        // 家电当前选中的商品分类，响应不同的商品数据
        applianceActive: function(val) {
            console.log('val = ', val)
            // 页面初始化的时候把applianceHotList(热门家电商品列表)直接赋值给applianceList(家电商品列表)
            // 所以在切换商品列表时判断applianceHotList是否为空,为空则是第一次切换,把applianceList赋值给applianceHotList
            if (this.applianceHotList == '') {
                this.applianceHotList = this.applianceList
            }
            if (val == 1) {
                // 1为热门商品
                this.applianceList = this.applianceHotList
                return
            }
            if (val == 2) {
                // 2为电视商品
                this.applianceList = this.miTvList
                return
            }
        },
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
        this.getPromo(['电视机', '空调', '洗衣机'], 'applianceList', '/api/product/getHotProduct') // 家电（热门）
        this.getPromo('电视机', 'miTvList') // 家电（电影影音）
    },
    methods: {
        // 获取家电模块子组件传过来的数据
        getChildMsg(val) {
            this.applianceActive = val
        },
        // 获取各类商品数据方法封装
        getPromo(categoryName, val, api) {
            api = api != undefined ? api : '/api/product/getPromoProduct'
            this.$axios
                .post(api, {
                    categoryName,
                })
                .then((res) => {
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
