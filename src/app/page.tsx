// src/app/page.tsx
import React from 'react';
import MoodMelodyApp from '../components/MoodMelodyApp'; // 作成したMoodMelodyAppをインポート

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4"> {/* 全体の背景色と余白 */}
      <MoodMelodyApp /> {/* MoodMelodyApp をレンダリング */}
    </div>
  );
};

export default HomePage;