

<template>
   <el-button type="primary" @click="aa">主要按钮</el-button>
</template>
<script >
   export default{
    data() {
      return {
        
      }
    },
    created(){
      alert(77)
    },
    methods:{
      aa(){
        alert(66)
      }
    }


   }
</script>
<style scoped>

</style>
