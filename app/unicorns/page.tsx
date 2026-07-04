import Image from 'next/image';

const unicorns = [
  {
    name: 'Bucephalus',
    breed: 'Golden Swiss',
    image: '/images/wr-unicorn-one.png',
    description:
      'Bucephalus joined Wild Rydes in February 2016 and has been giving rydes almost daily. He says he most enjoys getting to know each of his ryders, which makes the job more interesting for him. In his spare time, Bucephalus enjoys watching sunsets and playing Pokemon Go.',
    reverse: false,
  },
  {
    name: 'Shadowfox',
    breed: 'Brown Jersey',
    image: '/images/wr-unicorn-two.png',
    description:
      'Shadowfox joined Wild Rydes after completing a distinguished career in the military, where he toured the world in many critical missions. Shadowfox enjoys impressing his ryders with magic tricks that he learned from his previous owner.',
    reverse: true,
  },
  {
    name: 'Rocinante',
    breed: 'Baby Flying Yellowback',
    image: '/images/wr-unicorn-three.png',
    description:
      'Rocinante recently joined the Wild Rydes team in Madrid, Spain. She was instrumental in forming Wild Rydes\' Spanish operations after a long, distinguished acting career in windmill shadow-jousting.',
    reverse: false,
  },
];

export default function UnicornsPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-surface-50 to-white py-20 md:py-28">
        <div className="container-wide text-center">
          <h1 className="section-heading mb-4">Unicorns Are Our Friends</h1>
          <p className="section-subheading mx-auto">
            The app is what makes this service exist, but the unicorns make it move.
            Meet them and see who you are riding with!
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto mb-16">
            <p className="text-surface-600 leading-relaxed mb-4">
              Wild Rydes has a dedicated staff that recruits, trains, and tends to our herd
              of unicorns. We take great pride in the quality of unicorns and rydes that we
              provide to our customers, and our staff exercises the utmost care in vetting the
              unicorns that join our herd.
            </p>
            <p className="text-surface-600 leading-relaxed mb-4">
              Every unicorn goes through a rigorous due diligence process where we perform
              background checks, flying exams, and several rounds of interviews. Unicorns
              accepted to Wild Rydes are then treated to the best care and maintenance possible.
            </p>
            <p className="text-surface-500">
              Meet a few of the unicorns that are part of our family.
            </p>
          </div>

          <div className="space-y-20">
            {unicorns.map((unicorn) => (
              <div
                key={unicorn.name}
                className={`flex flex-col ${
                  unicorn.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'
                } items-center gap-8 lg:gap-16`}
              >
                <div className="w-full lg:w-1/2">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-surface-100">
                    <Image
                      src={unicorn.image}
                      alt={unicorn.name}
                      fill
                      className="object-contain p-8"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>

                <div className="w-full lg:w-1/2">
                  <h2 className="text-2xl md:text-3xl font-semibold text-surface-900 mb-1">
                    {unicorn.name}
                  </h2>
                  <p className="text-brand-600 font-medium text-sm mb-4">{unicorn.breed}</p>
                  <p className="text-surface-600 leading-relaxed">{unicorn.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
