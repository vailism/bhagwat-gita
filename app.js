// Bhagavad Gita SPA Application Logic
// A pure vanilla JS implementation with zero-dependencies, hash routing, custom audio synth, canvas visualizers, search, and AI assistant.

// ==========================================
// 0. GLOBAL UTILITIES (Haptics, Voice)
// ==========================================

function triggerHaptic() {
  if (navigator.vibrate) {
    navigator.vibrate(10);
  }
}

// ==========================================
// 1. DATASETS (Chapters, Verses, Quotes)
// ==========================================

const chapters = [
  {
    id: 1,
    name: "Arjuna's Dilemma",
    nameSanskrit: "अर्जुनविषादयोग",
    nameHindi: "अर्जुन विषाद योग",
    summary: "Arjuna sees his relatives and teachers on the battlefield and is overcome with grief and moral confusion about fighting them.",
    verseCount: 47,
    keyVerse: "कार्पण्यदोषोपहतस्वभावः पृच्छामि त्वां धर्मसम्मूढचेताः",
    keyVerseTranslation: "My heart is overcome with weakness. My mind is confused about duty. I ask you to tell me what is best for me.",
    theme: "Confusion & Despair",
    color: "#4A5568"
  },
  {
    id: 2,
    name: "Transcendental Knowledge",
    nameSanskrit: "सांख्ययोग",
    nameHindi: "सांख्य योग",
    summary: "Krishna begins his teachings, explaining the immortal nature of the soul and the importance of performing one's duty without attachment.",
    verseCount: 72,
    keyVerse: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन",
    keyVerseTranslation: "You have a right to perform your duty, but you are not entitled to the fruits of your actions.",
    theme: "Soul & Duty",
    color: "#F5B041"
  },
  {
    id: 3,
    name: "Path of Action",
    nameSanskrit: "कर्मयोग",
    nameHindi: "कर्म योग",
    summary: "Krishna explains the importance of selfless action and performing one's prescribed duties without attachment to results.",
    verseCount: 43,
    keyVerse: "श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात्",
    keyVerseTranslation: "It is better to perform one's own duty imperfectly than to perform another's duty perfectly.",
    theme: "Selfless Action",
    color: "#E67E22"
  },
  {
    id: 4,
    name: "Path of Knowledge",
    nameSanskrit: "ज्ञानकर्मसंन्यासयोग",
    nameHindi: "ज्ञान कर्म संन्यास योग",
    summary: "Krishna reveals the ancient yoga tradition and explains how knowledge of the divine burns away all karma.",
    verseCount: 42,
    keyVerse: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत",
    keyVerseTranslation: "Whenever righteousness declines and unrighteousness prevails, I manifest myself.",
    theme: "Divine Knowledge",
    color: "#F1C40F"
  },
  {
    id: 5,
    name: "Path of Renunciation",
    nameSanskrit: "कर्मसंन्यासयोग",
    nameHindi: "कर्म संन्यास योग",
    summary: "Krishna compares the path of renunciation of action with the path of selfless action and declares both lead to liberation.",
    verseCount: 29,
    keyVerse: "ब्रह्मण्याधाय कर्माणि सङ्गं त्यक्त्वा करोति यः",
    keyVerseTranslation: "One who acts offering all actions to the divine, abandoning attachment, is untouched by sin.",
    theme: "Renunciation",
    color: "#9B59B6"
  },
  {
    id: 6,
    name: "Path of Meditation",
    nameSanskrit: "आत्मसंयमयोग",
    nameHindi: "आत्म संयम योग",
    summary: "Krishna describes the practice of meditation, self-control, and the characteristics of a true yogi.",
    verseCount: 47,
    keyVerse: "उद्धरेदात्मनात्मानं नात्मानमवसादयेत्",
    keyVerseTranslation: "Elevate yourself through the power of your mind. Do not degrade yourself.",
    theme: "Meditation & Self-Control",
    color: "#3498DB"
  },
  {
    id: 7,
    name: "Knowledge & Realization",
    nameSanskrit: "ज्ञानविज्ञानयोग",
    nameHindi: "ज्ञान विज्ञान योग",
    summary: "Krishna reveals his divine nature and explains the difference between the material and spiritual worlds.",
    verseCount: 30,
    keyVerse: "मनुष्याणां सहस्रेषु कश्चिद्यतति सिद्धये",
    keyVerseTranslation: "Among thousands of people, hardly one strives for perfection.",
    theme: "Divine Nature",
    color: "#1ABC9C"
  },
  {
    id: 8,
    name: "The Imperishable Absolute",
    nameSanskrit: "अक्षरब्रह्मयोग",
    nameHindi: "अक्षर ब्रह्म योग",
    summary: "Krishna explains the concept of Brahman, the cycle of creation and dissolution, and the path to liberation at the time of death.",
    verseCount: 28,
    keyVerse: "अन्तकाले च मामेव स्मरन्मुक्त्वा कलेवरम्",
    keyVerseTranslation: "Whoever remembers me at the time of death attains my nature.",
    theme: "The Eternal",
    color: "#2C3E50"
  },
  {
    id: 9,
    name: "Royal Knowledge",
    nameSanskrit: "राजविद्याराजगुह्ययोग",
    nameHindi: "राज विद्या राज गुह्य योग",
    summary: "Krishna reveals the most confidential knowledge — that he pervades the entire universe while remaining transcendent.",
    verseCount: 34,
    keyVerse: "पत्रं पुष्पं फलं तोयं यो मे भक्त्या प्रयच्छति",
    keyVerseTranslation: "Whoever offers me a leaf, flower, fruit, or water with devotion, I accept it.",
    theme: "Supreme Knowledge",
    color: "#8E44AD"
  },
  {
    id: 10,
    name: "Divine Manifestations",
    nameSanskrit: "विभूतियोग",
    nameHindi: "विभूति योग",
    summary: "Krishna describes his divine manifestations and how he is the source of all creation, the best among all categories.",
    verseCount: 42,
    keyVerse: "यद्यद्विभूतिमत्सत्त्वं श्रीमदूर्जितमेव वा",
    keyVerseTranslation: "Whatever is glorious, prosperous, or powerful, know it springs from a fraction of my splendor.",
    theme: "Divine Glory",
    color: "#F39C12"
  },
  {
    id: 11,
    name: "The Universal Form",
    nameSanskrit: "विश्वरूपदर्शनयोग",
    nameHindi: "विश्वरूप दर्शन योग",
    summary: "Arjuna is granted divine vision to see Krishna's cosmic universal form — the Vishwaroop — containing all of creation.",
    verseCount: 55,
    keyVerse: "कालोऽस्मि लोकक्षयकृत्प्रवृद्धो",
    keyVerseTranslation: "I am Time, the great destroyer of worlds.",
    theme: "Cosmic Vision",
    color: "#E74C3C"
  },
  {
    id: 12,
    name: "Path of Devotion",
    nameSanskrit: "भक्तियोग",
    nameHindi: "भक्ति योग",
    summary: "Krishna explains the path of devotion and describes the qualities of his most dear devotees.",
    verseCount: 20,
    keyVerse: "मय्येव मन आधत्स्व मयि बुद्धिं निवेशय",
    keyVerseTranslation: "Fix your mind on me, let your intellect dwell in me. You shall live in me alone.",
    theme: "Pure Devotion",
    color: "#E91E63"
  },
  {
    id: 13,
    name: "Nature & the Enjoyer",
    nameSanskrit: "क्षेत्रक्षेत्रज्ञविभागयोग",
    nameHindi: "क्षेत्र क्षेत्रज्ञ विभाग योग",
    summary: "Krishna explains the difference between the body (field) and the knower of the body (soul), and the nature of true knowledge.",
    verseCount: 35,
    keyVerse: "क्षेत्रज्ञं चापि मां विद्धि सर्वक्षेत्रेषु भारत",
    keyVerseTranslation: "Know me as the knower in all fields of existence.",
    theme: "Body & Soul",
    color: "#00BCD4"
  },
  {
    id: 14,
    name: "Three Qualities of Nature",
    nameSanskrit: "गुणत्रयविभागयोग",
    nameHindi: "गुण त्रय विभाग योग",
    summary: "Krishna explains the three gunas — sattva, rajas, and tamas — and how they bind the soul to the material world.",
    verseCount: 27,
    keyVerse: "गुणानेतानतीत्य त्रीन्देही देहसमुद्भवान्",
    keyVerseTranslation: "When one transcends these three qualities, one is freed from birth, death, old age, and sorrow.",
    theme: "Three Gunas",
    color: "#FF9800"
  },
  {
    id: 15,
    name: "The Supreme Person",
    nameSanskrit: "पुरुषोत्तमयोग",
    nameHindi: "पुरुषोत्तम योग",
    summary: "Krishna uses the metaphor of an eternal banyan tree to describe the material world and reveals himself as the Supreme Person.",
    verseCount: 20,
    keyVerse: "ममैवांशो जीवलोके जीवभूतः सनातनः",
    keyVerseTranslation: "The living entities in this world are my eternal fragments.",
    theme: "The Supreme Self",
    color: "#4CAF50"
  },
  {
    id: 16,
    name: "Divine & Demonic Natures",
    nameSanskrit: "दैवासुरसम्पद्विभागयोग",
    nameHindi: "दैवासुर सम्पद् विभाग योग",
    summary: "Krishna describes the divine and demonic qualities in humans, and the consequences of following each path.",
    verseCount: 24,
    keyVerse: "त्रिविधं नरकस्येदं द्वारं नाशनमात्मनः",
    keyVerseTranslation: "There are three gates to self-destruction: lust, anger, and greed.",
    theme: "Good vs Evil",
    color: "#795548"
  },
  {
    id: 17,
    name: "Three Divisions of Faith",
    nameSanskrit: "श्रद्धात्रयविभागयोग",
    nameHindi: "श्रद्धा त्रय विभाग योग",
    summary: "Krishna explains how faith, food, worship, and charity are each divided into three categories according to the three gunas.",
    verseCount: 28,
    keyVerse: "ॐ तत् सत् इति निर्देशो ब्रह्मणस्त्रिविधः स्मृतः",
    keyVerseTranslation: "Om Tat Sat — these three words represent the Absolute Truth.",
    theme: "Faith & Devotion",
    color: "#607D8B"
  },
  {
    id: 18,
    name: "Liberation Through Renunciation",
    nameSanskrit: "मोक्षसंन्यासयोग",
    nameHindi: "मोक्ष संन्यास योग",
    summary: "The final chapter summarizes all teachings. Krishna reveals the supreme secret of surrender and grants Arjuna clarity.",
    verseCount: 78,
    keyVerse: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज",
    keyVerseTranslation: "Abandon all varieties of dharma and simply surrender unto me. I shall deliver you from all sin.",
    theme: "Ultimate Liberation",
    color: "#F5B041"
  }
];

