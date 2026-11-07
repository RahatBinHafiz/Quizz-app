import { Question } from '../types/quiz';

export const ICT_DBMS_25_QUESTIONS: Question[] = [
  {
    id: 'dbms-1',
    category: 'ICT DBMS MCQ',
    question: '১. ডেটা প্রসেসিংয়ের পর প্রাপ্ত অর্থপূর্ণ রূপকে কী বলা হয়?',
    options: ['ডেটা', 'ইনফরমেশন', 'ফিল্ড', 'রেকর্ড'],
    correctAnswer: 1, // খ
    explanation: 'কাঁচামাল বা অসংগঠিত উপাদানকে ডেটা বলা হয়। ডেটাকে প্রক্রিয়াকরণ (Processing) করার পর যে সুশৃঙ্খল ও অর্থপূর্ণ ফলাফল পাওয়া যায়, তাকে ইনফরমেশন (Information) বা তথ্য বলে।',
    difficulty: 'Easy',
  },
  {
    id: 'dbms-2',
    category: 'ICT DBMS MCQ',
    question: '২. নিচের কোনটি ডেটাবেজ ম্যানেজমেন্ট সিস্টেম (DBMS) সফটওয়্যার?',
    options: ['MS Word', 'MS Excel', 'MS Access', 'Adobe Photoshop'],
    correctAnswer: 2, // গ
    explanation: 'MS Access, Oracle, MySQL, SQL Server ইত্যাদি হলো ডেটাবেজ ম্যানেজমেন্ট সিস্টেম (DBMS/RDBMS) সফটওয়্যার। MS Word হলো ওয়ার্ড প্রসেসর এবং Excel হলো স্প্রেডশিট সফটওয়্যার।',
    difficulty: 'Easy',
  },
  {
    id: 'dbms-3',
    category: 'ICT DBMS MCQ',
    question: '৩. ডেটাবেজের ক্ষুদ্রতম একক বা ফিল্ডের সমন্বয়ে গঠিত হয় কোনটি?',
    options: ['রেকর্ড', 'ডেটাবেজ', 'টেবিল', 'কুয়েরি'],
    correctAnswer: 0, // ক
    explanation: 'পরস্পর সম্পর্কিত একাধিক ফিল্ড (যেমন: রোল, নাম, ঠিকানা) একত্রে যুক্ত হয়ে একটি সম্পূর্ণ ব্যক্তির তথ্য বা রেকর্ড (Record বা Tuple) গঠন করে।',
    difficulty: 'Easy',
  },
  {
    id: 'dbms-4',
    category: 'ICT DBMS MCQ',
    question: '৪. রিলেশনাল ডেটাবেজে প্রতিটি টেবিলকে কী বলা হয়?',
    options: ['অ্যাট্রিবিউট', 'টিউসল', 'রিলেশন', 'স্কিমা'],
    correctAnswer: 2, // গ
    explanation: 'রিলেশনাল ডেটাবেজ ম্যানেজমেন্ট সিস্টেমে (RDBMS) দ্বিমাত্রিক সারি ও কলাম সমন্বিত প্রতিটি স্বয়ংসম্পূর্ণ ডেটা টেবিলকে "রিলেশন" (Relation) বলা হয়।',
    difficulty: 'Easy',
  },
  {
    id: 'dbms-5',
    category: 'ICT DBMS MCQ',
    question: '৫. টেবিলের প্রতিটি কলাম বা খাড়াখাড়ি অংশকে কী বলা হয়?',
    options: ['রেকর্ড', 'ফিল্ড বা অ্যাট্রিবিউট', 'টিউসল', 'প্রাইমারি কি'],
    correctAnswer: 1, // খ
    explanation: 'ডেটাবেজ টেবিলের প্রতিটি কলাম বা উল্লম্ব স্তম্ভকে ফিল্ড (Field) বা বৈশিষ্ট্যের প্রকাশক হিসেবে অ্যাট্রিবিউট (Attribute) বলা হয়। আনুভূমিক সারিকে রেকর্ড বা টাপল বলে।',
    difficulty: 'Easy',
  },
  {
    id: 'dbms-6',
    category: 'ICT DBMS MCQ',
    question: '৬. যে ফিল্ডের মান অদ্বিতীয় (Unique) হয় এবং কখনো ফাঁকা (Null) থাকতে পারে না, তাকে কী বলে?',
    options: ['ফরেন কি', 'প্রাইমারি কি', 'কম্পোজিট কি', 'অলটারনেটিভ কি'],
    correctAnswer: 1, // খ
    explanation: 'যে ফিল্ডের মাধ্যমে টেবিলের প্রতিটি রেকর্ডকে অদ্বিতীয়ভাবে শনাক্ত করা যায় এবং যার মান কখনো খালি বা Null রাখা যায় না, তাকে প্রাইমারি কি (Primary Key) বলে।',
    difficulty: 'Easy',
  },
  {
    id: 'dbms-7',
    category: 'ICT DBMS MCQ',
    question: '৭. একটি টেবিলের প্রাইমারি কি যখন অন্য টেবিলে ফিল্ড হিসেবে যুক্ত হয়, তখন তাকে কী বলে?',
    options: ['সুপার কি', 'ক্যান্ডিডেট কি', 'ফরেন কি', 'প্রাইমারি কি'],
    correctAnswer: 2, // গ
    explanation: 'দুটি টেবিলের মধ্যে সম্পর্ক (Relationship) স্থাপনের জন্য একটি টেবিলের প্রাইমারি কি যখন অপর টেবিলে সাধারণ ফিল্ড হিসেবে যুক্ত হয়, তখন তাকে ফরেন কি (Foreign Key) বলে।',
    difficulty: 'Easy',
  },
  {
    id: 'dbms-8',
    category: 'ICT DBMS MCQ',
    question: '৮. দুই বা ততোধিক ফিল্ড একত্রে যুক্ত হয়ে যখন প্রাইমারি কি-র ন্যায় কাজ করে, তখন তাকে কী বলে?',
    options: ['ফরেন কি', 'কম্পোজিট কি', 'সেকেন্ডারি কি', 'ইউনিক কি'],
    correctAnswer: 1, // খ
    explanation: 'যখন একক কোনো ফিল্ড দিয়ে রেকর্ডকে অদ্বিতীয়ভাবে শনাক্ত করা যায় না, তখন একাধিক ফিল্ডের সমন্বয়ে যে প্রাইমারি কি গঠন করা হয় তাকে কম্পোজিট প্রাইমারি কি (Composite Key) বলে।',
    difficulty: 'Easy',
  },
  {
    id: 'dbms-9',
    category: 'ICT DBMS MCQ',
    question: '৯. নিচের কোনটি প্রাইমারি কি ব্যবহারের প্রধান উদ্দেশ্য?',
    options: [
      'ডেটার পুনরাবৃত্তি বাড়ানো',
      'রেকর্ড দ্রুত খুঁজে বের করা ও অদ্বিতীয়ভাবে শনাক্ত করা',
      'টেবিলের সাইজ ছোট করা',
      'ডেটা এনক্রিপ্ট করা',
    ],
    correctAnswer: 1, // খ
    explanation: 'প্রাইমারি কি ব্যবহারের মূল উদ্দেশ্য হলো লক্ষ লক্ষ তথ্যের মধ্য থেকে কাঙ্ক্ষিত রেকর্ডকে নির্ভুলভাবে ও অত্যন্ত দ্রুত খুঁজে বের করা এবং পৃথক রাখা।',
    difficulty: 'Easy',
  },
  {
    id: 'dbms-10',
    category: 'ICT DBMS MCQ',
    question: '১০. প্রাইমারি কি-র ক্ষেত্রে কোন শর্তটি বাধ্যতামূলক?',
    options: [
      'মান শূন্য হতে হবে',
      'মান অবশ্যই ডুপ্লিকেট হতে হবে',
      'মান অদ্বিতীয় ও নাল (Null) মুক্ত হতে হবে',
      'মান পরিবর্তনশীল হতে হবে',
    ],
    correctAnswer: 2, // গ
    explanation: 'Entity Integrity Rule অনুযায়ী, প্রতিটি প্রাইমারি কি-র মান অবশ্যই ইউনিক (Unique বা অদ্বিতীয়) হতে হবে এবং কখনো নাল (Null/ফাঁকা) হতে পারবে না।',
    difficulty: 'Easy',
  },
  {
    id: 'dbms-11',
    category: 'ICT DBMS MCQ',
    question: '১১. গাছ বা ট্রি (Tree) কাঠামোর ওপর ভিত্তি করে তৈরি ডেটাবেজ মডেল কোনটি?',
    options: ['রিলেশনাল ডেটাবেজ', 'হায়ারার্কিক্যাল ডেটাবেজ', 'নেটওয়ার্ক ডেটাবেজ', 'অবজেক্ট ওরিয়েন্টেড ডেটাবেজ'],
    correctAnswer: 1, // খ
    explanation: 'হায়ারার্কিক্যাল ডেটাবেজ মডেল (Hierarchical Database) গাছের শাখা-প্রশাখার মতো প্যারেন্ট-চাইল্ড (Parent-Child) নোড বিশিষ্ট ট্রির আকারে সাজানো থাকে।',
    difficulty: 'Easy',
  },
  {
    id: 'dbms-12',
    category: 'ICT DBMS MCQ',
    question: '১২. বহু-থেকে-বহু (Many-to-Many) সম্পর্ক প্রকাশ করে কোন ডেটাবেজ মডেল?',
    options: ['হায়ারার্কিক্যাল ডেটাবেজ', 'নেটওয়ার্ক ডেটাবেজ', 'ফাইল প্রসেসিং সিস্টেম', 'ফ্লাট ফাইল ডেটাবেজ'],
    correctAnswer: 1, // খ
    explanation: 'নেটওয়ার্ক ডেটাবেজ মডেলে একটি চাইল্ড রেকর্ডের একাধিক প্যারেন্ট রেকর্ড থাকতে পারে, যার ফলে এটি জটিল বহু-থেকে-বহু (Many-to-Many) সম্পর্ক প্রকাশে সক্ষম।',
    difficulty: 'Medium',
  },
  {
    id: 'dbms-13',
    category: 'ICT DBMS MCQ',
    question: '১৩. স্বামী ও স্ত্রীর মধ্যকার সম্পর্ক ডেটাবেজ রিলেশনশিপের কোন ধরনের উদাহরণ?',
    options: ['One-to-One', 'One-to-Many', 'Many-to-Many', 'Many-to-One'],
    correctAnswer: 0, // ক
    explanation: 'যেখানে প্রথম টেবিলের একটিমাত্র রেকর্ড দ্বিতীয় টেবিলের কেবল একটিমাত্র রেকর্ডের সাথে সম্পর্কিত থাকে, তাকে এক-থেকে-এক বা One-to-One রিলেশনশিপ বলে।',
    difficulty: 'Easy',
  },
  {
    id: 'dbms-14',
    category: 'ICT DBMS MCQ',
    question: '১৪. একজন শিক্ষকের অনেকগুলো ক্লাসে পাঠদান বা একজন শিক্ষার্থীর বিভিন্ন বিষয়ের সাথে সম্পর্কের ক্ষেত্রে কোন রিলেশনশিপ প্রযোজ্য?',
    options: ['One-to-One', 'Many-to-Many', 'One-to-None', 'Self-Join'],
    correctAnswer: 1, // খ
    explanation: 'যখন প্রথম টেবিলের একাধিক রেকর্ড দ্বিতীয় টেবিলের একাধিক রেকর্ডের সাথে সম্পর্কিত হতে পারে, তাকে বহু-থেকে-বহু বা Many-to-Many রিলেশনশিপ বলে।',
    difficulty: 'Easy',
  },
  {
    id: 'dbms-15',
    category: 'ICT DBMS MCQ',
    question: '১৫. বর্তমান সময়ে ডেটাবেজ ব্যবস্থাপনায় সবচেয়ে জনপ্রিয় ও বহুল ব্যবহৃত মডেল কোনটি?',
    options: ['হায়ারার্কিক্যাল মডেল', 'নেটওয়ার্ক মডেল', 'রিলেশনাল মডেল', 'ফ্ল্যাট ফাইল মডেল'],
    correctAnswer: 2, // গ
    explanation: '১৯৭০ সালে ড. ই. এফ. কড (E. F. Codd) প্রস্তাবিত রিলেশনাল মডেল (RDBMS) এর টেবিল ভিত্তিক সরল কাঠামো ও শক্তিশালী কুয়েরি সুবিধার জন্য বিশ্বে সবচেয়ে জনপ্রিয়।',
    difficulty: 'Easy',
  },
  {
    id: 'dbms-16',
    category: 'ICT DBMS MCQ',
    question: '১৬. ডেটাবেজ স্কিমা তৈরি বা পরিবর্তনের জন্য নিচের কোনটি DDL কমান্ড?',
    options: ['SELECT', 'INSERT', 'CREATE', 'UPDATE'],
    correctAnswer: 2, // গ
    explanation: 'DDL (Data Definition Language) কমান্ড যেমন CREATE, ALTER, DROP দিয়ে ডেটাবেজ বা টেবিলের কাঠামো তৈরি ও পরিমার্জন করা হয়। INSERT/UPDATE হলো DML কমান্ড।',
    difficulty: 'Easy',
  },
  {
    id: 'dbms-17',
    category: 'ICT DBMS MCQ',
    question: '১৭. ডেটা ম্যানিপুলেশনের জন্য (যেমন ডেটা ইনসার্ট বা আপডেট) ব্যবহৃত কমান্ড কোনটি?',
    options: ['ALTER', 'DROP', 'UPDATE', 'RENAME'],
    correctAnswer: 2, // গ
    explanation: 'UPDATE, INSERT, DELETE হলো DML (Data Manipulation Language) কমান্ড, যা টেবিলের ভেতরে সংরক্ষিত ডেটার মান পরিবর্তন ও পরিচালনার জন্য ব্যবহৃত হয়।',
    difficulty: 'Easy',
  },
  {
    id: 'dbms-18',
    category: 'ICT DBMS MCQ',
    question: '১৮. একটি টেবিল থেকে নির্দিষ্ট শর্ত সাপেক্ষে ডেটা দেখার জন্য কোন কমান্ড ব্যবহৃত হয়?',
    options: ['GET', 'SHOW', 'SELECT', 'FIND'],
    correctAnswer: 2, // গ
    explanation: 'SQL-এ টেবিল থেকে শর্তসাপেক্ষে ডেটা কুয়েরি বা প্রদর্শন করার জন্য SELECT স্টেটমেন্ট (যেমন: SELECT * FROM Students WHERE marks > 80) ব্যবহৃত হয়।',
    difficulty: 'Easy',
  },
  {
    id: 'dbms-19',
    category: 'ICT DBMS MCQ',
    question: '১৯. টেবিল মুছে ফেলার জন্য SQL-এর কোন কমান্ড ব্যবহৃত হয়?',
    options: ['DELETE TABLE', 'DROP TABLE', 'REMOVE TABLE', 'CLEAR TABLE'],
    correctAnswer: 1, // খ
    explanation: 'একটি সম্পূর্ণ টেবিল এবং তার সম্পূর্ণ কাঠামো ডেটাবেজ থেকে চিরতরে মুছে ফেলতে DROP TABLE <table_name> কমান্ড ব্যবহৃত হয়।',
    difficulty: 'Easy',
  },
  {
    id: 'dbms-20',
    category: 'ICT DBMS MCQ',
    question: '২০. নতুন রেকর্ড সংযোজনের জন্য ব্যবহৃত কমান্ড কোনটি?',
    options: ['ADD RECORD', 'INSERT INTO', 'APPEND', 'NEW RECORD'],
    correctAnswer: 1, // খ
    explanation: 'SQL-এ কোনো টেবিলে নতুন সারি বা রেকর্ড যোগ করার জন্য INSERT INTO <table_name> VALUES(...) সিনট্যাক্স ব্যবহার করা হয়।',
    difficulty: 'Easy',
  },
  {
    id: 'dbms-21',
    category: 'ICT DBMS MCQ',
    question: '২১. MS Access-এ টেক্সট (Short Text) ডেটা টাইপের জন্য ডিফল্ট ফিল্ড সাইজ কত বাইট থাকে?',
    options: ['৫০ বাইট', '২৫৫ বাইট', '১০০ বাইট', '৫১২ বাইট'],
    correctAnswer: 1, // খ
    explanation: 'MS Access ডেটাবেজে টেক্সট ফিল্ডের সর্বোচ্চ বা ডিফল্ট ধারণক্ষমতা হলো ২৫৫টি ক্যারেক্টার বা ২৫৫ বাইট।',
    difficulty: 'Easy',
  },
  {
    id: 'dbms-22',
    category: 'ICT DBMS MCQ',
    question: '২২. সংখ্যাসূচক বা ক্যালকুলেশনের কাজের জন্য কোন ডেটা টাইপ উপযুক্ত?',
    options: ['Text', 'Memo', 'Number / Currency', 'OLE Object'],
    correctAnswer: 2, // গ
    explanation: 'গাণিতিক হিসাব-নিকাশ, যোগ-বিয়োগ ও আর্থিক লেনদেন সংক্রান্ত ডেটা সংরক্ষণের জন্য Number এবং Currency ডেটা টাইপ আদর্শ।',
    difficulty: 'Easy',
  },
  {
    id: 'dbms-23',
    category: 'ICT DBMS MCQ',
    question: '২৩. ডেটা রিডানডেন্সি (Data Redundancy) বলতে কী বোঝায়?',
    options: [
      'ডেটার নিরাপত্তা',
      'ডেটার পুনরাবৃত্তি বা একই ডেটা বারবার থাকা',
      'ডেটা মুছে ফেলা',
      'ডেটা এনক্রিপশন',
    ],
    correctAnswer: 1, // খ
    explanation: 'ডেটাবেজের বিভিন্ন টেবিলে একই ডেটা বারবার অনাবশ্যকভাবে সংরক্ষিত হওয়াকে ডেটা রিডানডেন্সি (Redundancy বা বাহুল্য দোষ) বলা হয়, যা নরমালাইজেশনের মাধ্যমে দূর করা হয়।',
    difficulty: 'Easy',
  },
  {
    id: 'dbms-24',
    category: 'ICT DBMS MCQ',
    question: '২৪. চিত্র, ছবি বা মাল্টিমিডিয়া ফাইল সংরক্ষণের জন্য MS Access-এ কোন ডেটা টাইপ ব্যবহার করা হয়?',
    options: ['Hyperlink', 'OLE Object', 'Memo', 'AutoNumber'],
    correctAnswer: 1, // খ
    explanation: 'OLE (Object Linking and Embedding) Object ডেটা টাইপ ব্যবহার করে ডেটাবেজে ছবি, গ্রাফিক্স, অডিও, ভিডিও বা অন্য কোনো উইন্ডোজ অ্যাপ্লিকেশনের ডকুমেন্ট লিংক বা সংরক্ষণ করা যায়।',
    difficulty: 'Easy',
  },
  {
    id: 'dbms-25',
    category: 'ICT DBMS MCQ',
    question: '২৫. ডেটাবেজে স্বয়ংক্রিয়ভাবে ক্রমিক নম্বর বা সিরিয়াল তৈরি করতে কোন ডেটা টাইপ ব্যবহৃত হয়?',
    options: ['Number', 'AutoNumber', 'Counter', 'Numeric'],
    correctAnswer: 1, // খ
    explanation: 'AutoNumber ডেটা টাইপ নির্বাচন করলে প্রতিবার নতুন রেকর্ড তৈরি করার সাথে সাথে ডেটাবেজ স্বয়ংক্রিয়ভাবে ১, ২, ৩... ক্রমিক নম্বর বৃদ্ধি করে সংরক্ষণ করে।',
    difficulty: 'Easy',
  },
];
