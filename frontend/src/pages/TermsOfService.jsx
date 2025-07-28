import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const TermsOfService = () => {
  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <div className='bg-white shadow-sm border-b'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
          <div className='flex items-center justify-between'>
            <NavLink to='/' className='flex items-center'>
              <img 
                src={assets.logo} 
                alt="RogNivaran" 
                className='h-12 w-auto object-contain'
              />
            </NavLink>
            <NavLink 
              to='/' 
              className='text-gray-600 hover:text-primary transition-colors'
            >
              ← Back to Home
            </NavLink>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='bg-white rounded-lg shadow-sm p-6 sm:p-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-8'>Terms of Service</h1>
          
          <div className='space-y-6 text-gray-700'>
            <section>
              <h2 className='text-xl font-semibold text-gray-900 mb-4'>1. Acceptance of Terms</h2>
              <p className='mb-4'>
                By accessing and using RogNivaran.com ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className='text-xl font-semibold text-gray-900 mb-4'>2. Description of Service</h2>
              <p className='mb-4'>
                RogNivaran is a healthcare platform that facilitates doctor appointment bookings for patients in India. Our service connects patients with qualified healthcare professionals for consultation and treatment.
              </p>
            </section>

            <section>
              <h2 className='text-xl font-semibold text-gray-900 mb-4'>3. User Responsibilities</h2>
              <ul className='list-disc pl-6 space-y-2'>
                <li>Provide accurate and complete information during registration and booking</li>
                <li>Maintain the confidentiality of your account credentials</li>
                <li>Use the service only for lawful purposes</li>
                <li>Respect the privacy and rights of other users</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
              </ul>
            </section>

            <section>
              <h2 className='text-xl font-semibold text-gray-900 mb-4'>4. Medical Disclaimer</h2>
              <p className='mb-4'>
                RogNivaran is a booking platform and does not provide medical advice, diagnosis, or treatment. The information provided on this platform is for general informational purposes only. Always consult with qualified healthcare professionals for medical advice.
              </p>
            </section>

            <section>
              <h2 className='text-xl font-semibold text-gray-900 mb-4'>5. Payment Terms</h2>
              <ul className='list-disc pl-6 space-y-2'>
                <li>All payments are processed securely through authorized payment gateways</li>
                <li>Appointment fees are non-refundable unless cancelled 24 hours in advance</li>
                <li>We reserve the right to modify pricing at any time with prior notice</li>
                <li>Payment disputes should be reported within 7 days of transaction</li>
              </ul>
            </section>

            <section>
              <h2 className='text-xl font-semibold text-gray-900 mb-4'>6. Privacy and Data Protection</h2>
              <p className='mb-4'>
                We are committed to protecting your privacy. Your personal and medical information is collected, used, and protected in accordance with our Privacy Policy and applicable data protection laws in India.
              </p>
            </section>

            <section>
              <h2 className='text-xl font-semibold text-gray-900 mb-4'>7. Cancellation and Refund Policy</h2>
              <ul className='list-disc pl-6 space-y-2'>
                <li>Cancellations made 24 hours before appointment: Full refund</li>
                <li>Cancellations made 12-24 hours before appointment: 50% refund</li>
                <li>Cancellations made less than 12 hours before appointment: No refund</li>
                <li>No-shows: No refund will be provided</li>
              </ul>
            </section>

            <section>
              <h2 className='text-xl font-semibold text-gray-900 mb-4'>8. Prohibited Activities</h2>
              <ul className='list-disc pl-6 space-y-2'>
                <li>Creating fake accounts or providing false information</li>
                <li>Attempting to access unauthorized areas of the platform</li>
                <li>Interfering with the proper functioning of the service</li>
                <li>Harassing or threatening other users or healthcare professionals</li>
                <li>Using the service for any illegal or unauthorized purpose</li>
              </ul>
            </section>

            <section>
              <h2 className='text-xl font-semibold text-gray-900 mb-4'>9. Limitation of Liability</h2>
              <p className='mb-4'>
                RogNivaran shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service. Our total liability shall not exceed the amount paid by you for the specific service in question.
              </p>
            </section>

            <section>
              <h2 className='text-xl font-semibold text-gray-900 mb-4'>10. Termination</h2>
              <p className='mb-4'>
                We may terminate or suspend your account and access to the service at any time, with or without cause, with or without notice. You may terminate your account at any time by contacting our support team.
              </p>
            </section>

            <section>
              <h2 className='text-xl font-semibold text-gray-900 mb-4'>11. Changes to Terms</h2>
              <p className='mb-4'>
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of the service constitutes acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className='text-xl font-semibold text-gray-900 mb-4'>12. Governing Law</h2>
              <p className='mb-4'>
                These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of courts in India.
              </p>
            </section>

            <section>
              <h2 className='text-xl font-semibold text-gray-900 mb-4'>13. Contact Information</h2>
              <p className='mb-4'>
                For questions about these Terms of Service, please contact us at:
              </p>
              <div className='bg-gray-50 p-4 rounded-lg'>
                <p className='font-medium'>RogNivaran Support</p>
                <p>Email: support@rognivaran.com</p>
                <p>Phone: +91-XXXX-XXXXXX</p>
                <p>Address: India</p>
              </div>
            </section>

            <div className='border-t pt-6 mt-8'>
              <p className='text-sm text-gray-500'>
                <strong>Last Updated:</strong> January 2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TermsOfService 