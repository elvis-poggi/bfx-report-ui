/* eslint-disable object-curly-newline */
import queryConstants from 'state/query/constants'
import DATA_TYPES from 'var/dataTypes'

const {
  MENU_LEDGERS,
  MENU_TRADES,
  MENU_ORDERS,
  MENU_MOVEMENTS,
  MENU_POSITIONS,
  MENU_FOFFER,
  MENU_FLOAN,
  MENU_FCREDIT,
  MENU_FPAYMENT,
  MENU_AFFILIATES_EARNINGS,
  MENU_PUBLIC_TRADES,
  MENU_PUBLIC_FUNDING,
  MENU_TICKERS,
  MENU_DERIVATIVES,
  MENU_LOGINS,
} = queryConstants

const {
  NUMBER,
  INTEGER,
  STRING,
} = DATA_TYPES

const LEDGERS_COLUMNS = [
  { id: 'description', name: 'description', type: STRING, filter: true },
  { id: 'currency', name: 'currency' },
  { id: 'amount', name: 'amount', type: NUMBER, filter: true },
  { id: 'amountUsd', name: 'amountUsd', type: NUMBER, filter: true, frameworkOnly: true },
  { id: 'balance', name: 'balance', type: NUMBER, filter: true },
  { id: 'balanceUsd', name: 'balanceUsd', type: NUMBER, filter: true, frameworkOnly: true },
  { id: 'mts', name: 'date' },
  { id: 'wallet', name: 'wallet', type: STRING, filter: true },
]

