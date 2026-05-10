import { useState, useCallback, useEffect } from "react";
import Topbar from "./components/Topbar";
import Statusbar from "./components/Statusbar";
import DetailPanel from "./components/DetailPanel";
import HomePage from "./components/HomePage";
import PersonnelPage from "./components/PersonnelPage";
import DepartmentsPage from "./components/DepartmentsPage";
import UsefulNumbersPage from "./components/UsefulNumbersPage";
import { useContactsData } from "./hooks/useContactsData";
import "./App.css";

export default function App() {
  const [page, setPage] = useState("home");
  const [detailPerson, setDetailPerson] = useState(null);
  const [initialDept, setInitialDept] = useState(null);
  const [statusInfo, setStatusInfo] = useState("");
  const { data, loading } = useContactsData();

  const navigate = useCallback((target, deptName) => {
    setPage(target);
    if (deptName) {
      setInitialDept(deptName);
    } else {
      setInitialDept(null);
    }
  }, []);

  const openPerson = useCallback((p) => {
    setDetailPerson(p);
  }, []);

  const closeDetail = useCallback(() => {
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

  if (loading) {
    return (
      <div className="app-loading">
        <div className="spinner"></div>
        <p>Loading contacts...</p>
      </div>
    );
  }

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
