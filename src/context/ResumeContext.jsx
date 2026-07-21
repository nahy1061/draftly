import { createContext, useContext, useReducer } from "react";
import {
  loadFromLocalStorage,
  useLocalStorage,
} from "../hooks/useLocalStorage";

const STORAGE_KEY = "draftly-resume";

// Default shape — merged with localStorage on load so new fields don't break old saves
const initialResumeData = {
  personalInfo: {
    fullName: "",
    profilePhoto: null,
    jobTitle: "",
    email: "",
    countryCode: "92", // default Pakistan
    phone: "",
    address: "",
    linkedin: "",
    github: "",
    portfolio: "",
    summary: "",
  },
  education: [],
  experience: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
  interests: [],
  sectionOrder: [
    "education",
    "experience",
    "skills",
    "projects",
    "certifications",
    "languages",
    "interests",
  ],
  skippedSections: [], // hidden from nav + preview, still in sectionOrder
  hasSeenSectionPicker: false,
  selectedTemplate: "professional",
};

function resumeReducer(state, action) {
  switch (action.type) {
    case "UPDATE_PERSONAL_INFO":
      return {
        ...state,
        personalInfo: { ...state.personalInfo, ...action.payload },
      };

    case "ADD_ITEM":
      return {
        ...state,
        [action.payload.section]: [
          ...state[action.payload.section],
          action.payload.item,
        ],
      };
    case "UPDATE_ITEM":
      return {
        ...state,
        [action.payload.section]: state[action.payload.section].map((el) =>
          el.id === action.payload.id ? action.payload.item : el,
        ),
      };

    case "REMOVE_ITEM":
      return {
        ...state,
        [action.payload.section]: state[action.payload.section].filter(
          (el) => el.id !== action.payload.id,
        ),
      };

    case "RESET_RESUME":
      return { ...initialResumeData };

    case "SET_TEMPLATE":
      return { ...state, selectedTemplate: action.payload };

    case "REORDER_SECTIONS":
      return { ...state, sectionOrder: action.payload };

    // Toggle: remove if present, add if not
    case "TOGGLE_SECTION_SKIP":
      return {
        ...state,
        skippedSections: state.skippedSections.includes(action.payload)
          ? state.skippedSections.filter((key) => key !== action.payload)
          : [...state.skippedSections, action.payload],
      };

    case "MARK_PICKER_SEEN":
      return { ...state, hasSeenSectionPicker: true };

    default:
      return state;
  }
}

// Spread saved over defaults so missing new fields always get a value
function getInitialState() {
  const saved = loadFromLocalStorage(STORAGE_KEY);
  return saved ? { ...initialResumeData, ...saved } : initialResumeData;
}

const ResumeContext = createContext(null);

export function ResumeProvider({ children }) {
  // Lazy init reads localStorage once; third arg is useReducer's init function
  const [resumeData, dispatch] = useReducer(
    resumeReducer,
    undefined,
    getInitialState,
  );

  // Auto-save on every dispatch (add/edit/delete/skip/reorder/etc.)
  useLocalStorage(STORAGE_KEY, resumeData);

  return (
    <ResumeContext.Provider value={{ resumeData, dispatch }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  return useContext(ResumeContext);
}
