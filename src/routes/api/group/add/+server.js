import { json, error } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';
 
/** @type {import('./$types').RequestHandler} */
export async function POST({ request, url }) {
  const { section_id } = await request.json();
  console.log('section_id', section_id);
  const { data: groupData, error: groupDataError } = await supabase
    .from('group')
    .insert(
      { section_id: section_id },
    )
    .select();
  if (groupDataError) {
    console.log('groupDataError', groupDataError);
  }
  return json(true);
}