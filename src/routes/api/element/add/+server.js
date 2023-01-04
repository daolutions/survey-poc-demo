import { json, error } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';
 
/** @type {import('./$types').RequestHandler} */
export async function POST({ request, url }) {
  const { group_id } = await request.json();
  console.log('group_id', group_id);
  const { data: elementData, error: elementDataError } = await supabase
    .from('element')
    .insert(
      { group_id: group_id },
    )
    .select();
  if (elementDataError) {
    console.log('elementDataError', elementDataError);
  }
  return json(true);
}