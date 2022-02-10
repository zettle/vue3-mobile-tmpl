<template>
  <!-- <router-view v-slot="{ Component, route }">
    <transition :name="route.meta.transitionName">
      <keep-alive v-if="route.meta.keepAlive">
        <component :is="Component" />
      </keep-alive>
      <component :is="Component" v-else />
    </transition>
  </router-view> -->
  <router-view v-slot="{ Component }">
    <transition mode="out-in" name="fade">
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>
