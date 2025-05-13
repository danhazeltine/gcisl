"use client";
import React, { useCallback, useEffect, useState } from "react";
import useTheme from "./hooks/useTheme";
import { Loader } from "@mantine/core";
import useCompany from "./hooks/useCompany";
import Script from "next/script";

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
      <div className="h-[100vh] w-full flex items-center justify-center bg-black">
        <Loader color="#ffffff" />
      </div>
    );
  }

  return (
    <>
      {children}
      
      {/* JivoChat - loaded after hydration */}
      <Script 
        src="//code.jivochat.com/widget/BjSM8hU42b"
        strategy="afterInteractive"
      />
      
      {/* Tawk.to with API Key - loaded after hydration */}
      <Script
        id="tawk-to-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.Tawk_API = window.Tawk_API || {};
            window.Tawk_API.visitor = {
              name: '${companyData.name || 'Visitor'}',
              email: '${companyData.email || ''}',
              hash: '${companyData.id || ''}'
            };
            
            var s1 = document.createElement("script");
            var s0 = document.getElementsByTagName("script")[0];
            s1.async = true;
            s1.src = 'https://embed.tawk.to/1ir50m1at/default';
            s1.charset = 'UTF-8';
            s1.setAttribute('crossorigin', '*');
            s1.setAttribute('data-api-key', '1778317c1dd8d3c7fca1ae7dea62a7d3dbd060fd');
            s0.parentNode.insertBefore(s1, s0);
            
            window.Tawk_API.onLoad = function() {
              console.log('Tawk.to loaded successfully');
            };
          `
        }}
      />
    </>
  );
};

export default ClientOnly;
