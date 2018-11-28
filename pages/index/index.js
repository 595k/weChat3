import { classic } from "../../model/classic.js"
import { like } from "../../model/like.js"
const classicModel = new classic();
const likeModel = new like();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic: Object,
    end: true,
    first: false,
    like: false,
    count: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取最新一期ks
    classicModel.getLatest(data => {
      this.setData({
        classic: data,
        like: data.like_status,
        count: data.fav_nums
      })
    })
  },

  //设置点赞
  onLike2: function (event) {
    likeModel.setLike(event.detail.classic_type, this.data.classic.id, this.data.classic.type)
  },

  //获取上。下期的信息
  getClassic: function (event) {
    classicModel.getClassic(event.detail.type, this.data.classic.index, data => {
      this.setData({
        classic: data,
        first: classicModel.isFirst(data.index),
        end: classicModel.isEnd(data.index),
      })
      likeModel.getLike(data.type, data.id, success => {
        this.setData({
          like: success.like_status,
          count: success.fav_nums
        })
      })
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