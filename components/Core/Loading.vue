<template>
  <div>
    <v-overlay z-index="99" :value="loadX">
      <v-btn style="height:108px; width:108px;" color="white" fab     class=" animate__animated animate__pulse animate__infinite	infinite" >
        <img class="w-auto  h-20 " src="https://upload.wikimedia.org/wikipedia/th/d/d7/%E0%B8%95%E0%B8%A3%E0%B8%B2%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%A5%E0%B8%B1%E0%B8%81%E0%B8%A9%E0%B8%93%E0%B9%8C%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%88%E0%B8%B3%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%A7%E0%B8%B4%E0%B8%97%E0%B8%A2%E0%B8%B2%E0%B8%A5%E0%B8%B1%E0%B8%A2%E0%B8%9E%E0%B8%B0%E0%B9%80%E0%B8%A2%E0%B8%B2.png" alt="">
      </v-btn>
      <h2 class="text-xl animate__animated animate__swing animate__infinite	infinite">{{loadTxt}}...</h2>
    </v-overlay>
  </div>

</template>

<script lang="ts">
import {Web} from "@/vuexes/web";
import {Component, Vue, Watch} from "nuxt-property-decorator";
@Component({
  components: {
  },
  computed: {}
})
export default class dddd extends Vue {
  overlay:any =  true
  async created() {
  }
  get loadX(){
    return Web.loading
  }
  get loadTxt(){
    return Web.loadTxt
  }
}
</script>
