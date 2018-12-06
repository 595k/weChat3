import { classic } from "../../model/classic.js"
import { like } from "../../model/like.js"
import { cloud } from "../../model/cloud.js"
const classicModel = new classic();
const likeModel = new like();
const cloudModel = new cloud();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic: Object,
    index: 0,
    end: true,
    first: false,
    like: false,
    count: 0,
    total: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取最新一期
    classicModel.getLatest(data => {
      this.setData({
        classic: data,
        index: data.index,
        like: data.like_status,
        count: data.fav_nums,
        total: data.index
      })
      //获取云数据
      cloudModel.getLatest("like", success => {
        console.log(success)
        this.setData({
          classic: success,
          index: this.data.index + success.count,
          total: this.data.total + success.count,
          like: 0,
          count: 0
        })
      })
    })
  },

  //设置点赞
  onLike2: function (event) {
    likeModel.setLike(event.detail.classic_type, this.data.classic.id, this.data.classic.type)
  },

  //获取上。下期的信息
  getClassic: function (event) {
    //判断该数据是否在云数据库中
    if (!this.data.classic.id) {
      cloudModel.getClassic(event.detail.type, this.data.index, this.data.classic.time, success => {
        this.setData({
          classic: success,
          index: success.index,
          like: 0,
          count: 0,
          first: classicModel.isFirst(success.index),
          end: classicModel.isEnd(success.index, this.data.total),
        })
      })
    } else {
      classicModel.getClassic(event.detail.type, this.data.classic.index, data => {
        this.setData({
          classic: data,
          first: classicModel.isFirst(data.index),
          end: classicModel.isEnd(data.index, this.data.total),
        })
        likeModel.getLike(data.type, data.id, success => {
          this.setData({
            like: success.like_status,
            count: success.fav_nums
          })
        })
      })
    }
  }
  ,

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