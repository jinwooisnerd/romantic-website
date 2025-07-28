import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MapPin, Calendar, Star, Camera, Music, Volume2, ChevronDown } from 'lucide-react';

const RomanticWebsite = () => {
  const [currentSection, setCurrentSection] = useState('welcome');
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [currentLocation, setCurrentLocation] = useState('Delhi');
  const [showSurprise, setShowSurprise] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [sakuraPetals, setSakuraPetals] = useState([]);

  // Create falling sakura petals
  useEffect(() => {
    const petals = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 2
    }));
    setSakuraPetals(petals);
  }, []);

  // Countdown timer
  useEffect(() => {
    if (selectedDate) {
      const timer = setInterval(() => {
        const now = new Date().getTime();
        const target = new Date(selectedDate).getTime();
        const difference = target - now;

        if (difference > 0) {
          setCountdown({
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((difference % (1000 * 60)) / 1000)
          });
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [selectedDate]);

  const moods = [
    { id: 'happy', emoji: '😊', label: 'Happy', message: 'Your smile lights up my world ✨' },
    { id: 'sad', emoji: '😢', label: 'Sad', message: 'Sending virtual hugs your way 🤗' },
    { id: 'missing', emoji: '💕', label: 'Missing You', message: 'Distance means nothing when you mean everything 💖' },
    { id: 'sleepy', emoji: '😴', label: 'Sleepy', message: 'Sweet dreams, beautiful 🌙' },
    { id: 'excited', emoji: '🎉', label: 'Excited', message: 'Your energy is contagious! ⚡' },
    { id: 'loved', emoji: '🤗', label: 'Loved', message: 'You are my favorite notification 📱💕' }
  ];

  const locations = [
    { name: 'Leh', x: 20, y: 30, description: 'Where our mountain adventure begins' },
    { name: 'Srinagar', x: 25, y: 35, description: 'Beauty of Dal Lake together' },
    { name: 'Chandigarh', x: 30, y: 45, description: 'City of gardens and dreams' },
    { name: 'DU College', x: 35, y: 50, description: 'Where knowledge meets beauty' },
    { name: 'Her Home Delhi', x: 40, y: 55, description: 'Home is where the heart is' }
  ];

  const WelcomeScreen = () => (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-purple-100 flex items-center justify-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      {/* Falling Sakura Petals */}
      {sakuraPetals.map(petal => (
        <motion.div
          key={petal.id}
          className="absolute w-3 h-3 bg-pink-300 rounded-full opacity-70"
          style={{ left: `${petal.x}%` }}
          initial={{ y: -20, rotate: 0 }}
          animate={{ y: '100vh', rotate: 360 }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      ))}

      <div className="text-center z-10">
        <motion.h1 
          className="text-6xl font-bold text-pink-600 mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Welcome My Love 💕
        </motion.h1>
        
        <motion.p 
          className="text-2xl text-gray-700 mb-12 max-w-2xl mx-auto"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          In this corner of the internet, a private place for my naughty gal ✨
        </motion.p>

        <motion.button
          onClick={() => setCurrentSection('home')}
          className="bg-pink-500 hover:bg-pink-600 text-white px-12 py-4 rounded-full text-xl font-semibold shadow-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Enter Our World 💖
        </motion.button>
      </div>
    </motion.div>
  );

  const Navigation = () => (
    <motion.nav 
      className="fixed top-0 w-full bg-white/90 backdrop-blur-sm shadow-lg z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex space-x-8">
          {[
            { id: 'home', label: 'Home', icon: Heart },
            { id: 'map', label: 'Our Journey', icon: MapPin },
            { id: 'mood', label: 'Mood', icon: Star },
            { id: 'calendar', label: 'Next Date', icon: Calendar },
            { id: 'zodiac', label: 'Us', icon: Star },
            { id: 'gallery', label: 'Memories', icon: Camera }
          ].map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentSection(item.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
                  currentSection === item.id 
                    ? 'bg-pink-500 text-white' 
                    : 'text-gray-600 hover:bg-pink-100'
                }`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setMusicPlaying(!musicPlaying)}
            className="p-2 rounded-full bg-pink-100 hover:bg-pink-200 transition-colors"
          >
            {musicPlaying ? <Music className="text-pink-600" /> : <Volume2 className="text-gray-400" />}
          </button>
          
          <button
            onClick={() => setShowSurprise(true)}
            className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition-colors"
          >
            <Heart className="text-red-500" size={20} />
          </button>
        </div>
      </div>
    </motion.nav>
  );

  const HomeSection = () => (
    <div className="pt-24 min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-6 py-12">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-bold text-pink-600 mb-6">Our Digital Love Story 💕</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            This is our special corner of the internet, filled with all the things that make our love unique and beautiful.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: 'Our Journey', desc: 'From Leh to Delhi, every mile with love', icon: '🗺️' },
            { title: 'Mood Connection', desc: 'Share how you feel, get love back', icon: '💝' },
            { title: 'Next Adventure', desc: 'Counting down to our next date', icon: '📅' },
            { title: 'Star-Crossed', desc: 'Aries & Leo perfect match', icon: '⭐' },
            { title: 'Memory Lane', desc: 'Our beautiful moments captured', icon: '📸' },
            { title: 'Love Notes', desc: 'What makes us perfect imperfect', icon: '💌' }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const MapSection = () => (
    <div className="pt-24 min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-6 py-12">
        <motion.h2 
          className="text-4xl font-bold text-center text-blue-600 mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Our Journey Across India 🚗💨
        </motion.h2>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="relative h-96 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg overflow-hidden">
            {/* Simplified Indian map outline */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
              <path
                d="M20 20 L80 20 L85 40 L80 80 L20 85 Z"
                fill="rgba(34, 197, 94, 0.2)"
                stroke="rgba(34, 197, 94, 0.5)"
                strokeWidth="1"
              />
            </svg>

            {/* Location markers */}
            {locations.map((location, index) => (
              <motion.div
                key={location.name}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{ left: `${location.x}%`, top: `${location.y}%` }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.2 }}
                onClick={() => setCurrentLocation(location.name)}
              >
                <div className={`w-4 h-4 rounded-full ${
                  currentLocation === location.name ? 'bg-red-500' : 'bg-blue-500'
                } shadow-lg`} />
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-sm font-medium whitespace-nowrap">
                  {location.name}
                </div>
              </motion.div>
            ))}

            {/* Animated car */}
            <motion.div
              className="absolute w-8 h-8 text-2xl"
              animate={{
                left: locations.map(l => `${l.x}%`),
                top: locations.map(l => `${l.y}%`)
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'linear'
              }}
            >
              🚗
            </motion.div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-lg text-gray-700">
            Fire signs unite! Our passion, energy, and love create the perfect storm of romance 🌪️💕
          </p>
        </motion.div>
      </div>
    </div>
  );

  const GallerySection = () => (
    <div className="pt-24 min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="container mx-auto px-6 py-12">
        <motion.h2 
          className="text-4xl font-bold text-center text-indigo-600 mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Our Beautiful Memories 📸
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }, (_, i) => (
            <motion.div
              key={i}
              className="aspect-square bg-gradient-to-br from-pink-200 to-purple-200 rounded-2xl flex items-center justify-center text-6xl cursor-pointer overflow-hidden"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              💕
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-lg text-gray-600">
            Every photo tells our story of love 📖💖
          </p>
        </motion.div>
      </div>
    </div>
  );

  const SurpriseModal = () => (
    <AnimatePresence>
      {showSurprise && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl p-8 max-w-md w-full mx-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            {passcode !== '143' ? (
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  🔒 Secret Surprise
                </h3>
                <p className="text-gray-600 mb-6">
                  Enter the special code to unlock your surprise!
                </p>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter code..."
                  className="w-full p-3 border border-gray-300 rounded-lg mb-6 text-center text-lg"
                />
                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowSurprise(false)}
                    className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => passcode === '143' && setPasscode('143')}
                    className="flex-1 px-4 py-2 bg-pink-500 text-white rounded-lg"
                  >
                    Unlock 💖
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <h3 className="text-3xl font-bold text-pink-600 mb-6">
                    🎉 Surprise! 🎉
                  </h3>
                  <div className="text-6xl mb-6">💕</div>
                  <p className="text-lg text-gray-700 mb-6">
                    You unlocked the secret! Here's a special message just for you:
                  </p>
                  <div className="bg-pink-50 rounded-lg p-4 mb-6">
                    <p className="text-pink-600 font-medium italic">
                      "Every day with you feels like a beautiful dream that I never want to wake up from. 
                      You are my sunshine, my moonlight, and all my stars combined. I Love You! 💖"
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setShowSurprise(false);
                      setPasscode('');
                    }}
                    className="px-6 py-3 bg-pink-500 text-white rounded-lg font-semibold"
                  >
                    Close 💕
                  </button>
                </motion.div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (currentSection === 'welcome') {
    return <WelcomeScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <Navigation />
      
      {currentSection === 'home' && <HomeSection />}
      {currentSection === 'map' && <MapSection />}
      {currentSection === 'mood' && <MoodSection />}
      {currentSection === 'calendar' && <CalendarSection />}
      {currentSection === 'zodiac' && <ZodiacSection />}
      {currentSection === 'gallery' && <GallerySection />}
      
      <SurpriseModal />
    </div>
  );
};

export default RomanticWebsite;
              Currently at: <span className="font-bold text-pink-600">{currentLocation}</span>
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {locations.find(l => l.name === currentLocation)?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const MoodSection = () => (
    <div className="pt-24 min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-6 py-12">
        <motion.h2 
          className="text-4xl font-bold text-center text-purple-600 mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          How Are You Feeling? 💭
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {moods.map(mood => (
            <motion.button
              key={mood.id}
              onClick={() => setSelectedMood(mood)}
              className={`p-6 rounded-2xl text-center transition-all ${
                selectedMood?.id === mood.id
                  ? 'bg-pink-500 text-white shadow-lg scale-105'
                  : 'bg-white hover:bg-pink-50 shadow-md hover:shadow-lg'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-4xl mb-3">{mood.emoji}</div>
              <div className="text-lg font-semibold">{mood.label}</div>
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {selectedMood && (
            <motion.div
              className="bg-white rounded-2xl p-8 shadow-lg text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
            >
              <div className="text-6xl mb-4">{selectedMood.emoji}</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                You're feeling {selectedMood.label.toLowerCase()}
              </h3>
              <p className="text-lg text-pink-600 font-medium">
                {selectedMood.message}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  const CalendarSection = () => (
    <div className="pt-24 min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      <div className="container mx-auto px-6 py-12">
        <motion.h2 
          className="text-4xl font-bold text-center text-orange-600 mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Our Next Date 💕
        </motion.h2>

        <div className="max-w-md mx-auto bg-white rounded-2xl p-8 shadow-lg">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select our next date:
            </label>
            <input
              type="datetime-local"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>

          {selectedDate && (
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Countdown to Love 💖
              </h3>
              
              <div className="grid grid-cols-4 gap-4 mb-6">
                {[
                  { label: 'Days', value: countdown.days },
                  { label: 'Hours', value: countdown.hours },
                  { label: 'Minutes', value: countdown.minutes },
                  { label: 'Seconds', value: countdown.seconds }
                ].map(item => (
                  <div key={item.label} className="bg-pink-100 rounded-lg p-3">
                    <div className="text-2xl font-bold text-pink-600">{item.value}</div>
                    <div className="text-xs text-pink-500">{item.label}</div>
                  </div>
                ))}
              </div>
              
              <p className="text-gray-600">
                Can't wait to see you again! 🥰
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );

  const ZodiacSection = () => (
    <div className="pt-24 min-h-screen bg-gradient-to-br from-red-50 to-yellow-50">
      <div className="container mx-auto px-6 py-12">
        <motion.h2 
          className="text-4xl font-bold text-center text-red-600 mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Aries ♈ + Leo ♌ = Perfect Match 🔥
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            className="bg-white rounded-2xl p-8 shadow-lg"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">♈</div>
              <h3 className="text-2xl font-bold text-red-500">My Beautiful Aries</h3>
            </div>
            <ul className="space-y-2 text-gray-700">
              <li>🔥 Passionate and energetic</li>
              <li>💪 Strong and independent</li>
              <li>✨ Natural born leader</li>
              <li>🎯 Determined and focused</li>
              <li>💕 Loyal and loving</li>
            </ul>
          </motion.div>

          <motion.div
            className="bg-white rounded-2xl p-8 shadow-lg"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">♌</div>
              <h3 className="text-2xl font-bold text-yellow-500">Your Devoted Leo</h3>
            </div>
            <ul className="space-y-2 text-gray-700">
              <li>👑 Confident and charismatic</li>
              <li>🎭 Creative and expressive</li>
              <li>🤗 Warm and generous</li>
              <li>💖 Romantic and passionate</li>
              <li>🛡️ Protective and loyal</li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="bg-gradient-to-r from-red-100 to-yellow-100 rounded-2xl p-8 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-3xl font-bold text-red-600 mb-4">
            Compatibility: 98% 💯
          </h3>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            <motion.div
              className="bg-gradient-to-r from-red-500 to-yellow-500 h-4 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '98%' }}
              transition={{ duration: 2, delay: 0.5 }}
            />
          </div>
          <p className="text-lg text-gray-700">