// pages/detail/detail.js
let globalData=getApp();
console.log(globalData.globalData)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc:'',
    songList:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this=this;
    let url = `http://tingapi.ting.baidu.com/v1/restserver/ting?from=android&version=5.9.0.0&channel=ppzs&operator=0&method=baidu.ting.billboard.billList&format=json&type=${options.type}&offset=0&size=30&fields=song_id%2Ctitle%2Cauthor%2Calbum_title%2Cpic_big%2Cpic_small%2Chavehigh%2Call_rate%2Ccharge%2Chas_mv_mobile%2Clearn%2Csong_source%2Ckorean_bb_song`
    console.log(options.type)
    wx.request({
      url: url,
      success:function(res){
        console.log(res.data.billboard.pic_s210)
        console.log(res.data.song_list)
        getApp().globalData.globalMusicList = res.data.song_list
        console.log(getApp().globalData)
        _this.setData({
          imgSrc: res.data.billboard.pic_s210,
          songList: res.data.song_list
        })
      }
    })
  },
  // 点击跳转到播放页面
  playing:function(e){
    console.log(e)
    console.log(e.target.dataset.id)
    console.log(e.target.dataset.index)
    wx.navigateTo({
      url: '../play/play?id=' + e.target.dataset.id + "&index=" + e.target.dataset.index
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})