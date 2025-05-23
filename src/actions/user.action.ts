'use server'

import { stackServerApp } from '@/stack';
import { neon } from '@neondatabase/serverless'

export async function getUserDetails(userId: string | undefined) {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined');
  }

  if(!userId) {
    return null;
  }

  const sql = neon(process.env.DATABASE_URL!);
  const [user] = await sql`SELECT * FROM neon_auth.users_sync WHERE id = ${userId}`;
  return user;
}

//user id : 
export async function getUserId() {
  const user = await stackServerApp.getUser();
  const userId = user?.id;

  if (!userId) return;

  return userId;
}