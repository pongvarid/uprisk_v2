<template>
<v-col>
  <v-toolbar flat color="transparent">
    <div class="flex">
      <v-btn  @click="$router.go(-1)" text>หน้าแรก /</v-btn>
      <v-btn color="primary" text> จัดการตัวเลือก/</v-btn>

    </div>
    <v-spacer></v-spacer>
  </v-toolbar>

  <div>
    <v-tabs>
      <v-tab>ยุทธศาสตร์</v-tab>
      <v-tab-item>  
        <Choices-Strategic></Choices-Strategic>
      </v-tab-item>
      <v-tab>กลยุทธ์</v-tab>
      <v-tab-item>
        <Choices-Strategy></Choices-Strategy>
      </v-tab-item>
      <v-tab>ประเภทความเสี่ยง S-O-F-C-E-G</v-tab>
      <v-tab-item>
        <Choices-Type></Choices-Type>
      </v-tab-item>
    </v-tabs>
  </div>
</v-col>
</template>

<script>
export default {
  name: "choice"
}
</script>

<style scoped>

</style>
