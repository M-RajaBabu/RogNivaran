import React from 'react'

const PrivacyPolicy = () => {
  return (
    <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>
      <div className='text-center mb-10'>
        <h1 className='text-3xl md:text-4xl font-bold text-gray-800 mb-4'>Privacy Policy</h1>
        <p className='text-gray-600'>Last updated: {new Date().toLocaleDateString()}</p>
      </div>

      <div className='space-y-8 text-gray-700 leading-relaxed'>
        <section>
          <h2 className='text-2xl font-semibold text-gray-800 mb-4'>1. Information We Collect</h2>
          <p className='mb-3'>We collect information you provide directly to us, such as when you create an account, book appointments, or contact us for support.</p>
          <ul className='list-disc list-inside space-y-2 ml-4'>
            <li>Personal information (name, email, phone number)</li>
            <li>Health information relevant to appointments</li>
            <li>Appointment history and preferences</li>
            <li>Communication records with our support team</li>
          </ul>
        </section>

        <section>
          <h2 className='text-2xl font-semibold text-gray-800 mb-4'>2. How We Use Your Information</h2>
          <p className='mb-3'>We use the information we collect to:</p>
          <ul className='list-disc list-inside space-y-2 ml-4'>
            <li>Provide and maintain our appointment booking services</li>
            <li>Process and confirm your appointments</li>
            <li>Send you important updates about your appointments</li>
            <li>Improve our services and user experience</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className='text-2xl font-semibold text-gray-800 mb-4'>3. Information Sharing</h2>
          <p className='mb-3'>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:</p>
          <ul className='list-disc list-inside space-y-2 ml-4'>
            <li>With healthcare providers for appointment coordination</li>
            <li>To comply with legal requirements</li>
            <li>To protect our rights and safety</li>
            <li>With your explicit consent</li>
          </ul>
        </section>

        <section>
          <h2 className='text-2xl font-semibold text-gray-800 mb-4'>4. Data Security</h2>
          <p className='mb-3'>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
        </section>

        <section>
          <h2 className='text-2xl font-semibold text-gray-800 mb-4'>5. Your Rights</h2>
          <p className='mb-3'>You have the right to:</p>
          <ul className='list-disc list-inside space-y-2 ml-4'>
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of marketing communications</li>
            <li>Lodge a complaint with relevant authorities</li>
          </ul>
        </section>

        <section>
          <h2 className='text-2xl font-semibold text-gray-800 mb-4'>6. Contact Us</h2>
          <p className='mb-3'>If you have any questions about this Privacy Policy, please contact us at:</p>
          <div className='bg-gray-50 p-4 rounded-lg'>
            <p className='font-medium'>Email:</p>
            <p className='text-primary'>privacy@rognivaran.com</p>
            <p className='font-medium mt-2'>Phone:</p>
            <p>+91-XXXX-XXXXXX</p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default PrivacyPolicy 