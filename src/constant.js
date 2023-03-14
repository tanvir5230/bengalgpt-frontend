export const appVersion = 1.0;

// server link
export const serverName = "https://bengalgpt.onrender.com";
// export const serverName = "http://192.168.0.101:3000";

// Dummy text for homepage, button and other pages
export const deafultContentTextForHomePage =
  "তুমি যা জানতে চাও তাই জানতে পারবে এই এপ এর সাহায্যে!!!";
export const submitBtnTxtBeforePress = "লিখা শেষ, এখন জানতে চাই";
export const submitBtnTxtAfterPress = "অসাধারণ একটি উত্তর প্রস্তুত হচ্ছে ...";
export const nothingWrittenInInputBox = "কিছুই তো লিখলে না।";
export const sentenceNotMeaningFul =
  "তোমার বাক্যটি অর্থপূর্ন নয়। আবার চেষ্টা কর!!";
export const inputPlaceholder = "ঝটপট বাংলায়/ইংরেজিতে প্রশ্ন করে ফেল";
export const loadingText =
  "দয়া করে কিছুক্ষণ অপেক্ষা কর। তোমার অনুরোধটি প্রসেসিং এ আছে।";
export const loadingTextChatPage = "...";
export const defaultMicTextBn = "মাইকে ট্যাপ করে কথা বল";
export const defaultMicTextEng = "Tap on your mic to talk";

// App info text
export const appShortInfoTextInMenu =
  "এই  APP টিতে তুমি এখনি হয়তো বেস্ট এক্সপেরিয়েন্স পাবে না। \n\nকিন্ত এই APP টিতে শীঘ্রই চমৎকার কিছু ফিচার এবং টুল নিয়ে আসা হবে। \n\nতাই এই APP টিকে নিয়মিত আপডেটেড রাখতে ভুলো না। আপডেটেড ভার্সন পাওয়ার জন্যে PLAYSTORE এ চোখ রাখো।";
export const appDetailsInfo =
  "BengalGPT আমাদের বৈপ্লবিক সম্ভাবনাময় মোবাইল অ্যাপ যা OpenAI প্রযুক্তি ব্যবহার করে।\n\nএই অ্যাপটি লিখিত ইনপুটের পাশাপাশি ভয়েস ইনপুটও সুক্ষ্মভাবে গ্রহণ করতে পারে।\n\nআমাদের অ্যাাপটি বাংলা ভাষায় অন্যান্য যেকোনো এপ্লিকেশনের চেয়ে অনেক দ্রুত এবং নির্ভুল ভাবে তথ্য প্রদান করতে পারে।\n\nBengalGPT এর শক্তিশালী কর্মদক্ষতা আপনাকে একটি চমৎকার অভিজ্ঞতা প্রদান করবে।";

// Regular Expression
export const whoDevYouRegExp =
  /^(who|what|which people).*\b(developed|created|made|built).*\byou\b/i;
export const whoAmI = /^(who|what) (are you)\?*\.?$/i;
export const amarDevK =
  /^(কে|কারা) (তোমাকে|তোকে) (বানিয়েছে|বানাইছে|ডেভেলপ।|ডেভেলাপ|তৈরি করেছে)(\?|\s|।)?$/i;
export const amiK = /^(তোমার|তুমি)\s*\w*\s*(পরিচয়\s*দাও|কে)\s*[?\.]?\s*$/;

// Language Codes
export const banglaLangCode = "bn-BD";
export const englishLangCode = "en-US";

//Team Info
export const teamMembers = [
  {
    name: "Mahir Foysal",
    designation: "founder, BengalGPT",
    imageUrl: require("../assets/images/niloy.jpg"),
  },
  {
    name: "Tanvir Ibn Touhid",
    designation: "founder, BengalGPT",
    imageUrl: require("../assets/images/tanvir.jpg"),
  },
  {
    name: "Shibly Shaiham",
    designation: "founder, BengalGPT",
    imageUrl: require("../assets/images/shibly.jpg"),
  },
  {
    name: "Yeasin Ahmed",
    designation: "founder, BengalGPT",
    imageUrl: require("../assets/images/yeasin.jpg"),
  },
];

// API endpoints
export const apiEndpoints = {
  authEndpoint: "google-sign-in",
  generateText: "generate-text",
};
