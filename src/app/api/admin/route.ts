import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    try {
        const {username, password} = await req.json()

        const validUsername = process.env.ADMIN_USERNAME || 'admin'
        const validPassword = process.env.ADMIN_PASSWORD || ''

        if (username === validUsername && password === validPassword) {
            // Return the admin token that the existing API routes expect
            const token = process.env.ADMIN_TOKEN || ''
            return NextResponse.json({token, success: true})
        } else {
            return NextResponse.json({error: 'Invalid credentials'}, {status: 401})
        }
    } catch (e) {
        const error = e as { message?: string }
        console.error(e)
        return NextResponse.json({error: error?.message || 'Server error'}, {status: 500})
    }
}