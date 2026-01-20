
import React from 'react';
import { Recipe } from '../types';
import { Clock, BarChart, ChefHat, Info } from 'lucide-react';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className="group bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-xl border border-gray-50 dark:border-gray-800 overflow-hidden hover:shadow-2xl hover:shadow-orange-100 dark:hover:shadow-black transition-all duration-500 flex flex-col h-full">
      {/* Header Visual */}
      <div className="relative h-48 bg-gradient-to-tr from-orange-600 to-amber-400 p-8 flex flex-col justify-end overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
        <div className="relative z-10 space-y-2 text-right">
          <div className="flex items-center gap-2 justify-end">
            <span className="bg-white/20 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider border border-white/20">
              {recipe.difficulty}
            </span>
          </div>
          <h3 className="text-white text-3xl font-black leading-tight drop-shadow-sm">{recipe.title}</h3>
        </div>
      </div>

      <div className="p-8 space-y-8 flex-1 text-right">
        {/* Description */}
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed italic border-r-2 border-orange-100 dark:border-orange-900/50 pr-4">
          {recipe.description}
        </p>

        {/* Stats Row */}
        <div className="flex items-center justify-between py-4 border-y border-gray-50 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <div className="bg-orange-50 dark:bg-orange-900/20 p-2 rounded-xl text-orange-500">
              <Clock className="w-4 h-4" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase">زمان پخت</span>
              <span className="text-sm font-black text-gray-700 dark:text-gray-200">{recipe.cookingTime} دقیقه</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-amber-50 dark:bg-amber-900/20 p-2 rounded-xl text-amber-500">
              <BarChart className="w-4 h-4" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase">درجه سختی</span>
              <span className="text-sm font-black text-gray-700 dark:text-gray-200">{recipe.difficulty}</span>
            </div>
          </div>
        </div>

        {/* Ingredients Grid */}
        <div className="space-y-4">
          <h4 className="text-gray-900 dark:text-gray-100 font-black text-sm flex items-center gap-2 justify-end">
            <span>ترکیبات لازم</span>
            <Info className="w-4 h-4 text-orange-500" />
          </h4>
          <div className="flex flex-wrap gap-2 justify-end">
            {recipe.ingredients.map((ing, idx) => (
              <span key={idx} className="bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-[11px] font-bold px-3 py-1.5 rounded-lg border border-gray-100 dark:border-gray-800">
                {ing}
              </span>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="space-y-4">
          <h4 className="text-gray-900 dark:text-gray-100 font-black text-sm flex items-center gap-2 justify-end">
            <span>دستور پخت گام‌به‌گام</span>
            <ChefHat className="w-5 h-5 text-orange-500" />
          </h4>
          <div className="space-y-4">
            {recipe.steps.map((step, idx) => (
              <div key={idx} className="relative pr-8 pb-1 last:pb-0 text-right">
                {idx !== recipe.steps.length - 1 && (
                  <div className="absolute right-[11px] top-6 bottom-0 w-0.5 bg-orange-50 dark:bg-gray-800"></div>
                )}
                <div className="absolute right-0 top-0 w-6 h-6 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg flex items-center justify-center text-[10px] font-black z-10 border border-orange-200 dark:border-orange-900/50">
                  {idx + 1}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed pt-0.5">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800 mt-auto">
        <button className="w-full py-3 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-2xl text-xs font-bold text-gray-400 dark:text-gray-500 hover:border-orange-200 dark:hover:border-orange-900/50 hover:text-orange-500 dark:hover:text-orange-400 transition-all">
          نوش جان!
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
