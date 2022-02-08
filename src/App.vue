<template>
  <router-view v-slot="{ Component }">
    <!-- <transition name=""> -->
    <!-- <keep-alive include="about"> -->
    <component :is="Component"></component>
    <!-- </keep-alive> -->
    <!-- </transition> -->
  </router-view>
</template>
