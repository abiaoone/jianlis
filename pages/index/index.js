//index.js
//获取应用实例
const app = getApp()
// pages/test/test.js
// start雷达图初始化数据
var topText = ["帅气", "时尚", "典雅", "甜美", "自然", "浪漫", "文雅", "摩登"];
var allSpaceTime = 50;//线程执行间隔时间
var animateinterval = '';
var rangArr = [
  {
    endText: '帅气',
    texts: topText,
    beginTime: 500,
    spacetime: 10,
    stime: 500
  }, {
    endText: '清爽干练',
    texts: topText,
    beginTime: 1000,
    spacetime: 10,
    stime: 1000
  }, {
    endText: '摩登',
    texts: topText,
    beginTime: 1200,
    spacetime: 10,
    stime: 1000
  }, {
    endText: '几何',
    texts: topText,
    beginTime: 1400,
    spacetime: 10,
    stime: 1000
  }, {
    endText: '刘经标',
    texts: topText,
    beginTime: 1800,
    spacetime: 10,
    stime: 1000
  }, {
    endText: '中性风',
    texts: topText,
    beginTime: 2000,
    spacetime: 10,
    stime: 1000
  }, {
    endText: '时尚先生',
    texts: topText,
    beginTime: 2200,
    spacetime: 10,
    stime: 1000
  }, {
    endText: '简约利落',
    texts: topText,
    beginTime: 2400,
    spacetime: 10,
    stime: 1000
  }
]
Page({
  data: {
    text1: '',
    text2: '',
    text3: '',
    text4: '',
    text5: '',
    text6: '',
    text7: '',
    text8: '',
    color:'#76EEC6',
    colors: ['#76EEC6', '#B23AEE', '#76EEC6', '#4EEE94', '#00CD00', '#20B2AA', '#CDCDB4'],
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    headerImg:'/images/1529139211(1).png',
    codeImg:'/images/1529201134(1).png',
    shouzzhiImg:'/images/手指.png',
    animationData: {},
    animationMiddleHeaderItem:{}
  },
  onLoad:function(){
    topText = ["帅气", "时尚", "典雅", "甜美", "自然", "浪漫", "文雅", "摩登"]
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log('res',res.userInfo)
            }
          })
        }
      }
    })
  },

  onShow: function () {
    var animation = wx.createAnimation({
      duration: 3000,
      timingFunction: 'linear',
    })
    this.animation = animation
    this.setData({
      animationData: animation.export()
    })
    var n = 0;
    var i = 0;
    //连续动画需要添加定时器,所传参数每次+1就行
    setInterval(function () {
      // animation.translateY(-60).step()
      n = n + 1;
      i = i + 1;
      if(i>6){
         i= 0
      }
      console.log(n);
      this.animation.rotate(180 * (n)).step()
      this.setData({
        animationData: this.animation.export(),
        color: this.data.colors[i]
      })
    }.bind(this), 3000)
    //手指的动画
    var circleCount = 0;
    // 心跳的外框动画    
    this.animationMiddleHeaderItem = wx.createAnimation({
      duration: 1000,    // 以毫秒为单位    
      timingFunction: 'linear',
      delay: 100,
      transformOrigin: '50% 50%',
      success: function (res) {
      }
    });
    setInterval(function () {
      if (circleCount % 2 == 0) {
        this.animationMiddleHeaderItem.scale(1.3).step();
      } else {
        this.animationMiddleHeaderItem.scale(1.0).step();
      }

      this.setData({
        animationMiddleHeaderItem: this.animationMiddleHeaderItem.export()  //输出动画  
      });

      circleCount++;
      if (circleCount == 1000) {
        circleCount = 0;
      }
    }.bind(this), 1000); 
   //个性签名
    this.randDomText();
  },
  // 文字闪烁动画
  randDomText: function () {//endText最终显示文字，texts闪烁文字，time延迟时间,spacetime闪烁频率,stime闪烁周期
    var that = this;
    for (var i = 0; i < rangArr.length; i++) {
      var rang = rangArr[i];
      rang['runTime'] = 0;   //累计运行时间
      rang['isRun'] = false; //是否已经开始在执行了
      rang['isStop'] = false;//是否已经执行完毕了
    };

    animateinterval = setInterval(function () {
      var stop = true;
      var showData = {};
      for (var i = 0; i < rangArr.length; i++) {
        var rangXX = rangArr[i];
        if (!rangXX['isStop']) {
          stop = false; //只要有一个没执行完就 就继续执行 
          rangXX['runTime'] = rangXX['runTime'] + allSpaceTime; //累计执行时间开始叠加 
          var changeWord = false; //是否修改词
          if (!rangXX['isRun']) { //如果还没开始跑，判断下时间是否已经到开始跑的时间
            if (rangXX['runTime'] >= rangXX['beginTime']) {//
              rangXX['isRun'] = true;//到开始跑时间了
            } else {
              continue;
            }
          } else if (rangXX['runTime'] >= (rangXX['stime'] + rangXX['beginTime'])) {   //如果当前队列的已经执行完毕，则显示最后一次的数据         
            rangXX['isStop'] = true;
            if (rangXX['lastWord'] != rangXX['endText']) {
              rangXX['lastWord'] = rangXX['endText'];
              showData['text' + (i + 1)] = rangXX['endText'];//显示最后的词
            }
            continue;
          }
          var index = Math.floor((rangXX['runTime'] - rangXX['beginTime']) / rangXX['spacetime']) % rangXX['texts'].length;
          var showWord = rangXX['texts'][index];
          if (rangXX['lastWord'] != showWord) {
            rangXX['lastWord'] = showWord;
            showData['text' + (i + 1)] = showWord;
          }

        } else {
          continue;
        }
      }

      if (JSON.stringify(showData) != "{}") {
        that.setData(showData);
      }
      if (stop) {
        clearInterval(animateinterval);
      }
    }, allSpaceTime);
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
  // //图片预览
  // preImg:function(){
  //   var img = this.data.codeImg;
  //   var ursl =[];
  //   ursl.push(img);
  //   wx.previewImage({
  //     current: img, // 当前显示图片的http链接
  //     urls: ursl // 需要预览的图片http链接列表
  //   })
  // }
})