const featuredVerses = [
  {
    chapter: 2,
    verse: 47,
    sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
    transliteration: "karmaṇy evādhikāras te mā phaleṣhu kadāchana\nmā karma-phala-hetur bhūr mā te saṅgo 'stv akarmaṇi",
    hindi: "कर्म करने में ही तुम्हारा अधिकार है, फल में कभी नहीं। कर्मफल का हेतु मत बनो और अकर्म में भी तुम्हारी आसक्ति न हो।",
    english: "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself the cause of the results, and never be attached to inaction.",
    wordMeanings: "karmaṇi—in action; eva—only; adhikāraḥ—right; te—your; mā—not; phaleṣhu—in fruits; kadāchana—ever",
    commentary: "This is one of the most celebrated verses of the Gita. Krishna teaches the principle of Nishkama Karma — selfless action without attachment to results."
  },
  {
    chapter: 2,
    verse: 20,
    sanskrit: "न जायते म्रियते वा कदाचिन्\nनायं भूत्वा भविता वा न भूयः।\nअजो नित्यः शाश्वतोऽयं पुराणो\nन हन्यते हन्यमाने शरीरे॥",
    transliteration: "na jāyate mriyate vā kadāchin nāyaṁ bhūtvā bhavitā vā na bhūyaḥ\najo nityaḥ śhāśhvato 'yaṁ purāṇo na hanyate hanyamāne śharīre",
    hindi: "यह आत्मा न कभी जन्म लेती है, न मरती है। यह अजन्मा, नित्य, शाश्वत और पुरातन है। शरीर के मारे जाने पर भी यह नहीं मारी जाती।",
    english: "The soul is never born, nor does it ever die. It is unborn, eternal, ever-existing, and primeval. It is not slain when the body is slain.",
    wordMeanings: "na—not; jāyate—is born; mriyate—dies; vā—or; kadāchit—ever; na—not; ayam—this; bhūtvā—having been",
    commentary: "Krishna reveals the eternal nature of the soul to console Arjuna. The soul transcends birth and death."
  },
  {
    chapter: 4,
    verse: 7,
    sanskrit: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।\nअभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥",
    transliteration: "yadā yadā hi dharmasya glānir bhavati bhārata\nabhyutthānam adharmasya tadātmānaṁ sṛjāmy aham",
    hindi: "हे भारत! जब-जब धर्म की हानि और अधर्म की वृद्धि होती है, तब-तब मैं स्वयं की रचना करता हूँ अर्थात अवतार लेता हूँ।",
    english: "Whenever there is a decline of righteousness and an increase of unrighteousness, O Arjuna, at that time I manifest myself.",
    wordMeanings: "yadā yadā—whenever; hi—certainly; dharmasya—of dharma; glāniḥ—decline; bhavati—happens",
    commentary: "This verse establishes the concept of divine incarnation (avatar) — God descends whenever the cosmic balance is disturbed."
  },
  {
    chapter: 6,
    verse: 5,
    sanskrit: "उद्धरेदात्मनात्मानं नात्मानमवसादयेत्।\nआत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः॥",
    transliteration: "uddhared ātmanātmānaṁ nātmānam avasādayet\nātmaiva hy ātmano bandhur ātmaiva ripur ātmanaḥ",
    hindi: "अपने द्वारा अपना उद्धार करें और अपने को नीचे न गिराएं। क्योंकि आत्मा ही आत्मा का मित्र है और आत्मा ही आत्मा का शत्रु है।",
    english: "Elevate yourself through the power of your mind, and not degrade yourself. The mind is the friend of the self, and also the enemy of the self.",
    wordMeanings: "uddharet—elevate; ātmanā—through the mind; ātmānam—the self; na—not; avasādayet—degrade",
    commentary: "A powerful teaching on self-empowerment. You are your own best friend and worst enemy."
  },
  {
    chapter: 9,
    verse: 26,
    sanskrit: "पत्रं पुष्पं फलं तोयं यो मे भक्त्या प्रयच्छति।\nतदहं भक्त्युपहृतमश्नामि प्रयतात्मनः॥",
    transliteration: "patraṁ puṣhpaṁ phalaṁ toyaṁ yo me bhaktyā prayachchhati\ntad ahaṁ bhakty-upahṛitam aśhnāmi prayatātmanaḥ",
    hindi: "जो कोई भक्ति से मुझे पत्र, पुष्प, फल या जल अर्पित करता है, उस शुद्ध हृदय वाले की भक्तिपूर्वक दी हुई भेंट मैं स्वीकार करता हूँ।",
    english: "Whoever offers me with devotion a leaf, a flower, a fruit, or water, I accept that offering of love from the pure-hearted.",
    wordMeanings: "patram—a leaf; puṣhpam—a flower; phalam—a fruit; toyam—water; yaḥ—whoever; me—to me; bhaktyā—with devotion",
    commentary: "God does not seek grand offerings but sincere devotion. Even the simplest offering given with love is accepted."
  },
  {
    chapter: 11,
    verse: 32,
    sanskrit: "कालोऽस्मि लोकक्षयकृत्प्रवृद्धो\nलोकान्समाहर्तुमिह प्रवृत्तः।",
    transliteration: "kālo 'smi loka-kṣhaya-kṛit pravṛiddho lokān samāhartum iha pravṛittaḥ",
    hindi: "मैं लोकों का नाश करने वाला बढ़ा हुआ महाकाल हूँ। इस समय इन लोकों को नष्ट करने के लिए प्रवृत्त हुआ हूँ।",
    english: "I am Time, the great destroyer of the worlds, and I have come here to destroy all people.",
    wordMeanings: "kālaḥ—Time; asmi—I am; loka—world; kṣhaya-kṛit—destroyer; pravṛiddhaḥ—mighty",
    commentary: "During the Vishwaroop revelation, Krishna reveals his cosmic form as all-consuming Time itself."
  },
  {
    chapter: 18,
    verse: 66,
    sanskrit: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज।\nअहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः॥",
    transliteration: "sarva-dharmān parityajya mām ekaṁ śharaṇaṁ vraja\nahaṁ tvāṁ sarva-pāpebhyo mokṣhayiṣhyāmi mā śhuchaḥ",
    hindi: "सब धर्मों को त्यागकर केवल मेरी शरण में आ जाओ। मैं तुम्हें सब पापों से मुक्त कर दूँगा, शोक मत करो।",
    english: "Abandon all varieties of dharma and simply surrender unto me. I shall deliver you from all sinful reactions. Do not fear.",
    wordMeanings: "sarva-dharmān—all dharmas; parityajya—abandoning; mām—unto me; ekam—alone; śharaṇam—refuge; vraja—take",
    commentary: "The ultimate verse of the Gita. Krishna's supreme instruction — complete surrender to the divine."
  },
  {
    chapter: 2,
    verse: 22,
    sanskrit: "वासांसि जीर्णानि यथा विहाय\nनवानि गृह्णाति नरोऽपराणि।\nतथा शरीराणि विहाय जीर्णा-\nन्यन्यानि संयाति नवानि देही॥",
    transliteration: "vāsānsi jīrṇāni yathā vihāya navāni gṛihṇāti naro 'parāṇi\ntathā śharīrāṇi vihāya jīrṇāny anyāni saṁyāti navāni dehī",
    hindi: "जैसे मनुष्य पुराने वस्त्रों को त्यागकर नये वस्त्र धारण करता है, वैसे ही आत्मा पुराने शरीरों को त्यागकर नये शरीर धारण करती है।",
    english: "As a person puts on new garments, giving up the old ones, the soul similarly accepts new material bodies, giving up the old and useless ones.",
    wordMeanings: "vāsānsi—garments; jīrṇāni—worn-out; yathā—as; vihāya—giving up; navāni—new; gṛihṇāti—accepts",
    commentary: "Krishna uses the beautiful analogy of changing clothes to explain how the eternal soul transitions between bodies."
  }
];

const quotes = [
  { text: "You have the right to work, but never to the fruit of work.", chapter: 2, verse: 47 },
  { text: "The soul is neither born, and nor does it die.", chapter: 2, verse: 20 },
  { text: "Change is the law of the universe.", chapter: 2, verse: 22 },
  { text: "Set thy heart upon thy work but never on its reward.", chapter: 2, verse: 47 },
  { text: "The mind is restless and difficult to restrain, but it is subdued by practice.", chapter: 6, verse: 35 },
  { text: "There is neither this world, nor the world beyond, nor happiness for the one who doubts.", chapter: 4, verse: 40 },
  { text: "A person can rise through the efforts of his own mind.", chapter: 6, verse: 5 },
  { text: "When meditation is mastered, the mind is unwavering like the flame of a lamp in a windless place.", chapter: 6, verse: 19 },
  { text: "Reshape yourself through the power of your will.", chapter: 6, verse: 5 },
  { text: "Among thousands of men, hardly one strives for perfection.", chapter: 7, verse: 3 },
  { text: "I am the beginning, middle, and end of creation.", chapter: 10, verse: 32 },
  { text: "For one who has conquered the mind, it is the best of friends.", chapter: 6, verse: 6 },
  { text: "Whatever happened, happened for the good. Whatever is happening, is happening for the good.", chapter: 2, verse: 27 },
  { text: "Lust, anger, and greed are the three gates to self-destruction.", chapter: 16, verse: 21 },
  { text: "Perform your obligatory duty, because action is better than inaction.", chapter: 3, verse: 8 },
  { text: "The wise grieve neither for the living nor for the dead.", chapter: 2, verse: 11 }
];

const sacredSearchMap = {
  anxiety: { chapters: [2, 6], keywords: ["peace", "mind", "calm", "worry"] },
  fear: { chapters: [2, 11], keywords: ["fearless", "courage", "death", "soul"] },
  anger: { chapters: [2, 3, 16], keywords: ["anger", "desire", "enemy", "control"] },
  motivation: { chapters: [2, 3, 18], keywords: ["action", "duty", "effort", "work"] },
  purpose: { chapters: [3, 18], keywords: ["dharma", "duty", "purpose", "calling"] },
  love: { chapters: [9, 12], keywords: ["devotion", "love", "heart", "bhakti"] },
  discipline: { chapters: [6, 17], keywords: ["practice", "control", "steady", "focus"] },
  success: { chapters: [2, 3], keywords: ["action", "result", "effort", "detachment"] },
  breakup: { chapters: [2, 5], keywords: ["attachment", "letting go", "soul", "eternal"] },
  loss: { chapters: [2, 8], keywords: ["death", "soul", "imperishable", "eternal"] },
  confusion: { chapters: [1, 2, 18], keywords: ["doubt", "clarity", "wisdom", "knowledge"] },
  peace: { chapters: [2, 5, 6], keywords: ["peace", "calm", "tranquil", "serene"] },
  depression: { chapters: [1, 2, 6], keywords: ["sorrow", "overcome", "strength", "rise"] },
  gratitude: { chapters: [9, 11], keywords: ["grace", "offering", "divine", "grateful"] },
  forgiveness: { chapters: [12, 16], keywords: ["compassion", "forgiveness", "divine", "quality"] },
  death: { chapters: [2, 8], keywords: ["soul", "immortal", "body", "eternal"] }
};

const emotionSuggestions = [
  { emoji: "😰", label: "Anxiety", key: "anxiety" },
  { emoji: "💔", label: "Breakup", key: "breakup" },
  { emoji: "🔥", label: "Motivation", key: "motivation" },
  { emoji: "😨", label: "Fear", key: "fear" },
  { emoji: "🎯", label: "Purpose", key: "purpose" },
  { emoji: "😤", label: "Anger", key: "anger" },
  { emoji: "🧘", label: "Peace", key: "peace" },
  { emoji: "💪", label: "Discipline", key: "discipline" },
  { emoji: "💕", label: "Love", key: "love" },
  { emoji: "😢", label: "Depression", key: "depression" },
  { emoji: "🙏", label: "Gratitude", key: "gratitude" },
  { emoji: "☠️", label: "Loss", key: "loss" }
];

const wisdomResponses = {
  worry: { text: "The wise do not grieve for what is lost, nor do they fear what is yet to come. Live fully in this moment — it is all you truly have.", verseIndex: 0 },
  future: { text: "Do not burden yourself with what has not yet happened. Your duty is in this moment. The future unfolds from the seeds you plant today.", verseIndex: 0 },
  angry: { text: "Anger clouds judgment and leads to confusion. When confusion arises, memory is lost, and with it, wisdom. Cultivate patience — it is the armor of the wise.", verseIndex: 3 },
  sad: { text: "The soul knows no sorrow that is permanent. Just as night gives way to dawn, your pain is temporary. You are eternal, beyond the reach of any suffering.", verseIndex: 1 },
  confused: { text: "Confusion is not your enemy — it is the doorway to wisdom. The fact that you question means you are ready to receive answers. Be still, and clarity will come.", verseIndex: 3 },
  purpose: { text: "Your purpose is not something you find — it is something you become. Perform your duty with full devotion, without attachment to results. This is the path.", verseIndex: 0 },
  love: { text: "True love is not attachment — it is offering without expectation. Whoever offers me a leaf, a flower, or water with devotion, I accept it with love.", verseIndex: 4 },
  death: { text: "The soul is never born, nor does it ever die. It is beyond the reach of weapons, fire, water, and wind. Do not mourn for what is eternal.", verseIndex: 1 },
  success: { text: "Success and failure are two sides of the same illusion. Focus only on your actions — perform them with excellence and surrender the results.", verseIndex: 0 },
  afraid: { text: "Fear arises from duality — from seeing yourself as separate from the divine. When you realize your true nature, fear dissolves like mist before the sun.", verseIndex: 1 },
  default: { text: "Remember this eternal truth: you are not this body, not these thoughts, not these fleeting emotions. You are the unchanging witness of all experience. Rest in that knowledge.", verseIndex: 3 }
};

const stories = [
  {
    id: 1,
    title: "The Conflict Within",
    subtitle: "अर्जुन विषाद",
    description: "On the battlefield of Kurukshetra, Arjuna faces his greatest enemy — not the warriors before him, but the doubt within his own heart.",
    bgColor: "from-slate-950 via-gray-900 to-dark-900",
    accent: "rgba(100, 116, 139, 0.2)",
    textColor: "text-slate-400",
    symbol: "⚔"
  },
  {
    id: 2,
    title: "The Light Appears",
    subtitle: "कृष्ण उवाच",
    description: "In the darkest moment, Krishna speaks. Not as a god commanding worship, but as a friend offering clarity. The golden light of wisdom begins to pierce the darkness.",
    bgColor: "from-dark-900 via-amber-950/20 to-dark-900",
    accent: "rgba(245, 176, 65, 0.15)",
    textColor: "text-divine-gold/70",
    symbol: "✦"
  },
  {
    id: 3,
    title: "Knowledge Unfolds",
    subtitle: "ज्ञान योग",
    description: "Layer by layer, the nature of reality is revealed. The soul is eternal. Action without attachment is freedom. The universe operates on divine law.",
    bgColor: "from-dark-900 via-blue-950/10 to-dark-900",
    accent: "rgba(59, 130, 246, 0.1)",
    textColor: "text-blue-400/60",
    symbol: "◈"
  },
  {
    id: 4,
    title: "The Cosmic Vision",
    subtitle: "विश्वरूप दर्शन",
    description: "Arjuna sees the infinite. All of creation — past, present, and future — contained within a single divine form. Stars are born and die in the blink of an eye.",
    bgColor: "from-dark-900 via-purple-950/20 to-dark-900",
    accent: "rgba(168, 85, 247, 0.15)",
    textColor: "text-purple-400/60",
    symbol: "❋"
  },
  {
    id: 5,
    title: "Inner Peace",
    subtitle: "शान्ति",
    description: "The journey ends where it began — within. Arjuna's confusion dissolves into clarity. \"My delusion is destroyed. I shall act according to your word.\"",
    bgColor: "from-dark-900 via-dark-800 to-dark-900",
    accent: "rgba(255, 255, 255, 0.05)",
    textColor: "text-white/50",
    symbol: "○"
  }
];

function getVerseOfTheDay() {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  return featuredVerses[dayOfYear % featuredVerses.length];
}

