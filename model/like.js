import { Http } from "../utils/http.js"

class like extends Http {
    //点赞或取消点赞
    setLike(like, art_id, type) {
        let url = like == "like" ? "/like" : "/like/cancel"
        let params = { url: url, data: { art_id: art_id, type: type }, method: "post" }
        this.requery(params)
    }
    //获取点赞信息
    getLike(type, id, success) {
        let url = "classic/" + type + "/" + id + "/favor"
        this.requery({ url: url, success: success })
    }
}

export { like }