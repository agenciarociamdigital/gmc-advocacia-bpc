import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock } from 'lucide-react';

// Mock data for recent activities
const recentActivities = [
  { name: 'Maria', location: 'São Paulo', action: 'acabou de solicitar uma avaliação', timeAgo: '2 min' },
  { name: 'Carlos', location: 'Rio de Janeiro', action: 'acabou de receber o benefício', timeAgo: '5 min' },
  { name: 'Antônia', location: 'Fortaleza', action: 'iniciou o processo', timeAgo: '7 min' },
  { name: 'José', location: 'Belo Horizonte', action: 'acabou de solicitar uma avaliação', timeAgo: '10 min' },
  { name: 'Luiza', location: 'Curitiba', action: 'acabou de ter o benefício aprovado', timeAgo: '12 min' },
];

const ActivityNotification = () => {
  const [currentNotification, setCurrentNotification] = useState<number | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);

  // Track scroll position to determine when to show notifications
  useEffect(() => {
    const handleScroll = () => {
      // Calculate second fold (approximately 2 viewport heights)
      const secondFoldPosition = window.innerHeight * 2;
      
      // Check if user has scrolled past the second fold
      if (window.scrollY > secondFoldPosition && !showNotifications) {
        setShowNotifications(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showNotifications]);

  // Start notification cycle after notifications are enabled
  useEffect(() => {
    if (!showNotifications) return;
    
    // Show first notification after 2 seconds
    const firstTimer = setTimeout(() => {
      setCurrentNotification(0);
    }, 2000);

    return () => clearTimeout(firstTimer);
  }, [showNotifications]);

  // Cycle through notifications with longer intervals
  useEffect(() => {
    if (currentNotification === null) return;

    // Show notification for 8 seconds, then wait 15 seconds before showing the next one
    const showTimer = setTimeout(() => {
      setCurrentNotification(null);
      
      // Wait 15 seconds before showing the next notification
      const nextTimer = setTimeout(() => {
        const nextIndex = (currentNotification + 1) % recentActivities.length;
        setCurrentNotification(nextIndex);
      }, 15000); // 15 seconds gap between notifications
      
      return () => clearTimeout(nextTimer);
    }, 8000); // 8 seconds display time

    return () => clearTimeout(showTimer);
  }, [currentNotification]);

  // If we shouldn't show notifications yet, return null
  if (!showNotifications) return null;

  return (
    <AnimatePresence>
      {currentNotification !== null && (
        <motion.div
          key={currentNotification}
          initial={{ opacity: 0, y: 20, x: -20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-20 left-4 sm:left-6 bg-white/90 text-gms-brown rounded-lg shadow-lg p-3 max-w-xs backdrop-blur-sm border border-gms-gold/20 flex items-start gap-3 z-30 hover:scale-105 transition-transform"
        >
          <div className="h-8 w-8 rounded-full bg-gms-gold/20 flex items-center justify-center flex-shrink-0">
            <Clock className="h-4 w-4 text-gms-gold" />
          </div>
          <div>
            <p className="text-sm font-medium">
              <span className="font-bold">{recentActivities[currentNotification].name}</span> de{' '}
              <span className="text-gms-gold">{recentActivities[currentNotification].location}</span>{' '}
              {recentActivities[currentNotification].action}
            </p>
            <p className="text-xs text-gray-500 mt-1">Há {recentActivities[currentNotification].timeAgo}</p>
          </div>
          <button 
            onClick={() => setCurrentNotification(null)} 
            className="absolute top-1 right-1 w-4 h-4 text-gray-400 hover:text-gray-600"
            aria-label="Fechar notificação"
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ActivityNotification;
