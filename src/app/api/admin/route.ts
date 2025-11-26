import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    try {
        const {username, password} = await req.json()

        const validUsername = process.env.ADMIN_USERNAME
        const validPassword = process.env.ADMIN_PASSWORD

        if (!validUsername || !validPassword) {
            return NextResponse.json({error: 'Admin credentials not configured'}, {status: 500})
        }

        if (username === validUsername && password === validPassword) {
            // Return the admin token that the existing API routes expect
            const token = process.env.ADMIN_TOKEN
            if (!token) {
                return NextResponse.json({error: 'Admin token not configured'}, {status: 500})
            }
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