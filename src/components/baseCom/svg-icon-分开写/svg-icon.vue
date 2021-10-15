<template>
  <svg
    aria-hidden="true"
    :class="['svg-icon', `svg-icon-${ iconClass }`]">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

// const req = require.context('./svg', false, /\.svg$/);
// const requireAll = (requireContext: __WebpackModuleApi.RequireContext) => {
//   return requireContext.keys().map(requireContext);
// };
// requireAll(req);

export default defineComponent({
  name: 'svg-icon',
  props: {
    iconClass: { type: String, required: true }
  },
  setup (props) {
    const iconName = computed(() => `#icon-${ props.iconClass }`);

    return {
      iconName
    };
  }
});
</script>
