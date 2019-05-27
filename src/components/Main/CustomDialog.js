import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import {
  Button,
  Classes,
  Dialog,
  Intent,
  Position,
} from '@blueprintjs/core'
import { DateRangeInput } from '@blueprintjs/datetime'

import { DEFAULT_DATETIME_FORMAT, momentFormatter } from 'state/utils'

const SMALL_DATE_RANGE_POPOVER_PROPS = {
  position: Position.TOP,
}

class CustomDialog extends PureComponent {
  componentDidMount() {
    this.maxDate = new Date()
  }

  createShortcut = (label, dateRange) => ({ dateRange, label, includeTime: true })

  createShortcuts = () => {
    const today = new Date()
    const makeDate = (action) => {
      const returnVal = new Date()
      action(returnVal)
      returnVal.setDate(returnVal.getDate() + 1)
      return returnVal
    }

    const todayStart = new Date()
    todayStart.setHours(0, 0, 0)
    const yesterdayStart = makeDate((d) => {
      d.setDate(d.getDate() - 2)
      d.setHours(0, 0, 0)
    })
    const yesterdayEnd = makeDate((d) => {
      d.setDate(d.getDate() - 2)
      d.setHours(23, 59, 59)
    })
    const oneWeekAgo = makeDate(d => d.setDate(d.getDate() - 7))
    const oneMonthAgo = makeDate(d => d.setMonth(d.getMonth() - 1))
    const threeMonthsAgo = makeDate(d => d.setMonth(d.getMonth() - 3))
    const oneYearAgo = makeDate(d => d.setFullYear(d.getFullYear() - 1))
    const twoYearsAgo = makeDate(d => d.setFullYear(d.getFullYear() - 2))
    const currentYearStart = new Date(today.getFullYear(), 0, 1)
    const lastYearStart = new Date(today.getFullYear() - 1, 0, 1)
    const lastYearEnd = new Date(today.getFullYear() - 1, 11, 31, 23, 59, 59)

    return [
      this.createShortcut('Today', [todayStart, today]),
      this.createShortcut('Yesterday', [yesterdayStart, yesterdayEnd]),
      this.createShortcut('Past week', [oneWeekAgo, today]),
      this.createShortcut('Past month', [oneMonthAgo, today]),
      this.createShortcut('Past 3 months', [threeMonthsAgo, today]),
      this.createShortcut('Past year', [oneYearAgo, today]),
      this.createShortcut('Past 2 years', [twoYearsAgo, today]),
      this.createShortcut(`${today.getFullYear()} year`, [currentYearStart, today]),
      this.createShortcut(`${today.getFullYear() - 1} year`, [lastYearStart, lastYearEnd]),
    ]
  }

  render() {
    const {
      endDate,
      handleCustomDialogClose,
      handleRangeChange,
      isCustomOpen,
      startQuery,
      startDate,
      t,
      timezone,
    } = this.props
    const { formatDate, parseDate } = momentFormatter(DEFAULT_DATETIME_FORMAT, timezone)
    const commonDateRangeProps = {
      allowSingleDayRange: true,
      closeOnSelection: true,
      formatDate,
      parseDate,
      onChange: handleRangeChange,
      value: [startDate, endDate],
      maxDate: this.maxDate,
      placeholder: t('timeframe.start-date-placeholder'),
    }

    return isCustomOpen ? (
      <Dialog
        icon='calendar'
        onClose={handleCustomDialogClose}
        title={t('timeframe.custom.title')}
        autoFocus
        canEscapeKeyClose
        canOutsideClickClose
        enforceFocus
        usePortal
        isOpen={isCustomOpen}
      >
        <div className={Classes.DIALOG_BODY}>
          <DateRangeInput
            {...commonDateRangeProps}
            className='hidden-xs col-sm-12 col-md-12 col-lg-12 col-xl-12'
            shortcuts={this.createShortcuts()}
          />
          <DateRangeInput
            {...commonDateRangeProps}
            className='col-xs-12 hidden-sm hidden-md hidden-lg hidden-xl'
            shortcuts={false}
            popoverProps={SMALL_DATE_RANGE_POPOVER_PROPS}
          />
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button
              intent={Intent.PRIMARY}
              onClick={startQuery}
              disabled={!startDate || !endDate}
            >
              {t('timeframe.custom.view')}
            </Button>
          </div>
        </div>
      </Dialog>
    ) : null
  }
}

CustomDialog.propTypes = {
  handleCustomDialogClose: PropTypes.func.isRequired,
  handleRangeChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  isCustomOpen: PropTypes.bool.isRequired,
  startQuery: PropTypes.func.isRequired,
  startDate: PropTypes.instanceOf(Date),
  timezone: PropTypes.string,
  endDate: PropTypes.instanceOf(Date),
}

CustomDialog.defaultProps = {
  startDate: null,
  endDate: null,
  timezone: '',
}

export default withTranslation('translations')(CustomDialog)
