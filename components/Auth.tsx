
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';
import { ArrowLeft, ArrowRight, Mail, Lock, User as UserIcon, AlertCircle } from 'lucide-react';

interface Props {
  mode: 'login' | 'signup';
}

export const AuthPage: React.FC<Props> = ({ mode }) => {
  const { login, addUser, isRtl, state } = useAppContext();
  const navigate = useNavigate();
  const [activeMode, setActiveMode] = useState(mode);
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Simulate Network Request
    setTimeout(() => {
      let user: User | undefined;

      if (activeMode === 'signup') {
         // Prevent duplicate emails
         if (state.users.find(u => u.email === email)) {
            setError('Email already registered.');
            setLoading(false);
            return;
         }

         user = {
            id: 'user-' + Date.now(),
            name: name,
            email: email,
            role: 'visitor',
            joinedDate: new Date().toISOString(),
            avatar: `https://ui-avatars.com/api/?name=${name}&background=random`
         };
         addUser(user);
         login(user);
         setLoading(false);
         navigate('/profile');

      } else {
         // LOGIN LOGIC
         
         // 1. Check for Super Admin Credential
         if (email === 'hhhosts@gmail.com' && password === '123om123') {
            const adminUser = state.users.find(u => u.email === 'hhhosts@gmail.com') || {
                id: 'admin-super',
                name: 'Super Director',
                email: 'hhhosts@gmail.com',
                role: 'admin',
                avatar: 'https://ui-avatars.com/api/?name=Super+Admin&background=000&color=fff',
                joinedDate: '2023-01-01'
            };
            login(adminUser as User);
            setLoading(false);
            navigate('/profile'); // User can then switch to admin dashboard
            return;
         }

         // 2. Check for regular users
         const existingUser = state.users.find(u => u.email === email);
         
         if (existingUser) {
             // For standard users, we (in this mock) accept any password, 
             // BUT we must block the admin email from logging in with a wrong password
             if (email === 'hhhosts@gmail.com' && password !== '123om123') {
                 setError('Invalid credentials for Administrator.');
                 setLoading(false);
                 return;
             }

             login(existingUser);
             setLoading(false);
             navigate('/profile');
         } else {
             // 3. Fallback for demo purposes (create a temp visitor if not found in list, excluding admin email)
             if (email === 'hhhosts@gmail.com') {
                 setError('Invalid credentials.');
                 setLoading(false);
                 return;
             }

             const tempUser: User = {
                id: 'user-' + Date.now(),
                name: 'Visitor User',
                email: email,
                role: 'visitor',
                joinedDate: new Date().toISOString(),
                avatar: `https://ui-avatars.com/api/?name=Visitor&background=random`
             };
             login(tempUser);
             setLoading(false);
             navigate('/profile');
         }
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden bg-slate-900">
        <img 
          src="https://images.unsplash.com/photo-1549141098-b2a8d46db684?q=80&w=2000" 
          alt="Petra"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center px-16 text-white">
           <h1 className="text-5xl font-serif font-bold mb-6">Welcome to Jordan</h1>
           <p className="text-xl text-gray-200 max-w-md leading-relaxed">
             Join our community of travelers. Save your favorite sites, plan your trips, and get exclusive access to local guides.
           </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
         <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-xl">
            <div className="text-center mb-10">
               <h2 className="text-3xl font-bold text-gray-900 mb-2">
                 {activeMode === 'login' ? 'Welcome Back' : 'Create Account'}
               </h2>
               <p className="text-gray-500">
                 {activeMode === 'login' ? 'Please sign in to continue' : 'Start your journey with us today'}
               </p>
            </div>

            {error && (
               <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 flex items-center gap-2 text-sm font-bold">
                  <AlertCircle size={18} /> {error}
               </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
               {activeMode === 'signup' && (
                 <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                    <div className="relative">
                       <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                       <input 
                         type="text" 
                         required 
                         value={name}
                         onChange={(e) => setName(e.target.value)}
                         className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                         placeholder="John Doe"
                       />
                    </div>
                 </div>
               )}

               <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                  <div className="relative">
                     <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                     <input 
                       type="email" 
                       required 
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                       placeholder="you@example.com"
                     />
                  </div>
               </div>

               <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
                  <div className="relative">
                     <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                     <input 
                       type="password" 
                       required 
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                       placeholder="••••••••"
                     />
                  </div>
               </div>

               <button 
                 type="submit" 
                 disabled={loading}
                 className="w-full py-4 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex justify-center items-center gap-2"
                 style={{ backgroundColor: activeMode === 'login' ? '#0f172a' : '#c28675' }}
               >
                 {loading ? 'Processing...' : (activeMode === 'login' ? 'Sign In' : 'Create Account')}
                 {!loading && (isRtl ? <ArrowLeft size={18} /> : <ArrowRight size={18} />)}
               </button>
            </form>

            <div className="mt-8 text-center text-sm text-gray-500">
               {activeMode === 'login' ? "Don't have an account? " : "Already have an account? "}
               <button 
                 onClick={() => { setActiveMode(activeMode === 'login' ? 'signup' : 'login'); setError(null); }}
                 className="font-bold text-blue-600 hover:underline"
               >
                 {activeMode === 'login' ? 'Sign Up' : 'Log In'}
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};
