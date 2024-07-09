import { ofetch } from 'ofetch';

export default async function (
  url: string,
  opts: any = {},
  version: number = 1
) {
  const { $auth } = useNuxtApp();
  const runtimeConfig = useRuntimeConfig();
  //@ts-ignore
  let idToken = await $auth.currentUser.getIdToken();
  let baseFetch = ofetch.create({
    baseURL: 'http://localhost:3000',
    headers: {
      Authorization: idToken,
    },
  });
  return baseFetch(url, opts);
}
