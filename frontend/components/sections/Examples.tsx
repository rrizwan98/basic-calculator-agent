import { Card } from '@/components/ui/Card';

const examples = [
  {
    category: 'Addition',
    icon: '➕',
    queries: [
      { question: 'What is 25 + 17?', answer: '42' },
      { question: 'Add 100 and 250', answer: '350' },
      { question: 'Sum of 5 and 5', answer: '10' },
    ],
  },
  {
    category: 'Subtraction',
    icon: '➖',
    queries: [
      { question: 'What is 100 minus 45?', answer: '55' },
      { question: 'Subtract 30 from 80', answer: '50' },
      { question: 'Take away 15 from 50', answer: '35' },
    ],
  },
  {
    category: 'Multiplication',
    icon: '✖️',
    queries: [
      { question: 'Multiply 7 by 8', answer: '56' },
      { question: 'What is 12 times 5?', answer: '60' },
      { question: '3 multiplied by 15', answer: '45' },
    ],
  },
  {
    category: 'Division',
    icon: '➗',
    queries: [
      { question: 'Divide 150 by 3', answer: '50' },
      { question: 'What is 100 divided by 4?', answer: '25' },
      { question: '80 split by 8', answer: '10' },
    ],
  },
];

export function Examples() {
  return (
    <section id="examples" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Example Queries
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See how you can phrase your calculations naturally
          </p>
        </div>

        {/* Examples Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {examples.map((category, index) => (
            <Card key={index} className="hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">{category.icon}</span>
                <h3 className="text-2xl font-semibold text-gray-900">
                  {category.category}
                </h3>
              </div>
              
              <div className="space-y-3">
                {category.queries.map((query, qIndex) => (
                  <div key={qIndex} className="bg-gray-50 rounded-lg p-3">
                    <p className="text-gray-700 italic mb-1">"{query.question}"</p>
                    <p className="text-blue-600 font-semibold">→ {query.answer}</p>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-lg text-gray-600 mb-6">
            Ready to try it yourself? Click the chat button below!
          </p>
          <div className="flex justify-center">
            <div className="animate-bounce text-4xl">👇</div>
          </div>
        </div>
      </div>
    </section>
  );
}
