const steps = [
  {
    number: '1',
    title: 'Click the Chat Button',
    description: 'Find the blue chat button in the bottom-right corner of your screen.',
    icon: '💬',
  },
  {
    number: '2',
    title: 'Type Your Question',
    description: 'Ask your calculation in plain English - like "What is 25 plus 17?"',
    icon: '⌨️',
  },
  {
    number: '3',
    title: 'Get Instant Answer',
    description: 'Our AI agent processes your request and provides the result immediately.',
    icon: '✨',
  },
  {
    number: '4',
    title: 'Continue the Conversation',
    description: 'Ask follow-up questions or start new calculations - it\'s that simple!',
    icon: '🔄',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get started in just 4 simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line (hidden on mobile and last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-blue-200" />
              )}
              
              <div className="relative bg-white rounded-xl p-6 shadow-lg text-center">
                {/* Step Number */}
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.number}
                </div>
                
                {/* Icon */}
                <div className="text-4xl mb-4">{step.icon}</div>
                
                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 text-sm">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
