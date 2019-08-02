// pages/detail/detail.js
import {
  network
} from '../../utils/network.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options);
    var that = this;
    var type = options.type;
    var id = options.id;
    that.setData({
      id: id,
      type: type
    });
    network.getItemDetail({
      type: type,
      id: id,
      success: function(item) {
        var genres = item.genres;
        genres = genres.join("/");
        item.genres = genres;
        var actorNames = [];
        var actors = item.actors;
        if (actors.length > 4) {
          actors = actors.slice(0, 4);
          // actors = actors.join("/");
        }
        for (var index = 0; index < actors.length; index++) {
          var actor = actors[index];
          actorNames.push(actor.name);
        }
        actorNames = actorNames.join("/");
        var director = item.directors[0].name;
        var authors = director + "(导演)/" + actorNames;
        item.authors = authors;
        that.setData({
          item: item
        })
      }
    });
    network.getItemTags({
      type: type,
      id: id,
      success: function(tags) {
        that.setData({
          tags: tags
        })
      }
    });
    network.getItemComments({
      type: type,
      id: id,
      success: function(data) {
        var totalComment = data.total;
        var comments = data.interests;
        that.setData({
          totalComment: totalComment,
          comments: comments
        })
      }
    })
  },
  onShow: function() {
    wx.pageScrollTo({
      scrollTop: 0,
    })
  }
})