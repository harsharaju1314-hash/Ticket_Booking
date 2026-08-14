import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react';
import type { Event, TicketCategory, ReservationResponse } from '../types';

interface SeatPickerProps {
  event: Event;
  onBack: () => void;
  onSuccess: (res: ReservationResponse) => void;
}

export const SeatPicker: React.FC<SeatPickerProps> = ({ event, onBack, onSuccess }) => {
  const categories = event.ticketCategories || [];
  const [selectedCat, setSelectedCat] = useState<TicketCategory>(categories[0] || {
    id: 1,
    eventId: event.id,
    name: 'Fan Pit Standing',
    price: 9999,
    totalCapacity: 5000,
    availableStock: 5000,
  });

  const [selectedSeatIndex, setSelectedSeatIndex] = useState<number>(14);
  const [buyerName, setBuyerName] = useState<string>('Harsha Varma');
  const [buyerEmail, setBuyerEmail] = useState<string>('harsha.varma@gmail.com');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Generate 60 seats for the stadium grid
  const seats = Array.from({ length: 60 }, (_, i) => ({
    id: i + 1,
    label: i < 20 ? `F${i + 1}` : i < 40 ? `V${i - 19}` : `S${i - 39}`,
    isVip: i >= 20 && i < 40,
    isSold: i === 5 || i === 12 || i === 24 || i === 38 || i === 45,
  }));

  const handleSeatClick = (index: number, isSold: boolean, isVip: boolean) => {
    if (isSold) return;
    setSelectedSeatIndex(index);
    if (isVip && categories.length > 1) {
      setSelectedCat(categories[1] || categories[0]);
    } else {
      setSelectedCat(categories[0]);
    }
  };

  const executeReservation = async () => {
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/v1/bookings/reserve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 1,
          eventId: event.id,
          ticketCategoryId: selectedCat.id || 1,
          quantity: 1,
        }),
      });

      if (!res.ok) {
        throw new Error('Seat reservation failed. Inventory locked or oversold.');
      }

      const data = await res.json();
      onSuccess({
        ...data,
        userName: buyerName,
        eventTitle: event.title,
        ticketCategoryName: selectedCat.name,
        seatInfo: `Seat ${seats[selectedSeatIndex]?.label || 'F14'}`,
      });
    } catch (err: any) {
      setErrorMsg(err.message || 'Booking engine transaction failed.');
    } finally {
      setLoading(false);
    }
  };

  const ticketPrice = selectedCat.price || 9999;
  const convenienceFee = 250;
  const grandTotal = ticketPrice + convenienceFee;

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto py-6">
      {/* Top Header Row */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-bold text-sm transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Live Concerts
        </button>

        <div className="flex items-center gap-2 text-emerald-700 text-xs font-mono font-bold bg-emerald-50 border border-emerald-200 px-3.5 py-2 rounded-xl shadow-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          10-Minute Hold Active
        </div>
      </div>

      {/* Main Grid: Left Venue Panel & Right Sticky Checkout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Panel */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white border border-slate-200 p-8 rounded-3xl flex flex-col gap-2 shadow-sm">
            <span className="text-xs font-black text-rose-600 uppercase tracking-widest">
              EXCLUSIVE STADIUM ACCESS
            </span>
            <h1 className="font-display font-black text-3xl md:text-4xl text-slate-900">
              {event.title}
            </h1>
            <p className="text-slate-600 text-sm font-semibold">
              📍 {event.venue} &bull; July 18, 2026 • 19:00 IST
            </p>
          </div>

          {/* Seat Picker Map */}
          <div className="bg-white border border-slate-200 p-8 rounded-3xl flex flex-col gap-6 shadow-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h2 className="font-black text-xl text-slate-900">
                  Select Your Section & Seat
                </h2>
                <p className="text-slate-500 text-xs mt-1 font-medium">
                  Click an available seat to lock your venue ticket
                </p>
              </div>

              {/* Legend Bar */}
              <div className="flex items-center gap-4 text-xs font-bold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-md bg-emerald-100 border border-emerald-500" />
                  Fan Pit (₹ 9,999)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-md bg-amber-100 border border-amber-500" />
                  VIP Lounge (₹ 18,500)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-md bg-rose-600 border border-white" />
                  Selected
                </span>
              </div>
            </div>

            {/* Stadium Stage Layout */}
            <div className="bg-slate-100 border border-slate-200 p-8 rounded-2xl flex flex-col items-center gap-8 shadow-inner">
              <div className="w-full bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600 text-white font-display font-black text-xs text-center py-3 rounded-xl tracking-widest shadow-md uppercase">
                🎤 MAIN STAGE 🎸
              </div>

              {/* 60 Seat Grid */}
              <div className="grid grid-cols-6 md:grid-cols-12 gap-2.5 w-full">
                {seats.map((seat, index) => {
                  const isSelected = selectedSeatIndex === index;

                  let seatStyle = 'bg-emerald-50 border-emerald-300 text-emerald-800 hover:scale-110 shadow-xs';
                  if (seat.isVip) {
                    seatStyle = 'bg-amber-50 border-amber-300 text-amber-800 hover:scale-110 shadow-xs';
                  }
                  if (seat.isSold) {
                    seatStyle = 'bg-slate-200 border-slate-300 text-slate-400 cursor-not-allowed';
                  }
                  if (isSelected) {
                    seatStyle = 'bg-rose-600 border-white text-white shadow-lg shadow-rose-500/40 scale-115 font-black';
                  }

                  return (
                    <button
                      key={seat.id}
                      onClick={() => handleSeatClick(index, seat.isSold, seat.isVip)}
                      disabled={seat.isSold}
                      className={`h-11 rounded-xl border font-mono font-black text-xs flex items-center justify-center transition-all ${seatStyle}`}
                    >
                      {seat.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sticky Checkout Sidebar */}
        <div className="flex flex-col gap-6">
          <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-xl sticky top-24 flex flex-col gap-6">
            <div>
              <h3 className="font-black text-xl text-slate-900">Order Summary</h3>
              <p className="text-slate-500 text-xs mt-0.5 font-medium">Guaranteed Anti-Overselling Protection</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl flex flex-col gap-3.5 font-sans text-sm">
              <div className="flex justify-between items-center text-slate-600">
                <span className="text-xs font-semibold">Selected Section</span>
                <strong className="text-slate-900 font-bold text-xs">
                  {selectedCat.name} • Seat {seats[selectedSeatIndex]?.label || 'F14'}
                </strong>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span className="text-xs font-semibold">Ticket Price</span>
                <span className="font-mono font-bold text-slate-900 text-xs">
                  ₹ {ticketPrice.toLocaleString('en-IN')}.00
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span className="text-xs font-semibold">Convenience Fee</span>
                <span className="font-mono text-slate-500 text-xs">₹ 250.00</span>
              </div>
              <div className="pt-3.5 border-t border-slate-200 flex justify-between items-center text-base font-black">
                <span className="text-slate-900">Total Payable</span>
                <span className="font-mono text-2xl text-rose-600">
                  ₹ {grandTotal.toLocaleString('en-IN')}.00
                </span>
              </div>
            </div>

            {/* Buyer Form */}
            <div className="flex flex-col gap-3.5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-extrabold text-slate-700">Pass Holder Name</label>
                <input
                  type="text"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="bg-slate-50 border border-slate-200 focus:border-rose-500 focus:bg-white px-4 py-3 rounded-xl text-slate-900 text-xs outline-none font-semibold transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-extrabold text-slate-700">Email for Digital E-Pass</label>
                <input
                  type="email"
                  value={buyerEmail}
                  onChange={(e) => setBuyerEmail(e.target.value)}
                  className="bg-slate-50 border border-slate-200 focus:border-rose-500 focus:bg-white px-4 py-3 rounded-xl text-slate-900 text-xs outline-none font-semibold transition-all"
                />
              </div>
            </div>

            {errorMsg && (
              <div className="bg-rose-50 border border-rose-200 p-3.5 rounded-xl text-rose-700 text-xs font-bold">
                ⚠️ {errorMsg}
              </div>
            )}

            <button
              onClick={executeReservation}
              disabled={loading}
              className="w-full py-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-sm shadow-lg shadow-rose-500/25 active:scale-98 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  🔒 Pay Now & Confirm Reservation
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
