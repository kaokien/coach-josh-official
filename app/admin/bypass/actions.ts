'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function verifyBypassKey(prevState: any, formData: FormData) {
  const key = formData.get('key') as string
  const adminKey = process.env.ADMIN_ACCESS_KEY

  if (!adminKey) {
    return { error: 'Admin key not configured on server' }
  }

  if (key === adminKey) {
    const cookieStore = await cookies()
    cookieStore.set('admin_bypass_access', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    })
    return { success: true }
  }

  return { error: 'Invalid access key' }
}

export async function checkBypassStatus() {
  const cookieStore = await cookies()
  const bypassCookie = cookieStore.get('admin_bypass_access')
  return bypassCookie?.value === 'true'
}
