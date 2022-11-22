<template>
  <div>
    <div>
      <el-menu class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1">LOGO</el-menu-item>

        <router-link to="/">
          <el-menu-item index="3">首页</el-menu-item>
        </router-link>
        <div>
          <el-input @keyup.enter="sousuo" class="input" v-model="input" placeholder="请输入音乐" />
          <el-button @click="sousuo">搜素</el-button>
        </div>

        <el-menu-item index="4">登录</el-menu-item>
      </el-menu>
    </div>

    <router-view></router-view>

    <div>
      <div class="dibu">
        <div class="xinxi">
          <img
            class="music-disk-picture"
            :class="{'music-disk-playing-style': !biaozhi.a}"
            :src="url"
            alt
          />
          <div class="geming">{{music.name}}</div>
          <div class="geshou">{{music.ar}}</div>
        </div>

        <div class="music-slider">
          <el-slider
            v-model="playTime"
            :format-tooltip="tooltipFormat"
            size="small"
            :max="sliderLength"
            @change="changePlayTime"
          />
        </div>
        <div class="bofang" >
          <svg
            t="1668856763461"
            class="icon"
            @click="lastButtonClick"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4288"
            width="40"
            height="40"
          >
            <path
              d="M803.584 134.592c-18.176-10.048-39.936-10.112-58.112 0L192 443.008l0-282.88c0-17.664-14.336-32-32-32S128 142.464 128 160.128l0 344.896C127.744 507.2 127.104 509.248 127.104 511.488S127.744 515.84 128 518.016l0 346.112c0 17.664 14.336 32 32 32s32-14.336 32-32L192 579.968l553.408 308.352C754.56 893.44 764.48 896 774.528 896s19.968-2.56 29.056-7.616c18.176-10.112 28.992-28.224 28.992-48.576L832.576 183.104C832.576 162.88 821.76 144.768 803.584 134.592zM768.192 829.248 198.016 511.488 771.328 192 768.192 829.248z"
              p-id="4289"
            />
          </svg>
          <div class="zanting">
            <svg
              t="1668855558863"
              class="icon"
              v-if="biaozhi.a"
              @click="bofang"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2950"
              width="40"
              height="40"
            >
              <path
                d="M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0z m0 981.333333C253.866667 981.333333 42.666667 770.133333 42.666667 512S253.866667 42.666667 512 42.666667s469.333333 211.2 469.333333 469.333333-211.2 469.333333-469.333333 469.333333z"
                p-id="2951"
              />
              <path
                d="M672 441.6l-170.666667-113.066667c-57.6-38.4-106.666667-12.8-106.666666 57.6v256c0 70.4 46.933333 96 106.666666 57.6l170.666667-113.066666c57.6-42.666667 57.6-106.666667 0-145.066667z"
                p-id="2952"
              />
            </svg>
            <svg
              t="1668855406828"
              class="icon"
              viewBox="0 0 1048 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2682"
              @click="bofang"
              v-else
              width="40"
              height="40"
            >
              <path
                d="M524.272128 0.018022C241.513165 0.018022 12.288102 229.245952 12.288102 512.005018c0 112.734003 36.43904 216.957952 98.17897 301.537997l38.667981-40.258048C97.458176 699.230003 67.143168 609.158963 67.143168 512.005018 67.143168 259.540992 271.807078 54.872986 524.272128 54.872986c252.45696 0 457.120973 204.668006 457.120973 457.132032 0 252.460954-204.664013 457.118003-457.120973 457.118003-96.240026 0-185.530982-29.744026-259.189043-80.53504l-34.539008 42.797978c83.150029 58.344038 184.437965 92.596019 293.728973 92.596019 282.758963 0 511.984026-229.220966 511.984026-511.976038C1036.256154 229.245952 807.031091 0.018022 524.272128 0.018022zM615.693107 256.011981l0 511.987 54.855 0L670.548107 256.012 615.693128 256.012zM377.996083 256.011981l0 511.987 54.855 0L432.851083 256.012 377.996128 256.012z"
                p-id="2683"
              />
            </svg>
          </div>

          <svg
            t="1668856826950"
            class="icon"
            viewBox="0 0 1024 1024"
            @click="nextButtonClick"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="5051"
            width="40"
            height="40"
          >
            <path
              d="M832 160.128c0-17.664-14.336-32-32-32S768 142.464 768 160.128l0 282.88L214.592 134.592c-18.176-10.112-39.936-10.048-58.112 0C138.24 144.768 127.424 162.88 127.424 183.168l0 656.64c0 20.224 10.816 38.464 29.056 48.576C165.568 893.44 175.488 896 185.472 896s19.968-2.56 29.056-7.616L768 579.968l0 284.096c0 17.664 14.336 32 32 32s32-14.336 32-32L832 160.128zM191.808 829.248 188.672 192l573.312 319.488L191.808 829.248z"
              p-id="5052"
            />
          </svg>
        </div>
        <div class="voice-container">
          <div class="voice-button" @click="voiceButtonClick">
            <svg
              v-if="!voiceMute"
              t="1668930992594"
              class="icon"
            
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2197"
              width="25"
              height="25"
            >
              <path
                d="M473.088 125.44L256 256H52.224C23.552 256 0 279.552 0 308.224V716.8c0 28.16 23.04 51.2 51.2 51.2h204.8l217.088 130.56c16.896 10.24 38.912-2.048 38.912-22.016V147.456c0-19.968-21.504-32.256-38.912-22.016zM699.904 320.512c-20.992-18.944-53.248-17.408-72.192 3.584-18.944 20.992-17.408 53.248 3.584 72.192 0.512 0.512 58.368 54.784 58.368 121.344 0 37.888-19.456 74.752-58.368 110.08-20.992 18.944-22.528 51.2-3.584 72.192 10.24 11.264 24.064 16.896 37.888 16.896 12.288 0 24.576-4.608 34.304-13.312 61.44-55.296 92.16-117.76 92.16-185.856 0-112.64-88.576-193.536-92.16-197.12z"
                fill
                p-id="2198"
              />
              <path
                d="M853.504 166.4c-20.992-18.944-53.248-16.896-72.192 4.096-18.944 20.992-16.896 53.248 4.096 72.192 1.536 1.024 135.68 122.88 135.68 280.576 0 90.624-45.568 177.152-135.68 257.536-20.992 18.944-23.04 51.2-4.096 72.192 10.24 11.264 24.064 16.896 38.4 16.896 12.288 0 24.576-4.096 34.304-12.8 112.64-100.864 169.984-212.992 169.984-333.824-1.024-202.752-163.84-350.208-170.496-356.864z"
                fill
                p-id="2199"
              />
            </svg>
            <svg
              v-if="voiceMute"
              t="1668931211986"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2337"
              width="25"
              height="25"
            >
              <path
                d="M256 768H51.2c-28.16 0-51.2-23.04-51.2-51.2V308.224C0 279.552 23.552 256 52.224 256H256v512zM512 147.456v728.576c0 19.968-21.504 32.256-38.912 22.016L256 768V256l217.088-130.56c17.408-10.24 38.912 2.048 38.912 22.016zM623.104 656.896c-19.968-19.968-19.968-52.224 0-72.192l217.088-217.088c19.968-19.968 52.224-19.968 72.192 0 19.968 19.968 19.968 52.224 0 72.192l-217.088 217.088c-19.456 19.968-52.224 19.968-72.192 0z"
                fill
                p-id="2338"
              />
              <path
                d="M623.104 367.104c19.968-19.968 52.224-19.968 72.192 0l217.088 217.088c19.968 19.968 19.968 52.224 0 72.192-19.968 19.968-52.224 19.968-72.192 0l-217.088-217.088c-19.968-19.456-19.968-52.224 0-72.192z"
                fill
                p-id="2339"
              />
            </svg>
          </div>
          <div class="voice-slider">
            <el-slider
              v-model="voicePower"
              :max="1"
              :step="0.1"
              size="small"
              @change="changeVoicePower"
            />
          </div>
        </div>
      </div>

      <audio ref="musicAudio" preload="auto" @canplay="changeDuration">
        <source ref="musicSource" type="audio/mpeg" />
      </audio>
    </div>
  </div>
