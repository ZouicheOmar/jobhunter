'use server';
import { LLMExtractApiRequest, LLMExtractApiResponse } from '@/types/LLMExtractApiReponse';
import { ROUTES } from '../consts';
import { ExtractDataFromDescriptionError } from '@/actions/errors';
import { NextResponse } from 'next/server';

export async function extractFromDesc(data: LLMExtractApiRequest): Promise<LLMExtractApiResponse> {
  try {
    const req = await fetch(ROUTES.LLM_EXTRACT.BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const d = await req.json();
    return d;
  } catch (e) {
    throw new ExtractDataFromDescriptionError('Could not data from the provided description', 407);
  }
}
