import React, { Fragment, PureComponent } from 'react'
import { injectIntl } from 'react-intl'
import {
  Button,
  Classes,
  Dialog,
  Intent,
} from '@blueprintjs/core'

import { formatDate } from 'state/utils'
import Loading from 'ui/Loading'

import { propTypes, defaultProps } from './ExportDialog.props'

class ExportDialog extends PureComponent {
  render() {
    const {
      email,
      end,
      handleExportDialogClose,
      intl,
      isExportOpen,
      loading,
      start,
      startExport,
      type,
      timezone,
    } = this.props
    if (!isExportOpen) {
      return null
    }
    const timeSpan = `${formatDate(start, timezone)} — ${formatDate(end, timezone)}`
    const intlType = intl.formatMessage({ id: `${type}.title` })
    const renderMessage = !email ? (
      <Fragment>
        {intl.formatMessage({ id: 'timeframe.download.prepare' }, { intlType })}
        &nbsp;
        <span className='bitfinex-show-soft'>
          {timeSpan}
        </span>
        &nbsp;
        {intl.formatMessage({ id: 'timeframe.download.store' }, { intlType })}
      </Fragment>
    ) : (
      <Fragment>
        {intl.formatMessage({ id: 'timeframe.download.prepare' }, { intlType })}
        &nbsp;
        <span className='bitfinex-show-soft'>
          {timeSpan}
        </span>
        &nbsp;
        {intl.formatMessage({ id: 'timeframe.download.send' }, { intlType, email })}
      </Fragment>
    )
    const renderContent = loading
      ? (
        <Fragment>
          <div className={Classes.DIALOG_BODY}>
            <Loading />
          </div>
          <div className={Classes.DIALOG_FOOTER} />
        </Fragment>
      )
      : (
        <Fragment>
          <div className={Classes.DIALOG_BODY}>
            {renderMessage}
          </div>
          <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
              <Button onClick={handleExportDialogClose}>
                {intl.formatMessage({ id: 'timeframe.download.cancel' })}
              </Button>
              <Button
                intent={Intent.PRIMARY}
                onClick={startExport}
              >
                {intl.formatMessage({ id: 'timeframe.download.export' })}
              </Button>
            </div>
          </div>
        </Fragment>
      )

    return (
      <Dialog
        icon='cloud-download'
        onClose={handleExportDialogClose}
        title={intl.formatMessage({ id: 'timeframe.download.title' })}
        autoFocus
        canEscapeKeyClose
        canOutsideClickClose
        enforceFocus
        usePortal
        isOpen={isExportOpen}
      >
        {renderContent}
      </Dialog>
    )
  }
}

ExportDialog.propTypes = propTypes
ExportDialog.defaultProps = defaultProps

export default injectIntl(ExportDialog)
