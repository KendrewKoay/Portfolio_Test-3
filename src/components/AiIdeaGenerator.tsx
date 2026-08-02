import React, { useState } from 'react';
import { Sparkles, Copy, Check, Lightbulb, Tag, Flame, RefreshCw, Send } from 'lucide-react';

interface AiIdeaGeneratorProps {
  lang: 'zh' | 'en';
}

export const AiIdeaGenerator: React.FC<AiIdeaGeneratorProps> = ({ lang }) => {
  const [topic, setTopic] = useState('');
  const [contentType, setContentType] = useState('干货测评 / Product Review');
  const [targetAudience, setTargetAudience] = useState('Z世代 / 极简美学爱好者');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [copiedTitleIndex, setCopiedTitleIndex] = useState<number | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/gemini/generate-ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topic || '极简桌搭与好物推荐',
          contentType,
          targetAudience,
          language: lang,
        }),
      });

      const json = await response.json();
      if (json.success) {
        setResult(json.data);
      } else {
        alert(json.error || 'Failed to generate ideas');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to AI service');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyTitle = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedTitleIndex(index);
    setTimeout(() => setCopiedTitleIndex(null), 2000);
  };

  return (
    <section className="space-y-8 max-w-4xl mx-auto">
      {/* Intro Header */}
      <div className="bg-[#141414] text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-stone-800">
        <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] uppercase text-amber-400 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>{lang === 'zh' ? '小红书 AI 爆款灵感生成器' : 'AI RED Viral Content Strategy Generator'}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-light text-stone-100 leading-tight italic">
          {lang === 'zh' ? '智能提炼高 CTR 标题与视觉方案' : 'Generate Viral Titles & Layout Hooks with AI'}
        </h2>
        <p className="text-xs sm:text-sm text-stone-300 mt-2 font-sans font-light leading-relaxed">
          {lang === 'zh'
            ? '结合博主小夕的极简美学风格与小红书官方推荐算法逻辑，一键生成高点击率爆款选题、排版大纲与热门标签。'
            : 'Leveraging Gemini AI to generate high-CTR titles, visual concepts, and viral hashtags in seconds.'}
        </p>
      </div>

      {/* Input Generator Form */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-6">
        <form onSubmit={handleGenerate} className="space-y-5">
          <div>
            <label className="block text-[11px] font-mono tracking-wider text-stone-700 uppercase mb-1.5">
              {lang === 'zh' ? '1. 选题 / 品牌产品名称 *' : '1. Topic / Product Name *'}
            </label>
            <input
              type="text"
              required
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder={lang === 'zh' ? '例: 沉浸式护眼台灯 / 侘寂风客厅改造 / 复古相机调色' : 'e.g. Minimalist desk lamp setup / Vintage camera preset'}
              className="w-full px-4 py-3 rounded-full border border-stone-300 text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-stone-900 font-sans"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono tracking-wider text-stone-700 uppercase mb-1.5">
                {lang === 'zh' ? '2. 笔记内容类型' : '2. Content Format'}
              </label>
              <select
                value={contentType}
                onChange={(e) => setContentType(e.target.value)}
                className="w-full px-4 py-3 rounded-full border border-stone-300 text-xs sm:text-sm text-stone-800 focus:outline-none focus:border-stone-900 bg-white font-sans"
              >
                <option value="干货测评 / Product Review">干货测评 / Product Review</option>
                <option value="沉浸式Vlog / Immersive Vlog">沉浸式Vlog / Immersive Vlog</option>
                <option value="设计教程 / Design Tutorial">设计教程 / Design Tutorial</option>
                <option value="审美改造 / Aesthetic Transformation">审美改造 / Aesthetic Transformation</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono tracking-wider text-stone-700 uppercase mb-1.5">
                {lang === 'zh' ? '3. 目标画像' : '3. Target Audience'}
              </label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full px-4 py-3 rounded-full border border-stone-300 text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-stone-900 font-sans"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-[#141414] hover:bg-stone-800 text-white font-mono text-xs tracking-[0.2em] uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>{lang === 'zh' ? 'AI 正在深度思考生成中...' : 'Gemini AI Generating...'}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>{lang === 'zh' ? '生成爆款方案' : 'Generate Content Hooks'}</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Generated Results Output Display */}
      {result && (
        <div className="bg-[#141414] text-stone-100 rounded-3xl p-6 sm:p-8 space-y-6 border border-stone-800 shadow-2xl animate-fade-in">
          <div className="flex items-center justify-between border-b border-stone-800 pb-4">
            <h3 className="font-serif italic text-xl text-white flex items-center gap-2">
              <Flame className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span>{lang === 'zh' ? 'AI 爆款企划方案' : 'AI Strategic Results'}</span>
            </h3>
            <span className="text-[10px] font-mono tracking-wider text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800 uppercase">
              Powered by Gemini 2.5
            </span>
          </div>

          {/* Titles Section */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-mono text-stone-400 uppercase tracking-[0.2em] flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'zh' ? '高点击率标题建议 (High-CTR Hooks)' : 'Suggested Viral Titles'}</span>
            </h4>
            <div className="space-y-2">
              {result.titles && result.titles.map((title: string, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-stone-900/90 border border-stone-800 hover:border-stone-700 transition-colors"
                >
                  <p className="text-sm font-serif italic text-stone-100 leading-snug">{title}</p>
                  <button
                    onClick={() => handleCopyTitle(title, index)}
                    className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors shrink-0 cursor-pointer"
                    title="Copy Title"
                  >
                    {copiedTitleIndex === index ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Cover Concept */}
          <div className="space-y-2">
            <h4 className="text-[10px] font-mono text-stone-400 uppercase tracking-[0.2em]">
              {lang === 'zh' ? '封面首图拍摄与构图指导' : 'Cover Visual Concept'}
            </h4>
            <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800 text-xs text-stone-300 leading-relaxed font-sans font-light">
              {result.coverConcept}
            </div>
          </div>

          {/* Outline & Hashtags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-[10px] font-mono text-stone-400 uppercase tracking-[0.2em]">
                {lang === 'zh' ? '正文骨架要点' : 'Content Highlights'}
              </h4>
              <ul className="list-disc list-inside text-xs text-stone-300 space-y-1.5 p-4 rounded-xl bg-stone-900/60 border border-stone-800 font-sans font-light">
                {result.contentOutline && result.contentOutline.map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-[10px] font-mono text-stone-400 uppercase tracking-[0.2em] flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-rose-400" />
                <span>{lang === 'zh' ? '高权重标签推荐' : 'Viral Hashtags'}</span>
              </h4>
              <div className="flex flex-wrap gap-1.5 p-4 rounded-xl bg-stone-900/60 border border-stone-800">
                {result.viralHashtags && result.viralHashtags.map((tag: string, idx: number) => (
                  <span key={idx} className="px-2.5 py-1 rounded-full bg-stone-800 text-stone-300 text-[10px] font-mono tracking-wider border border-stone-700">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
