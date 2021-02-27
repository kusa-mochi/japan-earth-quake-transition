<template>
  <div id="earthquake-chart">
    EarthquakeChart
  </div>
</template>

<script>
export default {
  name: "EarthquakeChart",
  props: {
    chartData: {
      default: () => [],
      required: true,
      type: Array
    }
  }
};
</script>

<style lang="scss" scoped></style>
