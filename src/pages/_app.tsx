import "../styles/globals.css";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "../context/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (router.pathname !== "/login" && router.pathname !== "/register" && !token && !localStorage.getItem("token")) {
      router.push("/login");
    }
  }, [token, router]);

  return <Component {...pageProps} />;
}

export default function AppWrapper(props: AppProps) {
  return (
    <AuthProvider>
      <MyApp {...props} />
    </AuthProvider>
  );
}
