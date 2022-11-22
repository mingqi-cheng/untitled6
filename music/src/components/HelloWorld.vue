<template>
  <div style="margin-bottom: 100px;">
    <div>
      <el-carousel :interval="4000" type="card" height="300px">
        <el-carousel-item v-for="item in imgs" :key="item">
          <img onclick="songslist(item.id)" class="img" :src="item.imageUrl" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="ziti">歌单</div>
    <div class="songslist">
      <div v-for="item in playlists" :key="item.id" class="imgs">
        <div @click="songslist(item.id)">
          <img :src="item.picUrl" alt />
        </div>

        <div class="listName">{{ item.name }}</div>
        <div class="playcount">{{item.playCount}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import API from "../plugins/axiosInstance.js";
import { reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    const playlists = ref([]);
    const router = useRouter();
    const imgs = ref([]);
    function songslist(id1) {
      router.push({
        name: "songlist",
        query: {
          id: id1
        }
      });
    }
    API({
      url: "/banner?type=0",
      method: "GET"
    }).then(res => {
      imgs.value = res.data.banners;
    });
    API({
      url: "personalized?limit=8",
      method: "GET"
    }).then(res => {
      console.log(res);
      playlists.value = res.data.result.map(item => {
        if (item.playCount > 10000 && item.playCount < 100000000) {
          item.playCount = Math.floor(item.playCount / 10000);
          item.playCount = item.playCount + "万";
        } else if (item.playCount > 100000000) {
          Math.floor(item.playCount / 100000000);
          item.playCount = item.playCount + "亿";
        }
        return item;
      });
      console.log(playlists);
    });
    return { imgs, playlists, songslist, router };
  }
};
</script>
<style>
.img {
  width: 100%;
  height: 100%;
}
.imgs {
  width: calc(25% - 40px);
  margin: 20px;
  box-sizing: border-box;
}
.imgs img {
  width: 100%;
  height: 100%;
}
.songslist {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.playcount {
  width: 50px;
  text-align: center;
  position: relative;
  bottom: calc(100% - 20px);
  color: #d2d2d2;
  left: calc(100% - 50px);
}
.ziti {
  margin-top: 30px;
  margin: 20px 100px;
  font-size: 64px;
  background: -webkit-linear-gradient(top, #ff0000, #00ff00); /*设置线性渐变*/
  /*为了支持更多的浏览器*/
  -webkit-background-clip: text; /*背景被裁剪到文字*/
  -webkit-text-fill-color: transparent; /*设置文字的填充颜色*/
}
</style>