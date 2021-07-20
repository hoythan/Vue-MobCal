<template>
    <div>
        <vue-mob-cal v-model="currentDate" :mode.sync="mode" color="#007873">
        </vue-mob-cal>
    </div>
</template>

<script>
export default {
  data () {
    return {
      currentDate: new Date(),
      mode: 'month'
    }
  }
}
</script>

<style>

</style>
