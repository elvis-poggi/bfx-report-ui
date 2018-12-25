import React from 'react'
import {
  Cell,
  TruncatedFormat,
} from '@blueprintjs/table'

import { amountStyle } from 'ui/utils'
import { formatTime } from 'state/utils'
import { formatPair } from 'state/symbols/utils'

export default function getColumns(props) {
  const { filteredData, targetPair, timezone } = props

  return [
    {
      id: 'id',
      name: 'column.id',
      width: 85,
      renderer: (rowIndex) => {
        const { id } = filteredData[rowIndex]
        return (
          <Cell tooltip={id}>
            {id}
          </Cell>
        )
      },
      tooltip: rowIndex => filteredData[rowIndex].id,
    },
    {
      id: 'mts',
      name: 'publictrades.column.time',
      width: 150,
      renderer: (rowIndex) => {
        const mts = formatTime(filteredData[rowIndex].mts, timezone)
        return (
          <Cell tooltip={mts}>
            <TruncatedFormat>
              {mts}
            </TruncatedFormat>
          </Cell>
        )
      },
      tooltip: rowIndex => formatTime(filteredData[rowIndex].mts, timezone),
    },
    {
      id: 'type',
      name: 'publictrades.column.type',
      width: 80,
      renderer: (rowIndex) => {
        const { type, amount } = filteredData[rowIndex]
        const classes = amountStyle(amount)
        return (
          <Cell
            className={classes}
            tooltip={type}
          >
            {type}
          </Cell>
        )
      },
      tooltip: rowIndex => filteredData[rowIndex].type,
    },
    {
      id: 'price',
      name: 'publictrades.column.price',
      width: 125,
      renderer: (rowIndex) => {
        const { price, amount } = filteredData[rowIndex]
        const classes = amountStyle(amount)
        return (
          <Cell
            className={classes}
            tooltip={price}
          >
            {price}
          </Cell>
        )
      },
      tooltip: rowIndex => filteredData[rowIndex].price,
    },
    {
      id: 'amount',
      name: 'publictrades.column.amount',
      width: 125,
      renderer: (rowIndex) => {
        const amount = Math.abs(filteredData[rowIndex].amount)
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={amount}
          >
            {amount}
          </Cell>
        )
      },
      tooltip: rowIndex => filteredData[rowIndex].amount,
    },
    {
      id: 'pair',
      name: 'publictrades.column.pair',
      width: 100,
      renderer: () => {
        const formatedCurrentPair = formatPair(targetPair)
        return (
          <Cell tooltip={formatedCurrentPair}>
            {formatedCurrentPair}
          </Cell>
        )
      },
      tooltip: () => formatPair(targetPair),
    },
  ]
}