<template>
  <div id="app">
    <div id="nav">
<!--      <router-link to="/">Home</router-link> |-->
<!--      <router-link to="/about"></router-link>-->
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
    *{
        margin: 0;
        padding: 0;
        font-family: "Microsoft YaHei";
    }
   body{
        background-color:#f1f7f9;
    }
    label{
        font-size: 16px !important;
        font-weight:700;
    }
</style>
