<template>
<!-- <div @click="$router.push(path)" class="w-full cursor-pointer border b-gray-400 rounded flex flex-col justify-center items-center text-center p-6 bg-white">
    <div class="w-32 h-32 flex items-center justify-center">
       <v-icon :style="`font-size:${icon_size}px;`">{{icon}}</v-icon>
    </div>
    <p class="text-gray-700 mb-2">{{subHead}}</p>
    <div class="text-3xl font-bold text-gray-900 mb-6">{{head}}</div>

  </div> -->
<div :class="`${color} ${border}`" class=" shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 dark:border-gray-600 text-white font-medium group">

    <div class="w-full text-right">
        <p class="text-sm">

            {{head}}</p>
            
        <div class="flex ">
            <v-icon :style="`font-size:${icon_size}px;`">{{icon}}</v-icon>
            <v-spacer></v-spacer>
            <p class="text-5xl">{{subHead}} <span class="text-sm">{{txt}}</span></p>
        </div>

    </div>
</div>
</template>

<script>
export default {
    name: "Card",
    props: {

        head: { default: "หัวข้อ" },
        txt: { default: 'ประเด็น' },
        path: { default: "/" },
        subHead: { default: "ข้อมูลใต้ล่าง" },
        icon: { default: "em em-bookmark_tabs" },
        icon_size: { default: '16' },
        color: { default: 'bg-blue-500' },
        border: { default: 'border-blue-600' }

    },
    data: function () {
        return ({

        })
    },
    methods: {

    }
}
</script>

<style scoped>

</style>
