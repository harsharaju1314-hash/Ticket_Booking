import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { AutoSlider } from './components/AutoSlider';
import { EventGrid } from './components/EventGrid';
import { SeatPicker } from './components/SeatPicker';
import { DigitalPassModal } from './components/DigitalPassModal';
import type { Event, ReservationResponse } from './types';
import { Ticket } from 'lucide-react';

export default function App() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'explore' | 'tickets'>('explore');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [confirmedPass, setConfirmedPass] = useState<ReservationResponse | null>(null);
  const [userPasses, setUserPasses] = useState<ReservationResponse[]>([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch('/api/v1/events');
      if (res.ok) {
        const data = await res.json();
        setEvents(data);
      }
    } catch (err) {
      console.error('Failed to fetch live events:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookClick = (event: Event) => {
    setSelectedEvent(event);
  };

  const handleBookingSuccess = (pass: ReservationResponse) => {
    setConfirmedPass(pass);
    setUserPasses((prev) => [pass, ...prev]);
  };

  const filteredEvents = events.filter((evt) =>
    searchQuery === ''
      ? true
      : evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.venue.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const heroEvent = events.find((e) => e.title.includes('Diljit')) || events[0];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600 text-white px-6 py-2 text-xs flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse shadow-sm" />
          <span>
            <b>LIVE STADIUM DROP:</b> Diljit Dosanjh Dil-Luminati India Tour 2026 &bull; Limited Passes Left
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-4 font-semibold text-rose-100">
          <span>🌐 English (IN)</span>
          <span>📍 New Delhi • Mumbai • Bengaluru • Chennai • Goa</span>
        </div>
      </div>

      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'explore') setSelectedEvent(null);
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        passCount={userPasses.length}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-8 flex-1 w-full">
        {selectedEvent ? (
          /* Dedicated Booking View */
          <SeatPicker
            event={selectedEvent}
            onBack={() => setSelectedEvent(null)}
            onSuccess={handleBookingSuccess}
          />
        ) : activeTab === 'explore' ? (
          /* Main Catalog Landing View */
          <div className="flex flex-col gap-10">
            {loading ? (
              <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
                <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-sm font-semibold text-slate-500">Loading Live Concert Drops...</span>
              </div>
            ) : (
              <>
                {/* Hero Stadium Banner */}
                <HeroBanner event={heroEvent} onBookClick={handleBookClick} />

                {/* Automatic Side-by-Side Sliding Showcase */}
                <AutoSlider events={events} onBookClick={handleBookClick} />

                {/* Trending Events Grid */}
                <EventGrid events={filteredEvents} onBookClick={handleBookClick} />
              </>
            )}
          </div>
        ) : (
          /* My Reserved Passes Tab View */
          <div className="flex flex-col gap-6 max-w-4xl mx-auto py-4">
            <div>
              <h2 className="font-display font-extrabold text-3xl text-slate-900 flex items-center gap-2">
                <Ticket className="w-7 h-7 text-rose-600" />
                My Reserved Concert Passes
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Your active digital entry passes and venue QR verification codes
              </p>
            </div>

            {userPasses.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center flex flex-col items-center gap-4 shadow-sm">
                <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
                  <Ticket className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-lg text-slate-800">No Concert Passes Reserved Yet</h3>
                <p className="text-slate-500 text-xs max-w-sm">
                  Browse live stadium drops and reserve your entry passes with zero overselling protection.
                </p>
                <button
                  onClick={() => setActiveTab('explore')}
                  className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-500/20"
                >
                  Explore Concerts Now
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {userPasses.map((pass, index) => (
                  <div
                    key={index}
                    className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm hover:shadow-md transition-all"
                  >
                    <div>
                      <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded">
                        CONFIRMED PASS
                      </span>
                      <h3 className="font-extrabold text-lg text-slate-900 mt-1">
                        {pass.eventTitle || 'Diljit Dosanjh: Dil-Luminati Tour'}
                      </h3>
                      <p className="text-slate-500 text-xs mt-0.5">
                        {pass.userName} &bull; {pass.seatInfo || 'Fan Pit Standing'}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                      <div className="flex flex-col text-right">
                        <span className="text-[10px] text-slate-400 uppercase font-semibold">Ref Code</span>
                        <span className="font-mono font-bold text-sm text-rose-600">
                          {pass.bookingReference}
                        </span>
                      </div>
                      <button
                        onClick={() => setConfirmedPass(pass)}
                        className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all shadow-sm"
                      >
                        View QR E-Pass
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Digital QR Ticket Modal */}
      {confirmedPass && (
        <DigitalPassModal
          pass={confirmedPass}
          onClose={() => setConfirmedPass(null)}
        />
      )}
    </div>
  );
}
