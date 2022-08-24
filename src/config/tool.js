import debounce from 'lodash.debounce'
import { useCallback } from 'react'

export function useDebounce(callback, delay) {
  const debouncedFn = useCallback(
    debounce((...args) => callback(...args), delay),
    [delay] // will recreate if delay changes
  )
  return debouncedFn
}
export function formatSecond(value) {
  var secondTime = parseInt(value) // 秒
  var minuteTime = 0 // 分
  var hourTime = 0 // 小時
  if (secondTime > 60) {
    //如果秒數大於60，將秒數轉換成整數
    //獲取分鐘，除以60取整數，得到整數分鐘
    minuteTime = parseInt(secondTime / 60)
    //獲取秒數，秒數取佘，得到整數秒數
    secondTime = parseInt(secondTime % 60)
    //如果分鐘大於60，將分鐘轉換成小時
    if (minuteTime > 60) {
      //獲取小時，獲取分鐘除以60，得到整數小時
      hourTime = parseInt(minuteTime / 60)
      //獲取小時後取佘的分，獲取分鐘除以60取佘的分
      minuteTime = parseInt(minuteTime % 60)
    }
  }
  var result = '' + parseInt(secondTime) + '秒'

  if (minuteTime > 0) {
    result = '' + parseInt(minuteTime) + '分' + result
  }
  if (hourTime > 0) {
    result = '' + parseInt(hourTime) + '小時' + result
  }
  return result
}