function getDailyWisdom() {
  const verse = getVerseOfTheDay();
  const reflections = [
    "How can you apply detachment in your actions today?",
    "What eternal truth about yourself have you been ignoring?",
    "When was the last time you acted without expecting results?",
    "What fear is holding you back from your true purpose?",
    "How can you serve others selflessly today?",
    "What attachment is causing you suffering right now?",
    "How can you find the divine in everyday moments?",
    "What would change if you truly believed in your eternal nature?"
  ];
  const applications = [
    "Today, complete one task purely for the joy of doing it — without worrying about the outcome.",
    "Spend 5 minutes in stillness, observing your thoughts without judgment.",
    "Perform one act of kindness without expecting recognition or gratitude.",
    "Write down your biggest fear and ask: 'Will this matter to my soul?'",
    "Before reacting to a situation, pause and choose a response aligned with wisdom.",
    "Let go of one thing you've been holding onto that no longer serves you.",
    "Find beauty in something ordinary — a sunrise, a conversation, a breath.",
    "Dedicate your work today to something greater than yourself."
  ];
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  return {
    verse,
    reflection: reflections[dayOfYear % reflections.length],
    lifeApplication: applications[dayOfYear % applications.length]
  };
}

function getDeterministicRandom(seed, offset = 0) {
  const x = Math.sin(seed + offset) * 10000;
  return x - Math.floor(x);
}

function parseWordMeanings(meaningsStr) {
  if (!meaningsStr) return [];
  const parts = meaningsStr.split(/[;\n]+/);
  return parts
    .map((part) => {
      const subparts = part.split(/[-—]+/);
      if (subparts.length >= 2) {
        return {
          word: subparts[0].trim(),
          meaning: subparts.slice(1).join("—").trim()
        };
      }
      return null;
    })
    .filter((item) => item !== null && item.word.length > 0);
}

// ==========================================
// 2. STATE & SETTINGS STORAGE
// ==========================================

const store = {
  fontSize: parseInt(localStorage.getItem("gita-font-size")) || 18,
  theme: localStorage.getItem("gita-theme") === "sepia" ? "sepia" : "light",
  bookmarks: JSON.parse(localStorage.getItem("gita-bookmarks")) || [],
  readProgress: JSON.parse(localStorage.getItem("gita-progress")) || {},
  
  preferredEnglishAuthor: localStorage.getItem("gita-pref-eng-author") || "Swami Sivananda",
  preferredHindiAuthor: localStorage.getItem("gita-pref-hin-author") || "Swami Ramsukhdas",
  preferredCommentaryAuthor: localStorage.getItem("gita-pref-com-author") || "Swami Sivananda",

  // Focus modes
  showSanskrit: true,
  showTransliteration: false,
  showWordMeanings: false,
  showEnglishTrans: true,
  showHindiTrans: false,
  showCommentary: false,

  // App States
  searchOpen: false,
  askKrishnaOpen: false,
  nightMode: false,
  chatMessages: [],
  expandedVerses: new Set(),

  // Setters
  setFontSize(size) {
    this.fontSize = size;
    localStorage.setItem("gita-font-size", size);
    document.querySelectorAll(".verse-text-dynamic").forEach(el => {
      el.style.fontSize = `${size}px`;
    });
    document.querySelectorAll(".verse-sanskrit-dynamic").forEach(el => {
      el.style.fontSize = `${size + 2}px`;
    });
  },

  setTheme(themeName) {
    const nextTheme = themeName === "sepia" ? "sepia" : "light";
    this.theme = nextTheme;
    localStorage.setItem("gita-theme", nextTheme);
    document.body.className = `theme-${nextTheme}`;
    
    // Sync settings buttons styling
    document.querySelectorAll(".theme-opt-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.theme === nextTheme);
    });
  },

  toggleBookmark(chapter, verse) {
    const idx = this.bookmarks.findIndex(b => b.chapter === chapter && b.verse === verse);
    if (idx >= 0) {
      this.bookmarks.splice(idx, 1);
    } else {
      this.bookmarks.push({ chapter, verse, timestamp: Date.now() });
    }
    localStorage.setItem("gita-bookmarks", JSON.stringify(this.bookmarks));
    return idx < 0; // returns true if added, false if removed
  },

  isBookmarked(chapter, verse) {
    return this.bookmarks.some(b => b.chapter === chapter && b.verse === verse);
  },

  updateProgress(chapterId, verseNumber) {
    this.readProgress[chapterId] = verseNumber;
    localStorage.setItem("gita-progress", JSON.stringify(this.readProgress));
  }
};

// Apply theme on load (initialize navbar theme toggle and body class)
store.setTheme(store.theme);

// ==========================================
// 3. SOUND SYNTHESISER (Web Audio API)
// ==========================================

class AmbientMusicManager {
  constructor() {
    this.ctx = null;
    this.droneGain = null;
    this.fluteGain = null;
    this.masterGain = null;
    this.isPlaying = false;
    this.fluteInterval = null;
    this.oscillators = [];
  }

  init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    
    this.ctx = new AudioContextClass();
    
    // Setup Gain Nodes
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.setValueAtTime(0.04, this.ctx.currentTime);
    this.droneGain.connect(this.masterGain);

    this.fluteGain = this.ctx.createGain();
    this.fluteGain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    this.fluteGain.connect(this.masterGain);

    // Setup Delay Effect for Flute (reverberant space)
    this.delayNode = this.ctx.createDelay(2.0);
    this.delayNode.delayTime.setValueAtTime(0.5, this.ctx.currentTime);
    
    this.delayFeedback = this.ctx.createGain();
    this.delayFeedback.gain.setValueAtTime(0.4, this.ctx.currentTime);

    this.fluteGain.connect(this.delayNode);
    this.delayNode.connect(this.delayFeedback);
    this.delayFeedback.connect(this.delayNode);
    this.delayNode.connect(this.masterGain);

    this.startDrone();
    this.startFluteLoop();
  }

  startDrone() {
    // 136.1 Hz: Sound of OM / Earth Year frequency (Anahata Nada)
    const baseFreq = 136.1;
    const harmonics = [1, 2, 3, 0.5]; // Fundamental, octave, fifth-harmonic, sub-fundamental
    
    harmonics.forEach((h, index) => {
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      
      osc.type = index % 2 === 0 ? "sine" : "triangle";
      osc.frequency.setValueAtTime(baseFreq * h, this.ctx.currentTime);
      
      // Warm filter to clean harmonics
      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(300, this.ctx.currentTime);
      
      // Breathing LFO
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.08 + index * 0.02, this.ctx.currentTime);
      lfoGain.gain.setValueAtTime(0.015, this.ctx.currentTime);
      
      osc.connect(filter);
      filter.connect(oscGain);
      oscGain.connect(this.droneGain);
      
      lfo.connect(lfoGain);
      lfoGain.connect(oscGain.gain);
      
      osc.start();
      lfo.start();
      
      this.oscillators.push(osc, lfo);
    });
  }

  playFluteNote(freq, duration = 3.0) {
    if (!this.ctx || this.ctx.state === "suspended") return;
    
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const env = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, now);
    
    // Add micro-vibrato
    const vibrato = this.ctx.createOscillator();
    const vibratoGain = this.ctx.createGain();
    vibrato.frequency.setValueAtTime(6.0, now);
    vibratoGain.gain.setValueAtTime(1.5, now);
    vibrato.connect(vibratoGain);
    vibratoGain.connect(osc.frequency);
    
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1000, now);
    
    // Flute Envelope: slow attack, long tail release
    env.gain.setValueAtTime(0, now);
    env.gain.linearRampToValueAtTime(0.08, now + 1.2); // attack
    env.gain.setValueAtTime(0.08, now + duration - 1.5);
    env.gain.exponentialRampToValueAtTime(0.0001, now + duration); // release
    
    osc.connect(filter);
    filter.connect(env);
    env.connect(this.fluteGain);
    
    vibrato.start();
    osc.start();
    vibrato.stop(now + duration + 0.5);
    osc.stop(now + duration + 0.5);
  }

  startFluteLoop() {
    // Divine Pentatonic scale (Raag Bhupali/Yaman-esque)
    // C4, D4, E4, G4, A4, C5, D5, E5
    const scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];
    
    const triggerFlutePhrase = () => {
      if (!this.isPlaying) return;
      
      const phraseLength = Math.floor(Math.random() * 3) + 2; // 2 to 4 notes
      let delay = 0;
      
      for (let i = 0; i < phraseLength; i++) {
        const noteFreq = scale[Math.floor(Math.random() * scale.length)];
        const noteDuration = Math.random() * 2 + 2; // 2s to 4s
        
        setTimeout(() => {
          this.playFluteNote(noteFreq, noteDuration);
        }, delay * 1000);
        
        delay += Math.random() * 1.5 + 1.2; // space out notes
      }
    };

    // Trigger immediately and repeat every 12 to 18 seconds
    triggerFlutePhrase();
    this.fluteInterval = setInterval(triggerFlutePhrase, 15000);
  }

  toggle(play) {
    if (play) {
      this.init();
      if (this.ctx && this.ctx.state === "suspended") {
        this.ctx.resume();
      }
      this.isPlaying = true;
      if (this.masterGain) {
        this.masterGain.gain.linearRampToValueAtTime(1.0, this.ctx.currentTime + 3.0); // smooth fade-in
      }
    } else {
      this.isPlaying = false;
      if (this.masterGain) {
        this.masterGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 1.5); // smooth fade-out
      }
    }
  }
}

const ambientMusic = new AmbientMusicManager();

// ==========================================
// 4. ANIMATIONS & CANVAS DRAWS
// ==========================================

// Canvas 1: Drift Particles Background
function initParticleCanvas() {
  const canvas = document.getElementById("particle-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let particles = [];
  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener("resize", resize);

  // Generate particles
  for (let i = 0; i < 40; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2 + 0.5,
      speedY: -(Math.random() * 0.4 + 0.1),
      opacity: Math.random() * 0.4 + 0.1,
      angle: Math.random() * Math.PI * 2,
      wobble: Math.random() * 0.02
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const isLight = store.theme === "light" || store.theme === "sepia";
    
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = isLight ? `rgba(178, 119, 31, ${p.opacity})` : `rgba(229, 169, 60, ${p.opacity})`;
      ctx.fill();
      
      // Update
      p.y += p.speedY;
      p.x += Math.sin(p.angle) * 0.2;
      p.angle += p.wobble;
      
      if (p.y < 0) {
        p.y = canvas.height;
        p.x = Math.random() * canvas.width;
      }
    });
    requestAnimationFrame(draw);
  }
  draw();
}

