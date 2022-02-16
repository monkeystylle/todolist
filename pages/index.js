import Head from 'next/head';
import Navbar from '../components/TodoForm';
import Todo from '../components/Todo';
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from '@heroicons/react/solid';
import { table, minifyRecords } from './api/utils/AirTable';
import { TodosContext } from '../context/TodosContext';
import { useEffect, useContext, useState } from 'react';
import auth0 from './api/utils/Auth0';

export default function Home({ initialTodos, user }) {
  const { todos, setTodos } = useContext(TodosContext);
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTodos(initialTodos);
    setMounted(true);
  }, []);

  const renderThemeChanger = () => {
    if (!mounted) return null;

    const currentTheme = theme === 'system' ? systemTheme : theme;

    if (currentTheme === 'dark') {
      return (
        <SunIcon
          className="w-7 h-7"
          role="button"
          onClick={() => setTheme('light')}
        />
      );
    } else {
      return (
        <MoonIcon
          className="w-7 h-7"
          role="button"
          onClick={() => setTheme('dark')}
        />
      );
    }
  };

  return (
    <div className="max-w-xl m-auto p-2">
      <Head>
        <title>My Todo CRUD App</title>
        <header className="border-b border-gray-100 dark:border-gray-700">
          <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
            {renderThemeChanger()}
          </div>
        </header>
      </Head>

      <main>
        <nav>
          <div className="flex items-center justify-between py-4  ">
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold text-white-800 md:text-3xl">
                <a href="#">My Todos</a>
              </div>
            </div>
            <div className="flex">
              {user ? (
                <a
                  href="/api/logout"
                  className="rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4"
                >
                  Logout
                </a>
              ) : (
                <a
                  href="/api/login"
                  className="rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4"
                >
                  Login
                </a>
              )}
            </div>
          </div>
        </nav>
        {user ? (
          <>
            <Navbar />
            <ul>
              {todos && todos.map((todo) => <Todo todo={todo} key={todo.id} />)}
            </ul>
          </>
        ) : (
          <p className="text-center mt-4">Please login to save todos!</p>
        )}
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await auth0.getSession(context.req);
  let todos = [];
  if (session?.user) {
    todos = await table
      .select({ filterByFormula: `userId = '${session.user.sub}'` })
      .firstPage();
  }
  return {
    props: {
      initialTodos: minifyRecords(todos),
      user: session?.user || null,
    },
  };
}
