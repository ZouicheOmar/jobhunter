import { ScrapApiRespone } from '@/types';

export class ScrapJobOfferingError extends Error {
  constructor(message = 'Could not job offering page') {
    super(message);
    this.name = 'ScrapJobOfferingError';
    Object.setPrototypeOf(this, ScrapJobOfferingError.prototype);
  }
}

export async function scrapUrl(url: string): Promise<ScrapApiRespone> {
  console.log('call: scrapUrl');
  try {
    const req = await fetch('http://localhost:8001/scrap/job_posting', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: url,
      }),
    });
    const data = await req.json();
    console.log('==========JSON==========');
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
    throw new ScrapJobOfferingError();
  }
}