// Canvas 2: Cosmic Sacred Geometry
function initCosmicCanvas() {
  const canvas = document.getElementById("cosmic-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const resize = () => {
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  };
  resize();
  window.addEventListener("resize", resize);

  let frame = 0;
  function draw() {
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    if (w === 0 || h === 0) {
      requestAnimationFrame(draw);
      return;
    }
    ctx.clearRect(0, 0, w, h);
    frame++;

    const cx = w / 2;
    const cy = h / 2;
    const time = frame * 0.004;

    // Draw concentric waves (mandala loops)
    for (let i = 0; i < 6; i++) {
      const radius = 70 + i * 45;
      const rotation = time * (i % 2 === 0 ? 1 : -1) * (0.4 + i * 0.08);

      ctx.beginPath();
      ctx.strokeStyle = `rgba(245, 176, 65, ${0.05 - i * 0.007})`;
      ctx.lineWidth = 0.5;

      for (let j = 0; j <= 360; j += 4) {
        const angle = ((j + rotation * 50) * Math.PI) / 180;
        // Introduce micro wave deformation
        const r = radius + Math.sin(angle * 6 + time * 2) * 8;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        if (j === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    }

    // Draw overlapping cosmic triangles (sacred geometry)
    for (let i = 0; i < 3; i++) {
      const rotation = time * 0.25 + (i * Math.PI * 2) / 3;
      const size = 110 + i * 25;
      ctx.beginPath();
      ctx.strokeStyle = `rgba(245, 176, 65, 0.03)`;
      ctx.lineWidth = 0.5;
      for (let j = 0; j < 3; j++) {
        const angle = rotation + (j * Math.PI * 2) / 3;
        const x = cx + Math.cos(angle) * size;
        const y = cy + Math.sin(angle) * size;
        if (j === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    }

    requestAnimationFrame(draw);
  }
  draw();
}

// Populate stars, peacock feathers, and divine rays
function populateAtmosphere() {
  // 1. Cosmic Stars
  const starsContainer = document.getElementById("cosmic-stars-container");
  if (starsContainer && starsContainer.children.length === 0) {
    for (let i = 0; i < 80; i++) {
      const star = document.createElement("div");
      star.className = "star";
      star.style.left = `${getDeterministicRandom(i, 1.2) * 100}%`;
      star.style.top = `${getDeterministicRandom(i, 2.5) * 100}%`;
      const size = getDeterministicRandom(i, 3.8) * 2 + 0.5;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.setProperty("--delay", `${getDeterministicRandom(i, 4.1) * 5}s`);
      star.style.setProperty("--duration", `${getDeterministicRandom(i, 5.7) * 3 + 2}s`);
      star.style.setProperty("--min-opacity", "0.1");
      star.style.animationDelay = `${getDeterministicRandom(i, 4.1) * 5}s`;
      starsContainer.appendChild(star);
    }
  }

  // 2. Divine Presence Rays
  const raysContainer = document.getElementById("presence-rays");
  if (raysContainer && raysContainer.children.length === 0) {
    for (let i = 0; i < 12; i++) {
      const ray = document.createElement("div");
      ray.className = "presence-ray";
      ray.style.setProperty("--angle", `${i * 30}deg`);
      ray.style.setProperty("--opacity", 0.04 + (i % 3) * 0.02);
      raysContainer.appendChild(ray);
    }
  }

  // 3. Peacock Feathers
  const feathersContainer = document.getElementById("peacock-feathers");
  if (feathersContainer && feathersContainer.children.length === 0) {
    for (let i = 0; i < 8; i++) {
      const feather = document.createElement("div");
      feather.className = "feather-particle";
      feather.style.left = `${30 + Math.sin(i * 0.8) * 20}%`;
      feather.style.top = `${30 + Math.cos(i * 0.8) * 20}%`;
      feather.style.setProperty("--duration", `${5 + i}s`);
      feather.style.setProperty("--delay", `${i * 0.4}s`);
      feathersContainer.appendChild(feather);
    }
  }
}

// ==========================================
// 5. INTRO TIMELINE MANAGER
// ==========================================

function startIntroSequence() {
  const isIntroComplete = sessionStorage.getItem("gita-intro-complete") === "true";
  const overlay = document.getElementById("om-opening");
  
  if (isIntroComplete) {
    overlay.classList.add("hidden");
    document.body.style.overflow = "";
    return;
  }

  document.body.style.overflow = "hidden";

  // Timeline Phases
  // Phase 1: OM appears (t = 500ms)
  setTimeout(() => {
    overlay.querySelector(".om-glow").classList.add("active");
    overlay.querySelector(".om-symbol-container").classList.add("active");
  }, 500);

  // Phase 2: Glow particles emerge (t = 2000ms)
  setTimeout(() => {
    overlay.querySelector(".om-symbol-container").classList.add("fade-subtle");
    const container = document.getElementById("opening-particles-container");
    
    // Generate 30 deterministic particles exploding outwards
    for (let i = 0; i < 30; i++) {
      const p = document.createElement("div");
      p.className = "opening-particle";
      
      const angle = getDeterministicRandom(i, 8.8) * Math.PI * 2;
      const radius = getDeterministicRandom(i, 9.9) * 250 + 80;
      
      const targetX = `calc(50% + ${Math.cos(angle) * radius}px)`;
      const targetY = `calc(50% + ${Math.sin(angle) * radius}px)`;
      
      p.style.setProperty("--target-x", targetX);
      p.style.setProperty("--target-y", targetY);
      p.style.setProperty("--scale", getDeterministicRandom(i, 3.3) * 1.5 + 0.5);
      p.style.setProperty("--opacity", getDeterministicRandom(i, 4.4) * 0.5 + 0.3);
      p.style.setProperty("--duration", `${getDeterministicRandom(i, 5.5) * 3 + 2.5}s`);
      p.style.setProperty("--delay", `${getDeterministicRandom(i, 6.6) * 0.8}s`);
      p.style.setProperty("--blur", `${getDeterministicRandom(i, 7.7) * 2}px`);
      
      container.appendChild(p);
      
      // Trigger animations
      setTimeout(() => p.classList.add("active"), 50);
    }
  }, 2000);

  // Phase 3: Quote fades in (t = 3500ms)
  setTimeout(() => {
    const quoteEl = document.getElementById("opening-quote");
    quoteEl.innerHTML = `“When confusion ends, wisdom begins.”`;
    quoteEl.classList.add("active");
  }, 3500);

  // Phase 4: Fade out overlay (t = 6000ms)
  setTimeout(() => {
    overlay.style.opacity = 0;
  }, 6000);

  // Complete timeline, cleanup (t = 7500ms)
  setTimeout(() => {
    overlay.classList.add("hidden");
    document.body.style.overflow = "";
    sessionStorage.setItem("gita-intro-complete", "true");
  }, 7500);
}

// ==========================================
// 6. ROUTER (SPA HASH NAVIGATION)
// ==========================================

function showView(viewId) {
  document.querySelectorAll(".route-view").forEach(v => {
    v.classList.remove("active-view");
    v.classList.add("hidden");
  });
  const target = document.getElementById(viewId);
  if (target) {
    target.classList.remove("hidden");
    void target.offsetWidth;
    target.classList.add("active-view");
  }
}

function handleHashRouting() {
  const hash = window.location.hash || "#/";
  
  // Clean active navbar items
  document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));

  window.scrollTo(0, 0);

  if (hash === "#/" || hash === "#") {
    // Show Home View
    showView("view-home");
    document.querySelector('.nav-link[data-route="home"]')?.classList.add("active");
    // Ensure canvas visualizers scale properly
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 100);
  } 
  else if (hash === "#/chapters") {
    // Show home then scroll to chapters
    showView("view-home");
    document.querySelector('.nav-link[data-route="chapters"]')?.classList.add("active");
    setTimeout(() => {
      document.getElementById("chapters")?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  } 
  else if (hash.startsWith("#/chapter/")) {
    const chapterId = parseInt(hash.replace("#/chapter/", ""));
    if (chapterId >= 1 && chapterId <= 18) {
      renderChapterReader(chapterId);
    } else {
      window.location.hash = "#/";
    }
  } 
  else if (hash === "#/quotes") {
    // Show Quotes View
    renderQuotesGallery();
    document.querySelector('.nav-link[data-route="quotes"]')?.classList.add("active");
  } 
  else {
    window.location.hash = "#/";
  }

  // Close mobile menus on navigating
  document.getElementById("mobile-menu").classList.add("hidden");
}

window.addEventListener("hashchange", handleHashRouting);
window.addEventListener("load", handleHashRouting);

// ==========================================
// 7. COMPONENT: CHAPTER READER VIEW
// ==========================================

async function renderChapterReader(chapterId) {
  if (store.expandedVerses) {
    store.expandedVerses.clear();
  }
  const container = document.getElementById("view-chapter");
  container.innerHTML = `
    <div class="max-width-4xl text-center py-20 px-6">
      <div class="glass rounded-3xl p-12 glow-gold space-y-4 animate-pulse">
        <p class="text-xs tracking-widest uppercase text-divine-gold/40">Chapter ${chapterId}</p>
        <div class="h-8 w-48 bg-white/10 rounded mx-auto"></div>
        <div class="h-4 w-96 bg-white/5 rounded mx-auto"></div>
        <div class="h-[200px] w-full bg-white/[0.01] border border-white/5 rounded-2xl"></div>
      </div>
    </div>
  `;
  showView("view-chapter");

  const chapter = chapters.find(c => c.id === chapterId);
  const prevChapter = chapters.find(c => c.id === chapterId - 1);
  const nextChapter = chapters.find(c => c.id === chapterId + 1);

  // Fetch verses
  let apiVerses = null;
  let isError = false;

  try {
    const res = await fetch(`https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${chapterId}/verses/?skip=0&limit=100`, {
      headers: {
        "x-rapidapi-host": "bhagavad-gita3.p.rapidapi.com",
        "x-rapidapi-key": "197f39c983mshf13b7c1dba0ee51p16f4f2jsn2e5af2c996be",
        "Content-Type": "application/json"
      }
    });
    if (!res.ok) throw new Error("API Failure");
    apiVerses = await res.json();
  } catch (err) {
    console.error("Verses fetch failed:", err);
    isError = true;
  }

  // Compute unique translation and commentary authors if successfully fetched
  let englishAuthors = [];
  let hindiAuthors = [];
  let commentaryAuthors = [];

  if (apiVerses) {
    const engSet = new Set();
    const hinSet = new Set();
    const comSet = new Set();
    apiVerses.forEach(v => {
      v.translations.forEach(tr => {
        if (tr.language === "english" && tr.author_name) engSet.add(tr.author_name);
        if (tr.language === "hindi" && tr.author_name) hinSet.add(tr.author_name);
      });
      v.commentaries.forEach(cm => {
        if (cm.author_name) comSet.add(cm.author_name);
      });
    });
    englishAuthors = Array.from(engSet).sort();
    hindiAuthors = Array.from(hinSet).sort();
    commentaryAuthors = Array.from(comSet).sort();

    // Fallback selections to keep UI happy
    if (englishAuthors.length > 0 && !englishAuthors.includes(store.preferredEnglishAuthor)) {
      store.preferredEnglishAuthor = englishAuthors.includes("Swami Sivananda") ? "Swami Sivananda" : englishAuthors[0];
    }
    if (hindiAuthors.length > 0 && !hindiAuthors.includes(store.preferredHindiAuthor)) {
      store.preferredHindiAuthor = hindiAuthors.includes("Swami Ramsukhdas") ? "Swami Ramsukhdas" : hindiAuthors[0];
    }
    if (commentaryAuthors.length > 0 && !commentaryAuthors.includes(store.preferredCommentaryAuthor)) {
      store.preferredCommentaryAuthor = commentaryAuthors.includes("Swami Sivananda") ? "Swami Sivananda" : commentaryAuthors[0];
    }
  }

  // Generate Reader HTML Structure
  let html = `
    <div class="reader-bg min-h-screen pt-20 pb-32 transition-colors duration-500">
      
      <!-- Top Reading Progress Indicator -->
      <div class="fixed top-0 left-0 right-0 h-[2px] z-50 bg-black/10">
        <div id="reading-progress-bar" class="h-full bg-gradient-to-r from-[#F5B041] to-[#FF6B35]" style="width: 0%;"></div>
      </div>

      <div class="max-w-3xl mx-auto px-6">
        
        <!-- Back Button -->
        <div class="mb-12">
          <a href="#/chapters" class="inline-flex items-center gap-2 text-sm reader-tag hover:text-[#F5B041] transition-colors decoration-none">
            <i data-lucide="arrow-left"></i>
            <span>All Chapters</span>
          </a>
        </div>

        <!-- Chapter Header -->
        <div class="mb-16 text-center">
          <p class="text-xs tracking-[0.4em] uppercase reader-sanskrit mb-4">
            Chapter ${String(chapter.id).padStart(2, "0")} of 18
          </p>
          <h1 class="text-2xl md:text-3xl reader-sanskrit font-display mb-3 sanskrit-text">
            ${chapter.nameSanskrit}
          </h1>
          <h2 class="text-4xl md:text-5xl font-display font-bold reader-title mb-6">
            ${chapter.name}
          </h2>
          <p class="text-lg reader-meta max-w-xl mx-auto font-light leading-relaxed">
            ${chapter.summary}
          </p>
          
          <div class="flex items-center justify-center gap-4 mt-8 text-sm reader-tag">
            <span>${chapter.verseCount} verses</span>
            <span class="meta-dot"></span>
            <span>${chapter.theme}</span>
          </div>
        </div>

        <!-- Settings buttons row -->
        <div class="flex items-center justify-center gap-3 mb-12">
          <button id="toggle-settings-panel" class="btn-primary glass btn-toggle-focus">
            <i data-lucide="type"></i>
            <span>Reading Settings</span>
          </button>
          <button id="chapter-bookmark-btn" class="btn-primary glass btn-toggle-focus ${store.isBookmarked(chapterId, 0) ? "active" : ""}">
            <i data-lucide="bookmark-plus"></i>
            <span>${store.isBookmarked(chapterId, 0) ? "Bookmarked" : "Bookmark"}</span>
          </button>
          <button id="chapter-share-btn" class="btn-secondary glass btn-toggle-focus">
            <i data-lucide="share-2"></i>
            <span>Share</span>
          </button>
        </div>

        <!-- Controls panel dropdown -->
        <div id="reader-settings-panel" class="controls-panel">
          <div class="controls-grid">
            <!-- Display sizes -->
            <div class="space-y-4">
              <h4 class="controls-section-title reader-sanskrit">Display Settings</h4>
              <div class="font-size-control">
                <span class="text-xs">Font Size</span>
                <div class="flex items-center gap-2">
                  <input type="range" min="14" max="24" value="${store.fontSize}" id="font-size-slider" class="range-slider">
                  <span class="text-xs w-8 text-right font-mono" id="font-size-val">${store.fontSize}px</span>
                </div>
              </div>

              <!-- Theme selector -->
              <div class="theme-control">
                <span class="text-xs">Theme</span>
                <div class="theme-options">
                  <button class="theme-opt-btn opt-sepia ${store.theme === "sepia" ? "active" : ""}" data-theme="sepia" title="Sepia Mode"></button>
                  <button class="theme-opt-btn opt-light ${store.theme === "light" ? "active" : ""}" data-theme="light" title="Light Mode"></button>
                </div>
              </div>
            </div>

            <!-- Focus toggles -->
            <div>
              <h4 class="controls-section-title reader-sanskrit">Focus Controls</h4>
              <div class="focus-toggles-grid">
                <button class="btn-toggle-focus toggle-focus-opt ${store.showSanskrit ? "active" : ""}" data-opt="showSanskrit">Sanskrit</button>
                <button class="btn-toggle-focus toggle-focus-opt ${store.showTransliteration ? "active" : ""}" data-opt="showTransliteration">Transliteration</button>
                <button class="btn-toggle-focus toggle-focus-opt ${store.showWordMeanings ? "active" : ""}" data-opt="showWordMeanings">Meanings</button>
                <button class="btn-toggle-focus toggle-focus-opt ${store.showEnglishTrans ? "active" : ""}" data-opt="showEnglishTrans">English Translation</button>
                <button class="btn-toggle-focus toggle-focus-opt ${store.showHindiTrans ? "active" : ""}" data-opt="showHindiTrans">Hindi Translation</button>
                <button class="btn-toggle-focus toggle-focus-opt ${store.showCommentary ? "active" : ""}" data-opt="showCommentary">Commentary</button>
              </div>
            </div>
          </div>

          <!-- Author selectors row -->
          ${apiVerses ? `
          <div class="pt-4 border-t border-white/5 space-y-4">
            <h4 class="controls-section-title reader-sanskrit">Translations & Commentaries</h4>
            <div class="authors-panel-row">
              <div class="author-select-box">
                <label>English Translation</label>
                <div class="select-wrapper">
                  <select id="select-pref-eng-author">
                    ${englishAuthors.map(auth => `<option value="${auth}" ${store.preferredEnglishAuthor === auth ? "selected" : ""}>${auth}</option>`).join("")}
                  </select>
                  <i data-lucide="chevron-down"></i>
                </div>
              </div>
              <div class="author-select-box">
                <label>Hindi Translation</label>
                <div class="select-wrapper">
                  <select id="select-pref-hin-author">
                    ${hindiAuthors.map(auth => `<option value="${auth}" ${store.preferredHindiAuthor === auth ? "selected" : ""}>${auth}</option>`).join("")}
                  </select>
                  <i data-lucide="chevron-down"></i>
                </div>
              </div>
              <div class="author-select-box">
                <label>Commentary</label>
                <div class="select-wrapper">
                  <select id="select-pref-com-author">
                    ${commentaryAuthors.map(auth => `<option value="${auth}" ${store.preferredCommentaryAuthor === auth ? "selected" : ""}>${auth}</option>`).join("")}
                  </select>
                  <i data-lucide="chevron-down"></i>
                </div>
              </div>
            </div>
          </div>` : ""}
        </div>

        <!-- Key Verse Banner Card -->
        <div class="key-verse-card p-8 md:p-12 mb-12 glow-card">
          <p class="text-xs tracking-widest uppercase reader-sanskrit mb-6 text-center font-semibold">Key Verse</p>
          <p class="text-center reader-sanskrit font-display leading-loose mb-6 sanskrit-text key-verse-sanskrit verse-sanskrit-dynamic" style="font-size: ${store.fontSize + 2}px;">
            ${chapter.keyVerse}
          </p>
          <div class="w-16 h-px key-verse-divider mx-auto mb-6"></div>
          <p class="text-center reader-title font-light italic leading-relaxed verse-text-dynamic" style="font-size: ${store.fontSize}px;">
            &ldquo;${chapter.keyVerseTranslation}&rdquo;
          </p>
        </div>

        <!-- Dynamic Verses List Container -->
        <div class="space-y-8 mb-16" id="verses-rendered-list">
          <!-- Rendered items here -->
        </div>

        <!-- Chapter complete banner -->
        <div class="chapter-completed-card border p-8 text-center space-y-2">
          <p class="chapter-comp-title font-light">You completed Chapter <span class="reader-sanskrit font-semibold">${chapter.id}</span></p>
          <p class="chapter-comp-desc opacity-40 font-light">May your path be guided by the eternal truth of the Gita.</p>
        </div>

        <!-- Prev / Next Chapter Navigation Footer -->
        <div class="reader-bottom-nav border-t pt-8">
          ${prevChapter ? `
          <a href="#/chapter/${prevChapter.id}" class="nav-ch-link group">
            <i class="arrow-left" data-lucide="arrow-left"></i>
            <div class="nav-ch-meta">
              <p class="nav-label">Previous</p>
              <p class="nav-title font-medium">${prevChapter.name}</p>
            </div>
          </a>` : "<div></div>"}

          ${nextChapter ? `
          <a href="#/chapter/${nextChapter.id}" class="nav-ch-link text-right group">
            <div class="nav-ch-meta">
              <p class="nav-label">Next</p>
              <p class="nav-title font-medium">${nextChapter.name}</p>
            </div>
            <i class="arrow-right" data-lucide="arrow-right"></i>
          </a>` : "<div></div>"}
        </div>

      </div>
    </div>
  `;

  container.innerHTML = html;
  lucide.createIcons();

  // Populate dynamic list items
  const listContainer = document.getElementById("verses-rendered-list");
  if (isError || !apiVerses) {
    // Fallback card
    listContainer.innerHTML = `
      <div class="verse-item-card p-8 text-center space-y-4">
        <p class="text-sm">Failed to load verses from API. Displaying static chapter review card.</p>
        <div class="p-6 rounded-xl commentary-box text-left">
          <p class="text-xs opacity-50 italic leading-relaxed font-light">
            To view all 700 verses, please check your network connection and ensure your API key is correctly configured. 
            All other app elements (Cosmic animations, Chat assistant, Quotes canvas download) remain fully functional offline.
          </p>
        </div>
      </div>
    `;
  } else {
    renderVersesList(listContainer, apiVerses);
  }

  // Setup Interaction Hooks inside the Reader View
  // 1. Settings Panel toggle
  const settingsPanel = document.getElementById("reader-settings-panel");
  document.getElementById("toggle-settings-panel").addEventListener("click", () => {
    settingsPanel.classList.toggle("expanded");
    document.getElementById("toggle-settings-panel").classList.toggle("active");
  });

  // 2. Font Size Slider
  const fsSlider = document.getElementById("font-size-slider");
  const fsVal = document.getElementById("font-size-val");
  fsSlider.addEventListener("input", (e) => {
    const val = parseInt(e.target.value);
    fsVal.textContent = `${val}px`;
    store.setFontSize(val);
  });

  // 3. Theme switchers
  document.querySelectorAll(".theme-opt-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const th = e.target.dataset.theme;
      store.setTheme(th);
    });
  });

  // 4. Focus Toggles
  document.querySelectorAll(".toggle-focus-opt").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const opt = e.target.dataset.opt;
      store[opt] = !store[opt];
      e.target.classList.toggle("active", store[opt]);
      
      // Rerender the list to hide/show nodes instantly
      renderVersesList(listContainer, apiVerses);
    });
  });

  // 5. Select boxes preference changes
  const selectEng = document.getElementById("select-pref-eng-author");
  if (selectEng) {
    selectEng.addEventListener("change", (e) => {
      store.preferredEnglishAuthor = e.target.value;
      localStorage.setItem("gita-pref-eng-author", e.target.value);
      renderVersesList(listContainer, apiVerses);
    });
  }

  const selectHin = document.getElementById("select-pref-hin-author");
  if (selectHin) {
    selectHin.addEventListener("change", (e) => {
      store.preferredHindiAuthor = e.target.value;
      localStorage.setItem("gita-pref-hin-author", e.target.value);
      renderVersesList(listContainer, apiVerses);
    });
  }

  const selectCom = document.getElementById("select-pref-com-author");
  if (selectCom) {
    selectCom.addEventListener("change", (e) => {
      store.preferredCommentaryAuthor = e.target.value;
      localStorage.setItem("gita-pref-com-author", e.target.value);
      renderVersesList(listContainer, apiVerses);
    });
  }

  // 6. Chapter bookmark
  const bkBtn = document.getElementById("chapter-bookmark-btn");
  bkBtn.addEventListener("click", () => {
    const isBookmarked = store.toggleBookmark(chapterId, 0);
    bkBtn.classList.toggle("active", isBookmarked);
    bkBtn.querySelector("span").textContent = isBookmarked ? "Bookmarked" : "Bookmark";
  });

  // 7. Share chapter
  document.getElementById("chapter-share-btn").addEventListener("click", () => {
    const shareText = `Chapter ${chapter.id}: ${chapter.name} — Bhagavad Gita\n"${chapter.keyVerseTranslation}"`;
    if (navigator.share) {
      navigator.share({ title: chapter.name, text: shareText, url: window.location.href });
    } else {
      navigator.clipboard.writeText(shareText).then(() => {
        const span = document.getElementById("chapter-share-btn").querySelector("span");
        span.textContent = "Copied!";
        setTimeout(() => span.textContent = "Share", 2000);
      });
    }
  });

  // 8. Reading progress bar scroll listener
  const updateProgress = () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) return;
    const progress = (window.scrollY / totalHeight) * 100;
    const bar = document.getElementById("reading-progress-bar");
    if (bar) bar.style.width = `${progress}%`;

    // Dynamic store checkpoint: save last scroll position as reading verse checkpoint
    const verseCards = document.querySelectorAll(".verse-item-card");
    let visibleVerse = 1;
    for (let card of verseCards) {
      const rect = card.getBoundingClientRect();
      if (rect.top < window.innerHeight / 2) {
        visibleVerse = parseInt(card.dataset.verseNum) || 1;
      }
    }
    store.updateProgress(chapterId, visibleVerse);
  };
  window.addEventListener("scroll", updateProgress);

  // Initial trigger to position bookmark and progress
  updateProgress();
}

