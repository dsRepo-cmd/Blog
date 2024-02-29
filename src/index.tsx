import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/app/providers/ThemeProvider";
import { StoreProvider } from "@/app/providers/StoreProvider";
import { ErrorBoundary } from "@/app/providers/ErrorBoundary";
import "@/app/styles/index.scss";
import "@/shared/config/i18n/i18n";
import App from "@/app/App";

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <BrowserRouter>
      <StoreProvider>
        <ErrorBoundary>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </ErrorBoundary>
      </StoreProvider>
    </BrowserRouter>
  );
} else {
  console.error("Root element not found");
}
