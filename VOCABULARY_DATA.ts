/**
 * GOYO: Scientific Korean Practice
 * Vocabulary Database - High-Frequency Korean Words & Phrases
 * 
 * Curation Principle: High-frequency words that enable immediate communication
 * Based on: TOPIK frequency lists, comprehensible input theory, spaced repetition best practices
 * 
 * Categories:
 * - survival: Essential travel & emergency phrases
 * - daily: Common conversational expressions
 * - numbers: Time, dates, counting, money
 * - grammar: Essential sentence structures
 * - food: Restaurant and food-related vocabulary
 * - shopping: Market and transaction phrases
 * - transport: Travel and navigation
 * - emotions: Descriptive language and feelings
 * - health: Medical and wellness vocabulary
 * - family: Social connections and relationships
 */

export interface Card {
  id: string;
  front: string;           // Korean (Hangul) + romanization
  back: string;            // English meaning
  tag: string;             // Category
  example?: string;        // Optional: contextual sentence
  audioUrl?: string;       // Optional: pronunciation audio
}

export const VOCABULARY_DATA: Card[] = [
  // ===== SURVIVAL (Essential Travel & Emergency) =====
  {
    id: "surv_001",
    front: "안녕하세요 (annyeonghaseyo)",
    back: "Hello (polite/formal)",
    tag: "survival",
    example: "안녕하세요, 저는 학생입니다. (Hello, I am a student.)"
  },
  {
    id: "surv_002",
    front: "감사합니다 (gamsahamnida)",
    back: "Thank you (formal)",
    tag: "survival",
    example: "도와주셔서 감사합니다. (Thank you for helping me.)"
  },
  {
    id: "surv_003",
    front: "죄송합니다 (joesonghamnida)",
    back: "I'm sorry / Excuse me",
    tag: "survival",
    example: "늦어서 죄송합니다. (I'm sorry for being late.)"
  },
  {
    id: "surv_004",
    front: "네 / 아니요 (ne / aniyo)",
    back: "Yes / No",
    tag: "survival"
  },
  {
    id: "surv_005",
    front: "도와주세요 (dowajuseyo)",
    back: "Please help me",
    tag: "survival",
    example: "저를 도와주세요. (Please help me.)"
  },
  {
    id: "surv_006",
    front: "화장실이 어디예요? (hwajangsiri eodiyeyo?)",
    back: "Where is the bathroom?",
    tag: "survival"
  },
  {
    id: "surv_007",
    front: "영어 하세요? (yeongeo haseyo?)",
    back: "Do you speak English?",
    tag: "survival"
  },
  {
    id: "surv_008",
    front: "한국어를 잘 못해요 (hangugeoreul jal motaeyo)",
    back: "I don't speak Korean well",
    tag: "survival"
  },
  {
    id: "surv_009",
    front: "천천히 말해 주세요 (cheoncheonhi malhae juseyo)",
    back: "Please speak slowly",
    tag: "survival"
  },
  {
    id: "surv_010",
    front: "병원이 어디예요? (byeongwoni eodiyeyo?)",
    back: "Where is the hospital?",
    tag: "survival"
  },
  {
    id: "surv_011",
    front: "경찰을 불러주세요 (gyeongchareul bulleojuseyo)",
    back: "Please call the police",
    tag: "survival"
  },
  {
    id: "surv_012",
    front: "비상 (bisang)",
    back: "Emergency",
    tag: "survival"
  },
  {
    id: "surv_013",
    front: "여권 (yeogwon)",
    back: "Passport",
    tag: "survival"
  },
  {
    id: "surv_014",
    front: "가방을 잃어버렸어요 (gabangeul ireobeoryeosseoyo)",
    back: "I lost my bag",
    tag: "survival"
  },
  {
    id: "surv_015",
    front: "짐 (jim)",
    back: "Luggage",
    tag: "survival"
  },

  // ===== DAILY (Common Conversational Expressions) =====
  {
    id: "daily_001",
    front: "만나서 반가워요 (mannaseo bangawoyo)",
    back: "Nice to meet you",
    tag: "daily"
  },
  {
    id: "daily_002",
    front: "또 만나요 (tto mannayo)",
    back: "See you again",
    tag: "daily"
  },
  {
    id: "daily_003",
    front: "잘 지내요? (jal jinaeyo?)",
    back: "How are you doing?",
    tag: "daily"
  },
  {
    id: "daily_004",
    front: "잘 지내요 (jal jinaeyo)",
    back: "I'm doing well",
    tag: "daily"
  },
  {
    id: "daily_005",
    front: "이름이 뭐예요? (ireumi mwoyeyo?)",
    back: "What's your name?",
    tag: "daily"
  },
  {
    id: "daily_006",
    front: "저는 [이름]입니다 (jeoneun [name]imnida)",
    back: "I am [name]",
    tag: "daily"
  },
  {
    id: "daily_007",
    front: "어디에서 왔어요? (eodieseo wasseoyo?)",
    back: "Where are you from?",
    tag: "daily"
  },
  {
    id: "daily_008",
    front: "좋아해요 (joahaeyo)",
    back: "I like it",
    tag: "daily"
  },
  {
    id: "daily_009",
    front: "재미있어요 (jaemiisseoyo)",
    back: "It's fun / interesting",
    tag: "daily"
  },
  {
    id: "daily_010",
    front: "힘들어요 (himdeureoyo)",
    back: "It's tough / I'm tired",
    tag: "daily"
  },
  {
    id: "daily_011",
    front: "화이팅! (hwaiting!)",
    back: "You can do it! / Go for it!",
    tag: "daily"
  },
  {
    id: "daily_012",
    front: "건배! (geonbae!)",
    back: "Cheers!",
    tag: "daily"
  },
  {
    id: "daily_013",
    front: "괜찮아요 (gwaenchanayo)",
    back: "It's okay / I'm fine",
    tag: "daily"
  },
  {
    id: "daily_014",
    front: "잠깐만요 (jamkkanmanyo)",
    back: "Just a moment",
    tag: "daily"
  },
  {
    id: "daily_015",
    front: "알겠어요 (algesseoyo)",
    back: "I understand",
    tag: "daily"
  },

  // ===== NUMBERS (Time, Dates, Counting, Money) =====
  {
    id: "num_001",
    front: "하나 / 둘 / 셋 (hana / dul / set)",
    back: "One / Two / Three (native, for counting objects)",
    tag: "numbers"
  },
  {
    id: "num_002",
    front: "넷 / 다섯 (net / daseot)",
    back: "Four / Five (native)",
    tag: "numbers"
  },
  {
    id: "num_003",
    front: "일 / 이 / 삼 (il / i / sam)",
    back: "One / Two / Three (Sino-Korean, for numbers/money/time)",
    tag: "numbers"
  },
  {
    id: "num_004",
    front: "사 / 오 / 육 (sa / o / yuk)",
    back: "Four / Five / Six (Sino-Korean)",
    tag: "numbers"
  },
  {
    id: "num_005",
    front: "칠 / 팔 / 구 / 십 (chil / pal / gu / sip)",
    back: "Seven / Eight / Nine / Ten (Sino-Korean)",
    tag: "numbers"
  },
  {
    id: "num_006",
    front: "몇 시예요? (myeot siyeyo?)",
    back: "What time is it?",
    tag: "numbers"
  },
  {
    id: "num_007",
    front: "시 / 분 (si / bun)",
    back: "O'clock / Minutes",
    tag: "numbers"
  },
  {
    id: "num_008",
    front: "원 (won)",
    back: "Won (Korean currency unit)",
    tag: "numbers"
  },
  {
    id: "num_009",
    front: "백 / 천 / 만 (baek / cheon / man)",
    back: "Hundred / Thousand / Ten-thousand",
    tag: "numbers"
  },
  {
    id: "num_010",
    front: "몇 명이에요? (myeot myeongieyo?)",
    back: "How many people?",
    tag: "numbers"
  },
  {
    id: "num_011",
    front: "며칠이에요? (myeochirieyo?)",
    back: "What's the date?",
    tag: "numbers"
  },
  {
    id: "num_012",
    front: "한 달 / 일주일 (han dal / iljuil)",
    back: "One month / One week",
    tag: "numbers"
  },
  {
    id: "num_013",
    front: "오늘 / 내일 / 어제 (oneul / naeil / eoje)",
    back: "Today / Tomorrow / Yesterday",
    tag: "numbers"
  },
  {
    id: "num_014",
    front: "월요일 / 화요일 / 수요일 (wol-yo-il / hwa-yo-il / su-yo-il)",
    back: "Monday / Tuesday / Wednesday",
    tag: "numbers"
  },
  {
    id: "num_015",
    front: "얼마예요? (eolmayeyo?)",
    back: "How much is it?",
    tag: "numbers"
  },

  // ===== GRAMMAR (Essential Sentence Structures) =====
  {
    id: "gram_001",
    front: "N + 이에요/예요",
    back: "It is N. (polite copula — 이에요 after consonant, 예요 after vowel)",
    tag: "grammar",
    example: "저는 학생이에요. (I am a student.)"
  },
  {
    id: "gram_002",
    front: "V + 주세요",
    back: "Please do V for me / Please give me V",
    tag: "grammar",
    example: "물 주세요. (Please give me water.)"
  },
  {
    id: "gram_003",
    front: "장소 + 이 어디예요?",
    back: "Where is [place]?",
    tag: "grammar",
    example: "역이 어디예요? (Where is the station?)"
  },
  {
    id: "gram_004",
    front: "V + 하고 싶어요",
    back: "I want to do V",
    tag: "grammar",
    example: "커피를 마시고 싶어요. (I want to drink coffee.)"
  },
  {
    id: "gram_005",
    front: "V + ㄹ/을 수 있어요?",
    back: "Can you/I do V?",
    tag: "grammar",
    example: "한국어를 할 수 있어요? (Can you speak Korean?)"
  },
  {
    id: "gram_006",
    front: "V + 았/었어요",
    back: "Past tense ending — V happened/did V",
    tag: "grammar",
    example: "어제 영화를 봤어요. (I watched a movie yesterday.)"
  },
  {
    id: "gram_007",
    front: "V + ㄹ/을 거예요",
    back: "I will / I'm going to do V (future intention)",
    tag: "grammar",
    example: "내일 서울에 갈 거예요. (I'm going to Seoul tomorrow.)"
  },
  {
    id: "gram_008",
    front: "N + 좀 주세요",
    back: "Please give me a little N / N, please",
    tag: "grammar",
    example: "물 좀 주세요. (Water, please.)"
  },
  {
    id: "gram_009",
    front: "안 + V / V + 지 않아요",
    back: "Negation — not V",
    tag: "grammar",
    example: "저는 커피를 안 마셔요. (I don't drink coffee.)"
  },
  {
    id: "gram_010",
    front: "N + 이 있어요 / 없어요",
    back: "There is/isn't N; I have/don't have N",
    tag: "grammar",
    example: "저는 고양이가 있어요. (I have a cat.)"
  },
  {
    id: "gram_011",
    front: "V + 아서/어서",
    back: "Because of V, so... (cause/sequence connector)",
    tag: "grammar",
    example: "배가 고파서 밥을 먹어요. (I'm hungry, so I eat.)"
  },
  {
    id: "gram_012",
    front: "V + 지만",
    back: "V, but...",
    tag: "grammar",
    example: "비가 오지만 나가요. (It's raining, but I'm going out.)"
  },
  {
    id: "gram_013",
    front: "그리고 / 그래서 / 그런데",
    back: "And / So / But (connector words)",
    tag: "grammar"
  },
  {
    id: "gram_014",
    front: "V + 고 있어요",
    back: "Currently doing V (progressive)",
    tag: "grammar",
    example: "지금 밥을 먹고 있어요. (I'm eating right now.)"
  },
  {
    id: "gram_015",
    front: "N + 보다 + Adj",
    back: "More Adj than N (comparison)",
    tag: "grammar",
    example: "서울은 부산보다 커요. (Seoul is bigger than Busan.)"
  },

  // ===== FOOD (Restaurant and Food-Related Vocabulary) =====
  {
    id: "food_001",
    front: "밥 (bap)",
    back: "Rice / Meal",
    tag: "food"
  },
  {
    id: "food_002",
    front: "물 (mul)",
    back: "Water",
    tag: "food"
  },
  {
    id: "food_003",
    front: "커피 (keopi)",
    back: "Coffee",
    tag: "food"
  },
  {
    id: "food_004",
    front: "차 (cha)",
    back: "Tea",
    tag: "food"
  },
  {
    id: "food_005",
    front: "맥주 (maekju)",
    back: "Beer",
    tag: "food"
  },
  {
    id: "food_006",
    front: "포도주 (podoju)",
    back: "Wine",
    tag: "food"
  },
  {
    id: "food_007",
    front: "소주 (soju)",
    back: "Soju (Korean liquor)",
    tag: "food"
  },
  {
    id: "food_008",
    front: "음식 (eumsik)",
    back: "Food",
    tag: "food"
  },
  {
    id: "food_009",
    front: "김밥 (gimbap)",
    back: "Kimbap (Korean sushi roll)",
    tag: "food"
  },
  {
    id: "food_010",
    front: "김치 (gimchi)",
    back: "Kimchi (fermented vegetables)",
    tag: "food"
  },
  {
    id: "food_011",
    front: "불고기 (bulgogi)",
    back: "Bulgogi (grilled marinated beef)",
    tag: "food"
  },
  {
    id: "food_012",
    front: "떡볶이 (tteokbokki)",
    back: "Tteokbokki (spicy rice cakes)",
    tag: "food"
  },
  {
    id: "food_013",
    front: "메뉴 (menu)",
    back: "Menu",
    tag: "food"
  },
  {
    id: "food_014",
    front: "맛있어요 (masisseoyo)",
    back: "It's delicious",
    tag: "food"
  },
  {
    id: "food_015",
    front: "배고파요 (baegopayo)",
    back: "I'm hungry",
    tag: "food"
  },

  // ===== SHOPPING (Market and Transaction Phrases) =====
  {
    id: "shop_001",
    front: "가게 (gage)",
    back: "Store / Shop",
    tag: "shopping"
  },
  {
    id: "shop_002",
    front: "시장 (sijang)",
    back: "Market",
    tag: "shopping"
  },
  {
    id: "shop_003",
    front: "백화점 (baekwajeom)",
    back: "Department store",
    tag: "shopping"
  },
  {
    id: "shop_004",
    front: "슈퍼마켓 (syupeomaket)",
    back: "Supermarket",
    tag: "shopping"
  },
  {
    id: "shop_005",
    front: "이거 주세요 (igeo juseyo)",
    back: "I'll have this / Please give me this",
    tag: "shopping"
  },
  {
    id: "shop_006",
    front: "얼마예요? (eolmayeyo?)",
    back: "How much is it?",
    tag: "shopping"
  },
  {
    id: "shop_007",
    front: "너무 비싸요 (neomu bissayo)",
    back: "It's too expensive",
    tag: "shopping"
  },
  {
    id: "shop_008",
    front: "할인 (harin)",
    back: "Discount",
    tag: "shopping"
  },
  {
    id: "shop_009",
    front: "카드 되나요? (kadeu doenayo?)",
    back: "Can I pay by card?",
    tag: "shopping"
  },
  {
    id: "shop_010",
    front: "현금만 받아요 (hyeongeumman badayo)",
    back: "We only accept cash",
    tag: "shopping"
  },
  {
    id: "shop_011",
    front: "영수증 (yeongsujung)",
    back: "Receipt",
    tag: "shopping"
  },
  {
    id: "shop_012",
    front: "환전 (hwanjeon)",
    back: "Currency exchange",
    tag: "shopping"
  },
  {
    id: "shop_013",
    front: "크기 (keuki)",
    back: "Size",
    tag: "shopping"
  },
  {
    id: "shop_014",
    front: "색깔 (saekkal)",
    back: "Color",
    tag: "shopping"
  },
  {
    id: "shop_015",
    front: "다른 것 있어요? (dareun geot isseoyo?)",
    back: "Do you have something else?",
    tag: "shopping"
  },

  // ===== TRANSPORT (Travel and Navigation) =====
  {
    id: "trans_001",
    front: "기차 (gicha)",
    back: "Train",
    tag: "transport"
  },
  {
    id: "trans_002",
    front: "버스 (beoseu)",
    back: "Bus",
    tag: "transport"
  },
  {
    id: "trans_003",
    front: "지하철 (jihacheol)",
    back: "Subway / Metro",
    tag: "transport"
  },
  {
    id: "trans_004",
    front: "택시 (taeksi)",
    back: "Taxi",
    tag: "transport"
  },
  {
    id: "trans_005",
    front: "비행기 (bihaengi)",
    back: "Airplane",
    tag: "transport"
  },
  {
    id: "trans_006",
    front: "역 (yeok)",
    back: "Station",
    tag: "transport"
  },
  {
    id: "trans_007",
    front: "공항 (gonghang)",
    back: "Airport",
    tag: "transport"
  },
  {
    id: "trans_008",
    front: "표 (pyo)",
    back: "Ticket",
    tag: "transport"
  },
  {
    id: "trans_009",
    front: "표 한 장 주세요 (pyo han jang juseyo)",
    back: "One ticket, please",
    tag: "transport"
  },
  {
    id: "trans_010",
    front: "왼쪽 / 오른쪽 / 직진 (oenjjok / oreunjjok / jikjin)",
    back: "Left / Right / Straight ahead",
    tag: "transport"
  },
  {
    id: "trans_011",
    front: "길을 잃었어요 (gireul ireosseoyo)",
    back: "I'm lost",
    tag: "transport"
  },
  {
    id: "trans_012",
    front: "얼마나 걸려요? (eolmana geollyeoyo?)",
    back: "How long does it take?",
    tag: "transport"
  },
  {
    id: "trans_013",
    front: "여기서 가까워요? (yeogiseo gakkawoyo?)",
    back: "Is it close from here?",
    tag: "transport"
  },
  {
    id: "trans_014",
    front: "자리 있어요? (jari isseoyo?)",
    back: "Is this seat available?",
    tag: "transport"
  },
  {
    id: "trans_015",
    front: "막차가 몇 시예요? (makchaga myeot siyeyo?)",
    back: "What time is the last train/bus?",
    tag: "transport"
  },

  // ===== EMOTIONS (Descriptive Language and Feelings) =====
  {
    id: "emot_001",
    front: "좋아요 (joayo)",
    back: "Good",
    tag: "emotions"
  },
  {
    id: "emot_002",
    front: "나빠요 (nappayo)",
    back: "Bad",
    tag: "emotions"
  },
  {
    id: "emot_003",
    front: "예뻐요 (yeppeoyo)",
    back: "Beautiful",
    tag: "emotions"
  },
  {
    id: "emot_004",
    front: "못생겼어요 (motsengyeosseoyo)",
    back: "Ugly",
    tag: "emotions"
  },
  {
    id: "emot_005",
    front: "크다 (keuda)",
    back: "Big",
    tag: "emotions"
  },
  {
    id: "emot_006",
    front: "작다 (jagda)",
    back: "Small",
    tag: "emotions"
  },
  {
    id: "emot_007",
    front: "길어요 (gireoyo)",
    back: "Long",
    tag: "emotions"
  },
  {
    id: "emot_008",
    front: "짧아요 (chalbayo)",
    back: "Short",
    tag: "emotions"
  },
  {
    id: "emot_009",
    front: "비싸요 (bissayo)",
    back: "Expensive",
    tag: "emotions"
  },
  {
    id: "emot_010",
    front: "싸요 (ssayo)",
    back: "Cheap",
    tag: "emotions"
  },
  {
    id: "emot_011",
    front: "바빠요 (bappayo)",
    back: "Busy",
    tag: "emotions"
  },
  {
    id: "emot_012",
    front: "어려워요 (eoryeowoyo)",
    back: "Difficult",
    tag: "emotions"
  },
  {
    id: "emot_013",
    front: "쉬워요 (suiwoyo)",
    back: "Easy",
    tag: "emotions"
  },
  {
    id: "emot_014",
    front: "친절해요 (chinjeorhaeyo)",
    back: "Kind",
    tag: "emotions"
  },
  {
    id: "emot_015",
    front: "조용해요 (joyonghaeyo)",
    back: "Quiet",
    tag: "emotions"
  },

  // ===== HEALTH (Medical and Wellness Vocabulary) =====
  {
    id: "health_001",
    front: "의사 (uisa)",
    back: "Doctor",
    tag: "health"
  },
  {
    id: "health_002",
    front: "간호사 (ganhosa)",
    back: "Nurse",
    tag: "health"
  },
  {
    id: "health_003",
    front: "약국 (yakguk)",
    back: "Pharmacy",
    tag: "health"
  },
  {
    id: "health_004",
    front: "약 (yak)",
    back: "Medicine",
    tag: "health"
  },
  {
    id: "health_005",
    front: "아파요 (apayo)",
    back: "It hurts / I'm sick",
    tag: "health"
  },
  {
    id: "health_006",
    front: "감기 (gamgi)",
    back: "Common cold",
    tag: "health"
  },
  {
    id: "health_007",
    front: "독감 (dokgam)",
    back: "Flu",
    tag: "health"
  },
  {
    id: "health_008",
    front: "두통 (dutong)",
    back: "Headache",
    tag: "health"
  },
  {
    id: "health_009",
    front: "치통 (chitong)",
    back: "Toothache",
    tag: "health"
  },
  {
    id: "health_010",
    front: "열 (yeol)",
    back: "Fever",
    tag: "health"
  },
  {
    id: "health_011",
    front: "기침 (gichim)",
    back: "Cough",
    tag: "health"
  },
  {
    id: "health_012",
    front: "재채기 (jaechaegi)",
    back: "Sneeze",
    tag: "health"
  },
  {
    id: "health_013",
    front: "병원 (byeongwon)",
    back: "Hospital",
    tag: "health"
  },
  {
    id: "health_014",
    front: "주사 (jusa)",
    back: "Injection",
    tag: "health"
  },
  {
    id: "health_015",
    front: "처방 (cheobang)",
    back: "Prescription",
    tag: "health"
  },

  // ===== FAMILY (Social Connections and Relationships) =====
  {
    id: "fam_001",
    front: "가족 (gajok)",
    back: "Family",
    tag: "family"
  },
  {
    id: "fam_002",
    front: "엄마 (eomma)",
    back: "Mother",
    tag: "family"
  },
  {
    id: "fam_003",
    front: "아빠 (appa)",
    back: "Father",
    tag: "family"
  },
  {
    id: "fam_004",
    front: "형 / 오빠 (hyeong / oppa)",
    back: "Older brother (to male / to female)",
    tag: "family"
  },
  {
    id: "fam_005",
    front: "누나 / 언니 (nuna / eoni)",
    back: "Older sister (to male / to female)",
    tag: "family"
  },
  {
    id: "fam_006",
    front: "동생 (dongsaeng)",
    back: "Younger sibling",
    tag: "family"
  },
  {
    id: "fam_007",
    front: "친구 (chingu)",
    back: "Friend",
    tag: "family"
  },
  {
    id: "fam_008",
    front: "남자친구 (namjachingu)",
    back: "Boyfriend",
    tag: "family"
  },
  {
    id: "fam_009",
    front: "여자친구 (yeojachingu)",
    back: "Girlfriend",
    tag: "family"
  },
  {
    id: "fam_010",
    front: "아내 (anae)",
    back: "Wife",
    tag: "family"
  },
  {
    id: "fam_011",
    front: "남편 (nampyeon)",
    back: "Husband",
    tag: "family"
  },
  {
    id: "fam_012",
    front: "할머니 (halmeoni)",
    back: "Grandmother",
    tag: "family"
  },
  {
    id: "fam_013",
    front: "할아버지 (harabeoji)",
    back: "Grandfather",
    tag: "family"
  },
  {
    id: "fam_014",
    front: "사랑해요 (saranghaeyo)",
    back: "I love you",
    tag: "family"
  },
  {
    id: "fam_015",
    front: "결혼 (gyeolhon)",
    back: "Marriage / Wedding",
    tag: "family"
  }
];

export const TAGS = [
  "survival",
  "daily",
  "numbers",
  "grammar",
  "food",
  "shopping",
  "transport",
  "emotions",
  "health",
  "family"
];

export const SRS_INTERVALS = [1, 2, 4, 7, 14, 30, 60]; // Days
export const NEW_CARD_CAP = 10; // Max new cards per day
export const DECK_VERSION = 1; // Increment when changing card set or scoring

export default VOCABULARY_DATA;
