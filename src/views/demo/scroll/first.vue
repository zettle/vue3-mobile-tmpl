<template>
  <app-layout>
    <p class="spance">
      问题描述: 在 <code>first.vue</code>滚动一定距离，然后再去
      <code>second.vue</code>，<code>second.vue</code>会沿用这个滚动距离
    </p>
    <h1 v-for="n in 10" :key="n">
      {{ n }}
    </h1>
    <van-button plain to="/demo/scroll/second" type="primary">
      去second页面
    </van-button>
    <h1 v-for="n in 10" :key="n">
      {{ n }}
    </h1>
  </app-layout>
</template>
