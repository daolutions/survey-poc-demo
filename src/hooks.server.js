import '$lib/supabaseClient'
import { getServerSession } from '@supabase/auth-helpers-sveltekit'


export async function handle({ event, resolve }) {
  event.locals.session = await getServerSession(event);
  //console.log('event', event.locals);
  if(!event.locals.session && event.url.pathname != "/") {
    //console.log('redirecting', true);
    return Response.redirect(`${event.url.origin}/`,307)
  }
  const response = await resolve(event); 
  return response;
}