<template>
    <div class="error">
        <div class="main"></div>
    </div>
</template>

<script>
export default {
    mounted() {
        this.notifyError('检查下路由!')
    },
}
</script>

<style>
.error {
    height: 500px;
    width: 1225px;
    margin: 0 auto;
}
.error .main {
    margin: 0 362.5px;
    height: 500px;
    background: url(../assets/imgs/error.png) no-repeat;
}
</style>
