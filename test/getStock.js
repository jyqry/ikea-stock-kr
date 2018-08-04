const ikeaStock = require('../index')

describe('getStock', function () {
  describe('상품코드와 지점코드로 재고 정보를 가져옴', function () {
    let stock;
    it('오류 없이 재고 수량을 받아야 한다', function (done) {
      ikeaStock.getStock('S59252133', 373)
        .then(result => {
          stock = result.stock
          done()
        })
        .catch(error => done(error))
    })
  })
})
