import React, { useState, useEffect } from "react";

const NotificationCart = ({ message, onClose }: { message: string; onClose: () => void }) => {
const [progress, setProgress] = useState(100); // Başlangıçta çubuğun doluluk oranı %100

useEffect(() => {
    const animationDuration = 5000; // 5 saniyede tamamlanacak animasyon süresi (ms)
    const intervalDuration = 50; // 50ms'de bir güncelleme yapacak aralık

    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const progressPercentage = (elapsedTime / animationDuration) * 100;
      const newProgress = 100 - progressPercentage;

      if (newProgress <= 0) {
        clearInterval(interval);
        onClose();
      } else {
        setProgress(newProgress);
      }
    }, intervalDuration);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50 text-white">
        <div className=" p-4 bg-gray-600 rounded-md">
            <p className="mb-8">{message}</p>
            <div className="w-full h-1 bg-gray-500 rounded-full overflow-hidden">
                <div className="h-full bg-green-600" style={{ width: `${progress}%` }}></div>
            </div>
      </div>
    </div>
  );
};



export default NotificationCart;
