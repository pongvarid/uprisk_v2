<template>
<div class="p-4 bg-blue-50 dark:bg-gray-800 dark:text-gray-50 border border-blue-500 dark:border-gray-500 rounded-lg shadow-md">
    <h4 class="text-lg font-semibold">{{text}}</h4>
    <ul>
        <li class="mt-3" v-for="file,i in files" :key="i">
            <a class="flex items-center text-blue-700 dark:text-gray-100" :href="src" target="_blank">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="transform transition-transform duration-500 ease-in-out">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span class="inline-flex pl-2">{{file.name}}</span>
            </a>
        </li>

    </ul>
</div>
</template>

<script>
export default {
    props:{
        text:{default:'หัวข้อ'},
        files:{
            default:[
                {name:'link',src:"#"}
            ]
        }
    }
}
</script>

<style>

</style>
