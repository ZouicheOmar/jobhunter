'use server';

export const handleDebug = async () => {
  const url = 'http://jh-backend:8000/debug/net';
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
};
