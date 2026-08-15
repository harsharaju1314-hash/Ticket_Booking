import React, { useState } from 'react';
import { X, Lock, Mail, User, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (name: string) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('Harsha Varma');
  const [email, setEmail] = useState('harsha.varma@gmail.com');
  const [password, setPassword] = useState('••••••••');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess(name || 'Harsha Varma');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-white/95 rounded-3xl border border-slate-200/90 shadow-2xl overflow-hidden backdrop-blur-xl">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 px-6 py-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-[10px] font-black uppercase tracking-widest mb-3">
            <Sparkles className="w-3 h-3 text-rose-400" />
            BookMyConcert Access
          </div>

          <h3 className="font-display font-black text-2xl tracking-tight text-white">
            {isSignUp ? 'Create Your Account' : 'Welcome Back'}
          </h3>
          <p className="text-xs font-semibold text-slate-300 mt-1">
            {isSignUp
              ? 'Join 500,000+ music fans across India for instant stadium passes'
              : 'Sign in to manage your stadium passes & instant venue entry'}
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 font-bold outline-none transition-all"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-slate-50 border border-slate-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 font-bold outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-slate-50 border border-slate-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 font-bold outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 font-medium py-1">
            <span className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-black">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> 256-Bit Encrypted
            </span>
            {!isSignUp && (
              <a href="#" onClick={(e) => e.preventDefault()} className="text-[11px] font-bold text-rose-600 hover:underline">
                Forgot password?
              </a>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-rose-600 via-rose-500 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-black text-xs py-3 rounded-xl shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2 group transition-all cursor-pointer"
          >
            <span>{isSignUp ? 'Create Free Account' : 'Sign In to BookMyConcert'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-xs text-slate-500 hover:text-slate-900 font-bold"
            >
              {isSignUp ? (
                <>Already have an account? <span className="text-rose-600 font-black underline">Sign In</span></>
              ) : (
                <>Don't have an account? <span className="text-rose-600 font-black underline">Sign Up Free</span></>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
