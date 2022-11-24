<template>
  <div class="app">
    <div style="   display: flex;     justify-content: space-around;">
      <div class="imga">
        <img style :src="gedan.coverImgUrl" alt />
      </div>
      <div class="wenben">
        {{gedan.name}}
        <div>
          风格:
          <div class="fengge" v-for="item in gedan.tags" :key="item.id">{{ item }}</div>
        </div>

        <div class="jianji">简介： {{gedan.description}}</div>
      </div>
    </div>
    <div style="  margin-top:20px;">
      <el-table :data="songs" class="aa" @row-click="bofang">
        <el-table-column type="index" width="50" />

        <el-table-column property="name" label="歌名" />
        <el-table-column property="ar[0].name" label="歌手" />
        <el-table-column property="dt" label="时间" />
      </el-table>
    </div>
  </div>
</template>
<script>
import API from "../plugins/axiosInstance.js";
import { reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
export default {
  setup() {
    const router = useRoute();
    const gedan = ref({});
    const songs = ref([]);
    const store = useStore();
    if(store.state.jishu==0){
      store.state.jishu=-1
    }
 
    function bofang(e){

      store.state.songslist=[]
     songs.value.filter(res=>{
      store.state.songslist.push(res.id)
     })
 
     
      store.state.jishu= store.state.songslist.indexOf(e.id)   
    }
    API({
      url: "/playlist/detail?id=" + router.query.id,
      method: "GET"
    }).then(res => {
      gedan.value = res.data.playlist;
    });
    API({
      url: "/playlist/track/all?id=" + router.query.id,
      method: "GET"
    }).then(res => {
      songs.value = res.data.songs.map(res => {
        let b = "";
        for (let i = 0; i < res.ar.length; i++) {
          if (i == res.ar.length - 1) {
            b += res.ar[i].name;
          } else {
            b += res.ar[i].name + "/";
          }
        }
        res.ar[0].name = b;
        
        res.dt =  Math.floor(res.dt / 1000 / 60) +
          ":" +
          ((res.dt / 1000 / 60 - Math.floor(res.dt / 1000 / 60)) * 60).toFixed(
            0
          ) +
          "分";
        return res;
      });
    });
    return { gedan, songs ,bofang,store};
  }
};
</script>
<style>
.imga {
  width: 20%;
  margin-left: 15%;
  padding-top: 40px;
}
.app {
  width: 80%;
  margin: 0px auto;
  box-shadow: 0 0 5px #d2d2d2;
  height: 100em;
}
.imga img {
  width: 100%;
  height: 100%;
}
.wenben {
  line-height: 30px;
  width: 45%;
  padding-top: 40px;
  font-size: 20px;
}
.jianji {
  font-size: 8px;
  margin-top: 10%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
.fengge {
  display: inline-block;
  margin: 2px;
  margin-top: 10%;
  font-size: 12px;
  border: 1px solid #d2d2d2;
  border-radius: 20px;
  text-align: center;
  width: 100px;
}
</style>