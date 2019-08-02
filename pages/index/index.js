import {network} from "../../utils/network.js"

//获取应用实例
const app = getApp()

Page({
  data: {
    
  },
  onLoad:function(options){ 
    //MVC
    var that = this;
    //请求的是电影
      network.getMovies({
        success:function(movies){
          that.setData({
            movies: movies
          });
        }
      });
    //请求的电视剧
      network.getTvs({
        success: function (tvs) {
          that.setData({
            tvs: tvs
          });
        }
      });
    //请求的综艺节目
    network.getShows({
      success: function (shows) {
        that.setData({
          shows: shows
        });
      }
    });

    // wx.request({
    //   url: 'https://m.douban.com/rexxar/api/v2/subject_collection/tv_variety_show/items?count=7',
    //   success:function(res){
    //     var shows = res.data.subject_collection_items;
    //     that.setData({
    //       shows:shows
    //     });
    //   }
    // });


    // wx.request({
    //   url: 'http://v.juhe.cn/weather/index',
    //   data:{
    //     cityname:"郑州",
    //     key:"a3322f9d50fcd76c341eccf1bb565225"
    //   },
    //   success:function(res){
    //     console.log(res.data.result.today);
    //   }
    // })
  }
})
