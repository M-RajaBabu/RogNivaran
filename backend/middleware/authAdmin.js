import jwt from "jsonwebtoken"

// admin authentication middleware
const authAdmin = async (req, res, next) => {
    try {
        const { aToken } = req.headers
        console.log('Admin auth - Token received:', aToken ? 'YES' : 'NO')
        
        if (!aToken) {
            console.log('Admin auth - No token provided')
            return res.json({ success: false, message: 'Not Authorized Login Again' })
        }
        
        // Verify the JWT token
        const token_decode = jwt.verify(aToken, process.env.JWT_SECRET)
        console.log('Admin auth - Token decoded:', token_decode)
        console.log('Admin auth - Expected value:', process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD)
        
        // Check if the decoded token matches the admin credentials
        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            console.log('Admin auth - Token verification failed')
            return res.json({ success: false, message: 'Not Authorized Login Again' })
        }
        
        console.log('Admin auth - Token verification successful')
        next()
    } catch (error) {
        console.log('Admin auth error:', error)
        res.json({ success: false, message: 'Invalid token. Please login again.' })
    }
}

export default authAdmin;