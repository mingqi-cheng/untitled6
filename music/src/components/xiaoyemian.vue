<template>
  <div class="aaa">
    <el-table class="aa" :data="tableData" @row-dblclick="handleDelete">
      <el-table-column label="歌名" prop="name" />
      <el-table-column label="歌手" prop="ar[0].name" />
      <el-table-column label="时长" prop="dt" />
    </el-table>
    <audio autoplay :src="url"></audio>
  </div>
</template>
<script>
import { reactive, ref } from "vue";
import API from "../plugins/axiosInstance.js";
import { useRoute } from "vue-router";
import { watch } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const route = useRoute();

    const input = ref("");
    input.value = route.query.id;
    watch(
      () => route.query.id,
      aa => {
        API({
          url: "/search?keywords=" + aa,
          method: "GET"
        }).then(res => {
          tableData.value = res.data.result.songs.map(res => {
            res.dt =
              Math.floor(res.dt / 1000 / 60) +
              ":" +
              (
                (res.dt / 1000 / 60 - Math.floor(res.dt / 1000 / 60)) *
                60
              ).toFixed(0) +
              "分";
            return res;
          });
        });
      }
    );

    watch(route.query.id, (news, old) => {
      console.log(news + "45" + old);
    });
    const url = ref("");
    const tableData = ref([]);
    API({
      url: "/search?keywords=" + input.value,
      method: "GET"
    }).then(res => {
      tableData.value = res.data.result.songs.map(res => {
        let b = "";
        for (let i = 0; i < res.ar.length; i++) {
          if (i == res.ar.length - 1) {
            b += res.ar[i].name;
          } else {
            b += res.ar[i].name + "/";
          }
        }
        res.ar[0].name = b;
        res.dt= Math.floor(res.dt / 1000 / 60) +
          ":" +
          ((res.dt / 1000 / 60 - Math.floor(res.dt / 1000 / 60)) * 60).toFixed(
            0
          ) +
          "分";
        return res;
      });
    });
    function handleDelete(id) {
      store.state.musicId = id.id;
    }
    return { route, input, url, tableData, handleDelete };
  }
};
</script>
<style>
.aa {
  width: calc(100% - 200px);
  margin: 0 auto;
  box-shadow: 0 0 5px #d2d2d2;
}
.aaa {
  margin-bottom: 100px;
}
</style>