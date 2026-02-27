'use server';
import { LLMExtractApiRequest, LLMExtractApiResponse } from '@/types/LLMExtractApiReponse';
import { ROUTES } from '../consts';
import { fetchClient } from '@/actions';

export async function extractFromDesc(data: LLMExtractApiRequest): Promise<LLMExtractApiResponse> {
  try {
    const req = await fetch(ROUTES.LLM_EXTRACT.BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const json = await req.json();
    console.log('json', json);
    return json;
  } catch (e) {
    throw e;
  }
}
