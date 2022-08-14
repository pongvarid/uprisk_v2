<template>
  <div :class="`bg-white m-4 rounded-xl shadow-2xl border-b-4 border-${color}-500 p-4`">
    <div class="flex ">
      <i :class="icon" aria-role="presentation" aria-label=""></i>
      <div class="pl-4 w-10/12">
        <h4 class="text-base">{{ name }}</h4>
        <h3>{{ text }}</h3>

      </div>
      <div class="text-right" v-if="btn">
        <v-btn color="red" dark @click="back()">ลบ</v-btn>
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
    color:{default:'green'},
    btn:{default:false},
  },
  data: () => {
    return ({
      test: 'sss',

    })
  },
  async created() {

  },
  methods: {
    async back(){
      await this.$emit('back')
    }
  }
}
</script>