// Inner list renderer helper
// Helper to render detailed study aids inside the accordion panel
function renderDeepStudyContent(verse, wordMeaningsList, hinTr, com, isExpanded) {
  let html = "";
  
  // 1. Transliteration
  if ((isExpanded || store.showTransliteration) && verse.transliteration) {
    html += `
      <div class="space-y-1">
        <span class="text-[9px] uppercase opacity-40 tracking-wider block">Transliteration</span>
        <p class="text-xs opacity-50 text-center italic font-light tracking-wide leading-relaxed">
          ${verse.transliteration}
        </p>
      </div>
    `;
  }
  
  // 2. Word Meanings
  if ((isExpanded || store.showWordMeanings) && wordMeaningsList.length > 0) {
    html += `
      <div class="space-y-2">
        <p class="text-[9px] tracking-widest uppercase opacity-40 font-semibold">Word Meanings</p>
        <div class="flex flex-wrap gap-2">
          ${wordMeaningsList.map(wm => `
            <div class="word-meaning-pill px-2.5 py-1 rounded-lg text-xs">
              <span class="font-medium reader-sanskrit font-sans wm-word">${wm.word}</span>
              <span class="opacity-30 mx-1">→</span>
              <span class="opacity-60">${wm.meaning}</span>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }
  
  // 3. Hindi Translation
  if ((isExpanded || store.showHindiTrans) && hinTr) {
    html += `
      <div class="space-y-1">
        <span class="text-[9px] uppercase opacity-40 tracking-wider block">Translation (Hindi — ${hinTr.author_name})</span>
        <p class="leading-relaxed font-light font-display reader-title verse-text-dynamic" style="font-size: ${store.fontSize}px;">
          ${hinTr.description}
        </p>
      </div>
    `;
  }
  
  // 4. Commentary
  if ((isExpanded || store.showCommentary) && com) {
    html += `
      <div class="commentary-box p-4 rounded-xl space-y-2">
        <div class="commentary-header opacity-50 flex items-center gap-1.5 text-xs font-semibold">
          <i data-lucide="book-open" style="width: 10px; height: 10px;"></i>
          <span>Commentary (${com.author_name})</span>
        </div>
        <p class="commentary-text opacity-70 font-light leading-relaxed text-sm">${com.description.replace(/\n/g, "<br>")}</p>
      </div>
    `;
  }
  
  return html;
}

// Inner list renderer helper
function renderVersesList(parentEl, apiVerses) {
  parentEl.innerHTML = "";
  
  apiVerses.forEach(verse => {
    const wordMeaningsList = parseWordMeanings(verse.word_meanings);
    
    // Select translation / commentary
    const engTr = verse.translations.find(t => t.language === "english" && t.author_name === store.preferredEnglishAuthor) || 
                 verse.translations.find(t => t.language === "english") || 
                 verse.translations[0];
                 
    const hinTr = verse.translations.find(t => t.language === "hindi" && t.author_name === store.preferredHindiAuthor) || 
                 verse.translations.find(t => t.language === "hindi") || 
                 verse.translations[0];
                 
    const com = verse.commentaries.find(c => c.author_name === store.preferredCommentaryAuthor) || 
                verse.commentaries.find(c => c.language === "english") || 
                verse.commentaries[0];

    const card = document.createElement("div");
    card.className = "verse-item-card glow-card p-6 md:p-8 space-y-6";
    card.dataset.verseNum = verse.verse_number;

    let inner = `
      <div class="flex justify-between items-center">
        <span class="text-xs reader-sanskrit font-semibold tracking-wider">${verse.chapter_number}.${verse.verse_number}</span>
        <span class="text-[10px] opacity-40 font-mono">Verse ${verse.verse_number}</span>
      </div>
    `;

    // 1. Sanskrit
    if (store.showSanskrit) {
      inner += `
        <p class="font-display leading-loose text-center reader-sanskrit sanskrit-text verse-sanskrit-dynamic verse-sanskrit-text" style="font-size: ${store.fontSize + 2}px;">
          ${verse.text.replace(/\n/g, "<br>")}
        </p>
      `;
    }

    // Divider: show if english translation is visible and sanskrit is visible
    if (store.showEnglishTrans && engTr && store.showSanskrit) {
      inner += `<div class="w-12 h-px verse-content-divider"></div>`;
    }

    // 2. English Translation
    if (store.showEnglishTrans && engTr) {
      inner += `
        <div class="space-y-1">
          <span class="text-[9px] uppercase opacity-40 tracking-wider block">Translation (English — ${engTr.author_name})</span>
          <p class="leading-relaxed font-light reader-title verse-text-dynamic" style="font-size: ${store.fontSize}px;">
            ${engTr.description}
          </p>
        </div>
      `;
    }

    // Deep Study Accordion Panel
    const isExpanded = store.expandedVerses && store.expandedVerses.has(verse.verse_number);
    const anyVisibleGlobally = store.showTransliteration || store.showWordMeanings || store.showHindiTrans || store.showCommentary;
    const isPanelActive = isExpanded || anyVisibleGlobally;
    const panelContent = renderDeepStudyContent(verse, wordMeaningsList, hinTr, com, isExpanded);

    inner += `
      <div class="verse-deep-study-panel ${isPanelActive ? 'expanded' : ''}">
        ${panelContent}
      </div>
    `;

    // Deep Study Toggle Button
    inner += `
      <div class="flex justify-center pt-2">
        <button class="btn-deep-study">
          <span>${isExpanded ? 'Hide Study Aids' : 'Deep Study'}</span>
          <i data-lucide="${isExpanded ? 'chevron-up' : 'chevron-down'}" style="width: 14px; height: 14px;"></i>
        </button>
      </div>
    `;

    card.innerHTML = inner;
    parentEl.appendChild(card);

    // Bind event listener to toggle button on this specific card
    const btn = card.querySelector(".btn-deep-study");
    if (btn) {
      btn.addEventListener("click", () => {
        const panel = card.querySelector(".verse-deep-study-panel");
        const hasExpanded = store.expandedVerses.has(verse.verse_number);
        
        if (hasExpanded) {
          store.expandedVerses.delete(verse.verse_number);
          panel.classList.remove("expanded");
          btn.innerHTML = `<span>Deep Study</span><i data-lucide="chevron-down" style="width: 14px; height: 14px;"></i>`;
          
          // Smoothly remove content after the collapse transition ends (0.4s)
          setTimeout(() => {
            if (!store.expandedVerses.has(verse.verse_number)) {
              panel.innerHTML = renderDeepStudyContent(verse, wordMeaningsList, hinTr, com, false);
            }
          }, 400);
        } else {
          store.expandedVerses.add(verse.verse_number);
          panel.innerHTML = renderDeepStudyContent(verse, wordMeaningsList, hinTr, com, true);
          
          // Force reflow for height transition to fire properly
          panel.getBoundingClientRect();
          panel.classList.add("expanded");
          btn.innerHTML = `<span>Hide Study Aids</span><i data-lucide="chevron-up" style="width: 14px; height: 14px;"></i>`;
        }
        
        lucide.createIcons();
      });
    }
  });
  
  lucide.createIcons();
}

