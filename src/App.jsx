import { useState, useCallback, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import Topbar from "./components/Topbar";
import Statusbar from "./components/Statusbar";
import DetailPanel from "./components/DetailPanel";
import HomePage from "./components/HomePage";
import PersonnelPage from "./components/PersonnelPage";
import DepartmentsPage from "./components/DepartmentsPage";
import UsefulNumbersPage from "./components/UsefulNumbersPage";
import SetupPage from "./components/SetupPage";
import { useContactsData } from "./hooks/useContactsData";
import "./App.css";

export default function App() {
  const [configChecked, setConfigChecked] = useState(false);
  const [configReady, setConfigReady] = useState(false);
  const [page, setPage] = useState("home");
  const [detailPerson, setDetailPerson] = useState(null);
  const [initialDept, setInitialDept] = useState(null);
  const [statusInfo, setStatusInfo] = useState("");

  useEffect(() => {
    console.log("[App] Checking config...");
    invoke("check_config").then((ok) => {
      console.log("[App] Config exists:", ok);
      setConfigReady(ok);
      setConfigChecked(true);
    });
  }, []);

  const { data, loading, error } = useContactsData(configReady);

  useEffect(() => {
    console.log("[App] State:", { configChecked, configReady, loading, error, hasData: !!data });
  }, [configChecked, configReady, loading, error, data]);

  const navigate = useCallback((target, deptName) => {
    console.log("[App] Navigate:", target, deptName);
    setPage(target);
    if (deptName) {
      setInitialDept(deptName);
    } else {
      setInitialDept(null);
    }
  }, []);

  const openPerson = useCallback((p) => {
    console.log("[App] Open person:", p?.name);
    setDetailPerson(p);
  }, []);

  const closeDetail = useCallback(() => {
    console.log("[App] Close detail");
    setDetailPerson(null);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "F1") {
        e.preventDefault();
        setPage("home");
        setInitialDept(null);
      } else if (e.key === "F2") {
        e.preventDefault();
        setPage("personnel");
        setInitialDept(null);
      } else if (e.key === "F3") {
        e.preventDefault();
        setPage("departments");
      } else if (e.key === "F4") {
        e.preventDefault();
        setPage("useful");
        setInitialDept(null);
      } else if (e.key === "Escape") {
        if (detailPerson) {
          closeDetail();
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [detailPerson, closeDetail]);

  if (!configChecked) {
    console.log("[App] Render: checking config");
    return (
      <div className="app-loading">
        <div className="spinner"></div>
        <p>Checking configuration...</p>
      </div>
    );
  }

  if (!configReady) {
    console.log("[App] Render: setup page");
    return (
      <SetupPage
        onConfigured={() => {
          console.log("[App] Config saved, proceeding...");
          setConfigReady(true);
        }}
      />
    );
  }

  if (error) {
    console.log("[App] Render: error state");
    return (
      <div className="app-error">
        <h2>Failed to load data</h2>
        <p>{error}</p>
        <p>Make sure the API server is running:</p>
        <pre>node server/server.js</pre>
      </div>
    );
  }

  if (loading || !data) {
    console.log("[App] Render: loading data", { loading, hasData: !!data });
    return (
      <div className="app-loading">
        <div className="spinner"></div>
        <p>Loading contacts...</p>
      </div>
    );
  }

  console.log("[App] Render: main app, page:", page);
  return (
    <>
      <Topbar currentPage={page} onNavigate={navigate} />
      {page === "home" && (
        <HomePage
          personnel={data.personnel}
          departments={data.departments}
          usefulNumbers={data.useful_numbers}
          onOpenPerson={openPerson}
          onNavigate={navigate}
        />
      )}
      {page === "personnel" && (
        <PersonnelPage
          personnel={data.personnel}
          onOpenPerson={openPerson}
          onNavigate={navigate}
        />
      )}
      {page === "departments" && (
        <DepartmentsPage
          personnel={data.personnel}
          departments={data.departments}
          initialDept={initialDept}
          onOpenPerson={openPerson}
        />
      )}
      {page === "useful" && (
        <UsefulNumbersPage usefulNumbers={data.useful_numbers} />
      )}
      <DetailPanel person={detailPerson} onClose={closeDetail} />
      <Statusbar currentPage={page} info={statusInfo} />
    </>
  );
}
