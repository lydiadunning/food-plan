import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { HistoryContextProvider } from './components/history/useHistory.jsx'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HistoryContextProvider>  
        <App />
      </HistoryContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