// ==========================================
// 8. COMPONENT: QUOTES GALLERY & CANVAS DOWNLOAD
// ==========================================

const quoteGradients = [
  "from-amber-900/20 to-orange-900/10",
  "from-purple-900/20 to-indigo-900/10",
  "from-emerald-900/20 to-teal-900/10",
  "from-rose-900/20 to-pink-900/10",
  "from-blue-900/20 to-cyan-900/10",
  "from-slate-800/20 to-gray-900/10"
];

function renderQuotesGallery() {
  const container = document.getElementById("view-quotes");
  container.className = "route-view quotes-section";
  showView("view-quotes");

  let html = `
    <div class="max-w-6xl mx-auto">
      
      <!-- Back -->
      <div class="mb-12">
        <a href="#/" class="inline-flex items-center gap-2 text-sm text-white/30 hover:text-white/60 transition-colors decoration-none">
          <i data-lucide="arrow-left"></i>
          <span>Home</span>
        </a>
      </div>

      <!-- Header -->
      <div class="quotes-header">
        <p class="text-xs tracking-[0.4em] uppercase text-divine-gold/40 mb-4">Timeless Words</p>
        <h1 class="text-4xl md:text-5xl font-display font-bold text-white/90 mb-6">Quotes from the Gita</h1>
        <p class="text-lg text-white/30 max-w-xl mx-auto font-light leading-relaxed">
          Save, share, or download as wallpapers. Each quote carries the weight of eternal wisdom.
        </p>
      </div>

      <!-- Masonry Grid -->
      <div class="quotes-grid" id="quotes-rendered-grid">
        <!-- Rendered Quote Cards -->
      </div>

    </div>
  `;

  container.innerHTML = html;
  lucide.createIcons();

  const grid = document.getElementById("quotes-rendered-grid");
  quotes.forEach((q, idx) => {
    const card = document.createElement("div");
    card.className = `quote-card glass bg-gradient-to-br ${quoteGradients[idx % quoteGradients.length]} glow-card`;

    // Calculate liked state
    const isLiked = store.isBookmarked(q.chapter, q.verse);

    card.innerHTML = `
      <p class="quote-text">&ldquo;${q.text}&rdquo;</p>
      <p class="text-xs text-divine-gold/40 mb-6">Chapter ${q.chapter}, Verse ${q.verse}</p>
      
      <div class="flex items-center gap-2">
        <button class="btn-icon quote-like-btn ${isLiked ? "btn-saved-active" : ""}" title="${isLiked ? "Saved" : "Save Quote"}">
          <i data-lucide="heart" style="width: 14px; height: 14px; ${isLiked ? "fill: currentColor" : ""}"></i>
        </button>
        <button class="btn-icon quote-share-btn" title="Share Quote">
          <i data-lucide="share-2" style="width: 14px; height: 14px;"></i>
        </button>
        <button class="btn-icon quote-download-btn" title="Download Wallpaper">
          <i data-lucide="download" style="width: 14px; height: 14px;"></i>
        </button>
      </div>
    `;

    // Bind Quote actions
    // 1. Like / Bookmark
    card.querySelector(".quote-like-btn").addEventListener("click", (e) => {
      const added = store.toggleBookmark(q.chapter, q.verse);
      const btn = card.querySelector(".quote-like-btn");
      btn.classList.toggle("btn-saved-active", added);
      btn.querySelector("i").style.fill = added ? "currentColor" : "none";
    });

    // 2. Share
    card.querySelector(".quote-share-btn").addEventListener("click", () => {
      const text = `"${q.text}" — Bhagavad Gita ${q.chapter}.${q.verse}`;
      if (navigator.share) {
        navigator.share({ text });
      } else {
        navigator.clipboard.writeText(text).then(() => {
          alert("Quote copied to clipboard!");
        });
      }
    });

    // 3. Download Wallpaper (HTML5 Canvas Draw)
    card.querySelector(".quote-download-btn").addEventListener("click", () => {
      if (window.openWallpaperCustomizer) {
        window.openWallpaperCustomizer(q);
      } else {
        generateAndDownloadWallpaper(q);
      }
    });

    grid.appendChild(card);
  });

  lucide.createIcons();
}

const wallpaperThemes = {
  charcoal: {
    name: "Sacred Charcoal",
    class: "theme-charcoal",
    bgGradient: ["#07070F", "#14100E", "#07070F"],
    glowColor: "rgba(245, 176, 65, 0.09)",
    omColor: "rgba(245, 176, 65, 0.12)",
    textColor: "rgba(255, 255, 255, 0.88)",
    dividerColor: "rgba(245, 176, 65, 0.3)",
    refColor: "rgba(245, 176, 65, 0.6)",
    watermarkColor: "rgba(255, 255, 255, 0.15)",
    swatchClass: "swatch-charcoal"
  },
  dawn: {
    name: "Golden Dawn",
    class: "theme-dawn",
    bgGradient: ["#2D1B0B", "#4D3319", "#7A4F1D"],
    glowColor: "rgba(245, 176, 65, 0.12)",
    omColor: "rgba(255, 255, 255, 0.1)",
    textColor: "rgba(255, 255, 255, 0.9)",
    dividerColor: "rgba(245, 176, 65, 0.4)",
    refColor: "#E5A93C",
    watermarkColor: "rgba(255, 255, 255, 0.2)",
    swatchClass: "swatch-dawn"
  },
  cream: {
    name: "Creamy Ivory",
    class: "theme-cream",
    bgGradient: ["#FAF6EB", "#FAF6EB", "#EFE4D6"],
    glowColor: "rgba(178, 119, 31, 0.06)",
    omColor: "rgba(178, 119, 31, 0.15)",
    textColor: "#2D1E0B",
    dividerColor: "rgba(178, 119, 31, 0.3)",
    refColor: "#B2771F",
    watermarkColor: "rgba(45, 30, 11, 0.25)",
    swatchClass: "swatch-cream"
  },
  saffron: {
    name: "Saffron Silk",
    class: "theme-saffron",
    bgGradient: ["#220A03", "#4C1605", "#872E15"],
    glowColor: "rgba(245, 176, 65, 0.12)",
    omColor: "rgba(245, 176, 65, 0.15)",
    textColor: "rgba(255, 255, 255, 0.9)",
    dividerColor: "rgba(245, 176, 65, 0.3)",
    refColor: "#E5A93C",
    watermarkColor: "rgba(255, 255, 255, 0.2)",
    swatchClass: "swatch-saffron"
  },
  indigo: {
    name: "Royal Indigo",
    class: "theme-indigo",
    bgGradient: ["#020210", "#080A26", "#131A47"],
    glowColor: "rgba(59, 130, 246, 0.15)",
    omColor: "rgba(255, 255, 255, 0.08)",
    textColor: "rgba(255, 255, 255, 0.9)",
    dividerColor: "rgba(59, 130, 246, 0.3)",
    refColor: "#3B82F6",
    watermarkColor: "rgba(255, 255, 255, 0.15)",
    swatchClass: "swatch-indigo"
  }
};

let currentWpQuote = null;
let activeWpTheme = "charcoal";

