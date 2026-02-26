import { Card } from '@/components/ui/Card';

const features = [
  {
    icon: '🗣️',
    title: 'Natural Language',
    description: 'Type calculations in plain English - no need to remember complex formulas or syntax.',
  },
  {
    icon: '⚡',
    title: 'Instant Results',
    description: 'Get immediate, accurate results powered by OpenAI\'s advanced AI technology.',
  },
  {
    icon: '🎯',
    title: '4 Basic Operations',
    description: 'Supports addition, subtraction, multiplication, and division with perfect accuracy.',
  },
  {
    icon: '💬',
    title: 'Conversational',
    description: 'Chat naturally with the AI - it understands context and various phrasings.',
  },
  {
    icon: '📊',
    title: 'Structured Output',
    description: 'See detailed breakdowns of your calculations with operation details.',
  },
  {
    icon: '🔒',
    title: 'Secure & Private',
    description: 'Your calculations are processed securely and not stored permanently.',
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need for natural language calculations
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
