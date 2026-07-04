import Card from '@/components/Card';

const investors = [
  {
    name: 'Penglai Communications and Post New Century Technology Corporation Ltd',
    subtitle: 'Global Communications Provider',
    description:
      'PCPNCTC was formed in 2008 to hold the telecommunications services, media, and IT businesses of Penglai Communications and Post LTD, a multinational mass media and telecommunications company. PCPL provides broadband subscription television services, fixed telephone, and mobile telephone across 20 countries and 3 continents.',
  },
  {
    name: 'Tenderloin Capital',
    subtitle: 'Venture Capital Firm',
    description:
      'What makes us awesome sauce and not your typical venture firm? Backed by over three decades of experience and partnering successfully with entrepreneurs, Tenderloin Capital was founded to serve the needs of early-stage founders. It\'s not just our experience that sets us apart; we relate to our entrepreneurs as people, not just as investments.',
  },
  {
    name: 'The Barn',
    subtitle: 'Accelerator',
    description:
      'The Barn is an institution for primarily incubating chicken eggs as well as the next revolutions in precision agriculture technology. The Barn created the industry defining model for funding sustainable, humane, non-GMO, and fairtrade early stage businesses in animal husbandry.',
  },
];

const boardMembers = [
  {
    name: 'Dr. Tim Wagner',
    role: 'Chairman of the Board, Grand Master of the Serverless Rite',
  },
  {
    name: 'Vaughn R. Nicholson',
    role: 'EIR at Awesome Sauce Capital',
  },
  {
    name: 'Conway Bulle',
    role: 'Partner at The Barn',
  },
  {
    name: 'Dr. Samantha Walleford, PhD',
    role: 'Managing Partner at Tenderloin Capital',
  },
  {
    name: 'Qilin Fei',
    role: 'Chairman of the Central Committee for Planning at PENGLAI COMMUNICATIONS AND POST NEW CENTURY TECHNOLOGY CORPORATION LTD',
  },
];

export default function InvestorsPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-surface-50 to-white py-20 md:py-28">
        <div className="container-wide text-center">
          <h1 className="section-heading mb-4">Backed By Top Decile Investors</h1>
          <p className="section-subheading mx-auto">
            We would not be anywhere without our trusted investors. We thank each of them
            for where we are today.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-wide">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {investors.map((investor) => (
              <Card key={investor.name} hover>
                <h2 className="text-lg font-semibold text-surface-900 mb-1">
                  {investor.name}
                </h2>
                <p className="text-sm font-medium text-brand-600 mb-4">
                  {investor.subtitle}
                </p>
                <p className="text-sm text-surface-500 leading-relaxed">
                  {investor.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-surface-50">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="section-heading mb-4">Our Board of Directors</h2>
            <p className="section-subheading mx-auto">
              Wild Rydes has a talented Board of Directors which advises the company on
              strategy and enabling business success.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {boardMembers.map((member) => (
              <Card key={member.name} hover>
                <h3 className="text-base font-semibold text-surface-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-surface-500 leading-relaxed">{member.role}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
