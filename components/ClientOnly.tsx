"use client";
import React, { useCallback, useEffect, useState } from "react";
import useTheme from "./hooks/useTheme";
import { Loader } from "@mantine/core";
import useCompany from "./hooks/useCompany";

const ClientOnly: React.FC<{
  children: React.ReactNode;
  companyData: CompanyProps;
}> = ({ children, companyData }) => {
  const { onInitialMode, mode } = useTheme();
  const { onCompany, company } = useCompany();
  const [isReady, setIsReady] = useState(false);

  const getCompany = useCallback(async () => {
    onCompany(companyData);
  }, [companyData, onCompany]);

  const fetchData = useCallback(async () => {
    if (isReady) {
      onInitialMode();
      await getCompany();
    }
  }, [getCompany, isReady, onInitialMode]);

  useEffect(() => {
    fetchData();
    setIsReady(true);
  }, [fetchData]);

  if (!company || !isReady) {
    return (
      <div
        className="h-[100vh] w-full flex items-center 
        justify-center bg-black"
      >
        <Loader color="#ffffff" />
      </div>
    );
  }

  return (
    <>
      {children}


<script id="charla-hp-script"> window.addEventListener('load', () => { const a = document.createElement('charla-help-center'); a.setAttribute("p", "4787da6c-4678-4b68-9834-714fd500fe97"); const b = document.getElementById("charla-hp-script"); b.parentElement.insertBefore(a, b); const w = document.createElement('script'); w.src = 'https://app.getcharla.com/help-center/help-center.js'; document.body.appendChild(w); }) </script>

      
    </>
  );
};

export default ClientOnly;
