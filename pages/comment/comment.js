// pages/comment/comment.js
import {
  network
} from "../../utils/network.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    total: 0,
    start: 1,
    count: 20
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options);
    var that = this;
    that.setData(options);
    that.getComments(1);
  },
  getComments: function(start) {
    var that = this;
    var type = that.data.type;
    var id = that.data.id;
    if (start > that.data.start) {
      that.setData({
        nextLoading: true
      });
    } else {
      that.setData({
        preLoading: true
      });
    }
    // console.log(start+"firs123");
    network.getItemComments({
      type: type,
      id: id,
      start: start,
      count: 20,
      success: function(data) {
        // console.log(data);
        var total = data.total;
        var comments = data.interests;
        // console.log(comments);
        // console.log(start+"sss");
        that.setData({
          total: total,
          comments: comments,
          start: start,
          preLoading: false,
          nextLoading: false
        });
        wx.pageScrollTo({
          scrollTop: 0,
        })
      }
    })
  },
  onItemTapEvent: function(event) {
    wx.navigateBack({});
  },
  onPrePageTag: function(event) {
    var that = this;
    var count = that.data.count;
    var oldstart = that.data.start;
    if (oldstart - count > 0) {
      var start = oldstart - that.data.count;
      that.getComments(start);
    }
  },
  onNextPageTag: function(event) {
    var that = this;
    var oldstart = that.data.start;
    var start = oldstart + that.data.count;
    // console.log(start);
    that.getComments(start);
  }
})