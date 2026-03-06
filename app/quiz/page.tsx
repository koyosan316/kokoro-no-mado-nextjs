"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 元のクイズデータ（ここでのanswerは「options配列の何番目か」を指す）
const rawQuizData = [
  { category: "🧠 メンタル", question: "過去のつらい出来事が、今の出来事のように急に強くよみがえる現象を何と呼びますか？", options: ["フラッシュバック", "解離", "過覚醒", "HSP"], answer: 0, rationale: "過去のトラウマ的な記憶が、リアルな感覚を伴って突然再体験される現象です。" },
  { category: "🧠 メンタル", question: "強いストレス下で「現実感が遠くなる」「自分を外側から見ているような感覚」になる状態を何と言いますか？", options: ["フラッシュバック", "解離", "強迫症", "過覚醒"], answer: 1, rationale: "心が自分を守るために、一時的に意識や感覚を切り離して現実感を失わせる反応です。" },
  { category: "🧠 メンタル", question: "常に「戦闘モード」のように、些細な音や気配に過敏に反応し、眠りが浅くなる状態は何ですか？", options: ["社交不安", "HSP", "過覚醒", "解離"], answer: 2, rationale: "体と心が常に危険を警戒して休まらない状態で、強いストレス下で起こりやすい反応です。" },
  { category: "🧠 メンタル", question: "不安を抑えるために、戸締まりの確認や手洗いを何度も繰り返してしまう状態を何と呼びますか？", options: ["強迫症", "HSP", "解離", "社交不安"], answer: 0, rationale: "自分でもやりすぎだと分かっていても、不安を解消するための儀式的な行動を止められない状態です。" },
  { category: "🧠 メンタル", question: "音や光、人の機謙の変化などに非常に敏感な「気質」を指す言葉は何ですか？", options: ["PTSD", "HSP", "過覚醒", "強迫症"], answer: 1, rationale: "「非常に敏感な人」を指す概念で、病気ではなく生まれ持った個性として捉えられます。" },
  { category: "⚖️ 社会・法律", question: "立場や力の差を利用して精神的・身体的苦痛を与える「ハラスメント」を何と言いますか？", options: ["セクハラ", "パワハラ", "モラハラ", "ヤングケアラー"], answer: 1, rationale: "パワーハラスメントの略で、優越的な関係を背景に苦痛を与える行為です。" },
  { category: "⚖️ 社会・法律", question: "学校がいじめを防止し、事実関係を調査する責任があることを定めた法律は何ですか？", options: ["個人情報保護法", "労働基準法", "いじめ防止対策推進法", "児童虐待防止法"], answer: 2, rationale: "いじめを学校全体の問題として捉え、早期発見や組織的な対応を義務付けている法律です。" },
  { category: "⚖️ 社会・法律", question: "性的な言動や不適切な接触によって、相手を不快にさせるハラスメントは何ですか？", options: ["セクシャルハラスメント", "パワーハラスメント", "ネットいじめ", "同調圧力"], answer: 0, rationale: "性別に基づく不快な発言や接触、画像の要求などが含まれるハラスメントです。" },
  { category: "⚖️ 社会・法律", question: "本人に許可なく個人的な画像や動画をネットに公開・拡散する深刻なトラブルを何と言いますか？", options: ["デジタルタトゥー", "リベンジポルノ", "なりすまし", "スクショ晒し"], answer: 1, rationale: "相手を傷つける目的などで性的な画像を公開する行為で、法律で厳しく禁じられています。" },
  { category: "⚖️ 社会・法律", question: "本来は大人が担うような家族の介護や家事、世話を日常的に行っている若者を何と言いますか？", options: ["スクールカースト", "ヤングケアラー", "HSP", "ボランティア"], answer: 1, rationale: "家族の世話をすることで、自身の学習や生活に影響が出ている若者を指します。" },
  { category: "🏫 学校", question: "クラスの中で「人気グループ」や「目立たないグループ」といった見えない序列ができる状態を何と言いますか？", options: ["同調圧力", "スクールカースト", "モラハラ", "過覚醒"], answer: 1, rationale: "学校内の集団における地位の序列を、カースト制度になぞらえた言葉です。" },
  { category: "🏫 学校", question: "友達関係で、冗談のように見せかけていつも見下したり、行動を制限したりすることを何と言いますか？", options: ["パワハラ", "モラルハラスメント", "HSP", "DX"], answer: 1, rationale: "「見えない支配」として現れることがあり、自分が悪いと思い込まされやすい関係性です。" },
  { category: "🏫 学校", question: "「みんなと同じでいないといけない」「浮いたらまずい」と感じる見えないプレッシャーは何ですか？", options: ["社交不安", "同調圧力", "いじめ防止法", "スクールカースト"], answer: 1, rationale: "多数派の意見や行動に合わせるよう、暗黙のうちに強いる集団の圧力です。" },
  { category: "🏫 学校", question: "先生の指導が「成長のため」の範囲を超え、人格を否定したり暴力を伴ったりする場合、何に該当しますか？", options: ["正当な指導", "ハラスメント（体罰等）", "同調圧力", "過覚醒"], answer: 1, rationale: "言い方や頻度、場所などが不適切であれば、指導ではなくハラスメントや違法行為とみなされます。" },
  { category: "🏫 学校", question: "授業で当てられるのが極端にこわい、人前で手が震えるなど、場面がつらくなる状態は何ですか？", options: ["強迫症", "社交不安", "同調圧力", "スクールカースト"], answer: 1, rationale: "他人からどう見られるかに対する不安が非常に強くなっている状態です。" },
  { category: "🌐 ネット", question: "SNSの会話を許可なく画像に撮り、他の人に見せたり公開したりする行為を何と言いますか？", options: ["デジタルタトゥー", "スクショ晒し", "リベンジポルノ", "なりすまし"], answer: 1, rationale: "プライバシーを侵害したり、悪意ある共有をしたりする「晒し」行為です。" },
  { category: "🌐 ネット", question: "ネットに一度アップされた情報は完全には消えにくいことを、何と言いますか？", options: ["なりすまし", "デジタルタトゥー", "過覚醒", "スクショ晒し"], answer: 1, rationale: "消えない刺青のように、ネット上の情報は拡散・保存され続けるという概念です。" },
  { category: "🌐 ネット", question: "SNS等で、他人の名前やアイコンを似せて本人のように振る舞う偽アカウントを何と言いますか？", options: ["デジタルタトゥー", "なりすまし", "同調圧力", "スマホ疲れ"], answer: 1, rationale: "本人を装って嫌がらせをしたり、情報を引き出したりするトラブルです。" },
  { category: "🌐 ネット", question: "SNSの通知や返信、他人との比較で心が慢性的に疲れる状態を何と言いますか？", options: ["なりすまし", "スマホ疲れ", "解離", "スクールカースト"], answer: 1, rationale: "通知への緊張や、キラキラした投稿との比較で心が消耗する状態です。" },
  { category: "🌐 ネット", question: "ネット上で、匿名だと罪悪感が薄れ、多数の人が一斉に攻撃に加わってしまう心理を何と言いますか？", options: ["群集心理", "デジタルタトゥー", "なりすまし", "HSP"], answer: 0, rationale: "他人の攻撃に便乗し、自分の正義感を盾に攻撃を正当化してしまう傾向です。" },
  { category: "🏠 家庭", question: "親の機嫌を常にうかがい、自分の気持ちを後回しにして生活することを何と呼びますか？", options: ["社交不安", "家族依存（共依存的）", "強迫症", "過覚醒"], answer: 1, rationale: "家族の感情に自分の幸せが支配され、無理をして合わせ続けてしまう状態です。" },
  { category: "🏠 家庭", question: "夜眠れない、イライラしやすいなど、家庭のストレスが学校生活に現れるのは、本人の努力不足ですか？", options: ["はい。努力不足。", "いいえ。環境の負荷。", "はい。甘えである。", "はい。忘れるべき。"], answer: 1, rationale: "環境による負荷は心身の自然な反応であり、努力だけで制御できるものではありません。" },
  { category: "🏠 家庭", question: "親の気分で対応が変わる家庭で起こりやすい傾向は何ですか？", options: ["相談しやすい", "SOSが出しにくい", "ネットが詳しくなる", "世話がなくなる"], answer: 1, rationale: "本音を言うと責められる不安や、空気を壊したくない思いから、助けを求めにくくなります。" },
  { category: "🏠 家庭", question: "頑張り屋の子ほど、限界まで我慢して「助けて」が言えなくなるのはなぜですか？", options: ["助けが不要だから", "家族に迷惑をかけたくないから", "社交不安だから", "HSPだから"], answer: 1, rationale: "家族への優しさや責任感が強すぎて、自分のしんどさを隠してしまうことが多いためです。" },
  { category: "🏠 家庭", question: "自分や誰かが困っているとき、相談することについて正しい考え方はどれですか？", options: ["弱さである", "自分を守る行動である", "一度に全部話す", "自力解決が一番"], answer: 1, rationale: "相談は状況を悪化させず、自分を安全に守るための前向きな勇気ある行動です。" }
];

