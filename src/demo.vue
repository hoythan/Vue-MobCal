<template>
    <div>
        <vue-mob-cal v-model="currentDate" :mode.sync="mode" color="#007873" @onPrev="onPrev" @onNext="onNext">
        </vue-mob-cal>
    </div>
</template>

<script>
export default {
  data () {
    return {
      currentDate: new Date('2021-10-01 00:00:00'),
      mode: 'week'
    }
  },
  methods: {
    onPrev () {
      console.log('onPrev')
    },
    onNext () {
      console.log('onNext')
    }
  }
}
</script>

<style>

</style>
