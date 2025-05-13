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
  const [tawkLoaded, setTawkLoaded] = useState(false);

  const getCompany = useCallback(async () => {
    onCompany(companyData);
  }, [companyData, onCompany]);

  const fetchData = useCallback(async () => {
    if (isReady) {
      onInitialMode();
      await getCompany();
    }
  }, [getCompany, isReady, onInitialMode]);

  // Initialize Tawk.to when ready
  useEffect(() => {
    if (isReady && !tawkLoaded) {
      setTawkLoaded(true);
    }
  }, [isReady, tawkLoaded]);

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
      
      {/* JivoChat script */}
      <Script 
        src="//code.jivochat.com/widget/BjSM8hU42b" 
        strategy="afterInteractive" 
      />
      
      {/* Tawk.to script - only loads when ready */}
      {tawkLoaded && (
        <Script
          id="tawk.to"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/1ir50m1at';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
              })();
            `,
          }}
        />
      )}
    </>
  );
};

export default ClientOnly;
