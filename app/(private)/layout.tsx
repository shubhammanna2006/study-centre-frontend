'use client'
import api from "@/api/api";
import Loader from "@/components/Loader";
import { useAppDispatch, useAppSelector } from "@/TypeTs/reduxHooks";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { isAuthenticated ,isLoading} = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      redirect("/");
    }
  }, [isAuthenticated]);

   if (isLoading) {
    return <Loader />; // blocking render
  }

  return <>{children}</>;
};

export default layout;