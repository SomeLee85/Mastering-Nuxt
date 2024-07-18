import { defineStore } from 'pinia';

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application

export const useUserStore: any = defineStore('user', {
  state: () => ({ isLoggedIn: false, user: null, paid: false }),
  // getters: {
  //   // automatically infers the return type as a number
  //   hasPaid(state) {
  //     //@ts-ignore
  //     console.log('🚀 ~ hasPaid ~ state?.user?.verified:', state?.user?.verified);
  //     // @ts-ignore
  //     return state?.user?.verified || false;
  //   },
  // },
});
