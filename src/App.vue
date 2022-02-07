<template>
  <router-view v-slot="{ Component }">
    <!-- <keep-alive include="about"> -->
    <component :is="Component"></component>
    <!-- </keep-alive> -->
  </router-view>
</template>
