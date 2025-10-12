import { cookies } from 'next/headers';

export async function getServerToken(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    return token || null;
  } catch (error) {
    console.error('Error getting token from cookies:', error);
    return null;
  }
}
