Component({
  properties: {
    rate: {
      type: Number,
      value: 0,
      observer(newVal, oldVal, changedPath) {
          this.updateRate();
      }
    },
    starssize: {
      type: Number,
      value: 20
    },
    fontsize: {
      type: Number,
      value: 20
    },
    fontcolor: {
      type: String,
      value: "#ccc"
    },
    istext: {
      type: Boolean,
      value: true
    }
  },
  data: {

  },
  methods: {
    updateRate: function() {
      var that = this;
      var rate = that.properties.rate;
      var intRate = parseInt(rate);
      var light = parseInt(intRate / 2);
      var half = intRate % 2;
      var gray = 5 - light - half;
      var lights = [];
      var halfs = [];
      var grays = [];
      for (var index = 1; index <= light; index++) {
        lights.push(index);
      }
      for (var index = 1; index <= gray; index++) {
        grays.push(index);
      }
      for (var index = 1; index <= half; index++) {
        halfs.push(index);
      }
      var ratetext = rate && rate > 0 ? rate.toFixed(1) : "未评分"
      that.setData({
        lights: lights,
        halfs: halfs,
        grays: grays,
        ratetext: ratetext
      })
    }
  },
  lifetimes: {
    attached: function() {
      this.updateRate();
      // console.log(light);
      // console.log(half);
      // console.log(gray);
    }
  }
})