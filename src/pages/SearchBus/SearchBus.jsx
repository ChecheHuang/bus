import './searchBus.scss'
import { useNavigate } from 'react-router-dom'
import Bus from '../../Bus.mp3'
import { useEffect, useState } from 'react'
import { initButtons, selectCityButtons, moreButtons } from './button'
import { useDebounce } from '../../config/tool'
import { axiosData } from '../../api/getAuthorizationHeader'
import { useDispatch } from 'react-redux'
import { update } from '../../redux/routeSlice'
import Logo from '../../components/Logo'
import Loading from '../../components/Loading'
function SearchBus() {
  const [loading, setLoading] = useState(false)
  const [routeData, setRouteData] = useState([])
  const [buttons, setButtons] = useState(initButtons)
  const [input, setInput] = useState('')
  const [isInputHide, setIsInputHide] = useState(false)
  const [scroll, setScroll] = useState(0)
  const [selectCity, setSelectCity] = useState({})
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const audio = new Audio(Bus)
  audio.loop = true
  function handleButtonClick(value, index) {
    if (index === 0 && value !== '台北市') {
      setButtons(selectCityButtons)
      return
    }
    switch (value) {
      case '更多':
        setButtons(moreButtons)
        break
      case 'c':
        setInput('')
        break
      case '回上一頁':
        setButtons(initButtons)
        break
      case '設定':
        const active = buttons.find((item) => {
          return item.className === 'active'
        })
        if (active !== undefined) {
          initButtons[0].text = active.text
        }
        setButtons(initButtons)
        break
      case '手動輸入':
        document.getElementById('input').focus()
        break
      case '其他':
        break
      default:
        if (value.type !== undefined) {
          const newInput = input.slice(0, -1)
          setInput(newInput)
          return
        }
        if (typeof value === 'string' && value !== '市民') {
          if (value.includes('市') || value.includes('縣')) {
            const newButtons = JSON.parse(JSON.stringify(selectCityButtons))
            newButtons[index].className = 'active'
            setButtons(newButtons)
            const selectCity = selectCityButtons.find((item) => {
              return item.text === value
            })

            setSelectCity(selectCity)
            return
          }
        }
        if (typeof value === 'number' || value === 0 || value === 'c') {
          audio.loop = true
          audio.play()
          audio.loop = false
        }
        const newInput = input + value
        setInput(newInput)
        break
    }
  }
  function handleScroll(e) {
    const currentScroll = e.currentTarget.scrollTop
    if (currentScroll > scroll) {
      setScroll(currentScroll)
      setIsInputHide(true)
    } else {
      setScroll(currentScroll)

      setIsInputHide(false)
    }
  }

  const debouncedSave = useDebounce(async (selectCity, input) => {
    setLoading(true)
    await axiosData(
      `https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/${
        selectCity?.name
      }/${encodeURIComponent(input)}?%24top=30&%24format=JSON`,
      (data) => {
        setRouteData(data)
      }
    )
    setLoading(false)
  }, 1000)

  function handleType(event) {
    setInput(event.target.value)
  }
  useEffect(() => {
    if (input !== '' && JSON.stringify(selectCity) !== '{}') {
      debouncedSave(selectCity, input)
    }
    // eslint-disable-next-line
  }, [input, selectCity])
  return (
    <div className="searchBus" style={{ height: `${window.innerHeight}px` }}>
      <div className="searchInput">
        <div className="top">
          <Logo />
          <input
            id="input"
            value={input}
            onChange={handleType}
            placeholder="選擇路線或手動輸入關鍵字"
            type="text"
          />
        </div>
        <div className={isInputHide ? 'down hide' : 'down'}>
          {buttons.map((button, index) => {
            const { img, text, className } = button
            return (
              <button
                onClick={() => {
                  handleButtonClick(text, index)
                }}
                className={className}
                key={index}
              >
                {img && <img src={img} alt="" />}
                {text}
              </button>
            )
          })}
        </div>
      </div>
      <div onScroll={handleScroll} className="searchResults">
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="title">
              {selectCity.text === undefined ? '請先選擇縣市' : selectCity.text}
            </div>
            <div className="results">
              {routeData.map((item, index) => {
                const {
                  DepartureStopNameZh,
                  DestinationStopNameZh,
                  RouteName,
                } = item
                return (
                  <div
                    onClick={() => {
                      dispatch(
                        update({
                          name: RouteName.Zh_tw,
                          route1: DepartureStopNameZh,
                          route2: DestinationStopNameZh,
                        })
                      )
                      navigate(`${selectCity.name}/${RouteName.Zh_tw}`)
                    }}
                    key={index}
                    className="item"
                  >
                    <div className="title">{RouteName.Zh_tw}</div>
                    <div className="info">
                      {DepartureStopNameZh}
                      <span>往</span>
                      {DestinationStopNameZh}
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default SearchBus
