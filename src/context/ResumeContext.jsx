import { createContext, useContext, useReducer } from "react";

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
  selectedTemplate: "modern",
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

const ResumeContext = createContext(null);

export function ResumeProvider({ children }) {
  const [resumeData, dispatch] = useReducer(resumeReducer, initialResumeData);

  return (
    <ResumeContext.Provider value={{ resumeData, dispatch }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  return useContext(ResumeContext);
}
