import { json, error } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';
 
/** @type {import('./$types').RequestHandler} */
export async function POST({ request, url }) {
  const element = await request.json();
  console.log('element', element);
  const { data: elementData, error: elementDataError } = await supabase
    .from('element')
    .update(
      element
    )
    .eq('id', element.id)
    .select()
  if (elementDataError) {
    console.log('elementDataError', elementDataError);
  }
  return json(elementData[0]);
}