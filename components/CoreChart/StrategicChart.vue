 <template>
 <div class="aProperty">
  <pre>{{Year}}</pre>
 </div>
 </template>

 <script lang="ts">
 import { Component, Prop, Vue } from 'vue-property-decorator';
 import {Core} from '@/vuexes/core'
 import {CoreRisk} from '@/vuexes/core_risk'

 import {Auth} from '@/vuexes/auth'

 @Component
 export default class  extends Vue {
   private core:any = Core
   private strategics!:[]
   @Prop() private aProperty!: string;

   private async created(){
      await this.initialize();
      await CoreRisk.loadCurrentRisk()
   }


   get Year(){
     return Core.currentYear
   }

   private async initialize() {
     this.strategics = Core.choices.strategic
   }
 }

 </script>

 <style scoped lang="scss">
 .aProperty {
     color: gray;
 }
 </style>
