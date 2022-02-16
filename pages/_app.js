import '../styles/index.css';
import { TodosProvider } from '../context/TodosContext';
import { ThemeProvider } from 'next-themes';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <TodosProvider>
        <div className="container mx-auto my-6 max-w-xl">
          <Component {...pageProps} />
        </div>
      </TodosProvider>
    </ThemeProvider>
  );
}

export default MyApp;
