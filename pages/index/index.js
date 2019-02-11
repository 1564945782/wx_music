// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: ['https://i8.mifile.cn/v1/a1/a94721ff-66f8-0bba-0190-f17ff896b26c!720x360.webp', 'https://i8.mifile.cn/v1/a1/3bd24537-a0f9-58d7-d468-e158b67af652!720x360.webp', 'https://i8.mifile.cn/v1/a1/f1dae8da-2d69-af58-42f4-d92c21b39f9a!720x360.webp'],
    musicList:''
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this=this;
    wx.request({
      url: 'http://tingapi.ting.baidu.com/v1/restserver/ting?from=android&version=5.9.0.0&channel=ppzs&operator=0&method=baidu.ting.billboard.billCategory&format=json&kflag=2',
      success:function(res){
          console.log(res.data.content);
          _this.setData({
            musicList: res.data.content
          })
      }
    })
  },
  detail:function(e){
    console.log(e.currentTarget.dataset.type)

    wx.navigateTo({
      url: '../detail/detail?type=' + e.currentTarget.dataset.type
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