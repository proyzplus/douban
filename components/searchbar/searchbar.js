Component({
    properties: {
      isnavigator: {
        type: Boolean,
        value: false
      }
    },
    data: {

    },
    methods: {
      onInputEvent: function(event) {
        var value = event.detail.value;
        var detail = {
          "value": value
        };
        var options = {};
        this.triggerEvent("searchinput", detail, options);
      }
    }
  })