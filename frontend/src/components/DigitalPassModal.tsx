import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import QRCode from 'qrcode';
import { CheckCircle2 } from 'lucide-react';
import type { ReservationResponse } from '../types';

interface DigitalPassModalProps {
  pass: ReservationResponse;
  onClose: () => void;
}

export const DigitalPassModal: React.FC<DigitalPassModalProps> = ({ pass, onClose }) => {
  const qrCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Trigger celebratory confetti
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
    });

    // Render QR Code
    if (qrCanvasRef.current) {
      QRCode.toCanvas(
        qrCanvasRef.current,
        `BOOKING:${pass.bookingReference}|USER:${pass.userName}|AMT:${pass.totalAmount}`,
        { width: 160, margin: 1, color: { dark: '#0F172A', light: '#FFFFFF' } },
        (err) => {
          if (err) console.error('QR render error:', err);
        }
      );
    }
  }, [pass]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-8 shadow-2xl flex flex-col items-center gap-6 relative">
        <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center border border-emerald-300">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="text-center">
          <h2 className="font-display font-black text-2xl text-slate-900">
            Concert Pass Confirmed!
          </h2>
          <p className="text-slate-500 text-xs mt-1 font-medium">
            Your digital entry pass is ready for stadium gate entrance
          </p>
        </div>

        {/* Digital Ticket Card */}
        <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden shadow-inner">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-0.5 rounded border border-emerald-300">
              OFFICIAL CONCERT PASS
            </span>
            <span className="font-mono text-xs font-bold text-rose-600">
              {pass.bookingReference || 'EVT-984F2A1C'}
            </span>
          </div>

          <div>
            <h3 className="font-black text-lg text-slate-900">
              {pass.eventTitle || 'Diljit Dosanjh: Dil-Luminati India Tour'}
            </h3>
            <p className="text-slate-500 text-xs mt-0.5 font-medium">
              Jawaharlal Nehru Stadium, New Delhi &bull; July 18, 2026
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
            <div>
              <span className="text-slate-400 text-[10px] block font-semibold">Pass Holder</span>
              <strong className="text-slate-800">{pass.userName}</strong>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block font-semibold">Section / Seat</span>
              <strong className="text-slate-800">{pass.seatInfo || 'Fan Pit • Seat F14'}</strong>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block font-semibold">Status</span>
              <strong className="text-emerald-600">CONFIRMED (PAID)</strong>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block font-semibold">Total Amount</span>
              <strong className="font-mono text-rose-600">₹ {pass.totalAmount.toLocaleString('en-IN')}.00</strong>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="flex flex-col items-center gap-2 pt-2 border-t border-slate-200">
            <canvas ref={qrCanvasRef} className="rounded-xl shadow-sm border border-slate-200" />
            <span className="text-[10px] font-bold text-slate-500">
              Scan at Venue Entrance VIP Access Gate
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all shadow-md"
        >
          Close & Back to Concerts
        </button>
      </div>
    </div>
  );
};
