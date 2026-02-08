
import type { SisterProfile, PhotoData } from './types';

// CUSTOMIZE THESE VALUES
export const SISTER_ONE: SisterProfile = {
  name: "Georgina",
  theme: 'yellow'
};

export const SISTER_TWO: SisterProfile = {
  name: "Josephine",
  theme: 'pink'
};

/**
 * SET THE BIRTHDAY DATE HERE
 * Format: Year, Month (0-11), Day, Hour, Minute, Second
 * Note: Month is 0-indexed (0 = Jan, 1 = Feb, etc.)
 */
export const BIRTHDAY_DATE = new Date("2026-02-09T00:00:00+01:00");

export const BIRTHDAY_MESSAGE = `
  To our dearest Georgina and Josephine, on this sacred and beautiful day, we celebrate the divine miracle of your lives. 
  You are the sunshine that breaks through the clouds and the gentle bloom that colors our world. 
  Watching you grow side-by-side, sharing a bond that words can barely describe, has been our greatest joy.
  
  Georgina, your radiant energy and infectious laughter and gentle nature are a constant reminder of God's light.
  Josephine, your grace, kindness, and infectious smile and small ogba behaviour are a reflection of God's peace.
  
  Together, you are a symphony of love, a double portion of grace, and the heartbeat of our family. 
  We are eternally grateful for the memories we've made and the infinite adventures that lie ahead.
`;

export const PRAYER_MESSAGE = `
  Heavenly Father, we lift up Georgina and Josephine to You today. We thank You for the gift of these two precious souls. 
  We pray that You would go before them in every step they take. Grant them wisdom that leads to life, 
  health that sustains their dreams, and a peace that surpasses all understanding. 
  May their sisterly bond remain an unbreakable sanctuary of support and love. 
  Let Your favor rest upon them like a crown, and may their lives always reflect Your beauty and truth. 
  Bless this new chapter with overflowing joy, divine protection, and endless laughter. Amen.
`;

export const GALLERY_PHOTOS: PhotoData[] = [
  { url: "/images/Kehinde4.jpeg", caption: "Sun-kissed Joy", message: "Georgina's light is as warm as a summer morning." },
  { url: "/images/Taiwo1.jpeg", caption: "Graceful Bloom", message: "Josephine's presence is a gentle breeze of kindness." },
  { url: "/images/kehinde1.jpeg", caption: "Double Blessing", message: "Two hearts, one soul, and a lifetime of shared dreams." },
  { url: "/images/Taiwo2.jpeg", caption: "Eternal Partners", message: "The best thing about having a twin is having a forever best friend." },
  { url: "/images/Kehinde2.jpeg", caption: "Laughter Unlimited", message: "A house full of laughter is a house full of love." },
  { url: "/images/Taiwo3.jpeg", caption: "Twin Sparkle", message: "Shining brighter because they shine together." },
  { url: "/images/Kehinde3.jpeg", caption: "Pure Magic", message: "There is a special kind of magic in being a twin." },
  { url: "/images/Taiwo4.jpeg", caption: "Heaven Sent", message: "Blessed beyond measure to call you our own." },
  { url: "/images/Kehinde5.jpeg", caption: "Radiant Smile", message: "Kehinde's joy is contagious and lights up every room." },
  { url: "/images/Taiwo5.jpeg", caption: "Gentle Soul", message: "Taiwo's kindness touches everyone she meets." },
  { url: "/images/Kehinde6.jpeg", caption: "Unbreakable Bond", message: "Together is our favorite place to be." },
  { url: "/images/Taiwo6.jpeg", caption: "Forever Friends", message: "Side by side or miles apart, connected by the heart." },
  { url: "/images/Kehinde7.jpeg", caption: "Adventures Await", message: "Ready to take on the world, hand in hand." },
  { url: "/images/Taiwo7.jpeg", caption: "Sisterly Love", message: "A sister is a gift to the heart, a friend to the spirit." },
  { url: "/images/Kehinde8.jpeg", caption: "Shared Secrets", message: "A thousand inside jokes and a lifetime of understanding." },
  { url: "/images/Taiwo8.jpeg", caption: "Double the Love", message: "Two distinctive souls, one extraordinary love." }
];

