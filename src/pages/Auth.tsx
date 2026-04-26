import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "react-hot-toast";
import { Header } from "@/components/Header";
import { FooterNew } from "@/components/FooterNew";
import { Separator } from "@/components/ui/separator";
import lock from "@/assets/lock.jpg";


// Primary Green [#AAC832]
// Dark Green   [#468C1E]
const Auth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupFullName, setSignupFullName] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotOpen, setForgotOpen] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) navigate("/");
    };
    checkUser();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!loginEmail || !loginPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          toast.error("Invalid email or password");
        } else toast.error(error.message);
      } else {
        toast.success("Successfully logged in!");
        
        // Check if user has admin role
        const { data: roleData } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', data.user?.id)
          .eq('role', 'admin')
          .maybeSingle();
        
        if (roleData) {
          navigate("/admin");
        } else {
          navigate("/checkout");
        }
      }
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!signupEmail || !signupPassword || !signupFullName) {
      toast.error("Please fill in all fields");
      return;
    }

    if (signupPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: signupEmail,
        password: signupPassword,
        options: {
          data: { full_name: signupFullName },
          emailRedirectTo: `${window.location.origin}/`,
        },
      });

      if (error) {
        if (error.message.includes("already registered")) {
          toast.error("This email is already registered");
        } else toast.error(error.message);
      } else {
        toast.success("Account created successfully!");
        navigate("/");
      }
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };
   const handleForgotSubmit = async () => {
    if (!forgotEmail) {
      toast.error("Please enter your email");
      return;
    }
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail, {
        redirectTo: `${window.location.origin}/auth`,
      });
      if (error) toast.error(error.message);
      else toast.success("Password reset link sent!");
      setForgotOpen(false);
    } catch {
      toast.error("An unexpected error occurred");
    }
  };
  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth`,
        },
      });

      if (error) {
        toast.error(error.message);
      }
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setGoogleLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex flex-col bg-[#F8FBFF]">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md shadow-lg border border-[#6BB7FF]/30 rounded-2xl">
          <CardHeader>
            <div>
              <img
                src={lock}
                className="mx-auto flex justify-center items-center w-[40px]"
                alt="lock"
              />
            </div>
            <CardTitle className="text-2xl text-center text-[#468C1E] font-bold">
              Welcome
            </CardTitle>
            <CardDescription className="text-center text-black">
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader>
 <Button
                    type="button"
                    
                    className="w-full rounded-full py-8 flex items-center justify-center gap-2"
                    onClick={handleGoogleLogin}
                    disabled={googleLoading}
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#A0E4CB"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill=""
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    {googleLoading ? "Connecting..." : "Continue with Google"}
                  </Button>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-[#EAF4FF] rounded-full p-1">
                <TabsTrigger
                  value="login"
                  className=" text-xs data-[state=active]:bg-[#468C1E] data-[state=active]:text-white rounded-full transition-all duration-300"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-[#468C1E]  text-xs data-[state=active]:text-white rounded-full transition-all duration-300"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              {/* LOGIN TAB */}
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4 mt-4">
                  <div className="space-y-2 text-xs">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                    className="placeholder:text-xs"
                      id="login-email"
                      type="email"
                      placeholder="your email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      disabled={loading}
                      required
                    />
                  </div>
                  <div className="space-y-2 text-xs">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                    className="placeholder:text-xs"
                      id="login-password"
                      type="password"
                      placeholder="your current password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      disabled={loading}
                      required
                    />
                  </div>

                  {/* Solid sky Button */}
                  <Button
                    type="submit"
                    className=" flex mx-auto w-[60%] bg-[#468C1E] text-gray-200 hover:bg-[#AAC832] font-semibold 
                               shadow-md hover:shadow-lg transition-all text-xs duration-300 rounded-full py-2"
                    disabled={loading}
                  >
                    {loading ? "Signing in..." : "Sign In"}
                  </Button>
                  <button
                    type="button"
                    onClick={() => {
                      setForgotEmail(loginEmail);
                      setForgotOpen(true);
                    }}
                    className="text-[#468C1E] text-xs underline hover:text-[#005DFF] transition-colors"
                  >
                    Forgot Password?
                  </button>

            
                </form>
              </TabsContent>

              {/* SIGNUP TAB */}
              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4 mt-4">
                  <div className="space-y-2 text-xs ">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input
                    className="placeholder:text-xs"
                      id="signup-name"
                      type="text"
                      placeholder="Enter your Name"
                      value={signupFullName}
                      onChange={(e) => setSignupFullName(e.target.value)}
                      disabled={loading}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email text-xs">Email</Label>
                    <Input
                    className="placeholder:text-xs"
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      disabled={loading}
                      required
                    />
                  </div>
                  <div className="space-y-2 text-xs placeholder:text-xs ">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                    className="placeholder:text-xs"
                      id="signup-password"
                      type="password"
                      placeholder="Enter Password"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      disabled={loading}
                      required
                      minLength={6}
                    />
                  </div>

                  {/* Solid Sky Button */}
                  <Button
                    type="submit"
                    className=" flex mx-auto w-[60%] bg-[#468C1E] text-gray-200 hover:bg-[#AAC832]  font-semibold 
                               shadow-md hover:shadow-lg text-xs transition-all duration-300 rounded-full py-2"
                    disabled={loading}
                  >
                    {loading ? "Creating account..." : "Create Account"}
                  </Button>

                 
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          
        {/* Forgot Password Popover */}
          {forgotOpen && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-40">
              <div className="bg-white rounded-xl p-6 w-11/12 max-w-sm shadow-lg relative">
                <h3 className="text-lg font-semibold text-[#468C1E] mb-3">Reset Password</h3>
                <p className="text-xs text-gray-500 mb-4">
                  Enter your email to receive a password reset link
                </p>
                <Input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="mb-4 placeholder:text-xs"
                />
                <div className="flex justify-between gap-2">
                  <Button
                    onClick={handleForgotSubmit}
                    className="flex-1 bg-[#468C1E] text-white hover:bg-[#0B3F7F] text-xs rounded-full py-2"
                  >
                    Submit
                  </Button>
                  <Button
                    onClick={() => setForgotOpen(false)}
                    className="flex-1 bg-gray-200 text-gray-700 hover:bg-gray-300 text-xs rounded-full py-2"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Card>
      </main>
      <FooterNew />
    </div>
  );
};

export default Auth;


// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { supabase } from "@/integrations/supabase/client";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { toast } from "react-hot-toast";
// import { Header } from "@/components/Header";
// import { FooterNew } from "@/components/FooterNew";
// import lock from "@/assets/lock.jpg";

// const Auth = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [forgotOpen, setForgotOpen] = useState(false);
//   const [forgotEmail, setForgotEmail] = useState("");
//   const [loginEmail, setLoginEmail] = useState("");
//   const [loginPassword, setLoginPassword] = useState("");
//   const [signupEmail, setSignupEmail] = useState("");
//   const [signupPassword, setSignupPassword] = useState("");
//   const [signupFullName, setSignupFullName] = useState("");

//   useEffect(() => {
//     const checkUser = async () => {
//       const { data: { session } } = await supabase.auth.getSession();
//       if (session) navigate("/");
//     };
//     checkUser();
//   }, [navigate]);

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!loginEmail || !loginPassword) {
//       toast.error("Please fill in all fields");
//       return;
//     }
//     setLoading(true);
//     try {
//       const { data, error } = await supabase.auth.signInWithPassword({
//         email: loginEmail,
//         password: loginPassword,
//       });
//       if (error) toast.error(error.message);
//       else {
//         toast.success("Successfully logged in!");
//         navigate("/");
//       }
//     } catch {
//       toast.error("An unexpected error occurred");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSignup = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!signupEmail || !signupPassword || !signupFullName) {
//       toast.error("Please fill in all fields");
//       return;
//     }
//     if (signupPassword.length < 6) {
//       toast.error("Password must be at least 6 characters");
//       return;
//     }
//     setLoading(true);
//     try {
//       const { error } = await supabase.auth.signUp({
//         email: signupEmail,
//         password: signupPassword,
//         options: {
//           data: { full_name: signupFullName },
//           emailRedirectTo: `${window.location.origin}/`,
//         },
//       });
//       if (error) toast.error(error.message);
//       else {
//         toast.success("Account created successfully!");
//         navigate("/");
//       }
//     } catch {
//       toast.error("An unexpected error occurred");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleForgotSubmit = async () => {
//     if (!forgotEmail) {
//       toast.error("Please enter your email");
//       return;
//     }
//     try {
//       const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail, {
//         redirectTo: `${window.location.origin}/auth`,
//       });
//       if (error) toast.error(error.message);
//       else toast.success("Password reset link sent!");
//       setForgotOpen(false);
//     } catch {
//       toast.error("An unexpected error occurred");
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-white ">
//       <Header />
//       <main className="flex-1 flex items-center justify-center px-4 py-12">
//         <Card className="w-full max-w-md shadow-lg border border-[#468C1E]/30 rounded-2xl relative">
//           <CardHeader>
//             <div>
//               <img src={lock} className="mx-auto w-10" alt="lock" />
//             </div>
//             <CardTitle className="text-2xl text-center text-[#468C1E] font-bold">Welcome</CardTitle>
//             <CardDescription className="text-center text-gray-600 text-xs">
//               Sign in to your account or create a new one
//             </CardDescription>
//           </CardHeader>

//           <CardContent>
//             <Tabs defaultValue="login" className="w-full">
//               <TabsList className="grid w-full grid-cols-2 bg-white rounded-full p-1">
//                 <TabsTrigger
//                   value="login"
//                   className="text-xs data-[state=active]:bg-[#468C1E] data-[state=active]:text-white rounded-full transition-all duration-300"
//                 >
//                   Login
//                 </TabsTrigger>
//                 <TabsTrigger
//                   value="signup"
//                   className="text-xs data-[state=active]:bg-[#468C1E] data-[state=active]:text-white rounded-full transition-all duration-300"
//                 >
//                   Sign Up
//                 </TabsTrigger>
//               </TabsList>

//               {/* LOGIN TAB */}
//               <TabsContent value="login">
//                 <form onSubmit={handleLogin} className="space-y-3 mt-4">
//                   <div className="space-y-2 text-xs">
//                     <Label htmlFor="login-email">Email</Label>
//                     <Input
//                       id="login-email"
//                       type="email"
//                       placeholder="Enter your email"
//                       value={loginEmail}
//                       onChange={(e) => setLoginEmail(e.target.value)}
//                       disabled={loading}
//                       className="placeholder:text-xs"
//                       required
//                     />
//                   </div>
//                   <div className="space-y-2 text-xs">
//                     <Label htmlFor="login-password">Password</Label>
//                     <Input
//                       id="login-password"
//                       type="password"
//                       placeholder="Enter your password"
//                       value={loginPassword}
//                       onChange={(e) => setLoginPassword(e.target.value)}
//                       disabled={loading}
//                       className="placeholder:text-xs"
//                       required
//                     />
//                   </div>

//                   <Button
//                     type="submit"
//                     className="w-full bg-[#468C1E] text-white hover:bg-[#0B3F7F] font-semibold rounded-full py-2 text-xs shadow-md hover:shadow-lg transition-all"
//                     disabled={loading}
//                   >
//                     {loading ? "Signing in..." : "Sign In"}
//                   </Button>

//                   <button
//                     type="button"
//                     onClick={() => {
//                       setForgotEmail(loginEmail);
//                       setForgotOpen(true);
//                     }}
//                     className="text-[#468C1E] text-xs underline hover:text-[#005DFF] transition-colors"
//                   >
//                     Forgot Password?
//                   </button>
//                 </form>
//               </TabsContent>

//               {/* SIGNUP TAB */}
//               <TabsContent value="signup">
//                 <form onSubmit={handleSignup} className="space-y-3 mt-4">
//                   <div className="space-y-2 text-xs">
//                     <Label htmlFor="signup-name">Full Name</Label>
//                     <Input
//                       id="signup-name"
//                       type="text"
//                       placeholder="Enter your full name"
//                       value={signupFullName}
//                       onChange={(e) => setSignupFullName(e.target.value)}
//                       disabled={loading}
//                       className="placeholder:text-xs"
//                       required
//                     />
//                   </div>
//                   <div className="space-y-2 text-xs">
//                     <Label htmlFor="signup-email">Email</Label>
//                     <Input
//                       id="signup-email"
//                       type="email"
//                       placeholder="Enter your email"
//                       value={signupEmail}
//                       onChange={(e) => setSignupEmail(e.target.value)}
//                       disabled={loading}
//                       className="placeholder:text-xs"
//                       required
//                     />
//                   </div>
//                   <div className="space-y-2 text-xs">
//                     <Label htmlFor="signup-password">Password</Label>
//                     <Input
//                       id="signup-password"
//                       type="password"
//                       placeholder="Enter your password"
//                       value={signupPassword}
//                       onChange={(e) => setSignupPassword(e.target.value)}
//                       disabled={loading}
//                       className="placeholder:text-xs"
//                       minLength={6}
//                       required
//                     />
//                   </div>

//                   <Button
//                     type="submit"
//                     className="w-full bg-[#468C1E] text-white hover:bg-[#0B3F7F] font-semibold rounded-full py-2 text-xs shadow-md hover:shadow-lg transition-all"
//                     disabled={loading}
//                   >
//                     {loading ? "Creating account..." : "Create Account"}
//                   </Button>
//                 </form>
//               </TabsContent>
//             </Tabs>
//           </CardContent>

//           {/* Forgot Password Popover */}
//           {forgotOpen && (
//             <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
//               <div className="bg-white rounded-xl p-6 w-11/12 max-w-sm shadow-lg relative">
//                 <h3 className="text-lg font-semibold text-[#468C1E] mb-3">Reset Password</h3>
//                 <p className="text-xs text-gray-500 mb-4">
//                   Enter your email to receive a password reset link
//                 </p>
//                 <Input
//                   type="email"
//                   value={forgotEmail}
//                   onChange={(e) => setForgotEmail(e.target.value)}
//                   placeholder="Enter your email"
//                   className="mb-4 placeholder:text-xs"
//                 />
//                 <div className="flex justify-between gap-2">
//                   <Button
//                     onClick={handleForgotSubmit}
//                     className="flex-1 bg-[#468C1E] text-white hover:bg-[#0B3F7F] text-xs rounded-full py-2"
//                   >
//                     Submit
//                   </Button>
//                   <Button
//                     onClick={() => setForgotOpen(false)}
//                     className="flex-1 bg-gray-200 text-gray-700 hover:bg-gray-300 text-xs rounded-full py-2"
//                   >
//                     Cancel
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </Card>
//       </main>
//       <FooterNew />
//     </div>
//   );
// };

// export default Auth;
