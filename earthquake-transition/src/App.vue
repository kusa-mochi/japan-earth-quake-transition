<template>
  <div id="app">
    <earthquake-chart
      :marker-color="chartColor"
      :x-min="westEnd"
      :x-max="eastEnd"
      :y-min="southEnd"
      :y-max="northEnd"
      :z-min="maxDepth"
      :z-max="0"
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
      maxDepth: 720.0,
      chartColor: "#ff5959",
    };
  },
  components: {
    EarthquakeChart,
  },
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
