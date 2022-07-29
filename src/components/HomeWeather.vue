<template>
  <div class="container" v-if="data.weather">
    <div class="city">{{ data.weather.city }}</div>
    <div class="infoGroup">
      <div class="wenDu">
        <div class="shuZi">{{ data.weather.temperature }}</div>
        <div class="fuHao">℃</div>
      </div>
      <div class="otherInfo">
        <div>{{ data.weather.weather }}</div>
        <div>{{ data.weather.winddirection }}风</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, reactive} from "vue";
import axios from "axios";

onMounted(
    axios.get('https://restapi.amap.com/v3/weather/weatherInfo', {
      params: {
        key: import.meta.env.VITE_WEATHER_KEY,
        city: '150702',
        extensions: 'base',
        output: 'json'
      }
    }).then(res => {
      // console.log(res)
      data.weather = res.data.lives[0]
    })
)
const data = reactive({
  weather: ""
})

</script>

<style scoped lang="scss">
@mixin fontFamily {
  font-family: 'Tw Cen MT', 'Bahnschrift', 'Arial', '苹方';
}

@mixin fontFamilyText {
  font-family: "PingFang SC", "苹方", "思源黑体", "华文中宋";
}

.container {
  @include fontFamilyText;
  margin-top: 20px;
  width: 100%;
}

.city {
  color: #888888;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}

.infoGroup {
  @include fontFamily;
  height: 48px;
  display: flex;
  flex-direction: row;

  .wenDu {
    font-size: 48px;
    margin-right: 20px;
    display: flex;
    flex-direction: row;
    align-items: baseline;

    .shuZi {
      font-size: 48px;
      margin-right: 8px;
    }

    .fuHao {
      font-size: 18px;
    }
  }

  .otherInfo {
    @include fontFamilyText;
    height: 48px;
    color: #888888;
    font-size: 16px;
    letter-spacing: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
}
</style>