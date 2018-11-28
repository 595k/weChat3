import { search } from "../../model/search.js"
import { book } from "../../model/book.js"
import { paginationBev } from "../behaviors/pagination.js"
let searchModel = new search()
let bookModel = new book()
Component({

  behaviors: [paginationBev],
  /**
   * 组件的属性列表
   */
  properties: {
    finished: Boolean,
    historyKeys: Object,
    hotKeys: Object,
    more: {
      type: Boolean,
      observer: "_loadMore"
    },
    q: String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  ready: function () {
    searchModel.getHotKeys(res => {
      this.setData({
        hotKeys: res,
        historyKeys: searchModel.getHistoryKeys()
      })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancel(event) {
      this.triggerEvent('cancel', {}, {})
    },
    //加载更多
    _loadMore: function () {
      this.setMoreData(this.data.q)
    },
    //回车搜索
    onConfirm(event) {
      this._finished()
      this.initPagination()
      let text = event.detail.value || event.detail.text
      searchModel.setHistoryKeys(text)
      bookModel.search(this.getCurrentStart(), this.getCurrentCount(), text,
        success => {
          if (success.books.length) {
            this.setCurrentStart()
            this.setData({
              dataArr: success.books,
              q: text
            })
          }
          else {
            this.onEmpty()
          }
        })
    },
    onRestore: function () {
      this.setData({
        finished: false,
        q: "",
        historyKeys: searchModel.getHistoryKeys()
      })
    },

    //正在搜索书籍的状态
    _finished() {
      this.setData({
        finished: true
      })
    }
  }
})
