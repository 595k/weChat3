import { config } from "../config.js";

class Http {
    requery(params) {
        let url = config.api_blink_url + params.url
        params.method = params.method ? params.method : "GET"
        // wx.showLoading({
        //     title: '加载中',
        // })
        wx.request({
            url: url,
            data: params.data,
            method: params.method,
            header: {
                'content-type': 'application/json',
                'appkey': config.appkey
            },
            success: (res) => {
                // wx.hideLoading()
                var code = res.statusCode.toString()
                if (code.charAt(0) == "2") {
                    params.success && params.success(res.data)
                } else {
                    params.error && params.error(res.data)
                    let error = this._getErrors(code)
                    this._showError(error)
                }
            },
            fail: (err) => {
                // wx.hideLoading()
                params.fail && params.fail(err.errMsg)
                this._showError(err.errMsg)
            }
        })

    }
    _showError(err) {
        wx.showToast({
            title: err,
            icon: 'none',
            duration: 2000
        })
    }
    _getErrors(code) {
        const error_code = {
            "400": "请求包含不支持的参数",
            "401": "未授权",
            "403": "被禁止访问",
            "404": "请求的资源不存在",
            "413": "上传的File体积太大",
            "500": "内部错误",
            "1": "未知错误"
        }
        error_code[code] ? error_code[code] : error_code["1"];
        return error_code[code]
    }
}

export { Http }