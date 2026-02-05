
import type { SisterProfile, PhotoData } from './types';

// CUSTOMIZE THESE VALUES
export const SISTER_ONE: SisterProfile = {
  name: "Georgina",
  theme: 'pink'
};

export const SISTER_TWO: SisterProfile = {
  name: "Josephine",
  theme: 'yellow'
};

/**
 * SET THE BIRTHDAY DATE HERE
 * Format: Year-Month-DayTHour:Minute:Second
 * Note: Months are 1-12 in string format, but JS Date constructor is flexible.
 */
export const BIRTHDAY_DATE = new Date("2026-02-09T00:00:00");

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
  { url: "/images/photo1.jpg", caption: "Sun-kissed Joy", message: "Georgina's light is as warm as a summer morning." },
  { url: "/images/photo2.jpg", caption: "Graceful Bloom", message: "Josephine's presence is a gentle breeze of kindness." },
  { url: "/images/photo3.jpg", caption: "Double Blessing", message: "Two hearts, one soul, and a lifetime of shared dreams." },
  { url: "/images/photo4.jpg", caption: "Eternal Partners", message: "The best thing about having a twin is having a forever best friend." },
  { url: "/images/photo5.jpg", caption: "Laughter Unlimited", message: "A house full of laughter is a house full of love." },
  { url: "/images/photo6.jpg", caption: "Twin Sparkle", message: "Shining brighter because they shine together." },
  { url: "/images/photo7.jpg", caption: "Pure Magic", message: "There is a special kind of magic in being a twin." },
  { url: "/images/photo8.jpg", caption: "Heaven Sent", message: "Blessed beyond measure to call you our own." }
];
