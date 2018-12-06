const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const formatLength = function f(field, length = 10) {
  if (field.length > 10) {
    return field.substring(0, length) + "..."
  }
  return field
}


/**
 * 用于判断空，Undefined String Array Object
 */
const isBlank = function isBlank(str) {
  if (Object.prototype.toString.call(str) === '[object Undefined]') {//未定义的空
    return true
  } else if (Object.prototype.toString.call(str) === '[object String]') { //空的字符串
    str = str.replace(new RegExp(/\s/ig), "")
    return str == "" ? true : false
  } else if (Object.prototype.toString.call(str) === '[object Array]') { //字数组
    return str.length == 0 ? true : false
  } else if (Object.prototype.toString.call(str) === '[object Object]') {//空对象
    return JSON.stringify(str) == '{}' ? true : false
  } else {
    return true
  }
}

/**
 *  字符串去空
 */
const trim = function trim(str) {
  return str.replace(new RegExp(/\s/ig), "")
}

module.exports = {
  formatTime: formatTime,
  formatLength,
  isBlank,
  trim
}
