import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const { email, name, collectorType, collectionSize } = await req.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const entry = await prisma.waitlistEntry.create({
      data: {
        email: email.toLowerCase().trim(),
        name: name || null,
        collectorType: collectorType || null,
        collectionSize: collectionSize || null,
      },
    })

    return NextResponse.json({ success: true, id: entry.id })
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string }
    if (err.code === 'P2002') {
      return NextResponse.json({ error: "You're already on the list!" }, { status: 409 })
    }
    console.error('Waitlist error:', error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
