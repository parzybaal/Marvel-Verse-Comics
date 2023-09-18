import { Provider } from "react-redux"
import AppRouter from "./routes/AppRouter"
import store from "./redux/store/store"
import { QueryClient, QueryClientProvider } from "react-query"

function App() {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        cacheTime: 1000000
      }
    }
  })

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <AppRouter />
        </Provider>
      </QueryClientProvider>
    </>
  )
}

export default App
