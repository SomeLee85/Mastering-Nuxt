<template>
  <iframe
    width="547"
    height="315"
    :src="`https://player.vimeo.com/video/${props.videoId}`"
    title="Video Player"
    style="border: 0.5rem outset cadetblue"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</template>

<script setup>
const props = defineProps({
  videoId: {
    type: Number,
    required: true,
  },
});
</script>
