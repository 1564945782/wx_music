const innerAudioContext = wx.createInnerAudioContext()
var animation='';
var timer='';
var  animationNum= 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    musicSlider:0,
    hiddenImg:true,
    musicPath:'',
    imgSrc:'',
    animationData:'',
    musicIndexCurrent:'',
    optionsId :'',
    totaltime:0,
    currentTime:0
  },
  beginMusic:function(){
    let _this=this
    let url = "http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.play&songid=" + _this.data.optionsId
    wx.request({
      url: url,
      success: function (res) {
        console.log(res)
        _this.setData({
          musicPath: res.data.bitrate.show_link,
          imgSrc: res.data.songinfo.pic_small,
          musicIndexCurrent: _this.data.musicIndexCurrent
        })
        // #################
        innerAudioContext.autoplay = true
        innerAudioContext.src = _this.data.musicPath
        innerAudioContext.onPlay(() => {
          console.log('开始播放')
        })
        innerAudioContext.onError((res) => {
          console.log(res.errMsg)
          console.log(res.errCode)
        })
        // ####################
        animation = wx.createAnimation({
          duration: 40
        })
        //开始动画
        // 开始动画
        _this.beginAnimation();
        // 获取歌曲总时间
        innerAudioContext.onCanplay(function () {
          setTimeout(function () {
            console.log(innerAudioContext.duration)
            _this.setData({
              totaltime: innerAudioContext.duration
            })
          }, 100)
        })
        // 获取当前时间
        innerAudioContext.onTimeUpdate(function () {
          // console.log(innerAudioContext.currentTime)
          _this.setData({
            currentTime: parseInt(innerAudioContext.currentTime),
            musicSlider: parseInt(innerAudioContext.currentTime / _this.data.totaltime * 100)
          })
        })
        // 自然播放完成
        innerAudioContext.onEnded(function () {
          console.log("自然播放完了")
          _this.nextMusic();
        })
      }
    })
    // ###############
   
  },
  // 开始播放
  pauseMusic: function () {
    let _this=this 
   
    this.setData({
      hiddenImg: true
    })
    innerAudioContext.play()
    _this.beginAnimation()
  },
  // 暂停播放
  playMusic:function(){
    let _this=this
    this.setData({
      hiddenImg: false
    })
    innerAudioContext.pause(() => {
      console.log('暂停播放')
    })
    _this.pauseAnimation()
  },
  // 开始动画
  beginAnimation:function(){
      let _this=this;
      timer = setInterval(function () {
      if (animationNum > 10000) {animationNum=0 }
     animationNum = animationNum*1 + 1;
      animation.rotate(animationNum * 4).step()
      _this.setData({
        animationData: animation.export()
      })
    }, 40)
    

  },
  // 暂停动画
  pauseAnimation: function () {
    clearInterval(timer)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this=this;
    console.log(options)
    _this.setData({
      optionsId: options.id,
      musicIndexCurrent: options.index
    })
    // 加载完成开始播放
    _this.beginMusic();
    
  },
  // 上一首
  preMusic:function(){
    let _this = this
    console.log("上一首")
    console.log(_this.data.musicIndexCurrent)
    let index = _this.data.musicIndexCurrent * 1 - 1
    // getApp().globalData.globalMusicList = res.data.song_list
    console.log(getApp().globalData.globalMusicList)
    let musicList = getApp().globalData.globalMusicList
    if (index < 0) {
      index = musicList.length-1;
      _this.setData({
        musicIndexCurrent: index,
        optionsId: musicList[index].song_id
      })
    } else {
      _this.setData({
        musicIndexCurrent: index,
        optionsId: musicList[index].song_id
      })
    }
    // ##########
    console.log(musicList[index].song_id)
    _this.beginMusic()
  },
  // 下一首
  nextMusic: function () {
    let _this=this
    console.log("下一首")
    console.log(_this.data.musicIndexCurrent)
    let index = _this.data.musicIndexCurrent*1+1
    // getApp().globalData.globalMusicList = res.data.song_list
    console.log(getApp().globalData.globalMusicList)
    let musicList = getApp().globalData.globalMusicList
    if (index >= musicList.length){
      index=0;
      _this.setData({
        musicIndexCurrent: 0,
        optionsId: musicList[index].song_id
      })
    }else{
      _this.setData({
        musicIndexCurrent: index,
        optionsId: musicList[index].song_id
      })
    }
    // ##########
    console.log(musicList[index].song_id)
    _this.beginMusic()


  },
  // slider滑动事件
  musicSliderChange:function(e){
    console.log("slider滑动事件")
    console.log(e.detail.value)
    innerAudioContext.seek(this.data.totaltime * e.detail.value / 100)
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