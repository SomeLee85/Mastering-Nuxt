<template>
  <Carousel ref="myCarousel" :items-to-show="1.25" :autoplay="3000" :wrap-around="true">
    <Slide v-for="slide in screenshots" :key="slide">
      <img class="carousel__item" :src="slide"></img>
    </Slide>

    <template #addons>
      <Pagination />
    </template>
  </Carousel>
</template>

<script setup lang="ts">
import screen1 from '~/assets/images/screen1.png';
import screen2 from '~/assets/images/screen2.png';
import screen3 from '~/assets/images/screen3.png';
import screen4 from '~/assets/images/screen4.png';
import screen5 from '~/assets/images/screen5.png';
const screenshots = [screen1, screen2, screen3, screen4, screen5];
const myCarousel = ref()

// import { defineComponent } from 'vue';
import { Carousel, Pagination, Slide } from 'vue3-carousel';

import 'vue3-carousel/dist/carousel.css';



</script>
