<template>
<v-app>
  <Core-Navbar  @callback="checkUser"></Core-Navbar>
    <Core-Loading></Core-Loading>
    <v-main  class="grey lighten-3" v-if="response">
        <Core-Bg></Core-Bg>
           <nuxt class="relative" />
          
    </v-main>

    <!-- <div class="bg-gray-200">
        <div class="bg-gray-800 text-white py-3 px-4 text-center fixed left-0 bottom-0 right-0 z-40">
            This a Admin Dashboard along with dark mode &amp; responsive sidebar by Robin Hossain.
            <a class="underline text-gray-200" href="https://tailwindcomponents.com/component/responsive-admin-template">Component details</a>
        </div> 
    </div>  -->
</v-app>
</template>

<script>
import { Core } from "@/vuexes/core";

export default {
    data() {
        return {
            response: false,
        }
    },
    methods: {
        async loadEnv() {
            await Core.getRMEnv();
        },
        async checkUser(val) {
            await this.loadEnv();
            this.response = val
        }
    }
}
</script>

<style>
/* @import url('https://fonts.googleapis.com/css2?family=Mitr&display=swap'); */
/* @import url('https://fonts.googleapis.com/css2?family=Trirong&display=swap'); */

@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@300&family=Noto+Sans+Thai+Looped:wght@100&display=swap');

* {
    /* font-family: 'Mitr', sans-serif; */
    /* font-family: 'Trirong', serif; */
    font-family: 'IBM Plex Sans Thai', sans-serif;

}
 
    .bg-c-l{
        background:#74fd52
    }
      .bg-c-m{
        background:#ffff00
    }
      .bg-c-h{
        background:#ff8040
    }
     .bg-c-vh{
        background:#ff3c3c
    } 

.background {
    background: transparent !important;
}

.bgc {
    background-color: #fffefe;

}

/* Compiled dark classes from Tailwind */
.dark .dark\:divide-gray-700> :not([hidden])~ :not([hidden]) {
    border-color: rgba(55, 65, 81);
}

.dark .dark\:bg-gray-50 {
    background-color: rgba(249, 250, 251);
}

.dark .dark\:bg-gray-100 {
    background-color: rgba(243, 244, 246);
}

.dark .dark\:bg-gray-600 {
    background-color: rgba(75, 85, 99);
}

.dark .dark\:bg-gray-700 {
    background-color: rgba(55, 65, 81);
}

.dark .dark\:bg-gray-800 {
    background-color: rgba(31, 41, 55);
}

.dark .dark\:bg-gray-900 {
    background-color: rgba(17, 24, 39);
}

.dark .dark\:bg-red-700 {
    background-color: rgba(185, 28, 28);
}

.dark .dark\:bg-green-700 {
    background-color: rgba(4, 120, 87);
}

.dark .dark\:hover\:bg-gray-200:hover {
    background-color: rgba(229, 231, 235);
}

.dark .dark\:hover\:bg-gray-600:hover {
    background-color: rgba(75, 85, 99);
}

.dark .dark\:hover\:bg-gray-700:hover {
    background-color: rgba(55, 65, 81);
}

.dark .dark\:hover\:bg-gray-900:hover {
    background-color: rgba(17, 24, 39);
}

.dark .dark\:border-gray-100 {
    border-color: rgba(243, 244, 246);
}

.dark .dark\:border-gray-400 {
    border-color: rgba(156, 163, 175);
}

.dark .dark\:border-gray-500 {
    border-color: rgba(107, 114, 128);
}

.dark .dark\:border-gray-600 {
    border-color: rgba(75, 85, 99);
}

.dark .dark\:border-gray-700 {
    border-color: rgba(55, 65, 81);
}

.dark .dark\:border-gray-900 {
    border-color: rgba(17, 24, 39);
}

.dark .dark\:hover\:border-gray-800:hover {
    border-color: rgba(31, 41, 55);
}

.dark .dark\:text-white {
    color: rgba(255, 255, 255);
}

.dark .dark\:text-gray-50 {
    color: rgba(249, 250, 251);
}

.dark .dark\:text-gray-100 {
    color: rgba(243, 244, 246);
}

.dark .dark\:text-gray-200 {
    color: rgba(229, 231, 235);
}

.dark .dark\:text-gray-400 {
    color: rgba(156, 163, 175);
}

.dark .dark\:text-gray-500 {
    color: rgba(107, 114, 128);
}

.dark .dark\:text-gray-700 {
    color: rgba(55, 65, 81);
}

.dark .dark\:text-gray-800 {
    color: rgba(31, 41, 55);
}

.dark .dark\:text-red-100 {
    color: rgba(254, 226, 226);
}

.dark .dark\:text-green-100 {
    color: rgba(209, 250, 229);
}

.dark .dark\:text-blue-400 {
    color: rgba(96, 165, 250);
}

.dark .group:hover .dark\:group-hover\:text-gray-500 {
    color: rgba(107, 114, 128);
}

.dark .group:focus .dark\:group-focus\:text-gray-700 {
    color: rgba(55, 65, 81);
}

.dark .dark\:hover\:text-gray-100:hover {
    color: rgba(243, 244, 246);
}

.dark .dark\:hover\:text-blue-500:hover {
    color: rgba(59, 130, 246);
}

/* Custom style */
.header-right {
    width: calc(100% - 3.5rem);
}

.sidebar:hover {
    width: 16rem;
}

@media only screen and (min-width: 768px) {
    .header-right {
        width: calc(100% - 16rem);
    }
}
</style>
