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

  // Load Tawk.to script after hydration
  useEffect(() => {
    if (typeof window !== "undefined" && isReady) {
      window.Tawk_API = window.Tawk_API || {};
      const tawkScript = document.createElement("script");
      tawkScript.async = true;
      tawkScript.src = "https://embed.tawk.to/1ir50m1at";
      document.body.appendChild(tawkScript);
    }
  }, [isReady]);

  // Existing initialization logic
  useEffect(() => {
    fetchData();
    setIsReady(true);
  }, [fetchData]);

  if (!company || !isReady) {
    return (
      <div className="h-[100vh] w-full flex items-center justify-center bg-black">
        <Loader color="#ffffff" />
      </div>
    );
  }

  return (
    <>
      {children}
      {/* JivoChat script (existing) */}
      <script src="//code.jivo.com/widget/BjSM8hU42b" async />
    </>
  );
};

export default ClientOnly;
