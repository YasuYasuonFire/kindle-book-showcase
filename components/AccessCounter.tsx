'use client';

import React, { useState, useEffect } from 'react';

interface AccessCounterProps {
  className?: string;
}

const AccessCounter: React.FC<AccessCounterProps> = ({ className = '' }) => {
  const [count, setCount] = useState<number>(0);
  const [todayCount, setTodayCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ページ読み込み時にカウントを取得・更新
    const updateCount = () => {
      try {
        const today = new Date().toDateString();
        
        // 総アクセス数の管理
        const savedCount = localStorage.getItem('site-access-count');
        let currentCount = savedCount ? parseInt(savedCount, 10) : 1000; // 初期値1000（初期のWebサイトっぽく）
        
        // 今日のアクセス数の管理
        const todayCountKey = `today-count-${today}`;
        const savedTodayCount = localStorage.getItem(todayCountKey);
        let currentTodayCount = savedTodayCount ? parseInt(savedTodayCount, 10) : 0;
        
        // セッションストレージで同一セッション内での重複カウントを防ぐ
        const sessionVisited = sessionStorage.getItem('session-visited');
        if (!sessionVisited) {
          currentCount += 1;
          currentTodayCount += 1;
          localStorage.setItem('site-access-count', currentCount.toString());
          localStorage.setItem(todayCountKey, currentTodayCount.toString());
          sessionStorage.setItem('session-visited', 'true');
        }
        
        setCount(currentCount);
        setTodayCount(currentTodayCount);
        setLoading(false);
      } catch (error) {
        console.error('アクセスカウンターの読み込みエラー:', error);
        setCount(1000);
        setTodayCount(1);
        setLoading(false);
      }
    };

    updateCount();
  }, []);

  // カウントを7桁でゼロパディング（90年代風）
  const formatCount = (num: number): string => {
    return num.toString().padStart(7, '0');
  };

  // 各桁を配列として取得
  const getDigits = (num: number): string[] => {
    return formatCount(num).split('');
  };

  if (loading) {
    return (
      <div className={`access-counter-container loading ${className}`}>
        <div className="access-counter-frame">
          <div className="access-counter-label">VISITORS</div>
          <div className="access-counter-display">
            <div className="access-counter-digits">
              {Array.from({ length: 7 }, (_, i) => (
                <div key={i} className="access-counter-digit loading">8</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`access-counter-container ${className}`}>
      <div className="access-counter-frame">
        <div className="access-counter-label">
          <span className="access-counter-blink">●</span> VISITORS <span className="access-counter-blink">●</span>
        </div>
        <div className="access-counter-display">
          <div className="access-counter-digits">
            {getDigits(count).map((digit, index) => (
              <div key={index} className="access-counter-digit">
                {digit}
              </div>
            ))}
          </div>
        </div>
        <div className="access-counter-footer">
          <div className="access-counter-today">
            <span className="access-counter-today-label">Today: </span>
            <span className="access-counter-today-count">{todayCount.toString().padStart(3, '0')}</span>
          </div>
          <span className="access-counter-since">Since 1995</span>
        </div>
      </div>
    </div>
  );
};

export default AccessCounter;