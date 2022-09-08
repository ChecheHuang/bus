import jsSHA from 'jssha'
import axios from 'axios'

export function getAuthorizationHeader() {
  //  填入自己 ID、KEY 開始
  let AppID = 'a465ec9e862b4c6cb1388215b593a2d0'
  let AppKey = 'D1VEDZ9dYJ6pkyxDK2QzK47GY3I'
  //  填入自己 ID、KEY 結束
  let GMTString = new Date().toGMTString()
  let ShaObj = new jsSHA('SHA-1', 'TEXT')
  ShaObj.setHMACKey(AppKey, 'TEXT')
  ShaObj.update('x-date: ' + GMTString)
  let HMAC = ShaObj.getHMAC('B64')
  let Authorization =
    'hmac username="' +
    AppID +
    '", algorithm="hmac-sha1", headers="x-date", signature="' +
    HMAC +
    '"'
  return { Authorization: Authorization, 'X-Date': GMTString }
}
export async function axiosData(url, callback, catchError) {
  try {
    const result = await axios.get(url, {
      headers: getAuthorizationHeader(),
    })
    callback(result.data)
  } catch (err) {
    alert('請求發生錯誤')
    // console.log(err)
  }
}
