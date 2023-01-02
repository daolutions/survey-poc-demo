import { json, error } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';
 
/** @type {import('./$types').RequestHandler} */
export async function POST({ request, url }) {
  const { survey_id } = await request.json();
  console.log('survey_id', survey_id);
  const { data: sectionData, error: sectionDataError } = await supabase
    .from('section')
    .insert(
      { survey_id: survey_id },
    )
    .select();
  if (sectionDataError) {
    console.log('sectionDataError', sectionDataError);
  }
  const { data: groupData, error: groupDataError } = await supabase
    .from('group')
    .insert(
      { section_id: sectionData?.[0].id, is_reference: false },
    )
    .select();
  if (groupDataError) {
    console.log('groupDataError', groupDataError);
  }



  return json(5);
}