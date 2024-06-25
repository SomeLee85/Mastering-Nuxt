import { useRoute } from 'vue-router';
import { getUser } from '../api/utils/firebase-helper';

var app: any = null;

//creates cookies for user to allow user to refresh page
//and still have access to the same route and database
export default defineEventHandler(async (event) => {
  console.log('SS: Middleware called.');
  // @ts-ignore
  const userJWT = getHeader(event, 'authorization');
  // const routeParams = getRequestURL(event);
  // console.log(
  //   '🚀 ~ defineEventHandler ~ route:',
  //   routeParams.href
  // );

  // const session = getHeaders(event);
  // console.log(
  //   '🚀 ~ defineEventHandler ~ session:',
  //   event.context.params
  // );
  // console.log(
  //   '🚀 ~ defineEventHandler ~ userJWT:',
  //   userJWT
  // );

  // Errors with "invalid claim: missing sub claim"
  // See https://github.com/nuxt-modules/supabase/issues/238
  if (userJWT) {
    const user = await getUser(userJWT);

    if (user) {
      event.context.user = user;
      // } else {
      //   throw createError({
      //     statusCode: 401,
      //     message: 'Unauthorized',
      //   });
      // }
      // } else {
      //   throw createError({
      //     statusCode: 401,
      //     message: 'Unauthorized',
      //   });
    }
  }
});
