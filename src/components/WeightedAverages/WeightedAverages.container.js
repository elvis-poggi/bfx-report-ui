import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import {
  refresh,
  setTargetPair,
  fetchWeightedAwerages,
} from 'state/weightedAverages/actions'
import { getFullTime } from 'state/base/selectors'
import { getInactivePairs, getPairs } from 'state/symbols/selectors'
import {
  getEntries,
  getNextPage,
  getPageLoading,
  getTargetPair,
  getDataReceived,
  getExistingPairs,
} from 'state/weightedAverages/selectors'
import { getColumns } from 'state/filters/selectors'
import { getTimeFrame } from 'state/timeRange/selectors'
import { getColumnsWidth } from 'state/columns/selectors'
import queryConstants from 'state/query/constants'

import WeightedAverages from './WeightedAverages'

const mapStateToProps = state => ({
  ...getTimeFrame(state),
  pairs: getPairs(state),
  entries: getEntries(state),
  nextPage: getNextPage(state),
  pageLoading: getPageLoading(state),
  targetPair: getTargetPair(state),
  dataReceived: getDataReceived(state),
  existingPairs: getExistingPairs(state),
  inactivePairs: getInactivePairs(state),
  columns: getColumns(state, queryConstants.MENU_WEIGHTED_AVERAGES),
  columnsWidth: getColumnsWidth(state, queryConstants.MENU_WEIGHTED_AVERAGES),
  getFullTime: getFullTime(state),
})

const mapDispatchToProps = {
  refresh,
  setTargetPair,
  fetchData: fetchWeightedAwerages,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
  withRouter,
)(WeightedAverages)
