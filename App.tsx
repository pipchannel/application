
import React, { useState, useMemo, useEffect } from 'react';
import { FOOD_INGREDIENTS, DESSERT_INGREDIENTS, TIME_OPTIONS } from './constants';
import { Recipe, FoodType } from './types';
import { getRecipeSuggestions } from './services/geminiService';
import RecipeCard from './components/RecipeCard';
import { 
  UtensilsCrossed, 
  CakeSlice, 
  Search, 
  X, 
  Loader2, 
  Sparkles, 
  ChevronLeft,
  Undo2,
  Flame,
  Clock,
  CheckCircle2,
  Moon,
  Sun,
  Users,
  User,
  Plus,
  Minus
} from 'lucide-react';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [selectedType, setSelectedType] = useState<FoodType>(null);
  const [servings, setServings] = useState<number>(2);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [timeLimit, setTimeLimit] = useState<number>(60);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const activeIngredientList = selectedType === 'main_course' ? FOOD_INGREDIENTS : DESSERT_INGREDIENTS;

  const toggleIngredient = (name: string) => {
    setSelectedIngredients(prev =>
      prev.includes(name) ? prev.filter(i => i !== name) : [...prev, name]
    );
  };

  const filteredCategories = useMemo(() => {
    if (!searchTerm) return activeIngredientList;
    return activeIngredientList.map(cat => ({
      ...cat,
      items: cat.items.filter(item => item.name.includes(searchTerm))
    })).filter(cat => cat.items.length > 0);
  }, [searchTerm, activeIngredientList]);

  const handleTypeSelect = (type: FoodType) => {
    setSelectedType(type);
    setCurrentStep(2);
    setError(null);
  };

  const handleServingsConfirm = () => {
    setCurrentStep(3);
  };

  const handleGenerate = async () => {
    if (selectedIngredients.length < 2) {
      setError("برای یک پیشنهاد خوب، حداقل ۲ ماده را انتخاب کنید.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const results = await getRecipeSuggestions(selectedIngredients, timeLimit, selectedType, servings);
      setRecipes(results);
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } catch (err) {
      setError("مشکلی در ارتباط با آشپزخانه هوشمند پیش آمد!");
    } finally {
      setLoading(false);
    }
  };

  const adjustServings = (val: number) => {
    setServings(prev => Math.max(1, Math.min(20, prev + val)));
  };

  return (
    <div className="min-h-screen transition-colors duration-300">
      <div className="fixed -top-24 -right-24 w-96 h-96 bg-orange-100 dark:bg-orange-900/10 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      <div className="fixed -bottom-24 -left-24 w-96 h-96 bg-amber-100 dark:bg-amber-900/10 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

      <header className="sticky top-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-orange-50/50 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-orange-500 to-amber-500 p-2.5 rounded-2xl shadow-xl shadow-orange-200 dark:shadow-none">
              <Flame className="text-white w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-gray-800 dark:text-gray-100">
              آشپزباشی <span className="text-orange-600">هوشمند</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleTheme}
              className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all shadow-sm"
              aria-label="تغییر تم"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            
            {currentStep > 1 && (
              <button 
                onClick={() => setCurrentStep((currentStep - 1) as any)}
                className="flex items-center gap-2 text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors bg-gray-100/50 dark:bg-gray-800/50 px-4 py-3 rounded-xl"
              >
                <Undo2 className="w-4 h-4" />
                <span className="hidden sm:inline">بازگشت</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 relative">
        
        {/* Step 1: Type Selection */}
        {currentStep === 1 && (
          <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-gray-100">امروز تو چه فکری هستی؟</h2>
              <p className="text-gray-500 dark:text-gray-400 text-lg">برای شروع، سبک آشپزی خودت رو انتخاب کن</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <button 
                onClick={() => handleTypeSelect('main_course')}
                className="group relative bg-white dark:bg-gray-900 p-10 rounded-[3rem] shadow-2xl shadow-orange-100/50 dark:shadow-black/20 border-2 border-transparent hover:border-orange-500 transition-all duration-500 text-right overflow-hidden"
              >
                <div className="absolute -left-10 -top-10 w-40 h-40 bg-orange-50 dark:bg-orange-950/30 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                <div className="relative z-10 flex flex-col items-end gap-6">
                  <div className="bg-orange-500 p-6 rounded-[2rem] text-white shadow-xl shadow-orange-200 dark:shadow-none group-hover:rotate-12 transition-transform">
                    <UtensilsCrossed className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-gray-800 dark:text-gray-100 mb-2">غذاهای اصلی</h3>
                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed">خورشت‌ها، پلوها، فست‌فود و غذاهای نونی برای وعده‌های اصلی</p>
                  </div>
                  <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 font-bold">
                    <span>انتخاب این بخش</span>
                    <ChevronLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
                  </div>
                </div>
              </button>

              <button 
                onClick={() => handleTypeSelect('dessert')}
                className="group relative bg-white dark:bg-gray-900 p-10 rounded-[3rem] shadow-2xl shadow-amber-100/50 dark:shadow-black/20 border-2 border-transparent hover:border-amber-500 transition-all duration-500 text-right overflow-hidden"
              >
                <div className="absolute -left-10 -top-10 w-40 h-40 bg-amber-50 dark:bg-amber-950/30 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                <div className="relative z-10 flex flex-col items-end gap-6">
                  <div className="bg-amber-500 p-6 rounded-[2rem] text-white shadow-xl shadow-amber-200 dark:shadow-none group-hover:-rotate-12 transition-transform">
                    <CakeSlice className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-gray-800 dark:text-gray-100 mb-2">کیک و شیرینی</h3>
                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed">انواع کیک خانگی، کلوچه، دسرهای سرد و شیرینی‌های سنتی</p>
                  </div>
                  <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold">
                    <span>انتخاب این بخش</span>
                    <ChevronLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Servings Selection */}
        {currentStep === 2 && (
          <div className="max-w-xl mx-auto space-y-12 animate-in fade-in zoom-in duration-500">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-black text-gray-900 dark:text-gray-100">برای چند نفر می‌پزی؟</h2>
              <p className="text-gray-500 dark:text-gray-400 text-lg">آشپزباشی مقدار مواد رو بر اساس تعداد تنظیم می‌کنه</p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-12 rounded-[3rem] shadow-2xl border border-orange-50/50 dark:border-gray-800 text-center space-y-10 transition-colors duration-300">
              <div className="flex items-center justify-center gap-8">
                <button 
                  onClick={() => adjustServings(-1)}
                  className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-orange-500 hover:text-white transition-all shadow-sm"
                >
                  <Minus className="w-8 h-8" />
                </button>
                <div className="flex flex-col items-center min-w-32">
                  <span className="text-7xl font-black text-orange-600 dark:text-orange-500">{servings}</span>
                  <span className="text-gray-400 font-bold uppercase tracking-widest mt-2">نفر</span>
                </div>
                <button 
                  onClick={() => adjustServings(1)}
                  className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-orange-500 hover:text-white transition-all shadow-sm"
                >
                  <Plus className="w-8 h-8" />
                </button>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                {[1, 2, 4, 6, 10].map(num => (
                  <button
                    key={num}
                    onClick={() => setServings(num)}
                    className={`px-6 py-3 rounded-xl font-bold transition-all ${
                      servings === num 
                        ? 'bg-gray-900 dark:bg-orange-600 text-white shadow-lg' 
                        : 'bg-gray-50 dark:bg-gray-800 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {num === 10 ? '۱۰+ نفر' : `${num} نفر`}
                  </button>
                ))}
              </div>

              <div className="flex justify-center">
                <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-2xl inline-flex items-center gap-3 text-orange-600 dark:text-orange-400 font-bold">
                  {servings <= 2 ? <User className="w-6 h-6" /> : <Users className="w-6 h-6" />}
                  <span>{servings > 5 ? 'یک مهمانی عالی در پیش داری!' : 'یک وعده گرم و لذیذ'}</span>
                </div>
              </div>

              <button
                onClick={handleServingsConfirm}
                className="w-full py-5 rounded-2xl bg-gray-900 dark:bg-orange-600 text-white font-black text-xl shadow-xl hover:scale-105 transition-transform"
              >
                تایید و ادامه
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Ingredient Selection */}
        {currentStep === 3 && (
          <div className="flex flex-col lg:flex-row gap-10 animate-in fade-in slide-in-from-left-8 duration-700">
            <aside className="w-full lg:w-80 shrink-0 space-y-6">
              <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] shadow-xl border border-orange-50/50 dark:border-gray-800 sticky top-28 transition-colors duration-300">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl text-white ${selectedType === 'main_course' ? 'bg-orange-500' : 'bg-amber-500'}`}>
                      {selectedType === 'main_course' ? <UtensilsCrossed className="w-5 h-5" /> : <CakeSlice className="w-5 h-5" />}
                    </div>
                    <span className="font-black text-gray-800 dark:text-gray-100">
                      {selectedType === 'main_course' ? 'منوی غذا' : 'منوی شیرینی'}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-orange-500 bg-orange-50 dark:bg-orange-950/30 px-2 py-1 rounded-lg">
                    {servings} نفر
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest block">زمان پخت</label>
                    <div className="grid grid-cols-1 gap-2">
                      {TIME_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => setTimeLimit(opt.value)}
                          className={`flex items-center justify-between p-3 rounded-2xl text-sm font-bold transition-all ${
                            timeLimit === opt.value
                              ? 'bg-gray-900 dark:bg-orange-600 text-white shadow-lg translate-x-1'
                              : 'bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 opacity-50" />
                            <span>{opt.label}</span>
                          </div>
                          {timeLimit === opt.value && <ChevronLeft className="w-4 h-4" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
                    <button
                      onClick={handleGenerate}
                      disabled={loading || selectedIngredients.length < 2}
                      className={`w-full py-5 rounded-[1.5rem] font-black text-lg shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-3 ${
                        selectedType === 'main_course' 
                        ? 'bg-orange-500 text-white shadow-orange-200 dark:shadow-none hover:bg-orange-600' 
                        : 'bg-amber-500 text-white shadow-amber-200 dark:shadow-none hover:bg-amber-600'
                      } disabled:bg-gray-200 dark:disabled:bg-gray-800 disabled:text-gray-400 dark:disabled:text-gray-600 disabled:shadow-none disabled:cursor-not-allowed`}
                    >
                      {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <><Sparkles className="w-5 h-5" /> شروع جادو</>}
                    </button>
                    {error && <p className="text-red-500 dark:text-red-400 text-[10px] mt-4 font-bold text-center">{error}</p>}
                  </div>
                </div>
              </div>
            </aside>

            <div className="flex-1 space-y-8">
              <div className="relative group">
                <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 dark:text-gray-600 w-6 h-6 group-focus-within:text-orange-500 transition-colors" />
                <input
                  type="text"
                  placeholder="جستجو در لیست مواد اولیه..."
                  className="w-full bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 focus:border-orange-200 dark:focus:border-orange-900/50 focus:ring-8 focus:ring-orange-50 dark:focus:ring-orange-900/10 rounded-[2rem] py-5 pr-16 pl-6 outline-none transition-all shadow-sm font-bold text-lg text-gray-800 dark:text-gray-100"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="bg-white dark:bg-gray-900 p-6 md:p-10 rounded-[3rem] shadow-xl border border-gray-50 dark:border-gray-800 space-y-12 transition-colors duration-300">
                {filteredCategories.length > 0 ? filteredCategories.map((cat) => (
                  <div key={cat.title} className="space-y-6">
                    <h3 className="text-xl font-black text-gray-800 dark:text-gray-100 flex items-center gap-3">
                      <div className={`w-2 h-6 rounded-full ${selectedType === 'main_course' ? 'bg-orange-500' : 'bg-amber-500'}`}></div>
                      {cat.title}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {cat.items.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => toggleIngredient(item.name)}
                          className={`px-5 py-3 rounded-2xl text-sm font-bold transition-all duration-300 border-2 flex items-center gap-2 ${
                            selectedIngredients.includes(item.name)
                              ? (selectedType === 'main_course' ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-100 dark:shadow-none' : 'bg-amber-500 border-amber-500 text-white shadow-lg shadow-amber-100 dark:shadow-none')
                              : 'bg-gray-50 dark:bg-gray-800 border-transparent text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-700 hover:border-gray-200 dark:hover:border-gray-600'
                          }`}
                        >
                          {item.name}
                          {selectedIngredients.includes(item.name) && <CheckCircle2 className="w-4 h-4 fill-white text-transparent" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-20 text-gray-400 dark:text-gray-600">
                    <X className="w-12 h-12 mx-auto mb-4 opacity-20" />
                    <p className="text-lg">موردی یافت نشد!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Results Section */}
        <section id="results" className="mt-24 scroll-mt-28">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-40 space-y-8 animate-pulse">
              <div className="w-24 h-24 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
                <UtensilsCrossed className="w-10 h-10 text-orange-500 animate-bounce" />
              </div>
              <h3 className="text-2xl font-black text-gray-800 dark:text-gray-200">آشپزباشی در حال بررسی یخچال شما...</h3>
            </div>
          ) : recipes.length > 0 ? (
            <div className="space-y-12 animate-in fade-in zoom-in duration-1000">
              <div className="flex items-center justify-center gap-4">
                <div className="h-px w-20 bg-gray-200 dark:bg-gray-800"></div>
                <h2 className="text-3xl font-black text-gray-900 dark:text-gray-100">منوی پیشنهادی برای {servings} نفر</h2>
                <div className="h-px w-20 bg-gray-200 dark:bg-gray-800"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recipes.map((recipe, index) => (
                  <RecipeCard key={index} recipe={recipe} />
                ))}
              </div>
            </div>
          ) : null}
        </section>
      </main>

      <footer className="mt-40 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 py-16 text-center transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-6">
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-full">
            <Sparkles className="w-6 h-6 text-orange-500" />
          </div>
          <p className="text-gray-400 dark:text-gray-500 font-bold">طراحی شده با استفاده از هوش مصنوعی قدرتمند Google Gemini</p>
          <div className="flex gap-4">
             <div className="w-8 h-8 rounded-full bg-orange-50 dark:bg-orange-900/20"></div>
             <div className="w-8 h-8 rounded-full bg-amber-50 dark:bg-amber-900/20"></div>
             <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/40"></div>
          </div>
        </div>
      </footer>

      {currentStep === 3 && selectedIngredients.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-lg bg-gray-900/95 dark:bg-black/95 backdrop-blur-xl text-white p-5 rounded-[2rem] shadow-2xl flex items-center gap-4 z-50 lg:hidden">
          <div className="flex-1 overflow-x-auto whitespace-nowrap flex gap-2 no-scrollbar px-2">
            {selectedIngredients.map(ing => (
              <span key={ing} className="bg-white/10 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2">
                {ing}
                <X className="w-3 h-3 text-orange-400 cursor-pointer" onClick={() => toggleIngredient(ing)} />
              </span>
            ))}
          </div>
          <button 
            onClick={handleGenerate}
            disabled={loading}
            className="bg-orange-500 text-white px-6 py-2 rounded-xl font-black text-sm whitespace-nowrap active:scale-95"
          >
            {loading ? '...' : 'بزن بریم!'}
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
