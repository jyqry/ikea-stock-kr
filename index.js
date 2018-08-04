const xml2js = require('xml2js')
const request = require('request')
const parser = new xml2js.Parser()


class ikeaStock {
  constructor(endPoint = 'https://www.ikea.com/kr/ko/iows/catalog/availability/') {
    this._endPoint = endPoint
  }

  get endPoint() {
    return this._endPoint
  }
  set endPoint(uri) {
    this._endPoint = uri
  }

  setEndPoint(uri) {
    this._endPoint = uri
  }

  getStock(itemCode, buCode) {
    return this.stockRequest(itemCode, buCode)
  }

  stockRequest(itemCode, buCode) {
    return new Promise((resolve, reject) => {
      request(`${this.endPoint}${itemCode}`, (err, response) => {
        if (err) return reject(err)
        if (response.statusCode == 200) {
          try {
            parser.parseString(response.body, (err, result) => {
              const data = result['ir:ikea-rest']['availability'][0].localStore

              for (let i = 0; i < data.length; i++) {
                if (data[i]['$'].buCode == buCode) {
                  const availableStock = (data[i].stock[0].availableStock) ? data[i].stock[0].availableStock[0] : null
                  const partNumber = (data[i].stock[0].partNumber) ? data[i].stock[0].partNumber[0] : null
                  const isSoldInStore = (data[i].stock[0].isSoldInStore) ? data[i].stock[0].isSoldInStore[0] : null
                  const inStockProbabilityCode = (data[i].stock[0].inStockProbabilityCode) ? data[i].stock[0].inStockProbabilityCode[0] : null
                  const restockDate = (data[i].stock[0].restockDate) ? data[i].stock[0].restockDate[0] : null

                  resolve({
                    partNumber,
                    availableStock,
                    isSoldInStore,
                    inStockProbabilityCode,
                    restockDate
                  })

                  return reject({
                    title: '값을 받아올 수 없습니다.',
                    message: `IEKA에 요청상품코드: ${itemCode}, 지점코드 ${buCode}로 요청한 결과가 없습니다. 코드가 잘못되었을 수 있습니다.`
                  })
                }
              }

            })
          } catch (e) {
            return reject(e)
          }
        } else {
          reject()
        }
      })
    })
  }

}


module.exports = new ikeaStock()