function initWallpaperCustomizer() {
  const modal = document.getElementById("wallpaper-modal");
  if (!modal) return;
  const closeBtn = document.getElementById("wallpaper-close");
  const backdrop = modal.querySelector(".modal-backdrop");
  const themeOptionsContainer = document.getElementById("wallpaper-theme-options");
  const showOmCheckbox = document.getElementById("wp-show-om");
  const showBrandingCheckbox = document.getElementById("wp-show-branding");
  const downloadBtn = document.getElementById("wp-download-btn");

  const renderWpPreview = () => {
    if (!currentWpQuote) return;
    const preview = document.getElementById("wallpaper-preview-card");
    if (!preview) return;
    const theme = wallpaperThemes[activeWpTheme];
    
    // Set card styles
    preview.className = `wallpaper-preview-card ${theme.class}`;
    
    // Apply background styling directly
    if (activeWpTheme === "charcoal") {
      preview.style.background = "linear-gradient(135deg, #07070F 0%, #14100E 100%)";
    } else if (activeWpTheme === "dawn") {
      preview.style.background = "linear-gradient(135deg, #2D1B0B 0%, #4D3319 50%, #7A4F1D 100%)";
    } else if (activeWpTheme === "cream") {
      preview.style.background = "linear-gradient(135deg, #FAF6EB 0%, #EFE4D6 100%)";
    } else if (activeWpTheme === "saffron") {
      preview.style.background = "linear-gradient(135deg, #220A03 0%, #4C1605 50%, #872E15 100%)";
    } else if (activeWpTheme === "indigo") {
      preview.style.background = "linear-gradient(135deg, #020210 0%, #080A26 50%, #131A47 100%)";
    }

    const showOm = showOmCheckbox.checked;
    const showBranding = showBrandingCheckbox.checked;

    preview.innerHTML = `
      ${showOm ? `<div class="wp-preview-om">ॐ</div>` : `<div></div>`}
      <div class="wp-preview-text">&ldquo;${currentWpQuote.text}&rdquo;</div>
      <div class="flex flex-col items-center">
        <div class="wp-preview-divider"></div>
        <div class="wp-preview-ref">— BG ${currentWpQuote.chapter}.${currentWpQuote.verse}</div>
      </div>
      <div class="wp-preview-footer">${showBranding ? 'bhagavadgita.app' : ''}</div>
    `;
  };

  const openWpModal = (quote) => {
    currentWpQuote = quote;
    modal.classList.remove("hidden");
    renderWpPreview();
  };

  const closeWpModal = () => {
    modal.classList.add("hidden");
  };

  closeBtn.addEventListener("click", closeWpModal);
  backdrop.addEventListener("click", closeWpModal);

  // Render Theme options
  themeOptionsContainer.innerHTML = Object.entries(wallpaperThemes).map(([key, theme]) => `
    <button class="wallpaper-theme-option-btn ${key === activeWpTheme ? 'active' : ''}" data-theme="${key}">
      <div class="wallpaper-theme-swatch ${theme.swatchClass}"></div>
      <span class="wallpaper-theme-label">${theme.name.split(" ")[1]}</span>
    </button>
  `).join("");

  themeOptionsContainer.addEventListener("click", (e) => {
    const btn = e.target.closest(".wallpaper-theme-option-btn");
    if (btn) {
      themeOptionsContainer.querySelectorAll(".wallpaper-theme-option-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeWpTheme = btn.dataset.theme;
      renderWpPreview();
    }
  });

  showOmCheckbox.addEventListener("change", renderWpPreview);
  showBrandingCheckbox.addEventListener("change", renderWpPreview);

  downloadBtn.addEventListener("click", () => {
    if (!currentWpQuote) return;
    generateAndDownloadWpCanvas(currentWpQuote, activeWpTheme, showOmCheckbox.checked, showBrandingCheckbox.checked);
  });

  // Global event registration so quote cards can open it
  window.openWallpaperCustomizer = openWpModal;
}

function generateAndDownloadWpCanvas(quote, themeKey, showOm, showBranding) {
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1920;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const theme = wallpaperThemes[themeKey];

  // Draw background gradient
  const grad = ctx.createLinearGradient(0, 0, 1080, 1920);
  grad.addColorStop(0, theme.bgGradient[0]);
  grad.addColorStop(0.5, theme.bgGradient[1]);
  grad.addColorStop(1, theme.bgGradient[2]);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1080, 1920);

  // Soft ambient radial glow at center
  const glow = ctx.createRadialGradient(540, 960, 0, 540, 960, 600);
  glow.addColorStop(0, theme.glowColor);
  glow.addColorStop(1, "transparent");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, 1080, 1920);

  // 1. Draw OM Symbol in the background
  if (showOm) {
    ctx.font = "140px serif";
    ctx.fillStyle = theme.omColor;
    ctx.textAlign = "center";
    ctx.fillText("ॐ", 540, 660);
  }

  // 2. Quote text (centered, wrapped lines)
  ctx.font = "40px Georgia, serif";
  ctx.fillStyle = theme.textColor;
  ctx.textAlign = "center";
  
  const words = quote.text.split(" ");
  let line = "";
  let y = 840;
  const maxLineW = 840;

  for (const word of words) {
    const test = line + word + " ";
    if (ctx.measureText(test).width > maxLineW) {
      ctx.fillText(line.trim(), 540, y);
      line = word + " ";
      y += 66;
    } else {
      line = test;
    }
  }
  ctx.fillText(line.trim(), 540, y);

  // 3. Draw divider line
  ctx.strokeStyle = theme.dividerColor;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(480, y + 60);
  ctx.lineTo(600, y + 60);
  ctx.stroke();

  // 4. Reference
  ctx.font = "bold 26px sans-serif";
  ctx.fillStyle = theme.refColor;
  ctx.fillText(`— Bhagavad Gita ${quote.chapter}.${quote.verse}`, 540, y + 120);

  // 5. App Branding / URL footer
  if (showBranding) {
    ctx.font = "20px sans-serif";
    ctx.fillStyle = theme.watermarkColor;
    ctx.fillText("bhagavadgita.app", 540, 1780);
  }

  // Trigger download
  const link = document.createElement("a");
  link.download = `gita-wallpaper-${quote.chapter}-${quote.verse}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

function generateAndDownloadWallpaper(quote) {
  if (window.openWallpaperCustomizer) {
    window.openWallpaperCustomizer(quote);
  } else {
    generateAndDownloadWpCanvas(quote, "charcoal", true, true);
  }
}

// ==========================================
// 9. SACRED SEARCH & EMOTIONS INDEX
// ==========================================

function setupSearchModal() {
  const modal = document.getElementById("search-modal");
  const trigger = document.getElementById("search-trigger");
  const closeBtn = document.getElementById("search-close");
  const input = document.getElementById("search-input");
  const resultsContainer = document.getElementById("search-results-container");

  const openSearch = () => {
    modal.classList.remove("hidden");
    input.value = "";
    renderSearchSuggestions();
    setTimeout(() => input.focus(), 50);
  };

  const closeSearch = () => {
    modal.classList.add("hidden");
  };

  trigger.addEventListener("click", openSearch);
  closeBtn.addEventListener("click", closeSearch);
  modal.querySelector(".modal-backdrop").addEventListener("click", closeSearch);

  // Escape key close
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeSearch();
    }
  });

  input.addEventListener("input", (e) => {
    const query = e.target.value.trim();
    if (!query) {
      renderSearchSuggestions();
    } else {
      renderSearchResults(query);
    }
  });

  function renderSearchSuggestions() {
    resultsContainer.innerHTML = `
      <div>
        <p class="text-xs tracking-widest uppercase text-divine-gold/40 mb-4 px-2 flex items-center gap-2">
          <i data-lucide="heart" style="width: 10px; height: 10px;"></i>
          <span>What are you feeling?</span>
        </p>
        <div class="grid grid-cols-3 sm:grid-cols-4 gap-2" id="emotions-suggestions-list">
          <!-- Populated -->
        </div>
      </div>
    `;

    const list = document.getElementById("emotions-suggestions-list");
    emotionSuggestions.forEach(em => {
      const btn = document.createElement("button");
      btn.className = "flex flex-col items-center gap-1.5 p-3 rounded-xl glass hover:bg-white/[0.06] transition-all group cursor-pointer border-none bg-transparent w-full text-white";
      btn.innerHTML = `
        <span class="text-xl group-hover:scale-110 transition-transform">${em.emoji}</span>
        <span class="text-xs text-white/40 group-hover:text-white/60">${em.label}</span>
      `;
      btn.addEventListener("click", () => {
        renderEmotionResults(em.key);
      });
      list.appendChild(btn);
    });
    
    lucide.createIcons();
  }

  function renderEmotionResults(emotionKey) {
    const result = sacredSearchMap[emotionKey];
    if (!result) return;

    resultsContainer.innerHTML = `
      <div>
        <button id="search-back-emotions" class="text-xs text-divine-gold/50 hover:text-divine-gold mb-4 border-none bg-transparent cursor-pointer flex items-center gap-1">
          ← Back to emotions
        </button>
        <p class="text-xs tracking-widest uppercase text-divine-gold/40 mb-4 px-2 flex items-center gap-2">
          <i data-lucide="sparkles" style="width: 10px; height: 10px;"></i>
          <span>Krishna's guidance for ${emotionKey}</span>
        </p>
        <div class="space-y-1" id="search-chapters-results"></div>
        <div class="mt-6">
          <p class="text-xs tracking-widest uppercase text-white/20 mb-3 px-2">Relevant Verses</p>
          <div class="space-y-1" id="search-verses-results"></div>
        </div>
      </div>
    `;

    // Chapters list
    const chContainer = document.getElementById("search-chapters-results");
    const matchedChapters = chapters.filter(ch => result.chapters.includes(ch.id));
    matchedChapters.forEach(ch => {
      const link = document.createElement("a");
      link.href = `#/chapter/${ch.id}`;
      link.className = "flex items-center gap-4 p-3 rounded-xl hover:bg-white/[0.04] transition-all group decoration-none";
      link.innerHTML = `
        <span class="text-divine-gold/40 text-xs font-mono w-6">${String(ch.id).padStart(2, "0")}</span>
        <div class="flex-1 min-w-0">
          <p class="text-sm text-white/70 group-hover:text-white truncate">${ch.name}</p>
          <p class="text-xs text-white/25 truncate">${ch.nameSanskrit}</p>
        </div>
        <i data-lucide="arrow-right" class="text-white/10 group-hover:text-divine-gold/50 shrink-0"></i>
      `;
      link.addEventListener("click", closeSearch);
      chContainer.appendChild(link);
    });

    // Verses list
    const vContainer = document.getElementById("search-verses-results");
    const matchedVerses = featuredVerses.filter(v => result.chapters.includes(v.chapter));
    matchedVerses.forEach(v => {
      const link = document.createElement("a");
      link.href = `#/chapter/${v.chapter}`;
      link.className = "block p-3 rounded-xl hover:bg-white/[0.04] transition-all decoration-none mb-1";
      link.innerHTML = `
        <p class="text-sm text-white/50 italic line-clamp-2">&ldquo;${v.english}&rdquo;</p>
        <p class="text-xs text-divine-gold/30 mt-1">Chapter ${v.chapter}, Verse ${v.verse}</p>
      `;
      link.addEventListener("click", closeSearch);
      vContainer.appendChild(link);
    });

    document.getElementById("search-back-emotions").addEventListener("click", renderSearchSuggestions);
    lucide.createIcons();
  }

  function renderSearchResults(query) {
    const queryLower = query.toLowerCase();
    const matchedChapters = chapters.filter(ch => 
      ch.name.toLowerCase().includes(queryLower) ||
      ch.nameSanskrit.includes(query) ||
      ch.nameHindi.includes(query) ||
      ch.summary.toLowerCase().includes(queryLower) ||
      ch.theme.toLowerCase().includes(queryLower)
    );

    if (matchedChapters.length === 0) {
      resultsContainer.innerHTML = `
        <p class="text-center text-white/20 py-8 text-sm">
          No results found. Try searching by emotion instead.
        </p>
      `;
      return;
    }

    resultsContainer.innerHTML = `
      <div>
        <p class="text-xs tracking-widest uppercase text-white/20 mb-3 px-2">Chapters</p>
        <div class="space-y-1" id="search-chapters-results"></div>
      </div>
    `;

    const chContainer = document.getElementById("search-chapters-results");
    matchedChapters.forEach(ch => {
      const link = document.createElement("a");
      link.href = `#/chapter/${ch.id}`;
      link.className = "flex items-center gap-4 p-3 rounded-xl hover:bg-white/[0.04] transition-all group decoration-none";
      link.innerHTML = `
        <span class="text-divine-gold/40 text-xs font-mono w-6">${String(ch.id).padStart(2, "0")}</span>
        <div class="flex-1 min-w-0">
          <p class="text-sm text-white/70 group-hover:text-white truncate">${ch.name}</p>
          <p class="text-xs text-white/25 truncate">${ch.nameSanskrit} · ${ch.verseCount} verses</p>
        </div>
        <i data-lucide="arrow-right" class="text-white/10 group-hover:text-divine-gold/50 shrink-0"></i>
      `;
      link.addEventListener("click", closeSearch);
      chContainer.appendChild(link);
    });

    lucide.createIcons();
  }
}

// ==========================================
// 10. COMPONENT: ASK KRISHNA CHAT PANEL
// ==========================================

function setupAskKrishna() {
  const overlay = document.getElementById("ask-krishna");
  const panel = document.getElementById("chat-panel");
  const trigger = document.getElementById("ask-krishna-trigger");
  const triggerMobile = document.getElementById("ask-krishna-mobile");
  const closeBtn = document.getElementById("chat-close");
  const input = document.getElementById("chat-input");
  const sendBtn = document.getElementById("chat-send");
  const messagesBox = document.getElementById("chat-messages");

  const openChat = () => {
    overlay.classList.remove("hidden");
    void panel.offsetWidth; // trigger reflow
    panel.classList.add("active");
    if (store.chatMessages.length === 0) {
      store.chatMessages.push({
        id: "welcome",
        role: "krishna",
        text: "I am the light in all that shines. Ask me anything that troubles your heart, and I shall guide you with the wisdom of the ages."
      });
      renderChatMessages();
    }
  };

  const closeChat = () => {
    panel.classList.remove("active");
    setTimeout(() => {
      overlay.classList.add("hidden");
    }, 400); // match CSS transition duration
  };

  trigger.addEventListener("click", openChat);
  triggerMobile?.addEventListener("click", openChat);
  closeBtn.addEventListener("click", closeChat);
  overlay.querySelector(".chat-backdrop").addEventListener("click", closeChat);

  // Listen to suggestion pill clicks inside chat messages
  messagesBox.addEventListener("click", (e) => {
    const pill = e.target.closest(".chat-suggest-pill");
    if (pill) {
      e.stopPropagation();
      const query = pill.dataset.query;
      input.value = query;
      sendMessage();
    }
  });

  // Night Mode inside Chat
  nightBtn.addEventListener("click", () => {
    store.nightMode = !store.nightMode;
    panel.classList.toggle("night-overlay", store.nightMode);
    nightBtn.classList.toggle("active", store.nightMode);
  });

  // Sending message
  const sendMessage = () => {
    const text = input.value.trim();
    if (!text) return;
    input.value = "";

    // Add user message
    store.chatMessages.push({
      id: Date.now().toString(),
      role: "user",
      text
    });
    renderChatMessages();

    // Show typing
    renderTypingBubble(true);

    // AI logic response delay
    setTimeout(() => {
      const response = getKrishnaResponse(text);
      
      // Remove typing bubble and push Krishna's response
      renderTypingBubble(false);
      store.chatMessages.push({
        id: (Date.now() + 1).toString(),
        role: "krishna",
        text: response.text,
        verse: response.verse ? {
          chapter: response.verse.chapter,
          verse: response.verse.verse,
          sanskrit: response.verse.sanskrit.split("\n")[0],
          english: response.verse.english
        } : null
      });
      renderChatMessages();
    }, 1500 + Math.random() * 800);
  };

  sendBtn.addEventListener("click", sendMessage);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  function renderChatMessages() {
    messagesBox.innerHTML = "";
    store.chatMessages.forEach(msg => {
      const bubble = document.createElement("div");
      bubble.className = `flex ${msg.role === "user" ? "justify-end" : "justify-start"} mb-4`;
      
      let innerHTML = `
        <div class="max-w-[85%] rounded-2xl px-4 py-3 ${msg.role === "user" ? "bg-[#F5B041]/20 text-white/90" : "glass text-white/70"}">
          <p class="text-sm leading-relaxed">${msg.text}</p>
      `;

      if (msg.id === "welcome") {
        innerHTML += `
          <div class="chat-suggestions-container">
            <button class="chat-suggest-pill" data-query="worry">🌿 Worry</button>
            <button class="chat-suggest-pill" data-query="purpose">⚔️ Purpose</button>
            <button class="chat-suggest-pill" data-query="peace">🧘 Inner Peace</button>
            <button class="chat-suggest-pill" data-query="anger">😤 Anger</button>
            <button class="chat-suggest-pill" data-query="afraid">🛡️ Fear</button>
          </div>
        `;
      }

      if (msg.verse) {
        innerHTML += `
          <div class="mt-3 p-3 rounded-xl bg-[#F5B041]/5 border border-[#F5B041]/10">
            <p class="text-xs text-[#F5B041]/60 font-display mb-1 sanskrit-text">${msg.verse.sanskrit}</p>
            <p class="text-xs text-white/30 mt-2">— ${msg.verse.chapter}.${msg.verse.verse}</p>
          </div>
        `;
      }

      if (msg.role === "krishna") {
        innerHTML += `
          <div class="chat-bubble-footer">
            <button class="chat-speak-btn" data-msg-id="${msg.id}" title="Speak message">
              <i data-lucide="volume-2" style="width: 12px; height: 12px;"></i>
            </button>
          </div>
        `;
      }

      innerHTML += `</div>`;
      bubble.innerHTML = innerHTML;
      messagesBox.appendChild(bubble);
    });

    // Bind speak buttons
    messagesBox.querySelectorAll(".chat-speak-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const msgId = btn.dataset.msgId;
        const msg = store.chatMessages.find(m => m.id === msgId);
        if (!msg) return;

        // Toggle speaking
        if (btn.classList.contains("playing")) {
          window.speechSynthesis.cancel();
          btn.classList.remove("playing");
          btn.innerHTML = `<i data-lucide="volume-2" style="width: 12px; height: 12px;"></i>`;
          lucide.createIcons();
          return;
        }

        // Stop any currently active speaking bubbles
        messagesBox.querySelectorAll(".chat-speak-btn.playing").forEach(other => {
          other.classList.remove("playing");
          other.innerHTML = `<i data-lucide="volume-2" style="width: 12px; height: 12px;"></i>`;
        });

        const utterance = new SpeechSynthesisUtterance(msg.text);
        
        // Find natural voice
        const voices = window.speechSynthesis.getVoices();
        const voice = voices.find(v => v.lang.includes("en") && v.name.toLowerCase().includes("google")) || 
                      voices.find(v => v.lang.includes("en"));
        if (voice) utterance.voice = voice;
        utterance.rate = 0.82; // divine slow pitch
        utterance.pitch = 0.85;

        utterance.onend = () => {
          btn.classList.remove("playing");
          btn.innerHTML = `<i data-lucide="volume-2" style="width: 12px; height: 12px;"></i>`;
          lucide.createIcons();
        };

        btn.classList.add("playing");
        btn.innerHTML = `<i data-lucide="square" style="width: 12px; height: 12px;"></i>`;
        lucide.createIcons();

        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
      });
    });

    lucide.createIcons();
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }

  function renderTypingBubble(show) {
    const existing = document.getElementById("typing-indicator-bubble");
    if (existing) existing.remove();

    if (show) {
      const bubble = document.createElement("div");
      bubble.id = "typing-indicator-bubble";
      bubble.className = "flex justify-start mb-4";
      bubble.innerHTML = `
        <div class="flex items-center gap-1.5 px-4 py-3 glass rounded-2xl w-fit">
          <span class="w-1.5 h-1.5 rounded-full bg-[#F5B041]/50 animate-bounce" style="animation-delay: 0.1s"></span>
          <span class="w-1.5 h-1.5 rounded-full bg-[#F5B041]/50 animate-bounce" style="animation-delay: 0.2s"></span>
          <span class="w-1.5 h-1.5 rounded-full bg-[#F5B041]/50 animate-bounce" style="animation-delay: 0.3s"></span>
        </div>
      `;
      messagesBox.appendChild(bubble);
      messagesBox.scrollTop = messagesBox.scrollHeight;
    }
  }

  function getKrishnaResponse(inputStr) {
    const lower = inputStr.toLowerCase();
    for (const [key, value] of Object.entries(wisdomResponses)) {
      if (key !== "default" && lower.includes(key)) {
        return { text: value.text, verse: featuredVerses[value.verseIndex] };
      }
    }
    // Check sacred search map
    for (const [emotion, data] of Object.entries(sacredSearchMap)) {
      if (lower.includes(emotion) || data.keywords.some(kw => lower.includes(kw))) {
        const resp = wisdomResponses[emotion] || wisdomResponses.default;
        return { text: resp.text, verse: featuredVerses[resp.verseIndex || 0] };
      }
    }
    return { text: wisdomResponses.default.text, verse: featuredVerses[3] };
  }
}

