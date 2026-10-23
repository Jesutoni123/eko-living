function About() {
  return (
    <div>
      {/* Intro section with color */}
      <div className="bg-black text-white px-6 py-20 text-center">
        <p className="uppercase tracking-widest text-sm font-semibold mb-4 text-orange-300">
          About Us
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
          Lagos, Minus the Formal Stuff.
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto text-lg">
          EKO Living is for the picnic your friend is throwing, the beach day
          nobody made a flyer for, the poetry night you almost missed. Just
          real people, doing something together.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Why section */}
        <div className="mb-16">
          <span className="inline-block bg-orange-100 text-orange-600 text-xs font-bold uppercase px-3 py-1 rounded-full mb-4">
            Why We Exist
          </span>
          <h2 className="text-2xl font-bold mb-4">
            Lagos never runs out of things happening.
          </h2>
          <p className="text-gray-700 leading-relaxed">
            The problem was never a lack of events. It's that they're
            scattered everywhere and easy to miss. A friend's picnic gets
            buried in a group chat. A poetry night only reaches the people
            already following the right page. EKO Living exists so the
            things worth showing up for are actually easy to find.
          </p>
        </div>

        {/* How it works - card grid */}
        <div className="mb-16">
          <span className="inline-block bg-orange-100 text-orange-600 text-xs font-bold uppercase px-3 py-1 rounded-full mb-4">
            How It Works
          </span>
          <h2 className="text-2xl font-bold mb-8">Three steps. That's it.</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border rounded-xl p-6">
              <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold mb-4">
                1
              </div>
              <h3 className="font-bold mb-2">Browse</h3>
              <p className="text-gray-600 text-sm">
                No account needed. Explore events by category, Entertainment,
                Food, Nightlife, Arts, and Outdoor/Leisure.
              </p>
            </div>

            <div className="border rounded-xl p-6">
              <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold mb-4">
                2
              </div>
              <h3 className="font-bold mb-2">RSVP</h3>
              <p className="text-gray-600 text-sm">
                Found something you like? Hit RSVP and connect straight with
                the host on WhatsApp.
              </p>
            </div>

            <div className="border rounded-xl p-6">
              <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold mb-4">
                3
              </div>
              <h3 className="font-bold mb-2">Host</h3>
              <p className="text-gray-600 text-sm">
                Create a free account, add your event, and let Lagos find
                you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;