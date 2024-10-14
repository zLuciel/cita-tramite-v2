"use client"
import withAuth from "@/auth/withAuth";
import { Login } from "@/components/login/Login";
 const Home = ()=> {
  return (
    <main className="login-page">
      <div className=" h-screen container mx-auto px-4 flex items-center justify-center">
      <Login />
      </div>
    </main>
  );
}

export default Home 