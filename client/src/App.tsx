import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AnimatedRoutes } from "./components/Animation/AnimatedRoutes";
import { GlobalProvider, initialState } from "./context/GlobalContext";

function App() {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  const { tracks, lyrics, track } = initialState;
  return (
    <QueryClientProvider client={client}>
      <div className="h-screen bg-primary_color_bg font-main_font">
        <Router>
          <Suspense fallback={<p className="text-center">Loading...</p>}>
            <GlobalProvider lyrics={lyrics} tracks={tracks} track={track}>
              <AnimatedRoutes />
            </GlobalProvider>
          </Suspense>
        </Router>
      </div>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
