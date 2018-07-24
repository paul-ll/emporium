import $ from 'jquery'
import Url from './url.class.js'
export default class Http {
  static send (args) {
    let headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'access_token': window.token
    }
    let needTokenArr = ['SendSMS', 'RegistCustomer', 'LoginCustomer', 'mall', 'product']
    if (needTokenArr.includes(args.url)) {
      delete headers.access_token
    }
    $.ajax({
      type: 'POST',
      url: `http://api2.jietiaodashi.com${Url[args.url]}`,
      data: args.data,
      headers: headers,
      success: response => {
        console.log(args.url)
        console.log(response)
        Http.dispense(response)
      },
      error: (xhr, errorType, error) => {
        console.log(xhr)
        console.log(errorType)
        console.log(error)
      },
      complete: () => {
        if (this.defaultCallback) this.defaultCallback()
      }
    })
    return this
  }
  static dispense (response) {
    switch (response.code) {
      case 200:
        if (this.successCallback) this.successCallback(response.data)
        break
      case 401:
        window.vueModule.$router.push({ name: 'empower' })
        break
      default:
        if (this.failCallback) this.failCallback(response)
    }
  }

  static success (callback) {
    this.successCallback = callback
    return this
  }

  static fail (callback) {
    this.failCallback = callback
    return this
  }

  static default (callback) {
    this.defaultCallback = callback
    return this
  }
}
