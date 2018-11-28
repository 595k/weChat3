
import { Http } from "../utils/http.js"
import { isBlank } from "../utils/util.js"
class book extends Http {
    //获取热门书籍
    getHot(success) {
        let url = "/book/hot_list"
        this.requery({
            url: url,
            success: success
        })
    }
    //搜索书籍
    search(start, count, q, success, error, fail, summary = 1) {
        if (isBlank(q)) {
            this._showError("不能为空")
            return
        }
        let params = {
            url: "/book/search",
            data: { start: start, count: count, q: q, summary: summary },
            success: success,
            error: error,
            fail: fail
        }
        this.requery(params)
    }
    //详细书籍
    getDetail(id, success) {
        let params = {
            url: "/book/" + id + "/detail",
            success: success
        }
        this.requery(params)
    }
    //获取书籍的点赞信息
    getLike(id, success) {
        let params = {
            url: "/book/" + id + "/favor",
            success: success
        }
        this.requery(params)
    }
    //获取书籍短评
    getMonent(id, success) {
        let params = {
            url: "/book/" + id + "/short_comment",
            success: success
        }
        this.requery(params)
    }
    //添加短评
    addMonent(id, content, success) {
        let params = {
            url: "/book/add/short_comment",
            data: { book_id: id, content: content },
            method:"post",
            success: success
        }
        this.requery(params)
    }
}
export { book }