// import { H3Event } from 'h3';

// // If the user does not exist on the request, throw a 401 error
// export default async (event: H3Event) => {
//   // console.log(
//   //   'protectRoute is being called here.',
//   //   event.context.user.email
//   // );
//   if (!event.context.user) {
//     throw createError({
//       statusCode: 401,
//       message: 'Unauthorized',
//     });
//   }

//   // Check to see if this user has access to this course
//   const hasAccess = await $fetch('/api/user/hasAccess', {
//     //@ts-ignore
//     headers: {
//       authorization: getHeader(event, 'authorization'),
//     },
//   });
//   console.log(
//     '(pR) email:',
//     event.context.user.email,
//     'hasAccess:',
//     hasAccess,
//     getHeader(event, 'authorization')
//   );
//   if (!hasAccess) {
//     throw createError({
//       statusCode: 401,
//       message: 'Unauthorized',
//     });
//   }
// };
