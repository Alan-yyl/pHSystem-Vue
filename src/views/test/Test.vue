<template>
<!--  <div v-for="(itme,index) in this.pH" :key="index">-->
<!--    Test{{item}}-->
<!--  </div>-->
</template>

<script>
  export default {
    name: 'Test',
    data() {
      return {pH: []}

    },
    methods: {
      test() {
        for (let i = 0; i < 10; i++) {
          this.pH.push(i)
        }
      }
    }
  }


</script>

<style scoped>

</style>
