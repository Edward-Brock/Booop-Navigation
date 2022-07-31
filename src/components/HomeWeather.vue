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
        <div>{{ data.weather.windDirection }}风</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, reactive} from "vue";
import AMapLoader from '@amap/amap-jsapi-loader';

onMounted(() => {
  getLocalWeather()
})

function getLocalWeather() {
  AMapLoader.load({
    key: import.meta.env.VITE_AMAP_WEB_JS_API_KEY, // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ['AMap.CitySearch'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  }).then((AMap) => {
    AMap.plugin('AMap.CitySearch', function () {
      let citySearch = new AMap.CitySearch()
      citySearch.getLocalCity(function (status, result) {
        if (status === 'complete' && result.info === 'OK') {
          // 查询成功，result即为当前所在城市信息
          // console.log(result)
          AMap.plugin('AMap.Weather', function () {
            //创建天气查询实例
            var weather = new AMap.Weather();
            //执行实时天气信息查询
            weather.getLive(result.adcode, function (err, result) {
              // console.log(result);
              data.weather = result
            });
          });
        }
      })
    })
  }).catch(e => {
    console.log(e);
  })
}

const data = reactive({
  weather: ""
})

</script>

<style scoped lang="scss">
@mixin fontFamily {
  font-family: 'Tw Cen MT', 'Bahnschrift', 'Arial', '苹方', serif;
}

.container {
  margin-top: 42px;
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