// 配列をシャッフルするヘルパー関数
const shuffleArray = <T,>(array: T[]): T[] => {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

const QuizMode = () => {
  const router = useRouter(); // ホームボタン用
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  
  // シャッフルされたクイズデータを保持するState
  const [shuffledQuizzes, setShuffledQuizzes] = useState<typeof rawQuizData>([]);

  // ジャンル一覧
  const categories = useMemo(() => {
    const set = new Set(rawQuizData.map(q => q.category));
    return Array.from(set);
  }, []);

  // ジャンル選択時：問題と選択肢の両方をシャッフルしてセット
  useEffect(() => {
    if (selectedCategory) {
      const filtered = selectedCategory === "全ジャンル" 
        ? rawQuizData 
        : rawQuizData.filter(q => q.category === selectedCategory);

      // 1. 問題の順番をシャッフル
      const shuffledQuestions = shuffleArray(filtered).map(q => {
        // 2. 各問題の選択肢をシャッフル
        const correctText = q.options[q.answer]; // 正解の文字列を退避
        const shuffledOptions = shuffleArray(q.options);
        const newAnswerIdx = shuffledOptions.indexOf(correctText); // シャッフル後の正解位置を探す
        return { ...q, options: shuffledOptions, answer: newAnswerIdx };
      });

      setShuffledQuizzes(shuffledQuestions);
    }
  }, [selectedCategory]);

  const handleAnswerClick = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    if (index === shuffledQuizzes[currentQuestionIdx].answer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    if (currentQuestionIdx + 1 < shuffledQuizzes.length) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setSelectedCategory(null);
    setCurrentQuestionIdx(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setShuffledQuizzes([]);
  };

  // --- 1. ジャンル選択画面 ---
  if (!selectedCategory) {
    return (
      <div className="w-full max-w-2xl mx-auto mt-10 p-6 space-y-8">
        {/* ホームボタン */}
        <div className="flex justify-start">
          <button 
            onClick={() => router.push('/')}
            className="flex items-center text-gray-400 hover:text-gray-800 transition-colors font-bold text-sm"
          >
            ← ホームに戻る
          </button>
        </div>

        <div className="text-center space-y-4">
          <h1 className="text-3xl font-black text-gray-800 italic uppercase tracking-tighter">Quiz Challenge</h1>
          <p className="text-gray-500 font-medium">学びたいジャンルを選んでください</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => setSelectedCategory("全ジャンル")}
            className="p-6 bg-blue-600 text-white rounded-[2rem] font-black text-xl shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all hover:-translate-y-1"
          >
            🔥 全ジャンルに挑戦！
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="p-6 bg-white border-2 border-gray-100 text-gray-700 rounded-[2rem] font-bold text-lg shadow-sm hover:border-blue-400 hover:bg-blue-50 transition-all hover:-translate-y-1"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // データ準備中
  if (shuffledQuizzes.length === 0) return null;

  // --- 2. 結果表示画面 ---
  if (showResult) {
    return (
      <div className="w-full max-w-lg mx-auto mt-20 p-10 bg-white rounded-[3rem] shadow-2xl text-center border-b-[12px] border-blue-600">
        <div className="text-6xl mb-6">🏁</div>
        <h2 className="text-2xl font-black mb-2 text-gray-800">{selectedCategory} 完了！</h2>
        <div className="my-8 p-6 bg-blue-50 rounded-3xl">
          <p className="text-blue-400 font-black text-xs uppercase tracking-widest mb-1">Total Score</p>
          <div className="text-7xl font-black text-blue-600 italic">
            {score}<span className="text-2xl text-blue-200 not-italic ml-2">/ {shuffledQuizzes.length}</span>
          </div>
        </div>
        <button 
          onClick={resetQuiz} 
          className="w-full py-5 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-lg active:scale-95"
        >
          クイズメニューに戻る
        </button>
      </div>
    );
  }

  // --- 3. クイズ進行画面 ---
  const q = shuffledQuizzes[currentQuestionIdx];
  const progress = ((currentQuestionIdx + 1) / shuffledQuizzes.length) * 100;
  const isCorrect = selectedAnswer === q.answer;

  return (
    <div className="p-4 w-full max-w-2xl mx-auto space-y-6 min-h-screen">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <button 
            onClick={resetQuiz}
            className="text-xs font-black text-gray-300 hover:text-red-400 transition-colors uppercase tracking-widest"
          >
            [ もどる ]
          </button>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-blue-600 text-white rounded-full font-black text-[10px] uppercase tracking-tighter">{q.category}</span>
            <span className="text-sm font-black text-gray-400">{currentQuestionIdx + 1} / {shuffledQuizzes.length}</span>
          </div>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full transition-all duration-700 ease-out" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-xl p-8 md:p-10 space-y-8 border border-gray-50">
        <h3 className="text-2xl md:text-3xl font-black text-gray-800 leading-tight">
          {q.question}
        </h3>

        <div className="grid grid-cols-1 gap-3">
          {q.options.map((option, index) => {
            let style = "bg-white border-gray-100 text-gray-600 hover:border-blue-200 hover:bg-blue-50";
            if (selectedAnswer !== null) {
              if (index === q.answer) {
                style = "bg-green-500 border-green-500 text-white font-bold shadow-lg shadow-green-100 scale-[1.02]";
              } else if (index === selectedAnswer) {
                style = "bg-red-500 border-red-500 text-white font-bold shadow-lg shadow-red-100";
              } else {
                style = "bg-gray-50 border-gray-50 opacity-40 text-gray-300";
              }
            }

            return (
              <button
                key={`${currentQuestionIdx}-${index}`}
                disabled={selectedAnswer !== null}
                onClick={() => handleAnswerClick(index)}
                className={`w-full flex items-center p-5 text-left border-2 rounded-2xl transition-all duration-300 ${style}`}
              >
                <span className={`w-8 h-8 shrink-0 flex items-center justify-center rounded-full mr-4 font-black text-sm ${selectedAnswer !== null && (index === q.answer || index === selectedAnswer) ? 'bg-white/20' : 'bg-gray-100 text-gray-400'}`}>
                  {index + 1}
                </span>
                <span className="text-lg font-bold">{option}</span>
              </button>
            );
          })}
        </div>

        {selectedAnswer !== null && (
          <div className={`mt-8 p-8 rounded-[2rem] border-2 animate-in fade-in zoom-in-95 duration-500 ${isCorrect ? "bg-green-50/50 border-green-100" : "bg-red-50/50 border-red-100"}`}>
            <div className="space-y-4">
              <p className={`font-black text-2xl ${isCorrect ? "text-green-600" : "text-red-600"}`}>
                {isCorrect ? "正解" : "不正解"}
              </p>
              <p className="text-gray-600 font-bold leading-relaxed">{q.rationale}</p>
              <button 
                onClick={nextQuestion} 
                className="w-full py-4 bg-white border-2 border-gray-200 rounded-2xl font-black text-gray-800 hover:bg-gray-100 transition-all shadow-sm active:scale-95"
              >
                {currentQuestionIdx + 1 === shuffledQuizzes.length ? " 結果を見る" : "次の問題へ ➔"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizMode;