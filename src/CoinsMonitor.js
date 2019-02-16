import React, { Component } from 'react'
import _ from 'lodash'
import './CoinsMonitor.css'

const initialState = {
  currency: 'price_eur',
  symbol: '€'
}

class CoinsMonitor extends Component {
  handleCurrency = (currency, symbol) => () => {
    this.setState({
      currency,
      symbol
    })
  }

  handleQuantity = (event) => {
    const { name, value } = event.target
    const coin = name

    localStorage.setItem(coin, value);
    this.setState({
      quantity: {
        [coin]: value
      }
    })
  }

  get header () {
    return (
      <header className='header'>
        <h1 className='title'>CoinsMonitor</h1>
      </header>
    )
  }

  get currencies () {
    return (
      <div className='currencies'>
        <ul>
          <li onClick={this.handleCurrency('price_eur', '€')}>
            EUR
          </li>
          <li onClick={this.handleCurrency('price_usd', '$')}>
            USD
          </li>
        </ul>
      </div>
    )
  }

  get content () {
    const { coins, currency, symbol } = this.state

    if (!coins) {
      return null
    }

    return (
      <div className='currentValue'>
        {_.map(coins, (coin, index) => {
          const quantityLocal = localStorage.getItem(coin.symbol)
          const checkQuantity = (quantityLocal === null) ? 0 : quantityLocal
          const finalPrice = (coin[currency] * checkQuantity).toFixed(2)

          return (
            <div className='box' key={index}>
              <h1 className='symbol'>{coin.symbol}</h1>
              <input
                type='number'
                className='calculator'
                name={coin.symbol}
                onChange={this.handleQuantity}
                placeholder='e.g: 300'
                value={checkQuantity} />
              <span className='currentCoin'>
                {symbol} {finalPrice}
              </span>
            </div>
          )
        })}
      </div>
    )
  }

  get footer () {
    return (
      <div className='footer'>
        <span>
          <p>Developed by</p>
          <a target='_blank' rel='noopener noreferrer' href='https://github.com/felipemancini'>
            Felipe Mancini
          </a>
        </span>
        <p className='donate'>DOGE | A574cMnxtWmxA44db3fpvCdQL5b6u5SGkc</p>
        <p className='donate'>ETH | 0x4e89850dcfd9ef7d6f09d2fc24cb286b58e75856</p>
        <p className='donate'>LTC | LXZETe8FkhQqvDPofmT9shHEzXW6LFiWiG</p>
      </div>
    )
  }

  fetchCoinsData = () => {
    fetch('https://api.coinmarketcap.com/v1/ticker/?convert=EUR&limit=100')
      .then(result => result.json())
      .then(data => this.setState({ coins: data }))
  }

  constructor (props) {
    super(props)

    this.state = initialState
  }

  componentWillMount() {
    this.fetchCoinsData()
    setInterval(this.fetchCoinsData, 10000)
  }

  componentWillUnmount () {
    clearInterval(this.fetchCoinsData)
  }

  render() {
    return (
      <div className='CoinsMonitor'>
        {this.header}
        {this.currencies}
        {this.content}
        {this.footer}
      </div>
    )
  }
}

export default CoinsMonitor
