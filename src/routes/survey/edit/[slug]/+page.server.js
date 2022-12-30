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

export const actions = {
  setName: async (event) => {
    const formData = await event.request.formData();
    const path = event.url.pathname;
    const surveyRevisionId = path.split('/')[3];
    const newName = formData.get('name');
    console.log('path',event.url.pathname)
    console.log('formData', formData.get('name'))
    const { data: surveyData, error: surveyDataError } = await supabase
      .from('survey')
      .update({ name: newName })
      .eq('actual_revision', surveyRevisionId)
    if(surveyDataError) {
      console.log('surveyDataError', surveyDataError);
    }
  },
  setVersion: async ({request}) => {
    const data = await request.formData();
    console.log(data)
  }
};