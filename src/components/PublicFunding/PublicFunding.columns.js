import React from 'react'
import { Cell } from '@blueprintjs/table'

import { fixedFloat, formatAmount } from 'ui/utils'
import { getColumnWidth, getTooltipContent } from 'utils/columns'

export default function getColumns(props) {
  const {
    columnsWidth,
    filteredData,
    getFullTime,
    t,
    targetSymbol,
    timeOffset,
  } = props

  return [
    {
      id: 'id',
      name: 'column.id',
      className: 'align-left',
      width: getColumnWidth('id', columnsWidth),
      renderer: (rowIndex) => {
        const { id } = filteredData[rowIndex]
        return (
          <Cell tooltip={getTooltipContent(id, t)}>
            {id}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].id,
    },
    {
      id: 'mts',
      className: 'align-left',
      nameStr: `${t('column.time')} (${timeOffset})`,
      width: getColumnWidth('mts', columnsWidth),
      renderer: (rowIndex) => {
        const timestamp = getFullTime(filteredData[rowIndex].mts)
        return (
          <Cell tooltip={getTooltipContent(timestamp, t)}>
            {timestamp}
          </Cell>
        )
      },
      copyText: rowIndex => getFullTime(filteredData[rowIndex].mts),
    },
    {
      id: 'amount',
      name: 'column.amount',
      width: getColumnWidth('amount', columnsWidth),
      renderer: (rowIndex) => {
        const { amount } = filteredData[rowIndex]
        const fixedAmount = fixedFloat(amount)
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={getTooltipContent(fixedAmount, t)}
          >
            {formatAmount(amount)}
          </Cell>
        )
      },
      isNumericValue: true,
      copyText: rowIndex => fixedFloat(filteredData[rowIndex].amount),
    },
    {
      id: 'rate',
      name: 'column.rateperc',
      width: getColumnWidth('rate', columnsWidth),
      renderer: (rowIndex) => {
        const { rate } = filteredData[rowIndex]
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={getTooltipContent(fixedFloat(rate), t)}
          >
            {formatAmount(rate, { color: 'red' })}
          </Cell>
        )
      },
      isNumericValue: true,
      copyText: rowIndex => fixedFloat(filteredData[rowIndex].rate),
    },
    {
      id: 'period',
      name: 'column.period',
      className: 'align-left',
      width: getColumnWidth('period', columnsWidth),
      renderer: (rowIndex) => {
        const period = `${filteredData[rowIndex].period} ${t('column.days')}`
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={getTooltipContent(period, t)}
          >
            {period}
          </Cell>
        )
      },
      copyText: (rowIndex) => {
        const days = t('column.days')
        return `${filteredData[rowIndex].period} ${days}`
      },
    },
    {
      id: 'currency',
      name: 'column.currency',
      className: 'align-left',
      width: getColumnWidth('currency', columnsWidth),
      renderer: () => (
        <Cell tooltip={getTooltipContent(targetSymbol, t)}>
          {targetSymbol}
        </Cell>
      ),
      copyText: () => targetSymbol,
    },
  ]
}
