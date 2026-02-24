import React, { useState, useEffect } from 'react';
import { Microscope, TestTube2, Sparkles, Dna, PartyPopper, Syringe, Stars, FlaskConical } from 'lucide-react';

export default function App() {
  const [targetDate] = useState(new Date('2026-05-30T00:00:00'));
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isFinished, setIsFinished] = useState(false);

  function calculateTimeLeft() {
    const difference = targetDate.getTime() - new Date().getTime();
    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);
      if (remaining.days === 0 && remaining.hours === 0 && remaining.minutes === 0 && remaining.seconds === 0) {
        setIsFinished(true);
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const floatingIcons = [
    { Icon: TestTube2, left: '10%', top: '20%', delay: '0s', size: 40, color: 'text-teal-300' },
    { Icon: Dna, left: '85%', top: '15%', delay: '2s', size: 50, color: 'text-rose-300' },
    { Icon: Sparkles, left: '20%', top: '75%', delay: '4s', size: 35, color: 'text-yellow-300' },
    { Icon: Microscope, left: '75%', top: '80%', delay: '1s', size: 45, color: 'text-teal-200' },
    { Icon: PartyPopper, left: '5%', top: '50%', delay: '1.5s', size: 45, color: 'text-purple-300' },
    { Icon: Syringe, left: '90%', top: '60%', delay: '2.5s', size: 35, color: 'text-blue-300' },
    { Icon: Stars, left: '60%', top: '90%', delay: '0.5s', size: 40, color: 'text-yellow-400' },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-teal-50 via-rose-50 to-teal-100 flex items-center justify-center p-4 overflow-hidden font-sans text-gray-800">
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }
          @keyframes bubble {
            0% { transform: translateY(0) scale(1); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateY(-40px) scale(1.5); opacity: 0; }
          }
          .animate-float { animation: float 6s ease-in-out infinite; }
          .bubble { animation: bubble 2s infinite ease-out; }
        `}
      </style>

      {floatingIcons.map((item, index) => (
        <div
          key={index}
          className={`absolute animate-float opacity-40 ${item.color}`}
          style={{ left: item.left, top: item.top, animationDelay: item.delay }}
        >
          <item.Icon size={item.size} />
        </div>
      ))}

      <div className="relative z-10 w-full max-w-xl bg-white/90 backdrop-blur-md rounded-[2rem] shadow-2xl p-8 md:p-10 text-center border border-white/50">
        <div className="relative w-48 h-48 mx-auto mb-6 flex items-center justify-center bg-teal-50 rounded-full border-4 border-white shadow-inner overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <FlaskConical size={80} className="text-teal-500 relative z-10" strokeWidth={1.5} />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="bubble absolute w-3 h-3 bg-teal-300 rounded-full"
                    style={{
                      left: `${20 + i * 15}%`,
                      animationDelay: `${i * 0.4}s`,
                      bottom: '20px'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 w-full h-1/3 bg-teal-100/50"></div>
        </div>

        <div className="inline-block bg-rose-500 text-white px-8 py-3 rounded-2xl font-black text-2xl mb-6 shadow-lg animate-bounce transform -rotate-1">
          ¡POR FIN SE ACABA!
        </div>

        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Nuria Vicente</h1>
        <p className="text-lg font-bold text-teal-600 flex items-center gap-2 justify-center mb-8">
          <Microscope size={20} /> Análisis Clínicos <TestTube2 size={20} />
        </p>

        {!isFinished ? (
          <div className="space-y-6">
            <div className="grid grid-cols-4 gap-3">
              <TimeBlock value={timeLeft.days} label="Días" />
              <TimeBlock value={timeLeft.hours} label="Hrs" />
              <TimeBlock value={timeLeft.minutes} label="Min" />
              <TimeBlock value={timeLeft.seconds} label="Seg" />
            </div>
            <p className="text-gray-400 italic text-sm">30 de Mayo: El gran día</p>
          </div>
        ) : (
          <div className="py-6 animate-pulse">
            <h2 className="text-3xl font-black text-rose-500">¡LIBERTAD! 🎉</h2>
            <p className="text-gray-600">Enhorabuena, Especialista.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function TimeBlock({ value, label }) {
  return (
    <div className="bg-white rounded-xl p-3 shadow-md border border-gray-100">
      <div className="text-3xl font-black text-gray-800 leading-none">
        {value.toString().padStart(2, '0')}
      </div>
      <div className="text-[10px] font-bold text-teal-500 uppercase mt-1 tracking-wider">
        {label}
      </div>
    </div>
  );
}