</template>
<script  >
import { useStore } from "vuex";
import xiaoyemianVue from "./components/xiaoyemian.vue";
import { reactive, ref, watch, onMounted } from "vue";
import API from "../src/plugins/axiosInstance.js";
import { useRouter } from "vue-router";

export default {
  setup() {
    //实现音乐播放的标签
    const musicSource = ref(null);
    //现在的播放时间
    const playTime = ref(0.0);
    //播放器标签
    const musicAudio = ref(null);
    const musicCursor = ref(0);
    //是否静音
    const voiceMute = ref(false);
    const list=ref([]);
    //音量大小
    const voicePower = ref(0.5);
    //歌曲的时间长度
    const playDuration = ref(0.0);
    const store = useStore();
    //进度条长度
    const sliderLength = ref(100);
    const tableData = ref([]);
    const router = useRouter();
    const url = ref("src/static/5651d19798154fda8fd2cda8454cdd4a.png");
    const music = ref({});
    //是否正在播放

    const biaozhi = reactive({
      a: true
    });
 
    const changeMusic = (aa) => {
      
      API({
          
          url: "/song/detail?ids=" + aa
        }).then(res => {
          
          music.value = res.data.songs;
          url.value = res.data.songs[0].al.picUrl;
          music.value.filter(res=>{
            let b=''
            for(let i=0;i<res.ar.length;i++){
              if(i==res.ar.length-1){
                b+= res.ar[i].name
              }else{
                b+= res.ar[i].name+'/'
              }
              
            }
            res.ar=b
          })
            music.value=music.value[0]
      
          
       
         
        });
        API({
          url: "/song/url/v1?id=" + aa + "&level=exhigh",
          method: "GET"
        }).then(res => {
          musicSource.value.src = res.data.data[0].url;
          musicAudio.value.load();

          playTime.value = musicAudio.value.currentTime;

          sliderLength.value = musicAudio.value.duration;

          musicAudio.value.play();

          biaozhi.a = false;
        });
       
    }
    watch(
      () => store.state.musicId,
      aa => {
      list.value=list.value.filter(res=>res!=aa)
      musicCursor.value=store.state.songslist.length
      store.state.songslist.push(aa)
      
        changeMusic(aa)

      }
    );
    watch(()=>store.state.jishu,aa=>{
      musicCursor.value=aa
      changeMusic(store.state.songslist[musicCursor.value])
    })
    const nextButtonClick = () => {
        if(store.state.songslist.length==0){
          return
        }
      if(musicCursor.value==store.state.songslist.length-1){
        musicCursor.value=0
      }else{
        musicCursor.value += 1
      }
      console.log(musicCursor.value);
    
    
      changeMusic(store.state.songslist[musicCursor.value])
   
   
    };
    const lastButtonClick = () => {
      if(store.state.songslist.length==0){
          return
        }
   
      if(musicCursor.value==0){
        musicCursor.value=store.state.songslist.length-1
      }else{
        musicCursor.value -= 1
      }
      changeMusic(store.state.songslist[musicCursor.value])
    
    
    };
    const changePlayTime = val => {
      musicAudio.value.currentTime = val;
    };
    const changeDuration = () => {
      if (playDuration.value != musicAudio.value.duration) {
        sliderLength.value = musicAudio.value.duration;

        playDuration.value = musicAudio.value.duration;
      }
    };
    const updatePlayTimePerSecond = () => {
      if(playDuration.value==0){
        return
      }
      if (!biaozhi.a) {
        playTime.value += 1;

        if (playTime.value >= playDuration.value) {
          nextButtonClick()
        }
      }
    };

    function sousuo() {
      router.push({
        name: "About",
        query: { id: input.value }
      });
    }
    const input = ref("");
    function bofang() {
      if(playDuration.value==0){
        return
      }
      if (biaozhi.a == false) {
        biaozhi.a = true;
        musicAudio.value.pause();
      } else {
        biaozhi.a = false;
        musicAudio.value.play();
      }
      playTime.value = musicAudio.value.currentTime;
    }
    const tooltipFormat = val => {
      let strTime = playTime.value;

      let strMinute = parseInt(strTime / 60 + "");

      let strSecond = parseInt((strTime % 60) + "");

      return strMinute + ":" + strSecond;
    };
    onMounted(() => {
      setInterval(updatePlayTimePerSecond, 1000);
    });
    const voiceButtonClick = () => {
      voiceMute.value = !voiceMute.value;

      if (!voiceMute.value) {
        voicePower.value = 1;

        musicAudio.value.volume = 1;
      } else {
        voicePower.value = 0;

        musicAudio.value.volume = 0;
      }
    };
    const changeVoicePower = val => {
      musicAudio.value.volume = val;

      voicePower.value = val;

      if (val > 0) {
        voiceMute.value = false;
      } else {
        voiceMute.value = true;
      }
    };

    return {
      voicePower,
      changeVoicePower,
      voiceButtonClick,
      voiceMute,
      playDuration,
      tableData,
      sousuo,
      nextButtonClick,
      url,
      music,
      input,
      sliderLength,
      bofang,
      tooltipFormat,
      updatePlayTimePerSecond,
      playTime,
      biaozhi,
      musicAudio,
      musicSource,
      changeDuration,
      changePlayTime,
      lastButtonClick,
      list,
      musicCursor,
      bofang
    };
  },
  components: {
    xiaoyemianVue
  }
};
</script>
<style scoped >
.aa {
  background-color: aqua;
  width: 100%;
  height: 40px;
}
.el-menu-demo {
  display: flex;
  justify-content: space-around;
}
.input {
  width: 200px;
}
.table {
  display: flex;
  justify-content: space-around;
}
.dibu {
  width: 100%;
  left: 0px;
  height: 100px;
  background-color: aqua;
  position: fixed;
  bottom: 0px;
  z-index: 99;
  justify-content: space-around;
  display: flex;
  align-items: center;
}

