import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {
  Button,
  Checkbox,
  Classes,
  Callout,
  Dialog,
  Intent,
} from '@blueprintjs/core'

import Icon from 'icons'
import config from 'config'
import PlatformLogo from 'ui/PlatformLogo'

import { MODES } from '../Auth'
import LoginOtp from '../LoginOtp'
import LoginEmail from '../LoginEmail'
import LoginApiKey from '../LoginApiKey'
import ModeSwitcher from '../ModeSwitcher'
import LoginPassword from '../LoginPassword'

const { showFrameworkMode, hostedFrameworkMode } = config
const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z*.!@#$%^&(){}:;<>,?/\\~_+=|\d-]{8,}$/

class PasswordRecovery extends PureComponent {
  static propTypes = {
    authData: PropTypes.shape({
      apiKey: PropTypes.string,
      apiSecret: PropTypes.string,
      isPersisted: PropTypes.bool.isRequired,
    }).isRequired,
    loading: PropTypes.bool.isRequired,
    t: PropTypes.func.isRequired,
    recoverPassword: PropTypes.func.isRequired,
    recoverPasswordOtp: PropTypes.func.isRequired,
    switchMode: PropTypes.func.isRequired,
    signUpEmail: PropTypes.func.isRequired,
    showOtpLogin: PropTypes.func.isRequired,
    isOtpLoginShown: PropTypes.bool.isRequired,
    updateAuth: PropTypes.func.isRequired,
  }

  constructor(props) {
    super()

    const { authData: { isPersisted } } = props

    this.state = {
      apiKey: '',
      apiSecret: '',
      otp: '',
      password: '',
      passwordRepeat: '',
      isBeingValidated: false,
      isPasswordProtectionDisabled: hostedFrameworkMode,
      isPersisted,
      passwordError: '',
      passwordRepeatError: '',
      useApiKey: false,
      userName: '',
      userPassword: '',
    }
  }

  onPasswordRecovery = () => {
    const { recoverPassword, signUpEmail } = this.props
    const {
      apiKey,
      apiSecret,
      password,
      isPasswordProtectionDisabled,
      isPersisted,
      useApiKey,
      userName,
      userPassword,
    } = this.state
    this.setState({
      isBeingValidated: true,
    })
    const isValid = this.validateForm()

    if (isValid) {
      if (useApiKey) {
        recoverPassword({
          apiKey,
          apiSecret,
          password,
          isNotProtected: isPasswordProtectionDisabled,
          isPersisted,
        })
      } else {
        signUpEmail({
          login: userName,
          password: userPassword,
        })
      }
    }
  }

  togglePersistence = () => {
    const { authData: { isPersisted }, updateAuth } = this.props
    updateAuth({ isPersisted: !isPersisted })
  }

  validateForm = () => {
    const {
      password,
      passwordRepeat,
      isPasswordProtectionDisabled,
      passwordError,
      passwordRepeatError,
    } = this.state

    if (!showFrameworkMode || isPasswordProtectionDisabled) {
      return true
    }

    let isValid = true
    const isValidPassword = passwordRegExp.test(password)

    if (password.length < 8) {
      this.setState({ passwordError: 'auth.passwordLengthValidationError' })
      isValid = false
    } else if (!isValidPassword) {
      this.setState({ passwordError: 'auth.passwordCharactersValidationError' })
      isValid = false
    } else if (passwordError) {
      this.setState({ passwordError: '' })
    }

    // don't start validating password repeat if password is invalid yet
    if (!isValid && !passwordRepeatError) {
      return isValid
    }

    if (password !== passwordRepeat) {
      this.setState({ passwordRepeatError: 'auth.passwordRepeatValidationError' })
      isValid = false
    } else if (passwordRepeatError) {
      this.setState({ passwordRepeatError: '' })
    }

    return isValid
  }

  handleInputChange = (e) => {
    const { isBeingValidated } = this.state
    const { name, value } = e.target
    this.setState({
      [name]: value,
    }, () => isBeingValidated && this.validateForm())
  }

  handleCheckboxChange = (e) => {
    const { name, checked } = e.target
    this.setState({
      [name]: checked,
    })
  }

  handle2FACancel = () => {
    const { showOtpLogin } = this.props
    this.setState({ otp: '' })
    showOtpLogin(false)
  }

