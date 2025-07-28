import stripe from "stripe";
import razorpay from 'razorpay';

// Payment Gateway Configuration
let stripeInstance = null;
let razorpayInstance = null;

// Initialize Stripe
const initializeStripe = () => {
    try {
        if (!process.env.STRIPE_SECRET_KEY) {
            console.warn('⚠️  STRIPE_SECRET_KEY not found in environment variables');
            return null;
        }
        stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
        console.log('✅ Stripe initialized successfully');
        return stripeInstance;
    } catch (error) {
        console.error('❌ Error initializing Stripe:', error.message);
        return null;
    }
};

// Initialize Razorpay (Optional)
const initializeRazorpay = () => {
    try {
        // Only initialize if both credentials are provided
        if (!process.env.RAZORPAY_ID || !process.env.RAZORPAY_SECRET) {
            console.log('ℹ️  Razorpay not configured - skipping initialization');
            return null;
        }
        razorpayInstance = new razorpay({
            key_id: process.env.RAZORPAY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        });
        console.log('✅ Razorpay initialized successfully');
        return razorpayInstance;
    } catch (error) {
        console.error('❌ Error initializing Razorpay:', error.message);
        return null;
    }
};

// Get Stripe instance
const getStripeInstance = () => {
    if (!stripeInstance) {
        stripeInstance = initializeStripe();
    }
    return stripeInstance;
};

// Get Razorpay instance
const getRazorpayInstance = () => {
    if (!razorpayInstance) {
        razorpayInstance = initializeRazorpay();
    }
    return razorpayInstance;
};

// Check if payment gateways are configured
const isStripeConfigured = () => {
    return !!process.env.STRIPE_SECRET_KEY;
};

const isRazorpayConfigured = () => {
    return !!(process.env.RAZORPAY_ID && process.env.RAZORPAY_SECRET);
};

export {
    getStripeInstance,
    getRazorpayInstance,
    isStripeConfigured,
    isRazorpayConfigured,
    initializeStripe,
    initializeRazorpay
}; 