import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';

import UseReducer from './exercises/01.use-reducer'
import UseReducerGame from './exercises/01.use-reducer-game'
import StateOptimization from './exercises/02.state-optimization'
import CustomHooks from './exercises/03.custom-hooks'
import Context from './exercises/04.context'
import Portals from './exercises/06.layout-computation'
import LayoutComputation from './exercises/06.layout-computation'
import ImperativeHandle from './exercises/07.imperative-handle'
import Focus from './exercises/08.focus'
import SyncExternal from './exercises/09.sync-external'

const routes = [
  { path: "/advanced-state-management", element: <UseReducer /> },
  { path: "/advanced-state-management-game", element: <UseReducerGame /> },
  { path: "/state-optimization", element: <StateOptimization /> },
  { path: "/custom-hook", element: <CustomHooks /> },
  { path: "/share-context", element: <Context /> },
  { path: "/portals", element: <Portals /> },
  { path: "/layout-compitation", element: <LayoutComputation /> },
  { path: "/imperative", element: <ImperativeHandle /> },
  { path: "/focus-management", element: <Focus /> },
  { path: "/external-store", element: <SyncExternal /> },
];

function App() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <Router>
      <div className="flex">
        <div style={{ display: sidebarOpen ? 'none' : 'block' }} >
          <Sidebar />
        </div>
        <main className={`p-6 flex-1 ${sidebarOpen ? 'ml-0' : 'ml-64'} transition-all duration-300 ease-in-out`}>
          <button
            className="fixed top-4 left-4 z-50 p-2 bg-gray-900 text-white rounded"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Open sidebar"
          >
            ☰
          </button>
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
