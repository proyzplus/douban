import {globalUrls} from "url.js"

const network = {
  //获取电影
  getMovies: function (params) {
    params.type = "movie";
    this.getItemList(params);
    // wx.request({
    //   url: globalUrls.moviesList,
    //   data: {
    //     count: count
    //   },
    //   success: function (res) {
    //     var movies = res.data.subject_collection_items;
    //     if (params && params.success) {
    //       params.success(movies);
    //     }
    //   }
    // });
  },
  //获取电视剧
  getTvs: function (params) {
    params.type = "tv";
    this.getItemList(params);
  },
  //获取综艺
  getShows: function (params) {
    params.type = "show";
    this.getItemList(params);
  },
  //获取item列表
  getItemList:function(params){
    var url = "";
    if(params.type === "movie"){
      url = globalUrls.moviesList;
    }else if(params.type === "tv"){
      url = globalUrls.tvList;
    }else{
      url = globalUrls.showList;
    }
    var count = params.count ? params.count : 7;
    wx.request({
      url: url,
      data: {
        count: count
      }, 
      success: function (res) {
        var items = res.data.subject_collection_items;
        var itemsCount = items.length;
        var left = itemsCount%3;
        if(left === 2){
            items.push(null);
        }
        if (params && params.success) {
          params.success(items);
        }
      }
    })
  },
  //获取详情
  getItemDetail: function(params){
    var type = params.type;
    var id = params.id;
    var url= '';
    if(type === 'movie'){
      url = globalUrls.movieDetail + id;
    }else if(type === 'tv'){
      url = globalUrls.tvDetail + id;
    }else{
      url = globalUrls.showDetail + id;
    }
    wx.request({
      url: url,
      success:function(res){
        // console.log(res);
        var item = res.data;
        if(params.success){
          params.success(item);
        }
      }
    })
  },
  //获取标签
  getItemTags:function(params){
    var type = params.type;
    var id = params.id;
    var url = '';
    if(type === 'tv'){
      url = globalUrls.tvTags(id);
    }else if(type === 'movie'){
      url = globalUrls.movieTags(id);
    }else{
      url = globalUrls.showTags(id);
    }
    wx.request({
      url: url,
      success:function(res){
        var tags = res.data.tags;
        if(params.success){
          params.success(tags);
        }
      }
    })
  },
  //获取短评
  getItemComments:function(params){
    var type = params.type;
    var id = params.id;
    var start = params.start?params.start:0;
    var count = params.count?params.count:5;
    var url = '';
    if(type === 'movie'){
      url = globalUrls.movieComments(id,start,count);
    }else if(type === 'tv'){
      url = globalUrls.tvComments(id,start,count);
    }else{
      url = globalUrls.showComments(id,start,count);
    }
    wx.request({
      url: url,
      success:function(res){
        var data =res.data;
        if(params.success){
          params.success(data);
        }
      }
    })
  },
  //搜索电影
  getSearch: function(params){
    var q = params.q;
    var url = globalUrls.searchUrl(q);
    wx.request({
      url: url,
      success:function(res){
        var subjects = res.data.subjects;
        if(params.success){
          params.success(subjects);
        }
      }
    })
  }
}

export { network }