export default async function (req, context) {
  return new Response(context.body);
}
