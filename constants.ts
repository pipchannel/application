
import { IngredientCategory } from './types';

export const FOOD_INGREDIENTS: IngredientCategory[] = [
  {
    title: "پروتئین‌ها",
    items: [
      { id: "p1", name: "گوشت چرخ‌کرده", category: "protein" },
      { id: "p2", name: "مرغ", category: "protein" },
      { id: "p3", name: "گوشت تکه‌ای", category: "protein" },
      { id: "p4", name: "ماهی/میگو", category: "protein" },
      { id: "p6", name: "تخم مرغ", category: "protein" },
      { id: "p7", name: "سوسیس/کالباس", category: "protein" },
    ]
  },
  {
    title: "حبوبات و غلات",
    items: [
      { id: "l1", name: "برنج", category: "grains" },
      { id: "l2", name: "عدس", category: "legumes" },
      { id: "l3", name: "لوبیا قرمز/چیتی", category: "legumes" },
      { id: "l5", name: "نخود/لپه", category: "legumes" },
      { id: "l7", name: "ماکارونی و پاستا", category: "grains" },
      { id: "l8", name: "جو", category: "grains" },
    ]
  },
  {
    title: "سبزیجات و صیفی‌جات",
    items: [
      { id: "v1", name: "سیب‌زمینی", category: "vegetables" },
      { id: "v2", name: "پیاز/سیر", category: "vegetables" },
      { id: "v3", name: "گوجه‌فرنگی/رب", category: "vegetables" },
      { id: "v5", name: "قارچ", category: "vegetables" },
      { id: "v6", name: "بادمجان/کدو", category: "vegetables" },
      { id: "v8", name: "فلفل دلمه‌ای", category: "vegetables" },
      { id: "v14", name: "سبزیجات خورشتی/آشی", category: "vegetables" },
    ]
  }
];

export const DESSERT_INGREDIENTS: IngredientCategory[] = [
  {
    title: "پایه و آرد",
    items: [
      { id: "d1", name: "آرد سفید (قنادی)", category: "base" },
      { id: "d2", name: "آرد برنج", category: "base" },
      { id: "d3", name: "نشاسته ذرت", category: "base" },
      { id: "d4", name: "پودر کاکائو", category: "base" },
      { id: "d5", name: "آرد ذرت", category: "base" },
      { id: "d6", name: "آرد بادام", category: "base" },
      { id: "d7", name: "آرد سبوس‌دار", category: "base" },
      { id: "d8", name: "جوی دوسر پرک", category: "base" },
    ]
  },
  {
    title: "شیرین‌کننده و حجم‌دهنده",
    items: [
      { id: "s1", name: "شکر/پودر قند", category: "sweetener" },
      { id: "s2", name: "عسل", category: "sweetener" },
      { id: "s3", name: "شیره انگور/خرما", category: "sweetener" },
      { id: "s4", name: "بیکینگ پودر", category: "leavening" },
      { id: "s5", name: "خمیر مایه", category: "leavening" },
      { id: "s6", name: "وانیل", category: "flavor" },
    ]
  },
  {
    title: "لبنیات و چربی",
    items: [
      { id: "m1", name: "تخم مرغ", category: "dairy" },
      { id: "m2", name: "شیر", category: "dairy" },
      { id: "m3", name: "ماست", category: "dairy" },
      { id: "m4", name: "کره", category: "fat" },
      { id: "m5", name: "روغن مایع", category: "fat" },
      { id: "m6", name: "خامه قنادی", category: "dairy" },
      { id: "m7", name: "پنیر ماسکارپونه", category: "dairy" },
    ]
  },
  {
    title: "افزودنی و مغزیجات",
    items: [
      { id: "n1", name: "گردو", category: "nuts" },
      { id: "n2", name: "فندق/پسته", category: "nuts" },
      { id: "n3", name: "شکلات تخته‌ای/چیپسی", category: "extra" },
      { id: "n4", name: "گلاب/هل", category: "extra" },
      { id: "n5", name: "زعفران", category: "extra" },
      { id: "n6", name: "میوه خشک/کشمش", category: "extra" },
    ]
  }
];

export const TIME_OPTIONS = [
  { label: "کمتر از ۳۰ دقیقه", value: 30 },
  { label: "۱ ساعت", value: 60 },
  { label: "۲ ساعت", value: 120 },
  { label: "بیشتر (زمان آزاد)", value: 240 },
];
