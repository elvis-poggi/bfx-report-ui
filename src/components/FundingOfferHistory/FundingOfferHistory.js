import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import { Card, Elevation } from '@blueprintjs/core'

import Pagination from 'ui/Pagination'
import DataTable from 'ui/DataTable'
import Loading from 'ui/Loading'
import NoData from 'ui/NoData'
import SectionHeader from 'ui/SectionHeader'
import queryConstants from 'state/query/constants'
import {
  checkInit,
  checkFetch,
  toggleSymbol,
  clearAllSymbols,
} from 'state/utils'

import { getColumns } from './FundingOfferHistory.columns'

const TYPE = queryConstants.MENU_FOFFER

class FundingOfferHistory extends PureComponent {
  static propTypes = {
    columns: PropTypes.shape({
      amountExecuted: PropTypes.bool,
      amountOrig: PropTypes.bool,
      id: PropTypes.bool,
      mtsUpdate: PropTypes.bool,
      period: PropTypes.bool,
      rate: PropTypes.bool,
      status: PropTypes.bool,
      symbol: PropTypes.bool,
      type: PropTypes.bool,
    }),
    columnsWidth: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
    })),
    entries: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      symbol: PropTypes.string.isRequired,
      amountOrig: PropTypes.number.isRequired,
      amountExecuted: PropTypes.number.isRequired,
      type: PropTypes.string,
      status: PropTypes.string,
      rate: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      period: PropTypes.number,
      mtsUpdate: PropTypes.number.isRequired,
    })),
    existingCoins: PropTypes.arrayOf(PropTypes.string),
    getFullTime: PropTypes.func.isRequired,
    dataReceived: PropTypes.bool.isRequired,
    pageLoading: PropTypes.bool.isRequired,
    refresh: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    targetSymbols: PropTypes.arrayOf(PropTypes.string),
    timeOffset: PropTypes.string.isRequired,
  }

  static defaultProps = {
    columns: {},
    entries: [],
    columnsWidth: [],
    existingCoins: [],
    targetSymbols: [],
  }

  componentDidMount() {
    checkInit(this.props, TYPE)
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, TYPE)
  }

  toggleSymbol = symbol => toggleSymbol(TYPE, this.props, symbol)

  clearSymbols = () => clearAllSymbols(TYPE, this.props)

  render() {
    const {
      columns,
      columnsWidth,
      getFullTime,
      targetSymbols,
      entries,
      existingCoins,
      dataReceived,
      pageLoading,
      refresh,
      t,
      timeOffset,
    } = this.props
    const tableColumns = getColumns({
      columnsWidth,
      filteredData: entries,
      getFullTime,
      t,
      timeOffset,
    }).filter(({ id }) => columns[id])

    let showContent
    if (!dataReceived && pageLoading) {
      showContent = <Loading />
    } else if (!entries.length) {
      showContent = <NoData />
    } else {
      showContent = (
        <Fragment>
          <DataTable
            section={TYPE}
            numRows={entries.length}
            tableColumns={tableColumns}
          />
          <Pagination target={TYPE} loading={pageLoading} />
        </Fragment>
      )
    }

    return (
      <Card elevation={Elevation.ZERO} className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
        <SectionHeader
          title='foffer.title'
          target={TYPE}
          symbolsSelectorProps={{
            currentFilters: targetSymbols,
            existingCoins,
            toggleSymbol: this.toggleSymbol,
          }}
          refresh={refresh}
          clearTargetSymbols={this.clearSymbols}
        />
        {showContent}
      </Card>
    )
  }
}

export default withTranslation('translations')(FundingOfferHistory)
