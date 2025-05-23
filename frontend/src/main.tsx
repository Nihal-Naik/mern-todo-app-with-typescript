import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import App from './pages/App.tsx'
import { ParallaxProvider } from 'react-scroll-parallax'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Todos from './pages/Todos.tsx'
import { store } from './app/store'
import { Provider } from 'react-redux'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path:"/todos",
    element: <Todos />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ParallaxProvider>
        <RouterProvider router={router} />
      </ParallaxProvider>
    </Provider>
  </StrictMode>,
)
