import React, { useState } from 'react';
import { BrandCollab, CreatorProfile } from '../types';
import { Award, Sparkles, Send, CheckCircle2, TrendingUp, Users, MapPin, DollarSign, ExternalLink } from 'lucide-react';

interface BrandCollabsProps {
  collabs: BrandCollab[];
  profile: CreatorProfile;
  lang: 'zh' | 'en';
}

export const BrandCollabs: React.FC<BrandCollabsProps> = ({ collabs, profile, lang }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [brandForm, setBrandForm] = useState({
    companyName: '',
    contactName: '',
    email: '',
    budget: '50k-100k RMB',
    notes: '',
  });

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandForm.companyName || !brandForm.email) return;
    setFormSubmitted(true);
  };

  return (
    <section className="space-y-10">
      {/* Media Kit Overview Dashboard */}
      <div className="bg-[#141414] text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden border border-stone-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full filter blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/30 text-[10px] font-mono tracking-widest uppercase">
            <Award className="w-3.5 h-3.5 text-rose-400" />
            <span>{lang === 'zh' ? '官方媒体刊例 2026' : 'Official Media Kit 2026'}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <h2 className="text-3xl sm:text-4xl font-serif font-light text-stone-100 leading-tight italic">
                {lang === 'zh' ? '赋能品牌生态 传递高智感审美' : 'Elevating Brands Through Aesthetic Storytelling'}
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans font-light">
                {lang === 'zh'
                  ? '专注于为美妆香氛、极简数码、生活家居与高端时尚品牌提供深度的图文爆款策划与商业视觉拍摄。'
                  : 'Specialized in viral content strategy, visual direction, and long-term brand partnerships on Xiaohongshu.'}
              </p>
            </div>

            {/* Quick Demographics Cards */}
            <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
              <div className="bg-stone-900/90 p-4 rounded-2xl border border-stone-800 text-center">
                <Users className="w-4 h-4 text-rose-400 mx-auto mb-1" />
                <p className="text-[9px] text-stone-400 font-mono tracking-widest uppercase">{lang === 'zh' ? '女性受众占比' : 'Female Audience'}</p>
                <p className="text-xl font-serif italic text-stone-100 mt-1">84.2%</p>
              </div>

              <div className="bg-stone-900/90 p-4 rounded-2xl border border-stone-800 text-center">
                <MapPin className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                <p className="text-[9px] text-stone-400 font-mono tracking-widest uppercase">{lang === 'zh' ? '一线/新一线城市' : 'Tier-1 Cities'}</p>
                <p className="text-xl font-serif italic text-stone-100 mt-1">76.8%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Brand Collabs Showcase */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 border-b border-stone-200/80 pb-4">
          <Sparkles className="w-4 h-4 text-rose-600" />
          <h3 className="text-2xl font-serif font-light text-stone-900 italic">
            {lang === 'zh' ? '标杆品牌合作案例' : 'Selected Past Campaigns'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collabs.map((collab) => (
            <div key={collab.id} className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-xs space-y-4 p-5 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-full bg-stone-100 text-stone-700">
                    {collab.category}
                  </span>
                  <span className="text-xs text-rose-600 font-mono font-semibold">
                    ROI {collab.engagementRate}
                  </span>
                </div>

                <div className="aspect-[16/9] rounded-xl overflow-hidden bg-stone-100">
                  <img src={collab.coverImage} alt={collab.brandName} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </div>

                <h4 className="text-base font-serif font-medium text-stone-900 leading-snug">
                  {collab.brandName} - {collab.campaignTitle}
                </h4>

                <p className="text-xs text-stone-500 font-mono">
                  {collab.deliverables}
                </p>

                {collab.quote && (
                  <blockquote className="text-xs italic font-serif text-stone-600 bg-stone-50/80 p-3 rounded-xl border-l-2 border-rose-500">
                    "{collab.quote}"
                  </blockquote>
                )}
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600 font-mono">
                <span>曝光量: {collab.impressions}</span>
                <span className="text-emerald-600 font-semibold">已认证案例</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Brand Collaboration Inquiry Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xs max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-2xl sm:text-3xl font-serif text-stone-900 italic">
            {lang === 'zh' ? '发起商务合作咨询' : 'Book a Collaboration / Request Rates'}
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 font-sans font-light">
            {lang === 'zh'
              ? '请填写以下信息，商务团队将在 24 小时内与您取得联系并提供最新刊例。'
              : 'Please submit your brand proposal to receive our latest media kit and availability.'}
          </p>
        </div>

        {formSubmitted ? (
          <div className="p-8 bg-stone-50 rounded-2xl border border-stone-200 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h4 className="font-serif italic text-stone-900 text-lg">
              {lang === 'zh' ? '合作意向已成功提交！' : 'Inquiry Submitted Successfully!'}
            </h4>
            <p className="text-xs text-stone-600 font-sans font-light">
              {lang === 'zh'
                ? '感谢您的信任，我们已收到信息并会尽快通过邮件与微信回复您。'
                : 'Thank you! We will get back to you within 24 hours.'}
            </p>
            <button
              onClick={() => setFormSubmitted(false)}
              className="text-xs text-rose-600 font-mono tracking-wider uppercase underline mt-2 cursor-pointer"
            >
              {lang === 'zh' ? '提交另一个咨询' : 'Submit another request'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmitInquiry} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono tracking-wider uppercase text-stone-700 mb-1">
                  {lang === 'zh' ? '品牌 / 公司名称 *' : 'Brand Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={brandForm.companyName}
                  onChange={(e) => setBrandForm({ ...brandForm, companyName: e.target.value })}
                  placeholder="e.g. Aesop / Apple"
                  className="w-full px-4 py-2.5 rounded-full border border-stone-300 text-xs text-stone-800 focus:outline-none focus:border-stone-900 font-sans"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono tracking-wider uppercase text-stone-700 mb-1">
                  {lang === 'zh' ? '联系人姓名 *' : 'Contact Person *'}
                </label>
                <input
                  type="text"
                  required
                  value={brandForm.contactName}
                  onChange={(e) => setBrandForm({ ...brandForm, contactName: e.target.value })}
                  placeholder="e.g. Sarah"
                  className="w-full px-4 py-2.5 rounded-full border border-stone-300 text-xs text-stone-800 focus:outline-none focus:border-stone-900 font-sans"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono tracking-wider uppercase text-stone-700 mb-1">
                  {lang === 'zh' ? '商务邮箱 *' : 'Business Email *'}
                </label>
                <input
                  type="email"
                  required
                  value={brandForm.email}
                  onChange={(e) => setBrandForm({ ...brandForm, email: e.target.value })}
                  placeholder="name@brand.com"
                  className="w-full px-4 py-2.5 rounded-full border border-stone-300 text-xs text-stone-800 focus:outline-none focus:border-stone-900 font-sans"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono tracking-wider uppercase text-stone-700 mb-1">
                  {lang === 'zh' ? '合作预算区间' : 'Budget Range'}
                </label>
                <select
                  value={brandForm.budget}
                  onChange={(e) => setBrandForm({ ...brandForm, budget: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-full border border-stone-300 text-xs text-stone-800 focus:outline-none focus:border-stone-900 bg-white font-sans"
                >
                  <option value="20k-50k">20,000 - 50,000 RMB</option>
                  <option value="50k-100k">50,000 - 100,000 RMB</option>
                  <option value="100k+">100,000+ RMB</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono tracking-wider uppercase text-stone-700 mb-1">
                {lang === 'zh' ? '项目需求与投放时间' : 'Campaign Notes & Launch Timeline'}
              </label>
              <textarea
                rows={3}
                value={brandForm.notes}
                onChange={(e) => setBrandForm({ ...brandForm, notes: e.target.value })}
                placeholder={lang === 'zh' ? '请简述产品特色与预期投放节点...' : 'Briefly describe campaign goals...'}
                className="w-full px-4 py-3 rounded-2xl border border-stone-300 text-xs text-stone-800 focus:outline-none focus:border-stone-900 font-sans"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-[#141414] hover:bg-stone-800 text-white font-mono text-xs tracking-[0.2em] uppercase transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'zh' ? '提交合作意向单' : 'Submit Brand Proposal'}</span>
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
