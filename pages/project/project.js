// pages/project/project.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    interval: 3000,
    duration: 2000,
    img_urls: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529227792032&di=7e471e302b9baa59a7ba0c2edc8439f2&imgtype=0&src=http%3A%2F%2Fjob.fishcoo.com%2FUploads%2FUeditor%2FImages%2F20160510%2F6359849768620454138217310.gif', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529227842423&di=b4b2d5bad20395d1c11d5368356d0d90&imgtype=0&src=http%3A%2F%2Fwww.szfangwei.cn%2Fupload%2Feditor%2Fimg%2F1515737756.png','https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529227877870&di=eadf57bb97baea596888889b5aa9aa6e&imgtype=0&src=http%3A%2F%2Fs1.51cto.com%2Fimages%2F201612%2F94ffc38495bb0ffc379314627cd3cd04db0abf.jpg'], //轮播图片
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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

  //转发
  onShareAppMessage: function (res) {
    return {
      title: '刘经标个人简历',
      path: '/pages/index/index',
      success: function (res) {
        //转发成功
        wx.showToast({
          title: '转发成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '转发失败',
          icon: 'fail',
          duration: 2000
        })
      }
    }
  }
})