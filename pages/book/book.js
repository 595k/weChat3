
import { book } from "../../model/book.js"
const bookModel = new book()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searching: false,
    bookData: Object,
    more: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    bookModel.getHot(res => {
      this.setData({
        bookData: res
      })
    })
  },
  //改变搜索状态
  toSearch: function () {
    this.setData({
      searching: !this.data.searching
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
    if (this.data.searching) {
      this.setData({
        more: !this.data.more
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})