// name: translation keys `column.[name]`
const SECTION_COLUMNS = {
  [MENU_LEDGERS]: LEDGERS_COLUMNS,

  [MENU_TRADES]: [
    { id: 'id', name: 'id', type: INTEGER, filter: true },
    { id: 'orderID', name: 'orderid', type: INTEGER, filter: true },
    { id: 'pair', name: 'pair' },
    { id: 'execAmount', name: 'amount', type: NUMBER, filter: true },
    { id: 'execPrice', name: 'price', type: NUMBER, filter: true },
    { id: 'fee', name: 'fee', type: NUMBER, filter: true },
    { id: 'feePercent', name: 'feePercent' },
    { id: 'mtsCreate', name: 'time' },
  ],

  [MENU_ORDERS]: [
    { id: 'id', name: 'id', type: INTEGER, filter: true },
    { id: 'pair', name: 'pair' },
    { id: 'type', name: 'type', type: STRING, filter: true },
    { id: 'amountOrig', name: 'amount', type: NUMBER, filter: true },
    { id: 'amountExecuted', name: 'amount-exe', type: NUMBER, filter: true },
    { id: 'price', name: 'price', type: NUMBER, filter: true },
    { id: 'priceAvg', name: 'avgprice', type: NUMBER, filter: true },
    { id: 'mtsCreate', name: 'created' },
    { id: 'mtsUpdate', name: 'updated' },
    { id: 'status', name: 'status', type: STRING, filter: true },
    { id: 'priceTrailing', name: 'pricetrail', type: NUMBER, filter: true },
    { id: 'typePrev', name: 'typeprev', type: STRING, filter: true },
  ],

  [MENU_MOVEMENTS]: [
    { id: 'id', name: 'id', type: INTEGER, filter: true },
    { id: 'mtsUpdated', name: 'date' },
    { id: 'currency', name: 'currency' },
    { id: 'status', name: 'status', type: STRING, filter: true },
    { id: 'amount', name: 'amount', type: NUMBER, filter: true },
    { id: 'amountUsd', name: 'amountUsd', type: NUMBER, filter: true, frameworkOnly: true },
    { id: 'fees', name: 'fees', type: NUMBER, filter: true },
    { id: 'destinationAddress', name: 'destination', type: STRING, filter: true },
    { id: 'transactionId', name: 'transactionId', type: STRING, filter: true },
  ],

  [MENU_POSITIONS]: [
    { id: 'id', name: 'id', type: INTEGER, filter: true },
    { id: 'pair', name: 'pair' },
    { id: 'amount', name: 'amount', type: NUMBER, filter: true },
    { id: 'basePrice', name: 'base-price', type: NUMBER, filter: true },
    { id: 'marginFunding', name: 'fundingCost', type: NUMBER, filter: true },
    { id: 'marginFundingType', name: 'fundingType', type: INTEGER, filter: true },
    { id: 'status', name: 'status', type: STRING, filter: true },
    { id: 'mtsUpdate', name: 'updated' },
  ],

  [MENU_FOFFER]: [
    { id: 'id', name: 'id', type: INTEGER, filter: true },
    { id: 'symbol', name: 'currency' },
    { id: 'amountOrig', name: 'amount', type: NUMBER, filter: true },
    { id: 'amountExecuted', name: 'amount-exe', type: INTEGER, filter: true },
    { id: 'type', name: 'type', type: STRING, filter: true },
    { id: 'status', name: 'status', type: STRING, filter: true },
    { id: 'rate', name: 'rate', type: STRING, filter: true },
    { id: 'period', name: 'period', type: INTEGER, filter: true },
    { id: 'mtsUpdate', name: 'date' },
  ],

  [MENU_FLOAN]: [
    { id: 'id', name: 'id', type: INTEGER, filter: true },
    { id: 'symbol', name: 'currency' },
    { id: 'side', name: 'side', type: INTEGER, filter: true },
    { id: 'amount', name: 'amount', type: NUMBER, filter: true },
    { id: 'status', name: 'status', type: STRING, filter: true },
    { id: 'rate', name: 'rate', type: STRING, filter: true },
    { id: 'period', name: 'period', type: INTEGER, filter: true },
    { id: 'mtsOpening', name: 'opened' },
    { id: 'mtsLastPayout', name: 'closed' },
    { id: 'mtsUpdate', name: 'date' },
  ],

  [MENU_FCREDIT]: [
    { id: 'id', name: 'id', type: INTEGER, filter: true },
    { id: 'symbol', name: 'currency' },
    { id: 'side', name: 'side', type: INTEGER, filter: true },
    { id: 'amount', name: 'amount', type: NUMBER, filter: true },
    { id: 'status', name: 'status', type: STRING, filter: true },
    { id: 'rate', name: 'rate', type: STRING, filter: true },
    { id: 'period', name: 'period', type: INTEGER, filter: true },
    { id: 'mtsOpening', name: 'opened' },
    { id: 'mtsLastPayout', name: 'lastpayout' },
    { id: 'positionPair', name: 'positionpair', type: STRING, filter: true },
    { id: 'mtsUpdate', name: 'date' },
  ],

  [MENU_FPAYMENT]: LEDGERS_COLUMNS,
  [MENU_AFFILIATES_EARNINGS]: LEDGERS_COLUMNS,

  [MENU_PUBLIC_TRADES]: [
    { id: 'id', name: 'id', type: INTEGER, filter: true },
    { id: 'mts', name: 'time' },
    { id: 'type', name: 'type' },
    { id: 'price', name: 'price', type: NUMBER, filter: true },
    { id: 'amount', name: 'amount', type: NUMBER, filter: true },
    { id: 'pair', name: 'pair' },
  ],

  [MENU_PUBLIC_FUNDING]: [
    { id: 'id', name: 'id', type: INTEGER, filter: true },
    { id: 'mts', name: 'time' },
    { id: 'amount', name: 'amount', type: NUMBER, filter: true },
    { id: 'rate', name: 'rate', type: NUMBER, filter: true },
    { id: 'period', name: 'period', type: INTEGER, filter: true },
    { id: 'currency', name: 'currency' },
  ],

  [MENU_TICKERS]: [
    { id: 'symbol', name: 'pair' },
    { id: 'bid', name: 'bid', type: NUMBER, filter: true },
    { id: 'ask', name: 'ask', type: NUMBER, filter: true },
    { id: 'mtsUpdate', name: 'time' },
  ],

  [MENU_DERIVATIVES]: [
    { id: 'pair', name: 'pair' },
    { id: 'price', name: 'priceDeriv', type: NUMBER, filter: true },
    { id: 'priceSpot', name: 'priceSpot', type: NUMBER, filter: true },
    { id: 'fundBal', name: 'fundBalance', type: NUMBER, filter: true },
    { id: 'fundingAccrued', name: 'fundingAccrued', type: NUMBER, filter: true },
    { id: 'fundingStep', name: 'fundingStep', type: NUMBER, filter: true },
    { id: 'mts', name: 'updated' },
  ],

  [MENU_LOGINS]: [
    { id: 'id', name: 'id', type: INTEGER, filter: true },
    { id: 'mts', name: 'date' },
    { id: 'ip', name: 'ip', type: INTEGER, filter: true },
    { id: 'browser', name: 'browser' },
    { id: 'version', name: 'version' },
    { id: 'mobile', name: 'mobile' },
    { id: 'extra', name: 'meta' },
  ],
}

export default SECTION_COLUMNS