// ==========================================
// 11. COMPONENT RENDERERS: HOMEPAGE ITEMS
// ==========================================

function renderHomeChaptersGrid() {
  const grid = document.getElementById("chapters-grid");
  if (!grid) return;
  grid.innerHTML = "";

  chapters.forEach(ch => {
    const card = document.createElement("a");
    card.href = `#/chapter/${ch.id}`;
    card.className = "chapter-grid-card glow-card group relative overflow-hidden";
    
    card.innerHTML = `
      <div class="chapter-card-glow-effect"></div>
      <div class="chapter-card-content">
        <span class="chapter-card-num">CHAPTER ${String(ch.id).padStart(2, "0")}</span>
        <div class="chapter-card-titles">
          <h3 class="chapter-card-title">${ch.name}</h3>
          <p class="chapter-card-sanskrit">${ch.nameSanskrit}</p>
        </div>
        <span class="chapter-card-theme">${ch.theme}</span>
        <p class="chapter-card-summary">${ch.summary}</p>
        <div class="chapter-card-meta">
          <span class="chapter-card-count">${ch.verseCount} verses</span>
          <span class="chapter-card-cta">Read chapter</span>
          <i data-lucide="arrow-right" class="chapter-card-arrow"></i>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
}

function renderHomeDailyWisdom() {
  const container = document.getElementById("daily-wisdom-card-container");
  if (!container) return;

  const wisdom = getDailyWisdom();
  
  // Retrieve saved state
  let isSaved = store.isBookmarked(wisdom.verse.chapter, wisdom.verse.verse);

  container.innerHTML = `
    <div class="wisdom-quote-card glow-card">
      <div class="wisdom-quote-card-header">
        <span class="tag-gold-pill">Shloka of the Day</span>
        <p class="wisdom-quote-ref">Chapter ${wisdom.verse.chapter}, Verse ${wisdom.verse.verse}</p>
      </div>

      <div class="absolute inset-0 pointer-events-none" style="background: radial-gradient(circle at center, rgba(229,169,60,0.015) 0%, transparent 70%);"></div>
      
      <!-- Sanskrit Verse -->
      <p class="wisdom-quote-sanskrit sanskrit-text">
        ${wisdom.verse.sanskrit.replace(/\n/g, "<br>")}
      </p>
      
      <div class="wisdom-quote-divider"></div>

      <!-- English Translation -->
      <p class="wisdom-quote-english">
        &ldquo;${wisdom.verse.english}&rdquo;
      </p>

      <!-- Details Grid -->
      <div class="wisdom-quote-details">
        <div class="wisdom-detail-box">
          <p class="wisdom-detail-title">Today's Reflection</p>
          <p class="wisdom-detail-body">${wisdom.reflection}</p>
        </div>
        <div class="wisdom-detail-box">
          <p class="wisdom-detail-title">Practical Application</p>
          <p class="wisdom-detail-body">${wisdom.lifeApplication}</p>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center justify-center gap-4">
        <button id="wisdom-share-btn" class="flex items-center gap-2 px-5 py-2.5 rounded-xl glass text-sm text-white/50 hover:text-white hover:bg-white/10 transition-all cursor-pointer">
          <i data-lucide="share-2" style="width: 14px; height: 14px;"></i>
          <span>Share</span>
        </button>
        <button id="wisdom-save-btn" class="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm transition-all cursor-pointer ${isSaved ? "btn-saved-active" : "glass text-white/50 hover:text-white hover:bg-white/10"}">
          <i data-lucide="bookmark-plus" style="width: 14px; height: 14px; ${isSaved ? "fill: currentColor" : ""}"></i>
          <span>${isSaved ? "Saved" : "Save"}</span>
        </button>
      </div>
    </div>
  `;

  // Bind actions
  document.getElementById("wisdom-share-btn").addEventListener("click", () => {
    const text = `"${wisdom.verse.english}" — Bhagavad Gita ${wisdom.verse.chapter}.${wisdom.verse.verse}`;
    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text).then(() => {
        alert("Daily Wisdom quote copied to clipboard!");
      });
    }
  });

  const saveBtn = document.getElementById("wisdom-save-btn");
  saveBtn.addEventListener("click", () => {
    const added = store.toggleBookmark(wisdom.verse.chapter, wisdom.verse.verse);
    saveBtn.className = `flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm transition-all cursor-pointer ${added ? "btn-saved-active" : "glass text-white/50 hover:text-white hover:bg-white/10"}`;
    saveBtn.querySelector("i").style.fill = added ? "currentColor" : "none";
    saveBtn.querySelector("span").textContent = added ? "Saved" : "Save";
  });
}

function renderHomeStorytelling() {
  const container = document.getElementById("scroll-story");
  if (!container) return;
  container.innerHTML = "";

  stories.forEach((story, idx) => {
    const section = document.createElement("section");
    section.className = "story-section relative overflow-hidden";
    
    // Background colors handled by gradient classes
    const classes = story.bgColor.split(" ");
    classes.forEach(c => section.classList.add(c));

    section.innerHTML = `
      <!-- Ambient glow -->
      <div class="story-accent-glow" style="background: radial-gradient(circle, ${story.accent} 0%, transparent 70%);"></div>

      <div class="story-content text-center px-6 max-w-3xl mx-auto">
        <!-- Symbol -->
        <div class="story-symbol ${story.textColor} opacity-40 select-none">${story.symbol}</div>

        <!-- Sanskrit subtitle -->
        <p class="story-subtitle ${story.textColor} mb-4 font-display">${story.subtitle}</p>

        <!-- Title -->
        <h2 class="story-title font-display font-bold mb-8">${story.title}</h2>

        <!-- Description -->
        <p class="story-desc text-white/40 leading-relaxed font-light max-w-2xl mx-auto">${story.description}</p>

        <!-- Section number -->
        <div class="story-nav-dots">
          <div class="story-dot-line"></div>
          <span class="story-dot-num">${String(idx + 1).padStart(2, "0")}</span>
          <div class="story-dot-line"></div>
        </div>
      </div>
    `;

    container.appendChild(section);
  });

  // Setup Scroll Story Animations via IntersectionObserver
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const content = entry.target.querySelector(".story-content");
      if (entry.isIntersecting) {
        content?.classList.add("visible");
      } else {
        content?.classList.remove("visible");
      }
    });
  }, { threshold: 0.25 });

  container.querySelectorAll(".story-section").forEach(sec => {
    observer.observe(sec);
  });
}

// Fade in animation listener for elements on home view
function setupGeneralScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll("#divine-presence .presence-content, #vishwaroop .cosmic-content, #daily-wisdom .text-center").forEach(el => {
    el.classList.add("scroll-animate");
    observer.observe(el);
  });
}

// ==========================================
// 12. INITIALIZATION HOOKS & CONTROLS
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  // 1. Kick off intro sequence
  startIntroSequence();

  // Intercept global clicks to trigger mobile haptic feedback
  document.addEventListener("click", (e) => {
    const target = e.target.closest("button, a, .theme-opt-btn, .mobile-link, .chat-speak-btn");
    if (target) {
      triggerHaptic();
    }
  });

  // Cursor coordinate tracker for card glows & celestial parallax
  document.addEventListener("mousemove", (e) => {
    // Card glows
    document.querySelectorAll(".glow-card").forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });

    // Conic Rays parallax
    const rays = document.querySelector(".god-rays");
    if (rays) {
      const x = (e.clientX - window.innerWidth / 2) * 0.03;
      const y = (e.clientY - window.innerHeight / 2) * 0.03;
      rays.style.transform = `translateX(-50%) translate(${x}px, ${y}px)`;
    }
  });

  // 2. Setup background canvas loops
  initParticleCanvas();
  initCosmicCanvas();
  populateAtmosphere();

  // 3. Render Homepage components
  renderHomeChaptersGrid();
  renderHomeDailyWisdom();
  // renderHomeStorytelling(); // Redesigned to be uncluttered, storytelling section removed
  setupGeneralScrollAnimations();

  // 4. Bind Search modal and Chat assistant hooks
  setupSearchModal();
  setupAskKrishna();
  initWallpaperCustomizer();

  // 5. Setup SPA routing listeners
  handleHashRouting();

  // 6. Navigation items
  const menuTrigger = document.getElementById("mobile-menu-trigger");
  const mobileMenu = document.getElementById("mobile-menu");
  menuTrigger.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  // Today's reflection button scrolls to daily wisdom
  document.getElementById("wisdom-cta").addEventListener("click", () => {
    document.getElementById("daily-wisdom")?.scrollIntoView({ behavior: "smooth" });
  });

  // Navbar scrolling transparency effect
  window.addEventListener("scroll", () => {
    const nav = document.getElementById("navbar");
    if (window.scrollY > 50) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });

  // Re-generate icons for navbar
  lucide.createIcons();
});

// Initialize hero video behaviour: ensure cover crop, set focal point, remove poster when ready
function initHeroVideo() {
  const vid = document.querySelector('.hero-media-card .hero-video-main');
  if (!vid) return;

  // prefer a slightly right-focused crop for faces
  const parent = vid.closest('.hero-media-card');
  if (parent) parent.classList.add('focus-right');

  // When the video can play, remove poster to avoid flicker
  const onCanPlay = () => {
    try { vid.removeAttribute('poster'); } catch (e) {}
    vid.style.visibility = 'visible';
    vid.removeEventListener('canplay', onCanPlay);
  };

  vid.addEventListener('canplay', onCanPlay);

  // Fallback: if video errors, keep poster visible
  vid.addEventListener('error', () => {
    console.warn('Hero video failed to load, keeping poster visible.');
  });
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setTimeout(initHeroVideo, 50);
} else {
  document.addEventListener('DOMContentLoaded', initHeroVideo);
}
