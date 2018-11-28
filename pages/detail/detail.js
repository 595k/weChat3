// pages/detail/detail.js
import { book } from "../../model/book.js"
import { like } from "../../model/like.js"
const bookModel = new book()
const likeModel = new like()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    book: Object,
    comments: [],
    posting: false,
    like: false,
    count: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let bid = options.bid
    bookModel.getDetail(bid, success => {
      this.setData({
        book: success
      })
    })
    bookModel.getMonent(bid, success => {
      this.setData({
        comments: success.comments
      })
    })
    bookModel.getLike(bid, success => {
      this.setData({
        like: success.like_status,
        count: success.fav_nums
      })
    })

  },

  onFakePost: function () {
    this.setData({
      posting: true
    })
  },

  onCancel: function () {
    this.setData({
      posting: false
    })
  },

  onLike: function (event) {
    likeModel.setLike(event.detail.classic_type, this.data.book.id, 400)
  },

  //发送短评
  onPost: function (event) {
    let comments = event.detail.value || event.detail.text
    if (comments.length > 12) {
      bookModel._showError("短评最多12个字")
      return
    } else if (comments.length <= 0) {
      bookModel._showError("短评不能为空")
      return
    }
    bookModel.addMonent(this.data.book.id, comments, success => {
      bookModel._showError("+1")
      this.data.comments.unshift({
        content: comments,
        nums: 1
      })
      this.setData({
        comments: this.data.comments,
        posting: false
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {

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