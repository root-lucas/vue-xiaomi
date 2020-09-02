<template>
    <div id="app">
        <el-container>
            <!-- 顶部导航栏 -->
            <div class="topbar">
                <div class="nav">
                    <ul>
                        <li v-if="!isLogin">
                            <el-button type="text">登录</el-button>
                            <span class="sep">|</span>
                            <el-button type="text">注册</el-button>
                        </li>
                        <li v-else>
                            欢迎
                            <el-popover placement="top" width="180">
                                <p>确定退出登录吗？</p>
                                <div style="text-align: right; margin: 10px 0 0">
                                    <el-button size="mini" type="text">取消</el-button>
                                    <el-button type="primary" size="mini">确定</el-button>
                                </div>
                                <el-button type="text" slot="reference">admin</el-button>
                            </el-popover>
                        </li>
                        <li>
                            <a>我的订单</a>
                        </li>
                        <li>
                            <a>我的收藏</a>
                        </li>
                        <li :class="getNum > 0 ? 'shopCart-full' : 'shopCart'">
                            <i class="el-icon-shopping-cart-full"></i> 购物车
                            <span class="num">({{ getNum }})</span>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- 顶栏容器 -->
            <el-header>
                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" active-text-color="#409eff" router>
                    <div class="logo">
                        <img src="./assets/imgs/logo.png" alt />
                    </div>
                    <el-menu-item index="/">首页</el-menu-item>
                    <el-menu-item index="/goods">全部商品</el-menu-item>
                    <el-menu-item index="/about">关于我们</el-menu-item>
                    <div class="so">
                        <el-input placeholder="请输入搜索内容">
                            <el-button slot="append" icon="el-icon-search"></el-button>
                        </el-input>
                    </div>
                </el-menu>
            </el-header>

            <el-main>Main</el-main>
            <el-footer>Footer</el-footer>
        </el-container>
        <router-view />
    </div>
</template>
<script>
export default {
    data() {
        return {
            isLogin: false,
            getNum: 0,
            visible: false,
            activeIndex: '', // 头部导航栏选中的标签
        }
    },
    beforeUpdate() {
        // 组件加载即激活的路由（default-active="activeIndex" == index）
        this.activeIndex = this.$route.path
    },
}
</script>
<style lang="scss">
* {
    padding: 0;
    margin: 0;
    border: 0;
    list-style: none;
}
a,
a:hover {
    text-decoration: none;
}

@import './assets/css/common.scss';
</style>