.zanting {
  display: inline-block;
  margin: 0px 30px;
}
.music-slider {
  position: absolute;
  top: 10px;
  left: calc(100% +25%);
  width: 50%;
}
.voice-container {
  display: inline-block;

  margin-left: 12px;
  width: 200px;
  height: 38px;
  position: absolute;
  left: calc(100% - 35%);
  transition: 0.5s;
}
.voice-slider {
  margin-left: 30px;
  display: inline-block;

  width: 90px;
  height: 35px;
  background-color: white;
  border-radius: 10px;
  padding: 0px 15px 0px 15px;
  transition: 0.2s;
}
.voice-button {
  display: inline-block;
  position: absolute;
}
.xinxi {
  position: absolute;
  bottom: 20 px;
  left: 20px;
}
.music-disk-picture {
  width: 90px;
  height: 90px;
  pointer-events: none;
  border-radius: 50%;
  border: 1px solid black;
}

.music-disk-playing-style {
  animation: music-disk-rotate 3s linear infinite;
  animation-play-state: running;
}

@keyframes music-disk-rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.geming{
  width: 250px;
 position: absolute;
 top: 10px;
 left: 110px;
}
.geshou{
  width: 1000px;
  position: absolute;
 top: 50px;
 left: 110px;
}
</style>