export const MEMORY_LANE_PHOTOS: PhotoData[] = [
  { url: "/images/EarlyDays.jpeg", caption: "Early Days", message: "Where it all began... double the trouble!" },
  { url: "/images/SchoolShenanigans.jpeg", caption: "School Shenanigans", message: "Matching outfits and mischievous grins." },
  { url: "/images/awkwardPhase.jpeg", caption: "Awkward Phase", message: "We don't talk about this hair-style..." },
  { url: "/images/CaughtInTheAct.jpeg", caption: "Caught in the Act", message: "When you try to look serious but fail." },
  { url: "/images/TwinTelepathy.jpeg", caption: "Twin Telepathy", message: "Thinking the same thing at the same time." },
  { url: "/images/UnstoppableDuo.jpeg", caption: "Unstoppable Duo", message: "Through thick and thin, always together." }
];

export const TRIVIA_QUESTIONS: import('./types').TriviaQuestion[] = [
  {
    id: 1,
    question: "Who was born first?",
    options: ["Taiwo", "Kehinde", "They arrived at the exact same moment!"],
    correctAnswer: "Taiwo"
  },
  {
    id: 2,
    question: "Who is the fashionista of the duo?",
    options: ["Taiwo", "Kehinde", "Both are style icons!"],
    correctAnswer: "Kehinde"
  },
  {
    id: 3,
    question: "What is their favorite shared activity?",
    options: ["Dancing", "Eating", "Gist and Laughter"],
    correctAnswer: "Gist and Laughter"
  },
  {
    id: 4,
    question: "Who is more likely to be late?",
    options: ["Taiwo", "Kehinde", "African Time Affects Both"],
    correctAnswer: "Taiwo"
  },
  {
    id: 5,
    question: "What makes them inseparable?",
    options: ["Shared DNA", "Shared Secrets", "Unconditional Love (and maybe DNA)"],
    correctAnswer: "Unconditional Love (and maybe DNA)"
  },
  {
    id: 6,
    question: "Who is the best at cooking?",
    options: ["Taiwo", "Kehinde", "Both are good at cooking"],
    correctAnswer: "Taiwo"
  },
  {
    id: 7,
    question: "Who is best at dancing?",
    options: ["Kehinde", "Taiwo", "Both are good dancers"],
    correctAnswer: "Kehinde"
  },
  {
    id: 8,
    question: "Who is the best at singing?",
    options: ["Kehinde", "Taiwo", "Both are good singers"],
    correctAnswer: "Taiwo"
  },
  {
    id: 9,
    question: "who is more likely to be quiet?",
    options: ["Kehinde", "Taiwo", "Both are quiet"],
    correctAnswer: "Kehinde"
  },
  {
    id: 10,
    question: "What is Taiwo's favorite color?",
    options: ["Red", "Blue", "Pink"],
    correctAnswer: "Pink"
  },
  {
    id: 11,
    question: "What is Kehinde's favorite color?",
    options: ["Red", "Yellow", "Pink"],
    correctAnswer: "Yellow"
  },
  {
    id: 12,
    question: "Who is more likely to go on trance",
    options: ["Taiwo", "Kehinde", "Both of them"],
    correctAnswer: "Taiwo"
  },
  {
    id: 13,
    question: "Who is more likely to cry during an argument?",
    options: ["Both of them", "Kehinde", "Taiwo"],
    correctAnswer: "Kehinde"
  },
  {
    id: 14,
    question: "Who is more likely to get angry during an argument?",
    options: ["Taiwo", "Kehinde", "Both of them"],
    correctAnswer: "Kehinde"
  },
  {
    id: 15,
    question: "Who is more likely to apologize during an argument?",
    options: ["Taiwo", "Kehinde", "None of them"],
    correctAnswer: "None of them"
  },
  {
    id: 16,
    question: "Who is taller?",
    options: ["Taiwo", "Kehinde", "Both are the same height"],
    correctAnswer: "Kehinde"
  },
  {
    id: 17,
    question: "What is their favorite food?",
    options: ["Swallow/bread", "bread/noodles", "Swallow/beans"],
    correctAnswer: "Swallow/bread"
  },
  {
    id: 18,
    question: "Who is more likely to be lazy?",
    options: ["Taiwo", "Kehinde", "Both of them"],
    correctAnswer: "Kehinde"
  },
  {
    id: 19,
    question: "Who is more likely to wake up early?",
    options: ["Tawio", "Kehinde", "NOne of them"],
    correctAnswer: "Tawio"
  },
  {
    id: 20,
    question: "Can twins have different birthday?",
    options: ["Yes", "No", "Maybe"],
    correctAnswer: "Yes"
  },
];
