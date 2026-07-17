import { createContext, useContext, useReducer } from "react";
import {
  loadFromLocalStorage,
  useLocalStorage,
} from "../hooks/useLocalStorage";

const STORAGE_KEY = "draftly-resume";

const initialResumeData = {
  personalInfo: {
    fullName: "",
    profilePhoto: null,
    jobTitle: "",
    email: "",
    countryCode: "92", //Default to Pakistan
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
  skippedSections: [], // array of skipped section keys
  hasSeenSectionPicker: false, // has the full-screen picker been shown yet
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
      // action.payload = { section: "education", id: "abc-123", item: {...updatedFields} }
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

    case "TOGGLE_SECTION_SKIP":
      // action.payload = "languages" — the section key to toggle
      return {
        ...state,
        skippedSections: state.skippedSections.includes(action.payload)
          ? state.skippedSections.filter((key) => key !== action.payload) // already skipped -> un-skip
          : [...state.skippedSections, action.payload], // not skipped -> skip it
      };

    case "MARK_PICKER_SEEN":
      return { ...state, hasSeenSectionPicker: true };

    default:
      return state;
  }
}

function getInitialState() {
  const saved = loadFromLocalStorage(STORAGE_KEY);
  return saved ? { ...initialResumeData, ...saved } : initialResumeData;
}

const ResumeContext = createContext(null);

export function ResumeProvider({ children }) {
  const [resumeData, dispatch] = useReducer(
    resumeReducer,
    undefined,
    getInitialState,
  );

  // Auto-save: fires every time resumeData changes, for any reason
  // (any dispatch at all — add/edit/delete/skip/reorder/etc.)
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
