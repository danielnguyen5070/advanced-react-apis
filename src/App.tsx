import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';

import UseReducer01 from './exercises/01.use-reducer/01.problem.new-state'
import UseReducer02 from './exercises/01.use-reducer/02.problem.previous-state'
import UseReducer03 from './exercises/01.use-reducer/03.problem.object'
import UseReducer04 from './exercises/01.use-reducer/04.problem.function'
import UseReducer05 from './exercises/01.use-reducer/05.problem.traditional'
import UseReducer06 from './exercises/01.use-reducer/06.problem.tic-tac-toe'

import StateOptimization01 from './exercises/02.state-optimization/01.problem.optimize'

import CustomHooks01 from './exercises/03.custom-hooks/01.problem.function'
import CustomHooks02 from './exercises/03.custom-hooks/02.problem.callback'

import Context01 from './exercises/04.context/01.problem.provider'
import Context02 from './exercises/04.context/02.problem.hook'

import Portals1 from './exercises/05.portals/01.problem.create'

import LayoutComputation01 from './exercises/06.layout-computation/01.problem.layout-effect'

import ImperativeHandle01 from './exercises/07.imperative-handle/01.problem.ref'

import Focus01 from './exercises/08.focus/01.problem.flush-sync'

import SyncExternal01 from './exercises/09.sync-external/01.problem.sub'
import SyncExternal02 from './exercises/09.sync-external/02.problem.util'
import SyncExternal03 from './exercises/09.sync-external/03.problem.ssr'

const routes = [
  { path: "/advanced-state-management/new-state", element: <UseReducer01 /> },
  { path: "/advanced-state-management/previous-state", element: <UseReducer02 /> },
  { path: "/advanced-state-management/state-object", element: <UseReducer03 /> },
  { path: "/advanced-state-management/action-function", element: <UseReducer04 /> },
  { path: "/advanced-state-management/traditional-reducer", element: <UseReducer05 /> },
  { path: "/advanced-state-management/real-world", element: <UseReducer06 /> },
  { path: "/state-optimization/update", element: <StateOptimization01 /> },
  { path: "/custom-hook/hoo-function", element: <CustomHooks01 /> },
  { path: "/custom-hook/usecalllback", element: <CustomHooks02 /> },
  { path: "/share-context/provider", element: <Context01 /> },
  { path: "/share-context/hook", element: <Context02 /> },
  { path: "/portals/create", element: <Portals1 /> },
  { path: "/layout-compitation/use-layout-effect", element: <LayoutComputation01 /> },
  { path: "/imperative/use", element: <ImperativeHandle01 /> },
  { path: "/focus-management/flushsync", element: <Focus01 /> },
  { path: "/external-store/use", element: <SyncExternal01 /> },
  { path: "/external-store/utility", element: <SyncExternal02 /> },
  { path: "/external-store/server", element: <SyncExternal03 /> },
];

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <main className="ml-64 p-6 flex-1">
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
