//import '$lib/supabaseClient'
import { supabase } from '$lib/supabaseClient';


/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  const { data, error } = await supabase
    .from('survey')
    .select(`
      *,
      actual_revision (*)
    `)
  return {
    data
  };
}

/** @type {import('./$types').Actions} */
export const actions = {
  createSurvey: async (event) => {
    //console.log('default action', event);
    //console.log('default action', supabase);
    /* Deleting CASCADE in Supabase: 
      https://index.garden/a/supabase-cascade
    */
    const devRealmUUID = "2d2697a4-fe5d-4d0f-8b3e-47511da4296a"
    const { data: surveyData, error: surveyError } = await supabase
      .from('survey')
      .insert([
        { realm_id: devRealmUUID },
      ])
      .select();
    if (surveyError) {
      console.log('surveyError', surveyError);
    }
    console.log('survey id', surveyData?.[0].id)
    const { data: surveyRevisionData, error: surveyRevisionError } = await supabase
      .from('survey_revision')
      .insert([
        { survey_id: surveyData?.[0].id, version: 1 },
      ])
      .select();
    if (surveyRevisionError) {
      console.log('surveyRevisionError', surveyRevisionError);
    }
    console.log('survey_revision id', surveyRevisionData?.[0].id)
    const { data: surveyWithRevisionData, error: surveyWithRevisionError } = await supabase
      .from('survey')
      .update({ actual_revision: surveyRevisionData?.[0].id })
      .eq('id', surveyData?.[0].id)
      .select()
    if (surveyWithRevisionError) {
      console.log('surveyWithRevisionError', surveyWithRevisionError);
    }
    console.log('data', surveyWithRevisionData);
  },
  setName: async (event) => {
    const formData = await event.request.formData();
    const newName = formData.get('name');
    const surveyId = formData.get('id');
    console.log('path',event.url.pathname)
    console.log('formData', formData.get('name'))
    const { data: surveyData, error: surveyDataError } = await supabase
      .from('survey')
      .update({ name: newName })
      .eq('id', surveyId)
    if(surveyDataError) {
      console.log('surveyDataError', surveyDataError);
    }
  },
}
