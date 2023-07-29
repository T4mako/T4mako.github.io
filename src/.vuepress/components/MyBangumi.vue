<template>
  <div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "MyBangumi",
  setup() {
    let data = "aaa";
    function getData(){
      axios.get('https://api.bgm.tv/v0/users/T4mako/collections?subject_type=2&type=2&limit=30').then(
        response => {
        },
        error => {}
        )
    }
    return {
      getData,
    }
  },
  mounted(){
    this.getData()
  }

}
</script>

<style>

</style>