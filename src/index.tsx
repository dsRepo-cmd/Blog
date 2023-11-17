import ReactDOM from 'react-dom/client'
import 'shared/config/i18n/i18n'

import App from './app/App'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'app/providers/ThemeProvider'

const rootElement = document.getElementById('root')

ReactDOM.createRoot(rootElement).render(
        <BrowserRouter>
                <ThemeProvider>
                        <App />
                </ThemeProvider>
        </BrowserRouter>
)
