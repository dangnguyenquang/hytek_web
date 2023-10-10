import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "~/Routes/Route";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            return <Route key={'route' + index} path={route.path} element={<Page/>} />
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
