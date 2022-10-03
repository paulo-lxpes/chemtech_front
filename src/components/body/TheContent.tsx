import React, { Suspense, useEffect} from "react";
import { Route, Routes } from "react-router-dom";
import routes from "../../routes/routes";

// routes config

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const TheContent = () => {
    return (
        <Suspense fallback={loading}>
      <Routes>
        {routes.map((route: { path: string; element: any; }, index: React.Key | null | undefined) => {
          return ((
            <Route
              key={index}
              path={route.path}
              element={<route.element />}
            />
          )
          );
        })}
      </Routes>
        </Suspense>
  );
};

export default React.memo(TheContent);
