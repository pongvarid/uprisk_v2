<template>
<!-- <div @click="$router.push(path)" class="w-full cursor-pointer border b-gray-400 rounded flex flex-col justify-center items-center text-center p-6 bg-white">
    <div class="w-32 h-32 flex items-center justify-center">
       <v-icon :style="`font-size:${icon_size}px;`">{{icon}}</v-icon>
    </div>
    <p class="text-gray-700 mb-2">{{subHead}}</p>
    <div class="text-3xl font-bold text-gray-900 mb-6">{{head}}</div>

  </div> -->
<div :class="`${color} ${border}`" class=" shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 dark:border-gray-600 text-white font-medium group">
    <div class="w-1/3 flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
     <v-icon :style="`font-size:${icon_size}px;`">{{icon}}</v-icon>
    </div>
    <div class="w-2/3 text-right">
        <p class="text-2xl">{{subHead}}</p>
        <p class="text-sm">{{head}}</p>
    </div>
</div>
</template>

<script>
export default {
    name: "Card",
    props: {

        head: { default: "หัวข้อ" },
        path: { default: "/" },
        subHead: { default: "ข้อมูลใต้ล่าง" },
        icon: { default: "em em-bookmark_tabs" },
        icon_size: { default: '16' },
        color:{default:'bg-blue-500'},
        border:{default:'border-blue-600'}

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
