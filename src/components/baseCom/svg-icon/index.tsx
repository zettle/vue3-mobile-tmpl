import { defineComponent, computed } from 'vue';

// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/18446
const req = require.context('./icons', false, /\.svg$/);
const requireAll = (requireContext: __WebpackModuleApi.RequireContext) => {
  return requireContext.keys().map(requireContext);
};
requireAll(req);

export default defineComponent({
  name: 'SvgIcon',
  props: {
    iconClass: { type: String, required: true }
  },
  setup (props) {
    const iconName = computed(() => `#icon-${props.iconClass}`);
    const className = computed(() => `svg-icon svg-icon-${props.iconClass}`);
    return () => (
      <svg
        aria-hidden="true"
        class={className.value}>
        <use xlinkHref={iconName.value} />
      </svg>
    );
  }
});
