import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const req = await fetch('http://localhost:8000/candid', {
    headers: {
      Cookie: 'JSESSIONID=' + request.headers.get('x-jh-client-data'),
    },
  });

  if (req.ok) {
    const data = await req.json();
    return Response.json(data);
  } else {
    console.log('request from route handler not ok, status:', req.status);
  }
  return Response.json({ message: 'debugging' });
}
