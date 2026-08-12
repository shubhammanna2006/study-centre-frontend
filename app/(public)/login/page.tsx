"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LogIn, Shield, User } from "lucide-react";
import { toast } from "sonner";
import { loginApi } from "@/api/apilist";
import { LoginCrediancial } from "@/interfaces/interface";
import { useAppDispatch, useAppSelector } from "@/TypeTs/reduxHooks";
import { setCredentials } from "@/store/authSlice";
import { redirect } from "next/navigation";

export default function LoginPage() {
  const [tab, setTab] = useState("student");
  const [loginCrediancial, setLoginCrediancial] = useState<LoginCrediancial>({
    email: "",
    password: "",
  });
  const [busy, setBusy] = useState(false);

  const dispatch = useAppDispatch();
  // \Unable to access if user already login
  const { isAuthenticated, isLoading, role } = useAppSelector(
    (state) => state.auth,
  );
  useEffect(() => {
    if (isAuthenticated) {
      role === "ADMIN" ? redirect("/admin/dashboard") : redirect("/student");
    }
  }, [isAuthenticated]);
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);

    // TODO(backend): call /api/auth/login with JWT
    try {
      const res = await loginApi(
        loginCrediancial.email,
        loginCrediancial.password,
      );
      console.log(res);
      if (res.status === 200) {
        dispatch(
          setCredentials({
            user: res.data.profile,
            accessToken: res.data.token,
            role: res.data.role,
          }),
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setBusy(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginCrediancial({ ...loginCrediancial, [name]: value });
  };
  return (
    <div className="min-h-[calc(100vh-4rem)] grid lg:grid-cols-2">
      <div className="hidden lg:flex relative overflow-hidden gradient-hero p-12 text-white flex-col justify-between">
        <div>
          <Badge className="bg-white/15 text-white border-white/25">
            Welcome back
          </Badge>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight">
            Continue your learning journey with Study Centre.
          </h1>
          <p className="mt-4 text-white/85 max-w-md">
            Access your courses, attendance, marks, fees and certificates all in
            one place.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {["Certificates", "Attendance", "Marks"].map((f, i) => (
            <div
              key={f}
              className={`rounded-2xl p-4 ${i === 1 ? "bg-white/20" : "bg-white/10"} backdrop-blur border border-white/15`}
            >
              <div className="text-sm font-semibold">{f}</div>
              <div className="text-xs text-white/75 mt-1">Instant access</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center p-6">
        <Card className="w-full max-w-md shadow-elegant">
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-2 text-primary">
              <LogIn className="h-5 w-5" />
              <span className="text-sm font-semibold">Sign in</span>
            </div>
            <h2 className="font-display text-2xl font-bold">Welcome back</h2>
            <p className="text-sm text-muted-foreground">
              Select your account type.
            </p>

            <Tabs value={tab} onValueChange={setTab} className="mt-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="student">
                  <User className="h-4 w-4 mr-2" />
                  Student
                </TabsTrigger>
                <TabsTrigger value="admin">
                  <Shield className="h-4 w-4 mr-2" />
                  Admin
                </TabsTrigger>
              </TabsList>
              {["student", "admin"].map((role) => (
                <TabsContent key={role} value={role}>
                  <form onSubmit={onSubmit} className="mt-4 grid gap-4">
                    <div>
                      <Label htmlFor={`${role}-id`}>
                        {role === "admin"
                          ? "Admin ID"
                          : "Enrollment ID / Email"}
                      </Label>
                      <Input
                        id={`${role}-id`}
                        name="email"
                        value={loginCrediancial?.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor={`${role}-pw`}>Password</Label>
                      <Input
                        id={`${role}-pw`}
                        name="password"
                        type="password"
                        value={loginCrediancial?.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <label className="inline-flex items-center gap-2">
                        <input type="checkbox" /> Remember me
                      </label>
                      <a href="#" className="text-primary hover:underline">
                        Forgot password?
                      </a>
                    </div>
                    <Button
                      type="submit"
                      disabled={busy}
                      className="gradient-primary text-primary-foreground border-0 hover:opacity-90"
                    >
                      {busy ? "Signing In" : "Sign in"}
                    </Button>
                  </form>
                </TabsContent>
              ))}
            </Tabs>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              New here?{" "}
              <Link
                href="/register"
                className="text-primary font-medium hover:underline"
              >
                Register
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
