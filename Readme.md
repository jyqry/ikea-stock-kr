**IKEA STOCK KR**
=============

개요
---
한국 이케아 상품의 재고를 받아오는 라이브러리입니다.

환경
---
- ES6 (Promise)

설치
---
```terminal
yarn add ikea-stock-kr
```

API
---

### 재고 가져오기
```javascript
const ikeaStock = require('ikea-stock-kr')

ikeaStock.getStock('S59252133', 373) // 상품코드, 지점코드
  .then(data => console.log(data))
```
상품코드는 이케아 웹사이트의 URI에 표시됩니다.
https://www.ikea.com/kr/ko/catalog/products/S59252133/
`S59252133`가 상품코드입니다.

지점코드는 다음과 같습니다.
- **522** 고양
- **373** 광명

#### 반환하는 데이터
```json
{
  "partNumber": "S59252133",
  "isSoldInStore": "true",
  "availableStock": "0",
  "inStockProbabilityCode": "LOW",
  "restockDate": "2018-08-20"
}
```


### 프록시
```javascript
const ikeaStock = require('ikea-stock-kr')

ikeaStock.setEndPoint(URI)
ikeaStock.getStock('S59252133', 373) // 상품코드, 지점코드
  .then(data => console.log(data))
```
필요하다면 이케아API서버 CORS를 우회하기 위해 프록시를 구성하고 엔드포인트를 직접 설정할 수 있습니다.
