<template><div></div></template>
<script>
import Confetti from 'vue-confetti/src/confetti.js';
export default {
  data: () => ({
    confetti: new Confetti(),
  }),
  mounted: function () {
    this.confetti.start({
      colors: ['#FF6F61', '#004C83', '#55C6A9', '#FFC82B'],
      particles: [{ type: 'rect', dropRate: 20 }],
      particlesPerFrame: 3,
    });
    setTimeout(() => {
      this.confetti.stop();
    }, 5000);
  },
  methods: {},
};
</script>
