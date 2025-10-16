import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './lib/router'
import { ApolloProvider } from '@apollo/client/react'
import { apolloClient } from './lib/apolloClient'
import { CartCtxProvider } from './contexts/CartContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={apolloClient}>
      <CartCtxProvider>
        <RouterProvider router={router} />
      </CartCtxProvider>
    </ApolloProvider>
  </StrictMode>,
)
