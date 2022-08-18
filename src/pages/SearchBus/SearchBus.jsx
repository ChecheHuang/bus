import './searchBus.scss'
import turnHome from './images/turnHome.png'
import Lottie from 'lottie-react'
import { Link } from 'react-router-dom'
import Bus_loading from '../../BUS_loading.json'
import Bus from '../../Bus.mp3'
import { useEffect, useState } from 'react'
import { initButtons, selectCityButtons, moreButtons } from './button'
import { useDebounce } from '../../config/tool'

function SearchBus() {
  const [loading, setLoading] = useState(false)
  const [buttons, setButtons] = useState(initButtons)
  const [input, setInput] = useState('')
  const [isInputHide, setIsInputHide] = useState(false)
  const data = [
    { title: '紅10', from: '台北海大', to: '捷運劍潭站' },
    { title: '紅10區', from: '社子', to: '捷運劍潭站' },
    { title: '紅12', from: '天文科學館', to: '捷運劍潭站' },
    { title: '紅12', from: '天文科學館', to: '捷運劍潭站' },
    { title: '紅12', from: '天文科學館', to: '捷運劍潭站' },
    { title: '紅12', from: '天文科學館', to: '捷運劍潭站' },
    { title: '紅12', from: '天文科學館', to: '捷運劍潭站' },
    { title: '紅12', from: '天文科學館', to: '捷運劍潭站' },
    { title: '紅12', from: '天文科學館', to: '捷運劍潭站' },
    { title: '紅12', from: '天文科學館', to: '捷運劍潭站' },
    { title: '紅12', from: '天文科學館', to: '捷運劍潭站' },
    { title: '紅12', from: '天文科學館', to: '捷運劍潭站' },
    { title: '紅12', from: '天文科學館', to: '捷運劍潭站' },
    { title: '紅12', from: '天文科學館', to: '捷運劍潭站' },
    { title: '紅12', from: '天文科學館', to: '捷運劍潭站' },
    { title: '紅12', from: '天文科學館', to: '捷運劍潭站' },
    { title: '紅12', from: '天文科學館', to: '捷運劍潭站' },
    { title: '紅12', from: '天文科學館', to: '捷運劍潭站' },
  ]
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
            return
          }
        }
        const newInput = input + value
        setInput(newInput)
        break
    }
  }
  let scroll = 0
  function handleScroll(e) {
    const currentScroll = e.currentTarget.scrollTop
    if (currentScroll > scroll) {
      scroll = currentScroll
      setIsInputHide(true)
    } else {
      setIsInputHide(false)
    }
  }

  const debouncedSave = useDebounce((nextValue) => {
    console.log(nextValue)
  }, 1000)

  function handleType(event) {
    const { value: nextValue } = event.target
    setInput(nextValue)
  }
  useEffect(() => {
    if (input !== '') {
      debouncedSave(input)
    }
  }, [input])

  return (
    <div className="searchBus">
      <audio src={Bus} />
      <div className="searchInput">
        <div className="top">
          <Link to="/">
            <img src={turnHome} alt="" />
          </Link>
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
          <div className="lottieContainer">
            <Lottie animationData={Bus_loading} loop={true} />
          </div>
        ) : (
          <>
            <div className="title">台北市</div>
            <div className="results">
              {data.map((item, index) => {
                const { title, from, to } = item
                return (
                  <div
                    onClick={() => {
                      console.log('test')
                    }}
                    key={index}
                    className="item"
                  >
                    <div className="title">{title}</div>
                    <div className="info">
                      {from}
                      <span>往</span>
                      {to}
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
