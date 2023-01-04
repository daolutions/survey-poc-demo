import { supabase } from '$lib/supabaseClient';


/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  const { data, error } = await supabase
    .from('survey_revision')
    .select(`
      *,
      survey!survey_actual_revision_fkey (*),
      section (
        *,
        group (
          *,
          element (
            *
          )
        )
      )
    `)
    .eq('id', params.slug)
    .order('created_at', { foreignTable: 'section', ascending: true })
  console.log('error', error)
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
  },
  setSectionName: async ({request}) => {
    const formData = await request.formData();
    const newName = formData.get('name');
    const sectionId = formData.get('id');
    const { data: sectionData, error: sectionDataError } = await supabase
      .from('section')
      .update({ name: newName })
      .eq('id', sectionId)
    if(sectionDataError) {
      console.log('sectionDataError', sectionDataError);
    }
  },
  setGroupName: async ({request}) => {
    const formData = await request.formData();
    const newName = formData.get('name');
    const groupId = formData.get('id');
    const { data: groupData, error: groupDataError } = await supabase
      .from('group')
      .update({ name: newName })
      .eq('id', groupId)
    if(groupDataError) {
      console.log('groupDataError', groupDataError);
    }
  }


};