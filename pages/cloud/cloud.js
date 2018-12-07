// pages/cloud/cloud.js
import { Http } from "../../utils/http.js"
import { trim } from "../../utils/util.js"
import { cloud } from "../../model/cloud.js"
const httpModel = new Http()
const cloudModel = new cloud()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openType: "getUserInfo",
    avatarUrl: "/images/my/my.png",
    multiIndex: [100, 200, 300],
    multiArray: ["电影", "音乐", "句子"],
    index: 0,
    image: 0,
    imgUrl: "",
    music: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getUserInfo({
      success: res => {
        this.setData({
          avatarUrl: res.userInfo.avatarUrl
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  getuser: function (event) {
    if (event.detail.userInfo) {
      this.setData({
        avatarUrl: event.detail.userInfo.avatarUrl
      })
    }

  },

  bindMultiPickerChange: function (event) {
    this.setData({
      index: event.detail.value,
      music: event.detail.value == 1 ? true : false
    })
  },

  addImg: function () {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths[0]
        let data = new Date()
        const name = data.getTime() + tempFilePaths.match(/\.[^.]+?$/)[0]
        wx.showLoading({
          title: '上传中',
        })
        wx.cloud.uploadFile({
          cloudPath: name,
          filePath: tempFilePaths,
          success: res => {
            wx.hideLoading()
            this.setData({
              image: res.fileID,
              imgUrl: tempFilePaths
            })
            httpModel._showError("上传成功")
          }, fail: res => {
            wx.hideLoading()
            httpModel._showError("上传失败")
          }
        })
      }
    })
  },

  formSubmit: function (event) {
    const title = trim(event.detail.value.title)
    const content = trim(event.detail.value.content)
    if (title == "" || content == "") {
      httpModel._showError("内容不能为空")
      return
    }
    let url = ""
    const num = 0
    const type = this.data.multiIndex[this.data.index]
    const image = this.data.image
    const time = new Date().getTime()
    if (this.data.music) {
      url = trim(event.detail.value.musicUrl)
      if (isNaN(url) || url == "") {
        httpModel._showError("音乐格式错误")
        return
      }
      url = "http://music.163.com/song/media/outer/url?id=" + url + ".mp3"
    }
    cloudModel.addCloud("like", { title, content, url, num, type, image, time },
      success => {
        httpModel._showError("添加成功")
        this.setData({
          title: "",
          content: ""
        })
        // document.getElementById("reset").click()
      }, fail => {
        console.log(fail)
        httpModel._showError("添加失败")
      }
    )

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