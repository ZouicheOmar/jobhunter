'use server';

export const jhDebug = async () => {
  console.log('============DEBUG=============');
  console.log(process.env.hostname);
  console.log('==============================');
};

export const handleDebug = async () => {
  const url = 'http://jh-backend:8080/debug/net';
  const res = await fetch(url);
  const data = await res.json();
  console.log('bsic debug', data);
};

export const handleService = async () => {
  const url = 'http://jh-backend:8080/debug';
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.log('problem..');
  }
};
