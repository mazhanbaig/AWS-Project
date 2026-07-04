'use client';

import { useState } from 'react';
import Card from '@/components/Card';

const faqs = [
  {
    q: 'Why should I use this app?',
    a: 'Unicorns are faster, safer, and more reliable. In recent times, their numbers have grown significantly, reaching a scale that makes it finally possible to harness them for mass transportation at an affordable cost.',
  },
  {
    q: 'How do you recruit the unicorns? How can I know that my unicorn is trustworthy?',
    a: 'Our unicorns are recruited from only the most humane and highest standard unicorn farms. Our unicorns are grass-fed, free range creatures raised on vegan, non-GMO diets. These unicorns are also completely safe because unicorns have infallible morality and judgment.',
  },
  {
    q: 'How do I request a unicorn?',
    a: 'Simply download our app, then tap a button to begin. Your unicorn will arrive shortly.',
  },
  {
    q: 'How much does it cost?',
    a: 'Since Wild Rydes is a marketplace for flight-based transportation, the price you pay is based on factors such as distance and availability of unicorns. You set the maximum price you\'re willing to pay for a given ryde and then Wild Rydes matches you with a unicorn that\'s willing to accept your price.',
  },
  {
    q: 'How does it work?',
    a: 'Our product is powered by a complex algorithm which efficiently matches idle unicorns with ryders based on factors such as proximity and shortest time-to-destination. The system is built on a serverless architecture, which makes running and scaling our backend services simple and cost-effective, allowing us to reliably serve the needs of Wild Rydes\' ever growing user base.',
  },
  {
    q: 'What if I have a complaint about my unicorn?',
    a: 'Wild Rydes is a customer obsessed company. We value each customer and want to ensure a positive experience. Therefore, we\'ve staffed our customer service team with serverless chatbots that are available 24/7 to assist you.',
  },
  {
    q: 'How do I cancel my ride?',
    a: 'Tap the "Cancel Ryde" button in the Wild Rydes app.',
  },
  {
    q: 'Can I use Wild Rydes internationally?',
    a: 'Yes, you can use Wild Rydes in most countries except for Antarctica, Cuba, Sudan, Iran, North Korea, Syria and any other country designated by the United States Treasury\'s Office of Foreign Assets Control.',
  },
  {
    q: 'How do I pay for my ryde?',
    a: 'After creating a Wild Rydes account, fill in your payment method such as credit card, debit card, Bitcoin wallet, or Vespene gas repository. After you complete your Ryde, you will automatically be charged the fare.',
  },
  {
    q: 'How many passengers can my unicorn take?',
    a: 'The number of passengers on a single ryde depends on the size of your unicorn. Most unicorns can take one passenger per ryde. You can also request a large size unicorn which can take up to two passengers. If you select Sleigh version, you can take up to 4 passengers.',
  },
  {
    q: 'What if I lose an item during my ryde?',
    a: 'Unfortunately, it\'s unlikely we can retrieve your lost item if it has fallen off the unicorn during your ryde.',
  },
  {
    q: 'How do I share my route information with someone else?',
    a: 'During your ryde, you can share your route and ETA with someone else using the Wild Rydes app. Simply tap the "Share Route" button and select a contact. Soon, they\'ll be able to watch the status of your ryde.',
  },
  {
    q: 'How do I rate my unicorn?',
    a: 'After your ryde completes, you have the option to rate your unicorn on the app. Our unicorns are customer obsessed and strive for 5 star ratings. Your feedback helps us improve our service!',
  },
  {
    q: 'What if my unicorn doesn\'t match the photo in the app?',
    a: 'The unicorn photo in your app should match the unicorn that arrives to pick you up. If they do not match, then Wild Rydes recommends that you do not board the unicorn. You should then immediately report the imposter unicorn to Wild Rydes.',
  },
  {
    q: 'Can I use Concur with Wild Rydes?',
    a: 'Yes, you can connect your Concur profile to the Wild Rydes app so you can track business trips made on Wild Rydes.',
  },
  {
    q: 'Can I request a specific unicorn?',
    a: 'While we do not allow requesting specific unicorns, you can choose the type and size of unicorn using the app.',
  },
  {
    q: 'Why do you charge a service fee?',
    a: 'The service fee is a fixed charge added to every ryde. This helps us pay for our on-going maintenance and operating costs required to run the service and tend to our unicorn herd.',
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-surface-200 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left transition-colors hover:text-brand-600"
      >
        <span className="text-sm font-medium text-surface-900">{q}</span>
        <svg
          className={`w-4 h-4 shrink-0 text-surface-400 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="pb-5 animate-fade-in">
          <p className="text-sm text-surface-500 leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-surface-50 to-white py-20 md:py-28">
        <div className="container-wide text-center">
          <h1 className="section-heading mb-4">Frequently Asked Questions</h1>
          <p className="section-subheading mx-auto">
            Everything you need to know about Wild Rydes.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-wide">
          <Card className="max-w-3xl mx-auto divide-y divide-surface-200">
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </Card>
        </div>
      </section>
    </>
  );
}
