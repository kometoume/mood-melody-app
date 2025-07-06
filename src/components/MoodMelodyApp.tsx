// src/components/MoodMelodyApp.tsx
'use client';
// JSX（後述のHTMLのような記述）をJavaScriptとして解釈・実行するためには、Reactライブラリが必要です。この行があることで、React.FC（関数コンポーネントの型）なども使えるようになります。
import React from 'react';
// 「React.FC はReact Function Component」の略で、TypeScriptで関数コンポーネントを型付けするためのもの。TypeScriptに「これはReactの関数コンポーネントですよ！」と教えてあげるための「ラベル」や「テンプレート」のようなもの
const MoodMelodyApp: React.FC = () => {// 引数を受け取り、何か処理を実行して、結果を返す関数
  return (
    // ... JSXのコード
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8 mb-8">
      <h2 className="text-3xl font-semibold mb-6 text-center text-blue-700">My Mood Melodies</h2>

      {/* メモ入力フォーム */}
      <div className="mb-8 p-4 border border-blue-200 rounded-lg bg-blue-50">
        <h3 className="text-xl font-medium mb-4 text-blue-600">曲のメモ</h3>
        <input
          type="text"
          placeholder="メロディのタイトル..."
          className="w-full p-2 border border-gray-300 rounded-md mb-2 bg-white focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
        />
        <textarea
          placeholder="ここにメロディの内容（メモ）を書く..."
          rows={5}
          className="w-full p-2 border border-gray-300 rounded-md mb-2 resize-y bg-white focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
        ></textarea>
        <input
          type="text"
          placeholder="タグを追加 (例: #idea #inspiration #sad)"
          className="w-full p-2 border border-gray-300 rounded-md mb-4 bg-white focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
        />
        <button className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors duration-200 cursor-pointer">メロディを保存</button>
      </div>

      {/* 検索・フィルターエリア */}
      <div className="mb-8 p-4 border border-green-200 rounded-lg bg-green-50">
        <h3 className="text-xl font-medium mb-4 text-green-600">曲を探す</h3>
        <input
          type="text"
          placeholder="キーワードでメロディを検索..."
          className="w-full p-2 border border-gray-300 rounded-md mb-2 bg-white focus:ring-green-500 focus:border-green-500 focus:outline-none"
        />
        <div className="flex flex-wrap gap-2 mb-4">
          {/* サンプルのタグ。後で動的に生成します */}
          <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm">#idea</span>
          <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm">#inspiration</span>
          <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm">#daily</span>
        </div>
        <button className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition-colors duration-200 mr-2 cursor-pointer">検索</button>
        <button className="bg-gray-400 text-white p-2 rounded-md hover:bg-gray-500 transition-colors duration-200 cursor-pointer">クリア</button>
      </div>


    </div>
  );
};
// export default は「このファイルの中で定義された MoodMelodyApp というものを、このファイル（モジュール）の「代表」として外に持ち出しますよ」という指示
export default MoodMelodyApp;// export (公開):default (デフォルト指定):