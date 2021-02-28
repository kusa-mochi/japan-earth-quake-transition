<template>
  <div id="app">
    App
    <earthquake-chart
      :chart-data="chartData"
      :marker-color="chartColor"
    ></earthquake-chart>
  </div>
</template>

<script>
import EarthquakeChart from "./components/EarthquakeChart.vue";

export default {
  name: "App",
  data() {
    return {
      eastEnd: 153.986667,
      northEnd: 45.557778,
      southEnd: 20.425183,
      westEnd: 122.9325,
      chartColor: "#C66246",
      chartData: [
        {
          datetime: "2011-03-11 14:00:00",
          latitude: 35.681199,
          longitude: 139.7653808,
          depth: 10,
          magnitude: 7
        },
        {
          datetime: "2011-03-11 17:00:00",
          latitude: 34.7008975,
          longitude: 135.4950519,
          depth: 20,
          magnitude: 5.5
        },
        {
          datetime: "2011-03-11 20:00:00",
          latitude: 35.1692672,
          longitude: 136.8809874,
          depth: 30,
          magnitude: 3.1
        }
      ]
    };
  },
  components: {
    EarthquakeChart
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
