import ReactDOM from "react-dom/client";
import App from "./routes/MainRoutes.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { UserProvider } from "./context/UserContext.jsx";
const client = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
    <QueryClientProvider client={client}>
      <App />
    </QueryClientProvider>
  </UserProvider>
);