  handleOtpPasswordRecovery = () => {
    const { recoverPasswordOtp } = this.props
    const { otp, password, isPasswordProtectionDisabled } = this.state
    recoverPasswordOtp({
      otp,
      password,
      isNotProtected: isPasswordProtectionDisabled,
    })
  }

  toggleUseApiKey =() => {
    this.setState((state) => ({ useApiKey: !state.useApiKey }))
  }

  render() {
    const {
      t,
      loading,
      switchMode,
      isOtpLoginShown,
    } = this.props
    const {
      otp,
      apiKey,
      password,
      userName,
      apiSecret,
      useApiKey,
      userPassword,
      passwordError,
      passwordRepeat,
      passwordRepeatError,
      isPasswordProtectionDisabled,
    } = this.state

    const showEnterPassword = showFrameworkMode && !isPasswordProtectionDisabled
    const showPasswordProtection = showFrameworkMode && !hostedFrameworkMode
    const isPasswordRecoveryDisabled = (useApiKey && (!apiKey || !apiSecret))
      || (!useApiKey && (!userName || !userPassword))
      || (showFrameworkMode && !isPasswordProtectionDisabled
        && (!password || !passwordRepeat || passwordError || passwordRepeatError))
    const classes = classNames('bitfinex-auth', 'bitfinex-auth-sign-up', {
      'bitfinex-auth-sign-up--framework': showFrameworkMode,
    })

    return (
      <Dialog
        isOpen
        usePortal
        className={classes}
        isCloseButtonShown={false}
        title={t('auth.forgotPassword')}
      >
        <div className={Classes.DIALOG_BODY}>
          <PlatformLogo />
          {!isOtpLoginShown && (
            <Callout icon={<Icon.INFO_CIRCLE />}>
              {t('auth.forgotPasswordNote')}
            </Callout>
          )}
          {isOtpLoginShown
            ? (
              <LoginOtp
                otp={otp}
                handle2FACancel={this.handle2FACancel}
                handleInputChange={this.handleInputChange}
                handleOneTimePassword={this.handleOtpPasswordRecovery}
              />
            ) : (
              <>
                {!useApiKey && (
                  <LoginEmail
                    userName={userName}
                    userPassword={userPassword}
                    onChange={this.handleInputChange}
                  />
                )}
                {useApiKey && (
                  <LoginApiKey
                    apiKey={apiKey}
                    apiSecret={apiSecret}
                    onChange={this.handleInputChange}
                  />
                )}
                {showEnterPassword && (
                  <LoginPassword
                    password={password}
                    passwordError={passwordError}
                    passwordRepeat={passwordRepeat}
                    onChange={this.handleInputChange}
                    passwordLabel={'auth.enterNewPassword'}
                    passwordRepeatError={passwordRepeatError}
                    passwordRepeatLabel={'auth.repeatNewPassword'}
                  />
                )}
                {showPasswordProtection && (
                  <Checkbox
                    className='bitfinex-auth-remember-me'
                    name='isPasswordProtectionDisabled'
                    checked={isPasswordProtectionDisabled}
                    onChange={this.handleCheckboxChange}
                  >
                    {t('auth.removeLoginPassword')}
                  </Checkbox>
                )}
              </>
            )}
        </div>
        {!isOtpLoginShown && (
          <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
              <div
                onClick={() => this.toggleUseApiKey()}
                className='bitfinex-auth-mode-switch api-key-switch'
              >
                {useApiKey ? t('auth.resetAccWithoutApiKey') : t('auth.resetAccWithApiKey')}
              </div>
              <Button
                className='bitfinex-auth-check'
                name='check'
                intent={Intent.SUCCESS}
                onClick={this.onPasswordRecovery}
                disabled={isPasswordRecoveryDisabled}
                loading={loading}
              >
                {t('auth.resetPassword')}
              </Button>
            </div>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
              <ModeSwitcher
                mode={MODES.SIGN_IN}
                icon={<Icon.SIGN_IN />}
                switchMode={switchMode}
                title={t('auth.signInToDifferentAcc')}
              />
            </div>
          </div>
        )}
      </Dialog>
    )
  }
}

export default PasswordRecovery
