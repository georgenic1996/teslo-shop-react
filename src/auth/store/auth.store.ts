import type { User } from "@/interfaces/user.interface";
import { create } from "zustand";
import { loginAction } from "../actions/login.action";
import { checkAuthAction } from "../actions/check-auth.action";
import { registerAction } from "../actions/register.action";

type AuthStatus='authenticated' | 'not-authenticated' | 'checking'

type authState = {
  //Implementacion de Store
  user: User | null;
  token: string | null;
  authStatus:AuthStatus;

  //Getters
  isAdmin:()=> boolean;

  //Actions
  register:(email:string,password:string,fullName:string)=> Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout:() => void;
  checkAuthStatus:()=> Promise<boolean>;
};

export const useStore = await create<authState>()((set,get) => ({
  //Implementacion de Store
  user: null,
  token: null,
  authStatus:'checking',

  //Getters
    isAdmin:() => {
      const roles= get().user?.roles || [];
      return roles.includes('admin');
  },


  //Actions
    register: async (email: string, password: string,fullName:string) => {
    try {
      const data = await registerAction(email, password,fullName);
      localStorage.setItem("token", data.token);
      set({user: data.user ,token:data.token,authStatus: 'authenticated'});
   
      return true;
    } catch (error) {
      console.log(error)
        return false;
    }
    
  },
  login: async (email: string, password: string) => {
    try {
      const data = await loginAction(email, password);
      localStorage.setItem("token", data.token);
      set({user: data.user ,token:data.token, authStatus:'authenticated'});
   
      return true;
    } catch (error) {

        set({user: null ,token:null,authStatus:'not-authenticated'});
        localStorage.removeItem('token')
        return false;
    }
    
  },
    logout:()=>{
      localStorage.removeItem('token');
      set({user: null ,token:null,authStatus:'not-authenticated'});
    },

    checkAuthStatus:async ()=>{
        try {
          const {user,token}=await checkAuthAction();
          set({
            user:user,
            token:token,
            authStatus:'authenticated',
          })
          return true
        } catch (error) {
                    set({
            user:undefined,
            token:undefined,
            authStatus:'not-authenticated',
          })
          return false
        }
    }
}));
