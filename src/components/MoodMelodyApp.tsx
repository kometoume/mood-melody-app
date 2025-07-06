// src/components/MoodMelodyApp.tsx
'use client';

// useStateをインポートする
import React, { useState } from 'react'; // useState は、Reactが提供する「Hooks（フック）」と呼ばれる機能の一つです。最も基本的なフックで、関数コンポーネントに「状態（State）」という機能を追加する

// メモ（メロディ）のデータ構造を定義する型
interface Melody { // Melody と名付けられたデータは、こういう形をしていますよ」と定義している
  id: string;      // 「id」という項目があって、それは必ず「文字列（string）」
  title: string;   // 「title」という項目があって、それは必ず「文字列（string）」
  content: string; // 「content」という項目があって、それは必ず「文字列（string）」
  tags: string[];  // 「tags」という項目があって、それは必ず「文字列の配列（string[]）」
  date: string;    // 「date」という項目があって、それは必ず「文字列（string）」
}

const MoodMelodyApp: React.FC = () => { //MoodMelodyApp という名前の定数を定義し、その定数にはReactの関数コンポーネントとしての型を持たせて、引数なしのアロー関数を割り当て
  // 入力フォーム用の状態変数　useState というReactのHookを使って、アプリケーションの「状態」を定義
  const [title, setTitle] = useState<string>(''); // タイトル
  const [content, setContent] = useState<string>(''); // 内容
  const [tagsInput, setTagsInput] = useState<string>(''); // タグ入力欄のテキスト

  // 保存されたメロディのリストを管理する状態変数
  //  最初は誰もメロディを保存していないので、中身は空っぽの配列 []
  const [melodies, setMelodies] = useState<Melody[]>([]); //<Melody[]>：TypeScriptによる「これはこんな形のデータが入るよ」という宣言

  // 「メロディを保存」ボタンがクリックされた時の処理
  const handleSaveMelody = () => {
    if (!title.trim() || !content.trim()) { // タイトルか内容が空の場合は処理しない 
    // 条件A || 条件B の形式で使われ、条件A と 条件B のどちらか一方が true であれば、if 文全体の条件が true になります。
    // .trim(): これはJavaScriptの文字列メソッドです。文字列の先頭と末尾にあるすべての空白文字（半角スペース、全角スペース、タブ、改行など）を削除
    // つまりタイトルのtrimが何もなければもしくはコンテンツのtrimが何もなければアラートという意味
    alert('タイトルと内容を入力してください！');
      return;
    }

    // タグ文字列を配列に変換する処理
    // parsedTags は、入力した「ごちゃごちゃしたタグの文字」を、「アプリがきれいに使えるタグのリスト」に整理した結果を格納する箱
    const parsedTags = tagsInput //tagsInputユーザーがタグの入力フィールドに実際に入力した元の文字列（例: " #music , happy song "）を保持している状態変数(Reactコンポーネントが『記憶しておくべきデータ』)
      .split(/[,\s]+/) // tagsInput.split(/[,\s]+/)：文字列を配列に分割する 
      .filter(tag => tag.length > 0) //「中身が空っぽのタグ」を捨てるための作業 tag.length > 0 は、「タグの文字数が0より大きい」という意味です。つまり、「何か文字が入っているタグ」という条件
      .map(tag => tag.startsWith('#') ? tag.toLowerCase() : '#' + tag.toLowerCase());
// map(): 配列の各要素（この場合は、一つ一つのタグの文字列）に対して、何らかの変換処理を行い、その結果を新しい配列として返します。元の配列は変更しません。
 //tag.startsWith('#')ある文字列が、指定した文字（この場合は'#'）で始まっているかどうかをチェック
// tag.toLowerCase() は、tag という変数に入っている文字列を、すべて「小文字」に変換するという処理
// もし # で始まっていたら（trueの場合）: tag.toLowerCase() が実行されます。これは、そのタグをただ全部小文字にする、ということです。すでに # が付いているので、余計なことはしません。

// もし # で始まっていなかったら（falseの場合）: '#' + tag.toLowerCase() が実行されます。これは、まずタグを全部小文字にして、その先頭に**# を付け足す**、ということです。


    // 新しいメロディオブジェクトを作成
    const newMelody: Melody = {
      id: Date.now().toString(), // 簡単な一意のIDとしてタイムスタンプを使用
    //   id: このメロディを他のメロディと区別するための、**一意の識別子（ID）**です。
    // Date.now(): JavaScriptの組み込み関数で、現在の時刻を**ミリ秒単位の数値（タイムスタンプ）**で返します。
    // .toString(): Date.now() で得られた数値を文字列に変換しています。IDは文字列として扱うのが一般的だからです。
      title: title,
      content: content,
      tags: parsedTags,
      date: new Date().toLocaleString(), // 現在の日時
    };

    // 既存のメロディリストの先頭に新しいメロディを追加
    // setMelodies は「アルバムを管理してくれる人」新しく撮った写真を、アルバムの一番上に追加
    setMelodies([newMelody, ...melodies]);

    // フォームをクリアする
    // メロディを保存する処理がすべて完了した後に、入力フォームの中身を空っぽに戻すため 入力欄がきれいな状態に戻っている
    setTitle('');
    setContent('');
    setTagsInput('');
  };
const handleClearAllMelodies = () => {
  // ユーザーに本当にクリアしてよいか確認するアラート
  if (window.confirm('すべてのメロディをクリアしてもよろしいですか？')) {
    setMelodies([]); // melodies の状態を空の配列に更新
  }
};
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8 mb-8">
      <h2 className="text-3xl font-semibold mb-6 text-center text-blue-700">My Mood Melodies</h2>

      {/* メモ入力フォーム */}
      <div className="mb-8 p-4 border border-blue-200 rounded-lg bg-blue-50">
        <h3 className="text-xl font-medium mb-4 text-blue-600">曲のメモ</h3>
        <input
          type="text"
          placeholder="メロディのタイトル..."
          className="w-full p-2 border border-gray-300 rounded-md mb-2 bg-white focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
          value={title} // ★追加：stateとinputを紐付け
          onChange={(e) => setTitle(e.target.value)} // ★追加：入力でstateを更新
        />
        <textarea
          placeholder="ここにメロディの内容（メモ）を書く..."
          rows={5}
          className="w-full p-2 border border-gray-300 rounded-md mb-2 resize-y bg-white focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
          value={content} // ★追加：stateとtextareaを紐付け
          onChange={(e) => setContent(e.target.value)} // ★追加：入力でstateを更新
        ></textarea>
        <input
          type="text"
          placeholder="タグを追加 (例: #癒し系 #アップテンポ)"
          className="w-full p-2 border border-gray-300 rounded-md mb-4 bg-white focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
          value={tagsInput} // ★追加：stateとinputを紐付け
          onChange={(e) => setTagsInput(e.target.value)} // ★追加：入力でstateを更新
        />
        <button
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
          onClick={handleSaveMelody} // ★追加：ボタンクリックで関数を実行
        >
          メロディを保存
        </button>
      </div>

      {/* 検索・フィルターエリア (このセクションはまだ変更なし) */}
      <div className="mb-8 p-4 border border-green-200 rounded-lg bg-green-50">
        <h3 className="text-xl font-medium mb-4 text-green-600">曲を探す</h3>
        <input
          type="text"
          placeholder="キーワードでメロディを検索..."
          className="w-full p-2 border border-gray-300 rounded-md mb-2 bg-white focus:ring-green-500 focus:border-green-500 focus:outline-none"
          // 検索入力欄もstateと紐づける場合はここにvalue/onChangeを追加
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

      {/* メモリスト */}
      <div>
        <h3 className="text-xl font-medium mb-4 text-purple-600">私のメロディたち</h3>
        {melodies.length === 0 ? ( // メロディが一つもない場合の表示
          <p className="text-gray-600 text-center py-8">まだメロディがありません。新しいメロディを紡いでみましょう！</p>
        ) : (
          // ★追加：melodies配列をループして各メロディを表示
          melodies.map((melody) => (
            <div key={melody.id} className="bg-white p-4 mb-4 border border-purple-200 rounded-lg shadow-sm">
              <h4 className="font-semibold text-lg text-gray-800">{melody.title}</h4>
              <p className="text-gray-700 text-sm mb-2">{melody.content}</p>
              <div className="flex flex-wrap gap-1 text-xs">
                {melody.tags.map((tag, index) => (
                  <span key={index} className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="text-right text-gray-500 text-xs mt-2">{melody.date}</div>
            </div>
          ))
        )}
        <button
          className="w-full bg-gray-400 text-white p-2 rounded-md hover:bg-gray-500 transition-colors duration-200 cursor-pointer mt-4" // 見やすくするためにmt-4を追加
          onClick={handleClearAllMelodies} // ここで定義済みの関数を呼び出す
        >
          すべてのメロディをクリア
        </button>      </div>
    </div>
  );
};

// export default は「このファイルの中で定義された MoodMelodyApp というものを、このファイル（モジュール）の「代表」として外に持ち出しますよ」という指示
export default MoodMelodyApp; // export (公開):default (デフォルト指定):