import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Entrypoint } from "./components/Entrypoint";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Assets
import './assets/general.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="flex min-h-screen items-start justify-center py-32">
        <Entrypoint />
      </main>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
