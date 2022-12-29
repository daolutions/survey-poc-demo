import { supabase } from '$lib/supabaseClient';


/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  const { data, error } = await supabase
    .from('survey_revision')
    .select(`
      *,
      survey!survey_actual_revision_fkey (*)
    `)
    .eq('id', params.slug)
  return {
    survey: data?.[0]
  };
}