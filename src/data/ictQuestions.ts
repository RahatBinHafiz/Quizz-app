import { Question } from '../types/quiz';

export const ICT_50_QUESTIONS: Question[] = [
  {
    id: 'ict-1',
    category: 'ICT MCQ',
    question: '১. কোন ভাষায় লেখা প্রোগ্রাম কম্পিউটার সরাসরি বুঝতে পারে?',
    options: ['মেশিন ভাষা', 'উচ্চস্তরের ভাষা', 'অ্যাসেম্বলি ভাষা', 'চতুর্থ প্রজন্মের ভাষা'],
    correctAnswer: 0, // ক
    explanation: 'মেশিন ভাষা হলো প্রথম প্রজন্মের বাইনারি (0 ও 1) ভাষা, যা কম্পিউটার কোনো অনুবাদক ছাড়াই সরাসরি বুঝতে ও সম্পাদন করতে পারে।',
    difficulty: 'Easy',
  },
  {
    id: 'ict-2',
    category: 'ICT MCQ',
    question: '২. কোন ভাষায় লেখা প্রোগ্রামের জন্য অনুবাদকের প্রয়োজন হয় না?',
    options: ['Natural Language', 'Machine Language', 'High Level Language', 'Assembly Language'],
    correctAnswer: 1, // খ
    explanation: 'Machine Language (মেশিন ভাষা) সরাসরি কম্পিউটারের হার্ডওয়্যারের ভাষা হওয়ায় এতে কোনো অনুবাদক সফটওয়্যারের প্রয়োজন হয় না।',
    difficulty: 'Easy',
  },
  {
    id: 'ict-3',
    category: 'ICT MCQ',
    question: '৩. অ্যাসেম্বলি ভাষায় লেখা প্রোগ্রামকে মেশিন ভাষায় রূপান্তর করে কোনটি?',
    options: ['কম্পাইলার', 'ইন্টারপ্রেটার', 'অ্যাসেম্বলার', 'লিংকার'],
    correctAnswer: 2, // গ
    explanation: 'অ্যাসেম্বলার (Assembler) হলো এমন একটি অনুবাদক যা অ্যাসেম্বলি ভাষার নেমোনিক কোডকে মেশিন ভাষায় রূপান্তর করে।',
    difficulty: 'Easy',
  },
  {
    id: 'ict-4',
    category: 'ICT MCQ',
    question: '৪. কম্পাইলার ও ইন্টারপ্রেটারের মধ্যে প্রধান পার্থক্য কী?',
    options: [
      'কম্পাইলার একবারে সম্পূর্ণ প্রোগ্রাম অনুবাদ করে',
      'ইন্টারপ্রেটার হার্ডওয়্যার নিয়ন্ত্রণ করে',
      'কম্পাইলার শুধু HTML অনুবাদ করে',
      'ইন্টারপ্রেটার শুধু মেশিন ভাষায় কাজ করে',
    ],
    correctAnswer: 0, // ক
    explanation: 'কম্পাইলার একসাথে সম্পূর্ণ সোর্স কোডকে রূপান্তর করে অবজেক্ট কোড তৈরি করে, পক্ষান্তরে ইন্টারপ্রেটার লাইন বাই লাইন অনুবাদ করে।',
    difficulty: 'Easy',
  },
  {
    id: 'ict-5',
    category: 'ICT MCQ',
    question: '৫. কোন ভাষায় হার্ডওয়্যার নিয়ন্ত্রণের পাশাপাশি উচ্চস্তরের ভাষার সুবিধাও পাওয়া যায়?',
    options: ['PASCAL', 'COBOL', 'C', 'FORTRAN'],
    correctAnswer: 2, // গ
    explanation: 'C প্রোগ্রামিং ভাষা হার্ডওয়্যার নিয়ন্ত্রণ (বিট লেভেল ও মেমোরি পয়েন্টার) এর পাশাপাশি উচ্চস্তরের ভাষার সুবিধাও দেয়, তাই একে মধ্যম স্তরের ভাষা বলা হয়।',
    difficulty: 'Easy',
  },
  {
    id: 'ict-6',
    category: 'ICT MCQ',
    question: '৬. C কোন ধরনের প্রোগ্রামিং ভাষা?',
    options: ['শুধু উচ্চস্তরের ভাষা', 'মধ্যস্তরের ভাষা (Mid-level Language)', 'মেশিন ভাষা', 'প্রাকৃতিক ভাষা'],
    correctAnswer: 1, // খ
    explanation: 'C ভাষা নিম্নস্তরের ও উচ্চস্তরের ভাষার মেলবন্ধন হওয়ায় একে মধ্যস্তরের ভাষা (Mid-level language) হিসেবে গণ্য করা হয়।',
    difficulty: 'Easy',
  },
  {
    id: 'ict-7',
    category: 'ICT MCQ',
    question: '৭. C ভাষা কোন ধরনের ভাষা?',
    options: ['General purpose language', 'শুধু Database language', 'Markup language', 'Query language'],
    correctAnswer: 0, // ক
    explanation: 'C একটি বহুমুখী সাধারণ উদ্দেশ্যভিত্তিক (General Purpose) প্রোগ্রামিং ভাষা, যা অপারেটিং সিস্টেম, গেম ও সফটওয়্যার তৈরিতে ব্যবহৃত হয়।',
    difficulty: 'Easy',
  },
  {
    id: 'ict-8',
    category: 'ICT MCQ',
    question: '৮. C ভাষায় লেখা প্রোগ্রামের জন্য কোন অনুবাদক ব্যবহার করা যায়?\n\ni. Compiler\nii. Interpreter\niii. Assembler',
    options: ['i ও ii', 'i ও iii', 'ii ও iii', 'i, ii ও iii'],
    correctAnswer: 3, // ঘ
    explanation: 'C প্রোগ্রামিংয়ে সাধারণত কম্পাইলার প্রধান হলেও বিশেষায়িত সি ইন্টারপ্রেটার (যেমন CINT) এবং লিংকিং ধাপে অ্যাসেম্বলার ব্যবহৃত হয় (i, ii ও iii)।',
    difficulty: 'Medium',
  },
  {
    id: 'ict-9',
    category: 'ICT MCQ',
    question: '৯. প্রোগ্রাম তৈরির প্রথম বা মৌলিক ধাপ কোনটি?',
    options: ['কোডিং করা', 'সমস্যা নির্দিষ্টকরণ ও বিশ্লেষণ', 'প্রোগ্রাম পরীক্ষণ (Testing)', 'ডকুমেন্টেশন তৈরি'],
    correctAnswer: 1, // খ
    explanation: 'একটি সফল সফটওয়্যার বা প্রোগ্রাম রচনার ভিত্তি হলো সমস্যার স্বরূপ নির্দিষ্টকরণ এবং যৌক্তিকভাবে তা বিশ্লেষণ করা।',
    difficulty: 'Easy',
  },
  {
    id: 'ict-10',
    category: 'ICT MCQ',
    question: '১০. ফ্লোচার্টে প্রক্রিয়াকরণ (Processing) বোঝাতে কোন প্রতীক ব্যবহৃত হয়?',
    options: ['ডিম্বক (Oval)', 'আয়তক্ষেত্র (Rectangle)', 'রম্বস (Diamond)', 'সামান্তরিক (Parallelogram)'],
    correctAnswer: 1, // খ
    explanation: 'ফ্লোচার্টে যেকোনো গাণিতিক হিসাব বা ডেটা প্রসেসিং বোঝাতে আয়তক্ষেত্র (Rectangle) প্রতীক ব্যবহৃত হয়।',
    difficulty: 'Easy',
  },
  {
    id: 'ict-11',
    category: 'ICT MCQ',
    question: '১১. ফ্লোচার্টে সিদ্ধান্ত গ্রহণ (Decision) বা শর্ত যাচাইয়ের জন্য কোন প্রতীক ব্যবহৃত হয়?',
    options: ['সামান্তরিক', 'হীরা বা রম্বস (Diamond)', 'আয়তক্ষেত্র', 'বৃত্ত'],
    correctAnswer: 1, // খ
    explanation: 'শর্ত যাচাই ও সিদ্ধান্ত গ্রহণের জন্য ফ্লোচার্টে হীরা বা রম্বস আকৃতির ডায়মন্ড (Diamond) প্রতীক ব্যবহৃত হয়।',
    difficulty: 'Easy',
  },
  {
    id: 'ict-12',
    category: 'ICT MCQ',
    question: '১২. ফ্লোচার্টে সংযোগ (Connector) নির্দেশ করতে কোন প্রতীক ব্যবহৃত হয়?',
    options: ['সামান্তরিক', 'বৃত্ত (Circle)', 'রম্বস', 'তীরচিহ্ন'],
    correctAnswer: 1, // খ
    explanation: 'ফ্লোচার্টের একাধিক প্রবাহরেখাকে এক বিন্দুতে মেলানোর জন্য সংযোগ প্রতীক হিসেবে বৃত্ত (Circle) ব্যবহৃত হয়।',
    difficulty: 'Easy',
  },
  {
    id: 'ict-13',
    category: 'ICT MCQ',
    question: '১৩. ফ্লোচার্টে ডেটা ইনপুট বা আউটপুট প্রদর্শনের জন্য কোন প্রতীক ব্যবহৃত হয়?',
    options: ['আয়তক্ষেত্র', 'সামান্তরিক (Parallelogram)', 'বৃত্ত', 'রম্বস'],
    correctAnswer: 1, // খ
    explanation: 'ফ্লোচার্টে ব্যবহারকারীর কাছ থেকে মান গ্রহণ (Input) এবং ফলাফল প্রদর্শন (Output) নির্দেশ করতে সামান্তরিক ব্যবহৃত হয়।',
    difficulty: 'Easy',
  },
  {
    id: 'ict-14',
    category: 'ICT MCQ',
    question: '১৪. C প্রোগ্রামিং ভাষার জনক কে?',
    options: ['ডেনিস রিচি (Dennis Ritchie)', 'জেমস গসলিং', 'টিম বার্নার্স লি', 'চার্লস ব্যাবেজ'],
    correctAnswer: 0, // ক
    explanation: '১৯৭২ সালে আমেরিকার এটিঅ্যান্ডটি বেল ল্যাবরেটরিতে ডেনিস রিচি C প্রোগ্রামিং ভাষা উদ্ভাবন করেন।',
    difficulty: 'Easy',
  },
  {
    id: 'ict-15',
    category: 'ICT MCQ',
    question: '১৫. C প্রোগ্রামিং ভাষা কোন সালে উদ্ভাবিত হয়?',
    options: ['১৯৬৫ সালে', '১৯৭২ সালে', '১৯৮৫ সালে', '১৯৯০ সালে'],
    correctAnswer: 1, // খ
    explanation: 'ইউনিক্স অপারেটিং সিস্টেমের কোড লেখার সুবিধার্থে ১৯৭২ সালে বেল ল্যাবরেটরিতে সি ভাষা তৈরি করা হয়।',
    difficulty: 'Easy',
  },
  {
    id: 'ict-16',
    category: 'ICT MCQ',
    question: '১৬. C প্রোগ্রামের অত্যাবশ্যকীয় ফাংশন কোনটি, যা ছাড়া কোনো সি প্রোগ্রাম চালু হতে পারে না?',
    options: ['printf()', 'scanf()', 'main()', 'getch()'],
    correctAnswer: 2, // গ
    explanation: 'main() হলো C প্রোগ্রামের মূল প্রবেশদ্বার; অপারেটিং সিস্টেম সর্বপ্রথম main() ফাংশন থেকেই প্রোগ্রাম নির্বাহ শুরু করে।',
    difficulty: 'Easy',
  },
  {
    id: 'ict-17',
    category: 'ICT MCQ',
    question: '১৭. সি ভাষায় ডাবল (double) টাইপ ডেটার মেমোরিতে মেমরি স্পেস কতটুকু বরাদ্দ হয়?',
    options: ['১ বাইট', '৪ বাইট', '৮ বাইট', '১৬ বাইট'],
    correctAnswer: 2, // গ
    explanation: 'সি ভাষায় double ডেটা টাইপ সাধারণত ৬৪ বিট বা ৮ বাইট মেমোরি স্থান ব্যবহার করে।',
    difficulty: 'Easy',
  },
  {
    id: 'ict-18',
    category: 'ICT MCQ',
    question: '১৮. সি ভাষায় নিচের কোনটি একটি বৈধ চলকের (Variable) নাম?',
    options: ['1st_num', 'int', 'total-mark', 'total_mark'],
    correctAnswer: 3, // ঘ
    explanation: 'সি চলকের নাম সংখ্যা দিয়ে শুরু হতে পারে না, সংরক্ষিত কি-ওয়ার্ড (int) বা হাইফেন (-) ব্যবহার করা যায় না; আন্ডারস্কোরযুক্ত total_mark বৈধ চলক।',
    difficulty: 'Medium',
  },
  {
    id: 'ict-19',
    category: 'ICT MCQ',
    question: '১৯. সি ভাষায় পূর্ণসংখ্যার (integer) জন্য কোন ফরম্যাট স্পেসিফায়ার ব্যবহৃত হয়?',
    options: ['%f', '%d', '%c', '%s'],
    correctAnswer: 1, // খ
    explanation: 'পূর্ণসংখ্যা (decimal integer) ইনপুট ও আউটপুট করতে %d ফরম্যাট স্পেসিফায়ার ব্যবহৃত হয়।',
    difficulty: 'Easy',
  },
  {
    id: 'ict-20',
    category: 'ICT MCQ',
    question: '২০. সি ভাষায় ভগ্নাংশ বা বাস্তব সংখ্যার (float) জন্য ফরম্যাট স্পেসিফায়ার কোনটি?',
    options: ['%f', '%d', '%c', '%lf'],
    correctAnswer: 0, // ক
    explanation: 'সি ল্যাঙ্গুয়েজে সাধারণ ফ্লোটিং পয়েন্ট (float) ডেটা ফরম্যাট স্পেসিফায়ার হলো %f।',
    difficulty: 'Easy',
  },
  {
    id: 'ict-21',
    category: 'ICT MCQ',
    question: '২১. নিচের কোনটি সি ভাষার একটি মৌলিক ডেটা টাইপ (Primary Data Type) নয়?',
    options: ['অ্যারে (Array)', 'int', 'char', 'float'],
    correctAnswer: 0, // ক
    explanation: 'int, char, float হলো মৌলিক (Primitive) ডেটা টাইপ; পক্ষান্তরে অ্যারে (Array) হলো উদ্ভূত বা ডিরাইভড ডেটা টাইপ।',
    difficulty: 'Medium',
  },
  {
    id: 'ict-22',
    category: 'ICT MCQ',
    question: '২২. ক্যারেক্টার (char) ডেটা টাইপের মেমোরি সাইজ কত?',
    options: ['০ বাইট', '১ বাইট', '২ বাইট', '৪ বাইট'],
    correctAnswer: 1, // খ
    explanation: 'একটি ক্যারেক্টার সংরক্ষণের জন্য মেমোরিতে ১ বাইট (বা ৮ বিট) মেমরি স্থান ব্যবহৃত হয়।',
    difficulty: 'Easy',
  },
  {
    id: 'ict-23',
    category: 'ICT MCQ',
    question: '২৩. সি ভাষায় শর্ত যাচাই করে সিদ্ধান্ত নেওয়ার জন্য ব্যবহৃত হয় কোনটি?',
    options: ['for লুপ', 'while লুপ', 'if...else স্টেটমেন্ট', 'do...while লুপ'],
    correctAnswer: 2, // গ
    explanation: 'শর্তভিত্তিক ব্রাঞ্চিং ও সিদ্ধান্ত গ্রহণের জন্য if...else স্টেটমেন্ট ব্যবহৃত হয়।',
    difficulty: 'Easy',
  },
  {
    id: 'ict-24',
    category: 'ICT MCQ',
    question: '২৪. সি ভাষায় দুটি মানের সমতা যাচাই করার জন্য কোন রিলেশনাল অপারেটর ব্যবহৃত হয়?',
    options: ['=', ':=', '==', '!='],
    correctAnswer: 2, // গ
    explanation: '= হলো অ্যাসাইনমেন্ট অপারেটর, আর দুটি মান পরস্পরের সমান কিনা তা যাচাই করতে == (ইকুয়াল টু) অপারেটর ব্যবহার করা হয়।',
    difficulty: 'Easy',
  },
  {
    id: 'ict-25',
    category: 'ICT MCQ',
    question: '২৫. সি ভাষায় লজিক্যাল AND অপারেটর কোনটি?',
    options: ['&', '&&', '||', '!'],
    correctAnswer: 1, // খ
    explanation: '&& হলো লজিক্যাল AND অপারেটর; উভয় শর্ত সত্য হলেই কেবল এটি সত্য (1) প্রদান করে।',
    difficulty: 'Easy',
  },
  {
    id: 'ict-26',
    category: 'ICT MCQ',
    question: '২৬. সি ভাষায় লজিক্যাল OR অপারেটর কোনটি?',
    options: ['||', '|', '&&', '!'],
    correctAnswer: 0, // ক
    explanation: '|| হলো লজিক্যাল OR অপারেটর; যেকোনো একটি শর্ত সত্য হলেই ফলাফল সত্য হয়।',
    difficulty: 'Easy',
  },
  {
    id: 'ict-27',
    category: 'ICT MCQ',
    question: '২৭. সি ভাষায় ভাগশেষ (Remainder) নির্ণয়ের জন্য কোন অপারেটর ব্যবহৃত হয়?',
    options: ['/', '\\', '%', '#'],
    correctAnswer: 2, // গ
    explanation: 'মডুলাস অপারেটর (%) দুটি পূর্ণসংখ্যার ভাগের পর অবশিষ্ট ভাগশেষ রিটার্ন করে।',
    difficulty: 'Easy',
  },
  {
    id: 'ict-28',
    category: 'ICT MCQ',
    question: '২৮. নিচের কোনটি একটি লুপ কন্ট্রোল স্টেটমেন্ট নয়?',
    options: ['for', 'while', 'switch', 'do...while'],
    correctAnswer: 2, // গ
    explanation: 'switch হলো একটি মাল্টিপল সিলেকশন কন্ট্রোল স্টেটমেন্ট, এটি কোনো পুনরাবৃত্তিমূলক লুপ নয়।',
    difficulty: 'Easy',
  },
  {
    id: 'ict-29',
    category: 'ICT MCQ',
    question: '২৯. লুপের শর্ত শুরুতেই মিথ্যা হলেও অন্তত একবার কার্যকর হবে কোন লুপ?',
    options: ['while লুপ', 'do-while লুপ', 'for লুপ', 'nested for লুপ'],
    correctAnswer: 1, // খ
    explanation: 'do-while লুপে শর্ত শেষে যাচাই করা হয় (Exit-controlled), বিধায় শর্ত মিথ্যা হলেও বডি অন্তত একবার চলে।',
    difficulty: 'Medium',
  },
  {
    id: 'ict-30',
    category: 'ICT MCQ',
    question: '৩০. সি ভাষায় স্টেটমেন্ট সমাপ্তি নির্দেশ করতে লাইনের শেষে কোন চিহ্নটি আবশ্যক?',
    options: ['কোলন (:)', 'সেমিকোলন (;)', 'ফুলস্টপ (.)', 'কমা (,)'],
    correctAnswer: 1, // খ
    explanation: 'C কম্পাইলারকে স্টেটমেন্টের সমাপ্তি বোঝাতে প্রতিটি স্টেটমেন্টের শেষে সেমিকোলন (;) দেওয়া আবশ্যক।',
    difficulty: 'Easy',
  },
  {
    id: 'ict-31',
    category: 'ICT MCQ',
    question: '৩১. সি ভাষায় হেডার ফাইল যুক্ত করার জন্য কোন প্রিপ্রসেসর ডিরেক্টিভ ব্যবহৃত হয়?',
    options: ['#define', '#main', '#include', '#import'],
    correctAnswer: 2, // গ
    explanation: 'প্রোগ্রামে লাইব্রেরি হেডার ফাইল যুক্ত করতে #include ডিরেক্টিভ (যেমন #include <stdio.h>) ব্যবহার করা হয়।',
    difficulty: 'Easy',
  },
  {
    id: 'ict-32',
    category: 'ICT MCQ',
    question: '৩২. নিচের সি কোডটির আউটপুট কত হবে?\n\nint a = 5, b = 2;\nprintf("%d", a % b);',
    options: ['2', '1', '2.5', '0'],
    correctAnswer: 1, // খ
    explanation: '৫ কে ২ দিয়ে ভাগ করলে ভাগফল ২ এবং অবশিষ্ট ভাগশেষ থাকে ১। মডুলাস অপারেটর (%) ভাগশেষ ১ রিটার্ন করে।',
    difficulty: 'Medium',
  },
  {
    id: 'ict-33',
    category: 'ICT MCQ',
    question: '৩৩. নিচের সি কোডটির আউটপুট কত হবে?\n\nint i = 1;\nwhile(i <= 3) {\n    printf("%d ", i);\n    i++;\n}',
    options: ['1 2 3', '1 2 3 4', '0 1 2', '3 2 1'],
    correctAnswer: 0, // ক
    explanation: 'while লুপটি i=1, 2, 3 এর জন্য সত্য হবে এবং মান প্রিন্ট করে প্রতিবার ১ বাড়াবে; ফলে স্ক্রিনে 1 2 3 মুদ্রিত হবে।',
    difficulty: 'Medium',
  },
  {
    id: 'ict-34',
    category: 'ICT MCQ',
    question: '৩৪. নিচের কোডটির আউটপুট কত হবে?\n\nint x = 10;\nx += 5;\nprintf("%d", x);',
    options: ['10', '15', '5', '50'],
    correctAnswer: 1, // খ
    explanation: 'x += 5 হলো যৌগিক অ্যাসাইনমেন্ট অপারেটর, যার মানে x = x + 5 = 10 + 5 = 15।',
    difficulty: 'Medium',
  },
  {
    id: 'ict-35',
    category: 'ICT MCQ',
    question: '৩৫. নিচের কোডটির আউটপুট কত হবে?\n\nint a = 7;\nint b = ++a;\nprintf("%d", b);',
    options: ['7', '6', '8', '9'],
    correctAnswer: 2, // গ
    explanation: '++a হলো প্রি-ইনক্রিমেন্ট (Pre-increment)। এটি অ্যাসাইনমেন্টের পূর্বেই a এর মান ১ বাড়িয়ে ৮ করে, ফলে b এর মান ৮ হয়।',
    difficulty: 'Medium',
  },
  {
    id: 'ict-36',
    category: 'ICT MCQ',
    question: '৩৬. নিচের কোডটিতে লুপটি কতবার আবর্তিত হবে?\n\nfor(int i = 0; i < 5; i += 2) {\n    printf("%d ", i);\n}',
    options: ['১ বার', '২ বার', '৩ বার', '৫ বার'],
    correctAnswer: 2, // গ
    explanation: 'i এর মান যথাক্রমে 0, 2, এবং 4 এর জন্য শর্ত (i < 5) সত্য হয়। এরপর i=6 হলে লুপ শেষ হয়; তাই লুপটি মোট ৩ বার ঘুরে।',
    difficulty: 'Medium',
  },
  {
    id: 'ict-37',
    category: 'ICT MCQ',
    question: '৩৭. সি ভাষায় অ্যারে (Array) এর ইনডেক্স সাধারণত কোন সংখ্যা থেকে শুরু হয়?',
    options: ['1', '0', '-1', 'n'],
    correctAnswer: 1, // খ
    explanation: 'সি ভাষায় অ্যারে ইনডেক্স সর্বদা 0 থেকে শুরু হয় (Array elements are 0-indexed: array[0], array[1], ...)।',
    difficulty: 'Easy',
  },
  {
    id: 'ict-38',
    category: 'ICT MCQ',
    question: '৩৮. int marks[10]; অ্যারেটিতে মোট কতটি উপাদান সংরক্ষণ করা যাবে?',
    options: ['১০টি', '৯টি', '১১টি', '২০টি'],
    correctAnswer: 0, // ক
    explanation: 'marks[10] ঘোষণার মাধ্যমে ০ থেকে ৯ পর্যন্ত মোট ১০টি ইনডেক্সে ১০টি উপাদান রাখা সম্ভব।',
    difficulty: 'Easy',
  },
  {
    id: 'ict-39',
    category: 'ICT MCQ',
    question: '৩৯. সি ভাষায় কীবোর্ড থেকে ডেটা ইনপুট নেওয়ার জন্য কোন ফাংশন ব্যবহার করা হয়?',
    options: ['printf()', 'scanf()', 'gets()', 'input()'],
    correctAnswer: 1, // খ
    explanation: 'scanf() হলো সি ভাষার স্ট্যান্ডার্ড ফরম্যাটেড ইনপুট ফাংশন।',
    difficulty: 'Easy',
  },
  {
    id: 'ict-40',
    category: 'ICT MCQ',
    question: '৪০. কোনো প্রোগ্রামের ভুলত্রুটি খুঁজে বের করে তা সংশোধন করার প্রক্রিয়াকে কী বলে?',
    options: ['কোডিং', 'ডিবাগিং (Debugging)', 'কম্পাইলিং', 'টেস্টিং'],
    correctAnswer: 1, // খ
    explanation: 'প্রোগ্রামে সৃষ্ট ভুল বা ত্রুটিকে বলা হয় Bug, আর সেই ভুল খুঁজে বের করে সমাধান করার পদ্ধতিকে ডিবাগিং (Debugging) বলা হয়।',
    difficulty: 'Easy',
  },
  {
    id: 'ict-41',
    category: 'ICT MCQ',
    question: '৪১. প্রোগ্রামের ব্যাকরণগত বা নিয়মনীতি সংক্রান্ত ভুলকে কী বলা হয়?',
    options: ['সিনট্যাক্স ভুল (Syntax Error)', 'লজিক্যাল ভুল (Logical Error)', 'রান-টাইম ভুল (Run-time Error)', 'হার্ডওয়্যার ভুল'],
    correctAnswer: 0, // ক
    explanation: 'প্রোগ্রামিং ভাষার নিয়ম বা ব্যাকরণ না মানলে যে ভুল হয় (যেমন সেমিকোলন না দেওয়া) তাকে সিনট্যাক্স ভুল (Syntax Error) বলে।',
    difficulty: 'Easy',
  },
  {
    id: 'ict-42',
    category: 'ICT MCQ',
    question: '৪২. সি প্রোগ্রামে এক লাইনের মন্তব্য (Single-line Comment) লেখার জন্য কোন চিহ্ন ব্যবহার করা হয়?',
    options: ['/* */', '<!-- -->', '//', '#'],
    correctAnswer: 2, // গ
    explanation: 'ডাবল স্ল্যাশ (//) চিহ্নটি সি ভাষায় এক লাইনের মন্তব্য লেখার জন্য ব্যবহৃত হয়।',
    difficulty: 'Easy',
  },
  {
    id: 'ict-43',
    category: 'ICT MCQ',
    question: '৪৩. সি ভাষায় বহুল ব্যবহৃত স্ট্যান্ডার্ড ইনপুট/আউটপুট হেডার ফাইল কোনটি?',
    options: ['math.h', 'stdio.h', 'conio.h', 'string.h'],
    correctAnswer: 1, // খ
    explanation: 'stdio.h মানে Standard Input/Output Header File, যাতে printf() ও scanf() এর প্রোটোটাইপ সংরক্ষিত থাকে।',
    difficulty: 'Easy',
  },
  {
    id: 'ict-44',
    category: 'ICT MCQ',
    question: '৪৪. সি ভাষায় কন্ডিশনাল বা টারনারি অপারেটর (Ternary Operator) কোনটি?',
    options: ['?:', '::', '->', '=='],
    correctAnswer: 0, // ক
    explanation: '?: হলো সি ভাষার টারনারি বা শর্তযুক্ত অপারেটর (Condition ? Exp1 : Exp2)।',
    difficulty: 'Medium',
  },
  {
    id: 'ict-45',
    category: 'ICT MCQ',
    question: '৪৫. সি প্রোগ্রামে কোনো লুপ বা সুইচ স্টেটমেন্ট থেকে তাত্ক্ষণিক বের হয়ে যাওয়ার জন্য ব্যবহৃত হয় কোনটি?',
    options: ['continue', 'break', 'goto', 'return'],
    correctAnswer: 1, // খ
    explanation: 'break স্টেটমেন্ট নির্বাহ হওয়ার সাথে সাথে বর্তমান লুপ বা switch কাঠামোর সমাপ্তি ঘটে এবং নিয়ন্ত্রণ বাইরে চলে আসে।',
    difficulty: 'Easy',
  },
  {
    id: 'ict-46',
    category: 'ICT MCQ',
    question: '৪৬. লুপের চলমান ধাপটি বাদ দিয়ে পরবর্তী ধাপে চলে যাওয়ার জন্য কোন কি-ওয়ার্ড ব্যবহৃত হয়?',
    options: ['continue', 'break', 'exit', 'stop'],
    correctAnswer: 0, // ক
    explanation: 'continue স্টেটমেন্ট বর্তমান আবর্তনটিকে তাৎক্ষণিক বন্ধ করে দিয়ে লুপের পরবর্তী পুনরাবৃত্তিতে চলে যায়।',
    difficulty: 'Easy',
  },
  {
    id: 'ict-47',
    category: 'ICT MCQ',
    question: '৪৭. সি ভাষায় নিচের কোনটি সংরক্ষিত কি-ওয়ার্ড (Keyword)?',
    options: ['total', 'main', 'return', 'sum'],
    correctAnswer: 2, // গ
    explanation: 'return হলো C ভাষার ৩২টি সংরক্ষিত কি-ওয়ার্ডের একটি।',
    difficulty: 'Easy',
  },
  {
    id: 'ict-48',
    category: 'ICT MCQ',
    question: '৪৮. অ্যালগরিদমের চিত্রভিত্তিক বা চিত্ররূপ উপস্থাপনকে কী বলা হয়?',
    options: ['সিউডোকোড', 'সোর্স কোড', 'ফ্লোচার্ট (Flowchart)', 'অবজেক্ট কোড'],
    correctAnswer: 2, // গ
    explanation: 'কোনো নির্দিষ্ট সমস্যা সমাধানের ধারাবাহিক ধাপসমূহকে জ্যামিতিক চিত্রের সাহায্যে উপস্থাপনকে ফ্লোচার্ট (Flowchart) বা প্রবাহচিত্র বলে।',
    difficulty: 'Easy',
  },
  {
    id: 'ict-49',
    category: 'ICT MCQ',
    question: '৪৯. কম্পাইলার দ্বারা সম্পূর্ণ সোর্স প্রোগ্রাম রূপান্তরের পর যে কোড তৈরি হয় তাকে কী বলে?',
    options: ['এক্সিকিউটেবল কোড', 'সোর্স ফাইল', 'অবজেক্ট কোড (Object Code)', 'মেশিন অ্যাসেম্বলি'],
    correctAnswer: 2, // গ
    explanation: 'কম্পাইলার উচ্চস্তরের সোর্স কোডকে অনুবাদ করে বাইনারি অবজেক্ট কোডে (.obj) রূপান্তর করে।',
    difficulty: 'Easy',
  },
  {
    id: 'ict-50',
    category: 'ICT MCQ',
    question: '৫০. সি ভাষায় কোনো সংখ্যার বর্গমূল (Square Root) নির্ণয়ের জন্য math.h হেডার ফাইলের কোন ফাংশনটি ব্যবহৃত হয়?',
    options: ['power()', 'sqrt()', 'square()', 'root()'],
    correctAnswer: 1, // খ
    explanation: 'বর্গমূল নির্ণয়ের জন্য math.h হেডার ফাইলের sqrt() লাইব্রেরি ফাংশনটি ব্যবহৃত হয়।',
    difficulty: 'Easy',
  },
];
