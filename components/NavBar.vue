<template>
  <div
    class="w-full text-white bg-gray-700"
    style="
      overflow: hidden;
      display: flex;
      align-items: center;
    "
  >
    <a
      class="hover:bg-gray-600"
      href="/"
      style="padding: 20px"
    >
      <img
        :src="homeIcon"
        style="
          width: 25px;
          height: 25px;
          float: left;
          transform: translate(-5px, -4px);
        "
      />
      Home
    </a>
    <a
      class="hover:bg-gray-600"
      href="/course"
      style="padding: 20px"
      >Course Page</a
    ><a
      class="hover:bg-gray-600"
      href="/FAQ"
      style="padding: 20px"
      >FAQs</a
    ><a
      class="hover:bg-gray-600"
      href="/about"
      style="padding: 20px"
      >About</a
    >
    <div v-if="user.isLoggedIn" style="padding-left: 79.4%">
      <UserCard />
    </div>

    <div v-else style="padding-left: 81.8%">
      <UserCard />
    </div>
  </div>
</template>

<script setup lang="ts">
import homeIcon from '~/assets/images/home-icon.png';
import { useUserStore } from '@/stores/user';
const user = useUserStore();
</script>
