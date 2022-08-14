<template>
<div>
    <v-chip v-if="rm_type == 1"   class="ma-2 mb-2" color="primary"> แผนการบริหารจัดการความเสี่ยงและควบคุมภายใน (RM-Plan)
 </v-chip>
    <v-chip v-else   class="ma-2 mb-2" :color="(rm_type == 6)?`warning`:`success`"> แผนการบริหารจัดการความเสี่ยงและควบคุมภายใน รอบ {{rm_type}} เดือน (RM{{rm_type}}) </v-chip>
</div>
</template>

<script>
export default {
    props: {
        rm_type: {
            default: 1
        }
    }
}
</script>

<style>

</style>
