import Link from 'next/link';
import Button from '@/components/Button';
import Card from '@/components/Card';

export default function ApplyPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-surface-50 to-white py-20 md:py-28">
        <div className="container-wide text-center">
          <h1 className="section-heading mb-4">Apply Today!</h1>
          <p className="section-subheading mx-auto">
            We&apos;re seeking a technical dream team who will help us build a future where
            every person has a unicorn to ryde.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <Card className="prose prose-surface max-w-none">
              <p className="text-surface-600 leading-relaxed">
                Wild Rydes is on the hunt for the most mythical creature of all: talented
                software engineers! From a technical standpoint, Wild Rydes believes in a future
                where there are no servers to provision, manage, or scale! Interested candidates
                can begin following the Serverless Way by exploring the following options:
              </p>
              <ul className="mt-4 space-y-2">
                <li>
                  Enter our{' '}
                  <a
                    href="http://awschatbot.devpost.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-600 hover:text-brand-700 font-medium"
                  >
                    hackathon
                  </a>
                </li>
                <li className="text-surface-600">Train in the art of serverless</li>
              </ul>

              <h2 className="text-xl font-semibold text-surface-900 mt-10 mb-4">
                The Serverless Manifesto
              </h2>
              <ul className="space-y-2">
                {[
                  'Functions are the unit of deployment and scaling.',
                  'No machines, VMs, or containers visible in the programming model.',
                  'Permanent storage lives elsewhere.',
                  'Scales per request. Users cannot over- or under-provision capacity.',
                  'Never pay for idle (no cold servers/containers or their costs).',
                  'Implicitly fault tolerant because functions can run anywhere.',
                  'BYOC — Bring your own code.',
                  'Metrics and logging are a universal right.',
                ].map((item, i) => (
                  <li key={i} className="text-surface-600 flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-10 pt-8 border-t border-surface-200 text-center">
                <Link href="http://awschatbot.devpost.com" target="_blank" rel="noopener noreferrer">
                  <Button>Join the Hackathon</Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
