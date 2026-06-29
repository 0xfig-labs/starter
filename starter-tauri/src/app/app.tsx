import { ErrorBoundary } from "./error-boundary";
import { AppProvider } from "./providers";
import { AppRouter } from "./router";

export function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <AppRouter />
      </AppProvider>
    </ErrorBoundary>
  );
}
