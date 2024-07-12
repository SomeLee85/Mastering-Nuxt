import { getUser } from './firebase-helper.mjs';
import { defineEventHandler } from 'h3';
var app;

//creates cookies for user to allow user to refresh page
//and still have access to the same route and database
export default defineEventHandler(async (event) => {
  // console.log('SS: Middleware called.');

  const userJWT = getHeader(event, 'authorization');

  // Errors with "invalid claim: missing sub claim"
  // See https://github.com/nuxt-modules/supabase/issues/238

  if (userJWT) {
    const user = await getUser(userJWT);

    if (user) {
      event.context.user = user;
    } else {
      throw createError({
        statusCode: 401,
        message: 'Unauthorized',
      });
    }
  } else {
    event.context.user = 'matt';
    //   throw createError({
    //     statusCode: 401,
    //     message: 'Unauthorized',
    //   });
  }
});
