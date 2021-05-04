<template>
  <div id="earthquake-chart">
    <plotly :data="data" :layout="layout" :display-mode-bar="true"></plotly>
    <input
      type="range"
      @change="onChangeSliderValue"
      :value="minDateSerialNumber"
      :min="sliderMin"
      :max="sliderMax"
    />
  </div>
</template>

<script>
import { Plotly } from "vue-plotly";
import axios from "axios";

export default {
  name: "EarthquakeChart",
  computed: {
    minDateSerialNumber: {
      cache: false,
      get() {
        return this.minDate.getTime();
      },
      set(newValue) {
        this.minDate.setTime(newValue);
        this.updateChart();
      },
    },
    maxDate: {
      cache: false,
      get() {
        return new Date(this.minDate.getTime() + this.dateSpan);
      },
    },
    sliderMin: {
      get() {
        return new Date(2011, 1, 1, 0, 0, 0).getTime();
      },
    },
    sliderMax: {
      get() {
        return new Date(2011, 3, 1, 0, 0, 0).getTime();
      },
    },
  },
  data() {
    const textColor = "#eaeaea";
    return {
      data: [
        {
          x: [],
          y: [],
          z: [],
          mode: "markers",
          type: "scatter3d",
          marker: {
            color: this.markerColor,
            line: {
              width: 0,
            },
            size: [],
          },
        },
        {
          alphahull: 7,
          opacity: 0.3,
          type: 'mesh3d',
          x: [this.xMin, this.xMax, this.xMax, this.xMin],
          y: [this.yMin, this.yMin, this.yMax, this.yMax],
          z: [-1, -1, -1, -1]
        }
      ],
      layout: {
        autosize: false,
        font: {
          color: textColor,
        },
        width: 1024,
        height: 700,
        paper_bgcolor: "#282520",
        scene: {
          aspectmode: "manual",
          aspectratio: {
            x: 1,
            y: 1,
            z: 1,
          },
          camera: {
            center: {
              x: 0,
              y: 0,
              z: 0,
            },
            eye: {
              x: 0.7722545049825484,
              y: -1.9353451313891932,
              z: 1.084217071781902,
            },
            up: {
              x: 0,
              y: 0,
              z: 1,
            },
          },
          xaxis: {
            color: textColor,
            range: [this.xMin, this.xMax],
            rangemode: "normal",
            type: "linear",
            zeroline: false,
          },
          yaxis: {
            color: textColor,
            range: [this.yMin, this.yMax],
            rangemode: "normal",
            type: "linear",
            zeroline: false,
          },
          zaxis: {
            color: textColor,
            range: [this.zMin, this.zMax],
            rangemode: "normal",
            type: "linear",
            zeroline: false,
          },
        },
        title: "Earthquake Source Distribution（震源の分布）",
        xaxis: {
          fixedrange: true,
          range: [this.xMin, this.xMax],
        },
        yaxis: {
          fixedrange: true,
          range: [this.yMin, this.yMax],
        },
        zaxis: {
          fixedrange: true,
          range: [this.zMin, this.zMax],
        },
      },
      minDate: new Date(2011, 2, 1, 0, 0, 0),
      dateSpan: 1 * 60 * 60 * 1000, // milliseconds
    };
  },
  methods: {
    onChangeSliderValue(newValue) {
      this.minDateSerialNumber = newValue.currentTarget.value;
    },
    onUpdateButtonClick() {
      this.minDate = new Date(2011, 2, 12, 14, 0, 0);
      this.updateChart();
    },
    datetimeToString(dt) {
      const year = dt.getFullYear();
      const month = this.zeroPadding(dt.getMonth() + 1, 2);
      const date = this.zeroPadding(dt.getDate(), 2);
      const hours = this.zeroPadding(dt.getHours(), 2);
      const minutes = this.zeroPadding(dt.getMinutes(), 2);
      const seconds = this.zeroPadding(dt.getSeconds(), 2);
      return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
    },
    updateChart() {
      axios
        .get(
          "https://slash-mochi.net/earthquake-data-manager/get-earthquake-data.php",
          {
            params: {
              min_date: this.datetimeToString(this.minDate),
              max_date: this.datetimeToString(this.maxDate),
            },
          }
        )
        .then((res) => {
          this.data[0].x = res.data.longitude;
          this.data[0].y = res.data.latitude;
          this.data[0].z = res.data.depth;
          this.data[0].marker.size = res.data.magnitude.map(
            (el) => ((el + 1.0) * (el + 1.0)) / 10 + 1.0
          );
        });
    },
    zeroPadding(num, digits) {
      return `0${num}`.slice(-digits);
    },
  },
  mounted() {
    this.updateChart();
  },
  props: {
    markerColor: {
      default: "#169632",
      required: false,
      type: String,
    },
    xMin: {
      default: 0.0,
      required: false,
      type: Number,
    },
    xMax: {
      default: 1.0,
      required: false,
      type: Number,
    },
    yMin: {
      default: 0.0,
      required: false,
      type: Number,
    },
    yMax: {
      default: 1.0,
      required: false,
      type: Number,
    },
    zMin: {
      default: 0.0,
      required: false,
      type: Number,
    },
    zMax: {
      default: 1.0,
      required: false,
      type: Number,
    },
  },
  components: {
    Plotly,
  },
};
</script>

<style lang="scss" scoped></style>
