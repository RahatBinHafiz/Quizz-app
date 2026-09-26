import React, { useState } from 'react';
import {
  X,
  Plus,
  Search,
  BookOpen,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { Question, QuestionDifficulty } from '../types/quiz';
import { CATEGORIES } from '../data/questionBank';

interface QuestionBankModalProps {
  questions: Question[];
  isOpen: boolean;
  onClose: () => void;
  onAddQuestion: (q: Omit<Question, 'id'>) => void;
  onAddMultipleQuestions?: (qs: Omit<Question, 'id'>[]) => void;
  onDeleteCustomQuestion: (id: string | number) => void;
  defaultCategory?: string;
}

export const QuestionBankModal: React.FC<QuestionBankModalProps> = ({
  questions,
  isOpen,
  onClose,
  onAddQuestion,
  onAddMultipleQuestions,
  onDeleteCustomQuestion,
  defaultCategory = 'Biology',
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [addMode, setAddMode] = useState<'form' | 'paste'>('form');

  // Form State
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newCategory, setNewCategory] = useState(defaultCategory);
  const [newDifficulty, setNewDifficulty] = useState<QuestionDifficulty>('Medium');
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [optionC, setOptionC] = useState('');
  const [optionD, setOptionD] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState<number>(0);
  const [newExplanation, setNewExplanation] = useState('');
  const [bulkText, setBulkText] = useState('');
  const [formError, setFormError] = useState('');
  const [importSuccessMsg, setImportSuccessMsg] = useState('');

  if (!isOpen) return null;

  const filtered = questions.filter((q) => {
    const matchesCat =
      selectedCategory === 'All' || q.category === selectedCategory;
    const matchesSearch =
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.options.some((o) => o.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleSaveQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) {
      setFormError('Question text cannot be empty.');
      return;
    }
    if (!optionA.trim() || !optionB.trim() || !optionC.trim() || !optionD.trim()) {
      setFormError('All 4 options must be filled.');
      return;
    }
    if (!newExplanation.trim()) {
      setFormError('Please provide an educational explanation for the answer.');
      return;
    }

    onAddQuestion({
      question: newQuestionText.trim(),
      category: newCategory,
      difficulty: newDifficulty,
      options: [optionA.trim(), optionB.trim(), optionC.trim(), optionD.trim()],
      correctAnswer,
      explanation: newExplanation.trim(),
    });

    // Reset Form
    setNewQuestionText('');
    setOptionA('');
    setOptionB('');
    setOptionC('');
    setOptionD('');
    setCorrectAnswer(0);
    setNewExplanation('');
    setFormError('');
    setIsAddingNew(false);
  };

  const handleBulkImport = () => {
    if (!bulkText.trim()) {
      setFormError('Please paste your questions in JSON format.');
      return;
    }

    try {
      const parsed = JSON.parse(bulkText.trim());
      if (!Array.isArray(parsed) || parsed.length === 0) {
        setFormError('Input must be a JSON array containing questions.');
        return;
      }

      const validQuestions: Omit<Question, 'id'>[] = [];
      for (const item of parsed) {
        if (
          !item.question ||
          !Array.isArray(item.options) ||
          item.options.length !== 4 ||
          item.correctAnswer === undefined ||
          typeof item.correctAnswer !== 'number'
        ) {
          throw new Error('Each question must have "question", 4 "options", and "correctAnswer" index (0-3).');
        }

        validQuestions.push({
          question: String(item.question),
          category: item.category || 'Biology',
          difficulty: item.difficulty || 'Medium',
          options: [
            String(item.options[0]),
            String(item.options[1]),
            String(item.options[2]),
            String(item.options[3]),
          ],
          correctAnswer: item.correctAnswer,
          explanation: item.explanation || 'No explanation provided.',
        });
      }

      if (onAddMultipleQuestions) {
        onAddMultipleQuestions(validQuestions);
      } else {
        validQuestions.forEach((q) => onAddQuestion(q));
      }

      setBulkText('');
      setFormError('');
      setImportSuccessMsg(`Successfully imported ${validQuestions.length} questions into the bank!`);
      setTimeout(() => {
        setImportSuccessMsg('');
        setIsAddingNew(false);
      }, 1500);
    } catch (err: any) {
      setFormError(err.message || 'Failed to parse JSON. Please check formatting.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col border border-[#7C5CFC]/20 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#7C5CFC]/15 flex items-center justify-between bg-[#FFFDF7]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#F0EBFF] flex items-center justify-center text-[#7C5CFC]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#34245C]">
                Question Bank
              </h3>
              <p className="text-xs text-[#817A91]">
                {questions.length} total questions loaded in memory
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAddingNew(!isAddingNew)}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                isAddingNew
                  ? 'bg-[#F0EBFF] text-[#7C5CFC]'
                  : 'bg-[#7C5CFC] text-white hover:bg-[#6949EB]'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>{isAddingNew ? 'Close Form' : 'Add Question'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#817A91] hover:text-[#34245C] hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Add New Question Form */}
          {isAddingNew && (
            <div className="p-5 rounded-2xl bg-[#FFFDF7] border-2 border-[#7C5CFC]/30 space-y-4 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setAddMode('form');
                      setFormError('');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      addMode === 'form'
                        ? 'bg-[#7C5CFC] text-white shadow-sm'
                        : 'bg-white text-[#817A91] hover:text-[#34245C]'
                    }`}
                  >
                    Form Builder
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAddMode('paste');
                      setFormError('');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      addMode === 'paste'
                        ? 'bg-[#7C5CFC] text-white shadow-sm'
                        : 'bg-white text-[#817A91] hover:text-[#34245C]'
                    }`}
                  >
                    Bulk Import (JSON)
                  </button>
                </div>
                <span className="text-xs text-[#817A91]">4 Options per Question</span>
              </div>

              {formError && (
                <div className="p-3 rounded-xl bg-[#FDF1F1] border border-[#E87575]/30 text-xs text-[#E87575] flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>{formError}</span>
                </div>
              )}

              {importSuccessMsg && (
                <div className="p-3 rounded-xl bg-[#EBF8F2] border border-[#55B88A]/30 text-xs text-[#1E4D38] flex items-center gap-2 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[#55B88A]" />
                  <span>{importSuccessMsg}</span>
                </div>
              )}

              {addMode === 'paste' ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#817A91]">
                    <span>Paste an array of questions in JSON format:</span>
                    <button
                      type="button"
                      onClick={() => {
                        setBulkText(
                          JSON.stringify(
                            [
                              {
                                category: 'Biology',
                                question: 'What is the main function of ribosomes in a cell?',
                                options: [
                                  'Lipid synthesis',
                                  'Protein synthesis',
                                  'DNA replication',
                                  'ATP storage'
                                ],
                                correctAnswer: 1,
                                explanation: 'Ribosomes are the macromolecular machines responsible for protein synthesis (translation) in cells.',
                                difficulty: 'Easy'
                              }
                            ],
                            null,
                            2
                          )
                        );
                      }}
                      className="text-[#7C5CFC] hover:underline font-semibold cursor-pointer"
                    >
                      Insert Biology Example
                    </button>
                  </div>

                  <textarea
                    rows={8}
                    value={bulkText}
                    onChange={(e) => setBulkText(e.target.value)}
                    placeholder='[&#10;  {&#10;    "category": "Biology",&#10;    "question": "Which organelle...",&#10;    "options": ["A", "B", "C", "D"],&#10;    "correctAnswer": 1,&#10;    "explanation": "...",&#10;    "difficulty": "Medium"&#10;  }&#10;]'
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs font-mono focus:outline-none focus:border-[#7C5CFC] bg-white leading-relaxed"
                  />

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingNew(false)}
                      className="px-4 py-2 text-xs font-bold text-[#817A91] hover:text-[#34245C] rounded-xl cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleBulkImport}
                      className="px-5 py-2 text-xs font-bold text-white bg-[#7C5CFC] hover:bg-[#6949EB] rounded-xl shadow-sm cursor-pointer"
                    >
                      Import Question Set
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSaveQuestion} className="space-y-4">

              {/* Question Text */}
              <div>
                <label className="block text-xs font-bold text-[#34245C] mb-1">
                  Question Prompt
                </label>
                <textarea
                  rows={2}
                  value={newQuestionText}
                  onChange={(e) => setNewQuestionText(e.target.value)}
                  placeholder="e.g. Which layer of the OSI model does TCP belong to?"
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#7C5CFC] bg-white"
                />
              </div>

              {/* Category & Difficulty */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#34245C] mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#7C5CFC] bg-white"
                  >
                    {CATEGORIES.filter((c) => c.name !== 'All Categories').map(
                      (cat) => (
                        <option key={cat.id} value={cat.name}>
                          {cat.name}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#34245C] mb-1">
                    Difficulty
                  </label>
                  <select
                    value={newDifficulty}
                    onChange={(e) =>
                      setNewDifficulty(e.target.value as QuestionDifficulty)
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#7C5CFC] bg-white"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              {/* 4 Options & Correct Answer Radio */}
              <div>
                <label className="block text-xs font-bold text-[#34245C] mb-2">
                  Answer Options (Select the Radio for Correct Answer):
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { label: 'A', val: optionA, setVal: setOptionA, idx: 0 },
                    { label: 'B', val: optionB, setVal: setOptionB, idx: 1 },
                    { label: 'C', val: optionC, setVal: setOptionC, idx: 2 },
                    { label: 'D', val: optionD, setVal: setOptionD, idx: 3 },
                  ].map(({ label, val, setVal, idx }) => (
                    <div
                      key={label}
                      className={`flex items-center gap-2 p-2 rounded-xl border bg-white ${
                        correctAnswer === idx
                          ? 'border-[#55B88A] bg-[#EBF8F2]/30 ring-1 ring-[#55B88A]'
                          : 'border-slate-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="correctAnswerOption"
                        id={`opt_${idx}`}
                        checked={correctAnswer === idx}
                        onChange={() => setCorrectAnswer(idx)}
                        className="accent-[#55B88A] cursor-pointer ml-1"
                      />
                      <label
                        htmlFor={`opt_${idx}`}
                        className="text-xs font-bold text-[#7C5CFC] w-4 cursor-pointer"
                      >
                        {label}.
                      </label>
                      <input
                        type="text"
                        value={val}
                        onChange={(e) => setVal(e.target.value)}
                        placeholder={`Option ${label}`}
                        className="flex-1 text-xs focus:outline-none bg-transparent"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Explanation */}
              <div>
                <label className="block text-xs font-bold text-[#34245C] mb-1">
                  Explanation / Reasoning
                </label>
                <input
                  type="text"
                  value={newExplanation}
                  onChange={(e) => setNewExplanation(e.target.value)}
                  placeholder="Explain why this option is correct for learners..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#7C5CFC] bg-white"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="px-4 py-2 text-xs font-bold text-[#817A91] hover:text-[#34245C] rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-[#55B88A] hover:bg-[#47a177] rounded-xl shadow-sm cursor-pointer"
                >
                  Save Question
                </button>
              </div>
                </form>
              )}
            </div>
          )}

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-[#817A91] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search questions or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#7C5CFC] bg-white"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full sm:w-48 p-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#7C5CFC] bg-white"
            >
              <option value="All">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Question List */}
          <div className="space-y-3">
            {filtered.length === 0 ? (
              <div className="py-12 text-center text-xs text-[#817A91]">
                No questions found matching your filter criteria.
              </div>
            ) : (
              filtered.map((q, idx) => {
                const isCustom = typeof q.id === 'string' && q.id.startsWith('custom_');

                return (
                  <div
                    key={q.id}
                    className="p-4 rounded-2xl bg-[#FFFDF7] border border-[#7C5CFC]/15 hover:border-[#7C5CFC]/40 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-bold text-[#7C5CFC]">
                          #{idx + 1}
                        </span>
                        <span className="font-semibold text-[#34245C]">
                          {q.category}
                        </span>
                        <span aria-hidden="true" className="text-slate-300">·</span>
                        <span className="text-[#817A91]">{q.difficulty}</span>
                        {isCustom && (
                          <span className="px-2 py-0.5 rounded-md bg-[#FFF4C2] text-[#34245C] text-[10px] font-bold">
                            Custom
                          </span>
                        )}
                      </div>

                      {isCustom && (
                        <button
                          onClick={() => onDeleteCustomQuestion(q.id)}
                          className="p-1 text-[#817A91] hover:text-[#E87575] transition-colors"
                          title="Delete custom question"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    <p className="text-sm font-bold text-[#2D2640] mb-2.5">
                      {q.question}
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {q.options.map((opt, optI) => (
                        <div
                          key={optI}
                          className={`p-2 rounded-lg border flex items-center gap-1.5 ${
                            optI === q.correctAnswer
                              ? 'bg-[#EBF8F2] border-[#55B88A] text-[#1E4D38] font-bold'
                              : 'bg-white border-slate-100 text-[#817A91]'
                          }`}
                        >
                          <span className="font-mono-numbers">
                            {String.fromCharCode(65 + optI)}.
                          </span>
                          <span className="truncate">{opt}</span>
                          {optI === q.correctAnswer && (
                            <CheckCircle2 className="w-3 h-3 text-[#55B88A] shrink-0 ml-auto" />
                          )}
                        </div>
                      ))}
                    </div>

                    {q.explanation && (
                      <p className="mt-2 text-[11px] text-[#817A91] italic">
                        💡 {q.explanation}
                      </p>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
