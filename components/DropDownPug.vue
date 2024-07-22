<template>
  <div class="dropdown">
    <button class="dropbtn">
      Course
      <p class="float-right" style="transform: translate(10px, -4px)">⌄</p>
    </button>
    <div class="dropdown-content">
      <!-- hover:underline px-3 text-lg rounded -->
      <button class="chOneDrop hover:underline" style="padding-top: 20px">
        Chapter-1
        <p class="float-right text-xs" style="transform: translate(5px, 7px)">﹥</p>
        <div class="chOne-content">
          <a
            class="mt-1 block px-4 py-1 rounded hover:bg-teal-600"
            href="/course/chapter/1-chapter-1/lesson/1-introduction-to-typescript-with-vue-js-3"
            ><p class="underline float-left">1-1:</p>
            Typescript with Vue</a
          >
          <a
            class="mt-1 block px-4 py-1 rounded hover:bg-teal-600"
            href="/course/chapter/1-chapter-1/lesson/2-typescript-in-vue-components"
            ><p class="underline float-left">1-2:</p>
            Vue Components</a
          >
          <a
            class="mt-1 block px-4 py-1 rounded hover:bg-teal-600"
            href="/course/chapter/1-chapter-1/lesson/3-typing-component-events"
            ><p class="underline float-left">1-3:</p>
            Component Events</a
          >
        </div>
      </button>
      <div v-if="user.paid">
        <button class="chTwoDrop hover:underline">
          Chapter-2
          <p class="float-right text-xs" style="transform: translate(5px, 7px)">﹥</p>
          <div class="chTwo-content">
            <a
              class="mt-1 block px-4 py-1 rounded hover:bg-teal-600"
              href="/course/chapter/2-chapter-2/lesson/1-using-typescript-with-the-options-api-in-components"
              ><p class="underline float-left">2-1:</p>
              Typescript With Options Api</a
            >
            <a
              class="mt-1 block px-4 py-1 rounded hover:bg-teal-600"
              href="/course/chapter/2-chapter-2/lesson/2-declaring-and-typing-component-props"
              ><p class="underline float-left">2-2:</p>
              Component Props</a
            >
            <a
              class="mt-1 block px-4 py-1 rounded hover:bg-teal-600"
              href="/course/chapter/2-chapter-2/lesson/3-typescript-in-vue-components"
              ><p class="underline float-left">2-3:</p>
              Typescript in Components</a
            >
            <a
              class="mt-1 block px-4 py-1 rounded hover:bg-teal-600"
              href="/course/chapter/2-chapter-2/lesson/4-typing-component-events"
              ><p class="underline float-left">2-4:</p>
              Component Events</a
            >
          </div>
        </button>
      </div>
      <div v-if="user.paid">
        <button class="chThreeDrop hover:underline">
          Chapter-3
          <p class="float-right text-xs" style="transform: translate(5px, 7px)">﹥</p>
          <div class="chThree-content">
            <a
              class="mt-1 block px-4 py-1 rounded hover:bg-teal-600"
              href="/course/chapter/3-chapter-3/lesson/1-using-typescript-with-the-options-api-in-components"
              ><p class="underline float-left">3-1:</p>
              Typescript With Options Api</a
            >
            <a
              class="mt-1 block px-4 py-1 rounded hover:bg-teal-600"
              href="/course/chapter/3-chapter-3/lesson/2-declaring-and-typing-component-props"
              ><p class="underline float-left">3-2:</p>
              Component Props</a
            >
            <a
              class="mt-1 block px-4 py-1 rounded hover:bg-teal-600"
              href="/course/chapter/3-chapter-3/lesson/3-typescript-in-vue-components"
              ><p class="underline float-left">3-3:</p>
              Typescript in Components</a
            >
            <a
              class="mt-1 block px-4 py-1 rounded hover:bg-teal-600"
              href="/course/chapter/3-chapter-3/lesson/4-typing-component-events"
              ><p class="underline float-left">3-4:</p>
              Component Events</a
            >
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';

const user = useUserStore();
</script>

<style>
/* Classes */
.dropbtn {
  padding: 25px;
  border: none;
  border-radius: 4%;
  position: relative;
}
.dropdown {
  position: relative;
  display: inline-block;
}
.chOneDrop {
  padding: 20px;
  border: none;
  font-size: large;
  position: relative;
}
.chTwoDrop {
  padding: 20px;
  border: none;
  font-size: large;
  position: relative;
}
.chThreeDrop {
  padding: 20px;
  border: none;
  font-size: large;
  position: relative;
}

/* Content */
.dropdown-content {
  display: none;
  position: fixed;
  border-radius: 3%;
  text-decoration-color: white;
  background-color: #075985;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.5);
  z-index: 1;
}
.chOne-content {
  display: none;
  font-size: medium;
  position: absolute;
  border-radius: 3%;
  text-align: center;
  min-width: 210px;
  text-decoration-color: white;
  background-color: #075985;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.5);
  z-index: 1;
  transform: translate(-8px, -42px);
  left: 144px;
}
.chTwo-content {
  display: none;
  position: absolute;
  font-size: medium;
  border-radius: 3%;
  min-width: 200px;
  text-decoration-color: white;
  background-color: #075985;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.5);
  z-index: 1;
  transform: translate(-8px, -42px);
  left: 144px;
}
.chThree-content {
  display: none;
  position: absolute;
  border-radius: 3%;
  font-size: medium;
  min-width: 200px;
  text-decoration-color: white;
  background-color: #075985;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.5);
  z-index: 1;
  transform: translate(-8px, -42px);
  left: 144px;
}

/* a tags */
.dropdown-content a {
  color: white;
  padding: 12px 16px;
  text-decoration-color: white;
  display: block;
}
.chOne-content a {
  color: white;
  padding: 12px 16px;
  display: block;
}
.chTwo-content a {
  color: white;
  padding: 12px 16px;
  display: block;
}
.chThree-content a {
  color: white;
  padding: 12px 16px;
  display: block;
}

/* hover bg colors */
.dropdown-content a:hover {
  background-color: rgb(0, 142, 193);
}
.chOne-content a:hover {
  background-color: rgb(0, 142, 193);
}
.chTwo-content a:hover {
  background-color: rgb(0, 142, 193);
}
.chThree-content a:hover {
  background-color: rgb(0, 142, 193);
}
.dropdown:hover .dropbtn {
  background-color: #075985;
}

/* Displaying content on hover */
.dropdown:hover .dropdown-content {
  display: block;
}
.chOneDrop:hover .chOne-content {
  display: block;
}
.chTwoDrop:hover .chTwo-content {
  display: block;
}
.chThreeDrop:hover .chThree-content {
  display: block;
}
</style>
<!-- absolute items-center px-2 py-2 rounded-lg shadow-xl bg-sky-800 -->
