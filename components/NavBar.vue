<template>
  <div class="w-full text-white bg-blue-900" style="overflow: hidden; display: flex; align-items: center">
    <a class="hover:bg-sky-800 rounded" href="/" style="padding: 23px">
      <img :src="homeIcon" style="width: 30px; height: 27px; float: left; transform: translate(-8px, -5px)" />
      Home
    </a>
    <DropDownPug />
    <a class="hover:bg-sky-800 rounded" href="/FAQ" style="padding: 25px">FAQs</a
    ><a class="hover:bg-sky-800 rounded" href="/about" style="padding: 25px">About</a>
    <div v-if="user?.isLoggedIn" style="position: absolute; right: 0.2%">
      <UserCard />
    </div>

    <div v-else style="position: absolute; right: 0.2%">
      <UserCard />
    </div>
  </div>
</template>

<script setup lang="ts">
import homeIcon from '~/assets/images/home-icon-SG.png';
import { useUserStore } from '@/stores/user';
const user = useUserStore();

const dropped = false;
</script>
