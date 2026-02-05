
import type { SisterProfile, PhotoData } from './types';

// CUSTOMIZE THESE VALUES
export const SISTER_ONE: SisterProfile = {
  name: "Taiwo",
  theme: 'pink'
};

export const SISTER_TWO: SisterProfile = {
  name: "Kehinde",
  theme: 'yellow'
};

/**
 * SET THE BIRTHDAY DATE HERE
 * Format: Year-Month-DayTHour:Minute:Second
 * Note: Months are 1-12 in string format, but JS Date constructor is flexible.
 */
export const BIRTHDAY_DATE = new Date("2026-02-09T00:00:00");

export const BIRTHDAY_MESSAGE = `
  To our dearest Taiwo and Kehinde, on this sacred and beautiful day, we celebrate the divine miracle of your lives. 
  You are the sunshine that breaks through the clouds and the gentle bloom that colors our world. 
  Watching you grow side-by-side, sharing a bond that words can barely describe, has been our greatest joy.
  
  Taiwo, your radiant energy and infectious laughter are a constant reminder of God's light.
  Kehinde, your grace, kindness, and gentle spirit are a reflection of His peace.
  
  Together, you are a symphony of love, a double portion of grace, and the heartbeat of our family. 
  We are eternally grateful for the memories we've made and the infinite adventures that lie ahead.
`;

export const PRAYER_MESSAGE = `
  Heavenly Father, we lift up Taiwo and Kehinde to You today. We thank You for the gift of these two precious souls. 
  We pray that You would go before them in every step they take. Grant them wisdom that leads to life, 
  health that sustains their dreams, and a peace that surpasses all understanding. 
  May their sisterly bond remain an unbreakable sanctuary of support and love. 
  Let Your favor rest upon them like a crown, and may their lives always reflect Your beauty and truth. 
  Bless this new chapter with overflowing joy, divine protection, and endless laughter. Amen.
`;

export const GALLERY_PHOTOS: PhotoData[] = [
  { url: "https://images.unsplash.com/photo-1518893063934-7741850d6252?auto=format&fit=crop&q=80&w=800", caption: "Sun-kissed Joy", message: "Taiwo's light is as warm as a summer morning." },
  { url: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=800", caption: "Graceful Bloom", message: "Kehinde's presence is a gentle breeze of kindness." },
  { url: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800", caption: "Double Blessing", message: "Two hearts, one soul, and a lifetime of shared dreams." },
  { url: "https://images.unsplash.com/photo-1530103043960-ef38714abb15?auto=format&fit=crop&q=80&w=800", caption: "Eternal Partners", message: "The best thing about having a twin is having a forever best friend." },
  { url: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&q=80&w=800", caption: "Laughter Unlimited", message: "A house full of laughter is a house full of love." },
  { url: "https://images.unsplash.com/photo-1516054966891-58399c6f3518?auto=format&fit=crop&q=80&w=800", caption: "Twin Sparkle", message: "Shining brighter because they shine together." },
  { url: "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&q=80&w=800", caption: "Pure Magic", message: "There is a special kind of magic in being a twin." },
  { url: "https://images.unsplash.com/photo-1496333039225-ae8d1347ba42?auto=format&fit=crop&q=80&w=800", caption: "Heaven Sent", message: "Blessed beyond measure to call you our own." }
];
