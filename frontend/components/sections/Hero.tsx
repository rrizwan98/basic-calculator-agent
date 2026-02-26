'use client';

import { Button } from '@/components/ui/Button';

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-8">
            🚀 AI-Powered Natural Language Calculator
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
            Calculate Anything in
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              {' '}Plain English
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
            No complex formulas needed. Just ask and get instant results with our AI-powered calculator agent.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" onClick={() => document.getElementById('chatkit-button')?.click()}>
              Try It Now - It's Free
            </Button>
            <Button variant="outline" size="lg" onClick={() => document.getElementById('examples')?.scrollIntoView({ behavior: 'smooth' })}>
              See Examples
            </Button>
          </div>

          {/* Example Queries */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              '"What is 25 + 17?"',
              '"Calculate 100 minus 45"',
              '"Multiply 7 by 8"'
            ].map((example, i) => (
              <div key={i} className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
                <p className="text-gray-700 italic">{example}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
