import { ScrapApiRespone } from '@/types';
import { ROUTES } from '../consts';

export async function scrapUrl(url: string): Promise<ScrapApiRespone> {
  console.log('calling scrap url');
  console.log('CALL SCRAP URL WITH URL', url);
  // handle connection refused..
  try {
    // const req = await fetch(ROUTES.SCRAPPER.JOB_POSTING, {
    const req = await fetch('http://localhost:8001/scrap/job_posting', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: url,
      }),
    });
    const json = await req.json();
    let data = json;
    if (Array.isArray(data['jobLocation'])) data['jobLocation'] = data['jobLocation'][0];
    console.log('====================DATA FROM SCRAP====================');
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
}
