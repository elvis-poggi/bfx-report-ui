import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import classNames from 'classnames'
import {
  Menu,
  MenuDivider,
  MenuItem,
  Tooltip,
} from '@blueprintjs/core'
import _castArray from 'lodash/castArray'
import _includes from 'lodash/includes'

import Timeframe from 'components/Timeframe'
import queryType from 'state/query/constants'
import baseType from 'state/base/constants'
import { getIcon, getPath } from 'state/query/utils'
import { platform } from 'var/config'

import { propTypes, defaultProps } from './ToggleMenu.props'

const { showFrameworkMode } = platform

const {
  MENU_ACCOUNT_BALANCE,
  MENU_AFFILIATES_EARNINGS,
  MENU_CONCENTRATION_RISK,
  MENU_DEPOSITS,
  MENU_DERIVATIVES,
  MENU_FCREDIT,
  MENU_FLOAN,
  MENU_FOFFER,
  MENU_FPAYMENT,
  MENU_LEDGERS,
  MENU_ORDERS,
  MENU_TICKERS,
  MENU_TRADES,
  MENU_POSITIONS,
  MENU_POSITIONS_ACTIVE,
  MENU_POSITIONS_AUDIT,
  MENU_PUBLIC_FUNDING,
  MENU_PUBLIC_TRADES,
  MENU_SNAPSHOTS,
  MENU_TAX_REPORT,
  MENU_WIN_LOSS,
  MENU_WITHDRAWALS,
  MENU_WALLETS,
} = queryType

class ToggleMenu extends PureComponent {
  static propTypes = propTypes

  static defaultProps = defaultProps

  sections = [
    [MENU_LEDGERS, 'ledgers.title'],
    [MENU_TRADES, 'trades.title'],
    [MENU_ORDERS, 'orders.title'],
    [MENU_DEPOSITS, 'deposits.title'],
    [MENU_WITHDRAWALS, 'withdrawals.title'],
    [[MENU_POSITIONS, MENU_POSITIONS_ACTIVE, MENU_POSITIONS_AUDIT], 'positions.title'],
    [MENU_WALLETS, showFrameworkMode ? 'wallets.title' : 'wallets.title_beta'],
    ['divider'],
    [MENU_FOFFER, 'foffer.title'],
    [MENU_FLOAN, 'floan.title'],
    [MENU_FCREDIT, 'fcredit.title'],
    [MENU_FPAYMENT, 'fpayment.title', !showFrameworkMode],
    [MENU_AFFILIATES_EARNINGS, 'affiliatesearnings.title', !showFrameworkMode],
    ['divider'],
    [MENU_PUBLIC_TRADES, 'publictrades.title'],
    [MENU_PUBLIC_FUNDING, 'publicfunding.title'],
    [MENU_TICKERS, 'tickers.title'],
    [MENU_DERIVATIVES, 'derivatives.title'],
    ['divider', '', !showFrameworkMode],
    [MENU_ACCOUNT_BALANCE, 'accountbalance.title', !showFrameworkMode],
    [MENU_WIN_LOSS, 'averagewinloss.title', !showFrameworkMode],
    [MENU_CONCENTRATION_RISK, 'concentrationrisk.title', !showFrameworkMode],
    [MENU_SNAPSHOTS, 'snapshots.title', !showFrameworkMode],
    [MENU_TAX_REPORT, 'taxreport.title', !showFrameworkMode],
  ]

  handleClick(target) {
    const { history } = this.props
    const path = _castArray(getPath(target))[0]
    history.push(`${path}${history.location.search}`)
  }

  /* eslint-disable react/no-array-index-key */
  render() {
    const {
      handleClickCustom,
      menuMode,
      target,
      t,
    } = this.props
    const isIconMode = menuMode === baseType.MENU_MODE_ICON

    const classes = classNames('bitfinex-nav-menu', {
      'bitfinex-compact-menu hidden-xs hidden-sm hidden-md': isIconMode,
      'hidden-xs hidden-sm hidden-md col-lg-1 col-xl-2': menuMode === baseType.MENU_MODE_NORMAL,
    })

    return (
      <Menu large className={classes}>
        <Timeframe
          handleClickCustom={handleClickCustom}
          menuMode={menuMode}
        />
        <MenuDivider />
        {this.sections.map((section, index) => {
          const [type, title, isSkipped] = section

          if (isSkipped) {
            return null
          }

          if (type === 'divider') {
            return <MenuDivider key={index} />
          }

          const types = _castArray(type)
          const mainType = types[0]

          return (
            <Tooltip content={isIconMode ? t(title) : ''} key={index}>
              <MenuItem
                icon={getIcon(mainType)}
                text={isIconMode ? '' : t(title)}
                onClick={() => this.handleClick(mainType)}
                active={_includes(types, target)}
              />
            </Tooltip>
          )
        })}
      </Menu>
    )
  }
}

export default withTranslation('translations')(ToggleMenu)
