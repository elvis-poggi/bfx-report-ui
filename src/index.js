import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { FocusStyleManager } from '@blueprintjs/core'
import { PersistGate } from 'redux-persist/integration/react'
import 'normalize.css/normalize.css'
import 'flexboxgrid2/flexboxgrid2.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import '@blueprintjs/table/lib/css/table.css'
import './index.css'
import App from './App'
import { persistor, store } from './state/store'

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
)

FocusStyleManager.onlyShowFocusOnTabs()
