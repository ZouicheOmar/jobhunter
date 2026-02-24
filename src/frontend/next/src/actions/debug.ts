'use server';

export const jhDebug = async () => {
  console.log('============DEBUG=============');
  console.log(process.env.hostname);
  console.log('==============================');
};
