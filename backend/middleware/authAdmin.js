import jwt from "jsonwebtoken"

// admin authentication middleware
const authAdmin = async (req, res, next) => {
    try {
        const { aToken } = req.headers
        if (!aToken) {
            return res.json({ success: false, message: 'Not Authorized Login Again' })
        }
        
        // Verify the JWT token
        const token_decode = jwt.verify(aToken, process.env.JWT_SECRET)
        
        // Check if the decoded token matches the admin credentials
        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({ success: false, message: 'Not Authorized Login Again' })
        }
        
        next()
    } catch (error) {
        console.log('Admin auth error:', error)
        res.json({ success: false, message: 'Invalid token. Please login again.' })
    }
}

export default authAdmin;