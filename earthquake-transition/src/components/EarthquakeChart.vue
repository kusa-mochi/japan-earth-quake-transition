<template>
  <div id="earthquake-chart">
    <plotly :data="data" :layout="layout" :display-mode-bar="false"></plotly>
  </div>
</template>

<script>
import { Plotly } from "vue-plotly";

export default {
  name: "EarthquakeChart",
  data() {
    return {
      data: [
        {
          x: [1, 2, 3],
          y: [1, 2, 3],
          z: [1, 2, 3],
          mode: "markers",
          type: "scatter3d",
          marker: {
            color: "rgb(23, 190, 207)",
            size: 5
          }
        }
      ],
      layout: {
        autosize: true,
        height: 480,
        scene: {
          aspectratio: {
            x: 1,
            y: 1,
            z: 1
          },
          camera: {
            center: {
              x: 0,
              y: 0,
              z: 0
            },
            eye: {
              x: 1.25,
              y: 1.25,
              z: 1.25
            },
            up: {
              x: 0,
              y: 0,
              z: 1
            }
          },
          xaxis: {
            type: "linear",
            zeroline: false
          },
          yaxis: {
            type: "linear",
            zeroline: false
          },
          zaxis: {
            type: "linear",
            zeroline: false
          }
        },
        title: "3d point clustering",
        width: 477
      }
    };
  },
  methods: {
    unpack(rows, key) {
      return rows.map(row => row[key]);
    }
  },
  props: {
    chartData: {
      default: () => [],
      required: true,
      type: Array
    }
  },
  components: {
    Plotly
  }
};
</script>

<style lang="scss" scoped></style>
