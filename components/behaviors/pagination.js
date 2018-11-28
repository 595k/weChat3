import { book } from "../../model/book.js"

const bookModel = new book()

let paginationBev = Behavior({
  properties: {

  },
  data: {
    start: 0,
    count: 20,
    dataArr: [],
    empty: false,
    lock: Boolean,
    loading: false
  },

  methods: {
    setMoreData: function (q) {
      if (this.isLoading()) {
        return
      }
      if (!this.hasMore()) {
        return
      }
      this.onLock()
      this.onLoading()
      bookModel.search(this.data.start, this.data.count, q,
        success => {
          this.onLoading()
          if (success.books.length) {
            this.setCurrentStart()
            this.unLock()
          } else {
            this.onLock()
            bookModel._showError("没有更多了")
            return
          }
          this.setData({
            dataArr: this.data.dataArr.concat(success.books)
          })
        }, error => {
          this.onLoading()
          this.unLock()
        }, fail => {
          this.onLoading()
          this.unLock()
        }
      )
    },

    isLoading: function () {
      if (this.data.loading) {
        bookModel._showError("加载中")
        return true
      }
      return false
    },
    hasMore: function () {
      if (this.data.lock) {
        bookModel._showError("没有更多了")
        return false
      }
      return true
    },
    getCurrentStart: function () {
      return this.data.start
    },

    setCurrentStart: function () {
      this.setData({
        start: this.data.start + this.data.count
      })
    },

    getCurrentCount: function () {
      return this.data.count
    },

    onLock: function () {
      this.setData({
        lock: true
      })
    },

    unLock: function () {
      this.setData({
        lock: false
      })
    },

    onLoading: function () {
      this.setData({
        loading: !this.data.loading
      })
    },

    onEmpty:function(){
      this.setData({
        empty:!this.data.empty
      })
    },

    //搜索的时候初始化数据
    initPagination: function () {
      this.setData({
        start: 0,
        dataArr: [],
        lock: false,
        empty: false
      })
    }
  }
})


export {
  paginationBev
}