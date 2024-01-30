import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HistoryContextProvider } from './components/history/useHistory.jsx'
import { checkForLogin } from './components/userAuth/userHooks.jsx'
// import { UserContextProvider } from './components/userAuth/userContext.js'

const queryClient = new QueryClient()
const loggedInUser = checkForLogin()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Theme accentColor="amber" grayColor="sand" radius="large" hasBackground='true' scaling="95%" panelBackground='solid'>
      <QueryClientProvider client={queryClient}>
        <HistoryContextProvider loggedInUser={loggedInUser}>  
        {/* <UserContextProvider user={loggedInUser}> */}
            <App />
        {/* </UserContextProvider> */}
        </HistoryContextProvider>
      </QueryClientProvider>
    </Theme>
  </React.StrictMode>,
)

