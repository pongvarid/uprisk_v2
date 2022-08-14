<template>
  <div class="bg-gray-100 m-4 rounded-xl   border-l-4 border-green-500 p-4">
    <div class="flex ">
     <v-icon v-if="!$vuetify.breakpoint.mobile" style="font-size:48px;">{{icon}}</v-icon>
      <div class="pl-4">
        <h4 class="text-sm  md:text-xl">{{ name }}</h4>
        <h3>{{ text }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {default: 'รายงาน'},
    icon: {default: 'em em-abacus'},
    text: {default: 'ข้อมูลสรุปรายระเอียดต่างๆ'},
  },
  data: () => {
    return ({
      test: 'sss',

    })
  },
  async created() {

  }
}
</script>
