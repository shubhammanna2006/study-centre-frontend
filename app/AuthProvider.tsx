"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/TypeTs/reduxHooks";
import { setCredentials, clearAuth } from "@/store/authSlice";
import api from "@/api/api";
import Loader from "@/components/Loader";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const restoreAuth = async () => {
      try {
        const res = await api.post("api/v1/auth/refresh");
        if (res.status===200) {
          dispatch(
          setCredentials({
            user: res.data.profile,
            accessToken: res.data.token,
            role: res.data.role,
          }),
        );
        
        }
      } catch {
        dispatch(clearAuth());
      }
    };

    restoreAuth();
  }, []);

  if (isLoading) {
    return <Loader />; // blocking render
  }

  return <>{children}</>;
}
