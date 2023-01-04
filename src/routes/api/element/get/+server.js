import { json, error } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';
 
/** @type {import('./$types').RequestHandler} */
export async function POST({ request, url }) {
  const { id } = await request.json();
  console.log('element id', id);
  const { data: elementData, error: elementDataError } = await supabase
    .from('element')
    .select()
    .eq('id', id)
    .limit(1)
    .maybeSingle();
  if (elementDataError) {
    console.log('elementDataError', elementDataError);
  } else {
    console.log('elementData', elementData);
  }
  return json(elementData);
}