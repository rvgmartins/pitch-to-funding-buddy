import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import kloserLogoFull from "@/assets/kloser-logo-full.png";
import kloserLogoIcon from "@/assets/kloser-logo-icon.png";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual authentication
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Branding */}
      <div className="hidden w-1/2 bg-sidebar lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="flex items-center gap-3">
          <img src={kloserLogoFull} alt="Kloser.ai" className="h-10" />
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold leading-tight text-sidebar-foreground">
            Connecting startups to the
            <span className="text-gold-gradient block">right investors</span>
          </h1>
          <p className="text-lg text-sidebar-muted">
            Upload your pitch and let our platform find 
            the ideal funding for your startup.
          </p>
          
          <div className="flex gap-8 pt-4">
            <div>
              <p className="text-3xl font-bold text-primary">500+</p>
              <p className="text-sm text-sidebar-muted">Startups</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">€50M+</p>
              <p className="text-sm text-sidebar-muted">Invested</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">200+</p>
              <p className="text-sm text-sidebar-muted">Investors</p>
            </div>
          </div>
        </div>

        <p className="text-sm text-sidebar-muted">
          © 2026 Kloser. All rights reserved.
        </p>
      </div>

      {/* Right side - Login Form */}
      <div className="flex w-full items-center justify-center px-6 lg:w-1/2">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile logo */}
          <div className="flex items-center justify-center gap-3 lg:hidden">
            <img src={kloserLogoIcon} alt="Kloser.ai" className="h-12" />
          </div>

          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight">Welcome back</h2>
            <p className="text-muted-foreground">
              Sign in to your account to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full btn-gold" size="lg">
              Sign In
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">or</span>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/register" className="font-medium text-primary hover:underline">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
