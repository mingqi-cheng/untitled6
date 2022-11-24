<template>
  <div class="dayemian">
    <div class="cipan">
      <img
        src="../static/needle-ab.png"
        class="img_cz"
        :class="{ img_cz_active: !store.state.bofang}"
        alt
      />
      <img src="../static/d7e4e3a244701ee85fecb5d4f6b5bd57.png" class="img_cp" alt />
      <img
        :src="url"
        class="img_dt"
        :class="!store.state.bofang ? 'img_dt_active' : 'img_dt_paused'"
        alt
      />
    </div>

    <div class="geming1">{{music.name}}</div>
    <div class="geshou1">歌手：{{music.ar}}</div>
    <div class="geci">
      <div class="content" ref="musicLyric">
        <p
          v-for="(i,index) in arr"
          :key="index"
          :class="{active:(currentime*1000>=i.time&&currentime*1000<i.per)}"
        >{{i.lrc}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import API from "../plugins/axiosInstance.js";
import { onMounted, nextTick, reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";

import { useStore } from "vuex";
import { isNumber } from "lodash";
export default {
  setup() {
    const route = useRoute();
    const zanting = ref(false);
    const music = ref({});
    const store = useStore();
    const url = ref();
    const arr = ref();
    const gaodu = ref();
    const currentime = ref();
    const musicLyric = ref();
    watch(
      () => store.state.shijain,
      aa => {
        let p=document.querySelector('p.active')
        if(p){
         
       if( p.offsetTop>200){
        musicLyric.value.scrollTop=p.offsetTop-200
       }
        }
       
        currentime.value = aa;
        
      }
    );

 
    ss(route.query.id);

    function aa() {
      store.state.bofang = !store.state.bofang;
    }
    watch(
      () => store.state.jishu,
      aa => {
        ss(store.state.songslist[aa]);
      }
    );
  

    watch(
      () => route.query.id,
      aa => {
        ss(aa);
      }
    );
    async function ss(id) {
      await API({
        url: "/song/detail?ids=" + id
      }).then(res => {
        if (res.data.code == 200) {
          music.value = res.data.songs;
          url.value = res.data.songs[0].al.picUrl;
          music.value.filter(res => {
            let b = "";
            for (let i = 0; i < res.ar.length; i++) {
              if (i == res.ar.length - 1) {
                b += res.ar[i].name;
              } else {
                b += res.ar[i].name + "/";
              }
            }
            res.ar = b;
          });
          music.value = music.value[0];
        }
      });
      await API({
        url: "/lyric?id=" + id
      }).then(res => {
        arr.value = res.data.lrc.lyric.split(/[\r\n]+/).map((item, i) => {
          let min = item.slice(1, 3);
          let sec = item.slice(4, 6);
          let mill = item.slice(7, 10);
          let time =
            parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          let lrc = item.slice(11, item.length);
          if (isNaN(Number(mill))) {
            mill = item.slice(7, 9);
            lrc = item.slice(10, item.length);
            time =
              parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          }

          return { min, sec, time, mill, lrc };
        });

        arr.value.forEach((item, i) => {
          if (i == arr.value.length - 1) {
            item.per = 0;
          } else {
            item.per = arr.value[i + 1].time;
          }
        });
       
      });
    }
  
    return {
      musicLyric,
      store,
      url,
      aa,
      currentime,
      music,
      arr,
      zanting,
      gaodu
    };
  }
};
</script> 
<style lang="less" scoped>
.dayemian {
  width: 80%;
  margin: 0 auto;
  box-shadow: 0 0 5px #d2d2d2;
  height: 100%;
}

.cipan {
  display: flex;
  width: 35%;
  height: 450px;
  position: absolute;
  left: 10%;
}
.img_cz {
  width: 90px;
  height: 120px;
  position: relative;
  left: 380px;
  top: 40px;
  z-index: 1011;
  transform-origin: 0 0;
  transform: rotate(-30deg);
  transition: all 2s;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
  user-select: none;
}
.img_cz_active {
  width: 90px;
  height: 120px;
  transform-origin: 0 0;
  transform: rotate(0deg);
  transition: all 2s;
}
.img_cp {
  z-index: 99;
  position: relative;
  left: 150px;
  top: 100px;
  width: 300px;
  height: 300px;

  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
  user-select: none;
}
.img_dt {
  position: relative;
  right: 100px;
  top: 150px;
  width: 210px;
  height: 210px;
  border-radius: 50%;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  animation: rotate_dt 10s linear infinite;
}
.img_dt_active {
  animation-play-state: running;
}
.img_dt_paused {
  animation-play-state: paused;
}
@keyframes rotate_dt {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
.geming1 {
  margin-top: 20px;
  width: 200px;
  text-align: center;
  position: relative;
  left: 65%;
  top: 0px;
  font-size: 30px;
}
.geshou1 {
  margin-top: 20px;
  width: 200px;
  text-align: center;
  position: relative;
  left: 65%;
  top: 0px;
  margin-top: 0px;
  font-size: 14px;
}
.geci {
  margin-top: 50px;
  left: 22%;
  top: 0px;
  position: relative;
  overflow: hidden;
  text-align: center;
}
.content::-webkit-scrollbar{
  
display: none;
}
.content {
  width: 100%;
  height: 500px;
 
  overflow: scroll;

  p {
    color: #999;
  }
  .active {
    color: rgb(23, 3, 3);
    font-size: 30px;
  }
  line-height: 50px;
}
</style>