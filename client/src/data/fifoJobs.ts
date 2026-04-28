export type VisaTypeId =
  | "whv_417"
  | "whv_462"
  | "student_500"
  | "tss_482"
  | "pr_pathway";

export interface VisaType {
  id: VisaTypeId;
  label: string;
  shortLabel: string;
  description: string;
  workRights: string;
}

export const DATA_SNAPSHOT_DATE = "2026-04-28";
export const DATA_UPDATE_FREQUENCY = "Weekly reviewed updates";

export interface FIFOJob {
  id: number;
  title: string;
  salaryMin: number;
  salaryMax: number;
  roster: string;
  tickets: string[];
  eligibleVisaTypes: VisaTypeId[];
  description: string;
  netMonthlyMin: number;
  netMonthlyMax: number;
}

export const visaTypes: VisaType[] = [
  {
    id: "whv_417",
    label: "Working Holiday Visa (Subclass 417)",
    shortLabel: "417",
    description: "Popular option for backpackers and gap-year workers.",
    workRights: "Full-time work with employer/time limitations to check per current rules.",
  },
  {
    id: "whv_462",
    label: "Work and Holiday Visa (Subclass 462)",
    shortLabel: "462",
    description: "Alternative WHV stream for eligible passport holders.",
    workRights: "Comparable short-term work rights; verify country-specific conditions.",
  },
  {
    id: "student_500",
    label: "Student Visa (Subclass 500)",
    shortLabel: "Student 500",
    description: "For international students combining study and work.",
    workRights: "Work-hour limits can apply during study periods.",
  },
  {
    id: "tss_482",
    label: "Skills in Demand / TSS (Subclass 482)",
    shortLabel: "482",
    description: "Employer-sponsored pathway for skilled roles.",
    workRights: "Role-specific and employer-sponsored eligibility applies.",
  },
  {
    id: "pr_pathway",
    label: "PR Pathway (e.g. 189/190/491 progression)",
    shortLabel: "PR Pathway",
    description: "Longer-term migration pathways for eligible workers.",
    workRights: "Varies by stream and nomination requirements.",
  },
];

export const roleEligibilityMapping: Record<string, VisaTypeId[]> = {
  "Driller's Offsider": ["whv_417", "whv_462", "student_500"],
  "Exploration Driller's Offsider": ["whv_417", "whv_462", "student_500"],
  "Utilities / Service Attendant": ["whv_417", "whv_462", "student_500"],
  "Blast Crew (Entry Level)": ["whv_417", "whv_462", "student_500", "tss_482"],
  "Dump Truck Operator (Trainee)": ["whv_417", "whv_462", "student_500", "tss_482"],
  "Underground Truck/Nipper": ["whv_417", "whv_462", "student_500", "tss_482"],
  "Trade Assistant": ["whv_417", "whv_462", "student_500", "tss_482", "pr_pathway"],
  "FIFO Utilities (Camp Services)": ["whv_417", "whv_462", "student_500"],
  "Soil Technician": ["whv_417", "whv_462", "student_500", "tss_482"],
  "General Hand / Labourer": ["whv_417", "whv_462", "student_500"],
};

export const fifoJobs: FIFOJob[] = [
  {
    id: 1,
    title: "Driller's Offsider",
    salaryMin: 120000,
    salaryMax: 140000,
    roster: "2:1 or 4:2",
    tickets: ["White Card", "First Aid & CPR", "Manual C-Class Licence", "Medical & Drug Screening"],
    eligibleVisaTypes: roleEligibilityMapping["Driller's Offsider"],
    description: "Highest-paying entry-level role. Physically demanding 12-hour shifts. Certificate II Traineeship often provided. Career pathway to Driller ($150k+).",
    netMonthlyMin: 7604,
    netMonthlyMax: 9229
  },
  {
    id: 2,
    title: "Exploration Driller's Offsider",
    salaryMin: 110000,
    salaryMax: 130000,
    roster: "2:1 or 4:2",
    tickets: ["White Card", "First Aid & CPR", "Manual C-Class Licence", "Medical & Drug Screening"],
    eligibleVisaTypes: roleEligibilityMapping["Exploration Driller's Offsider"],
    description: "Similar to surface driller's offsider but focused on exploration drilling. Immediate Cert II Traineeship registration. Work with major mining companies.",
    netMonthlyMin: 6979,
    netMonthlyMax: 8354
  },
  {
    id: 3,
    title: "Utilities / Service Attendant",
    salaryMin: 105000,
    salaryMax: 120000,
    roster: "2:1",
    tickets: ["White Card", "First Aid & CPR", "Manual C-Class Licence"],
    eligibleVisaTypes: roleEligibilityMapping["Utilities / Service Attendant"],
    description: "Industry leader (Perenti Group). Recognized long-term career pathway. Competitive terms and rates. Stable FIFO role.",
    netMonthlyMin: 6729,
    netMonthlyMax: 7604
  },
  {
    id: 4,
    title: "Blast Crew (Entry Level)",
    salaryMin: 100000,
    salaryMax: 115000,
    roster: "2:1 or 8:6",
    tickets: ["White Card", "First Aid & CPR", "Manual C-Class Licence", "Medical & Drug Screening"],
    eligibleVisaTypes: roleEligibilityMapping["Blast Crew (Entry Level)"],
    description: "No previous blast experience required. FIFO ex Perth to Pilbara. Immediate start opportunities. Career pathway to Shot Firer.",
    netMonthlyMin: 6479,
    netMonthlyMax: 7229
  },
  {
    id: 5,
    title: "Dump Truck Operator (Trainee)",
    salaryMin: 95000,
    salaryMax: 110000,
    roster: "2:1, 2:2, or 8:6",
    tickets: ["White Card", "HR Licence (recommended)", "First Aid & CPR", "Medical & Drug Screening"],
    eligibleVisaTypes: roleEligibilityMapping["Dump Truck Operator (Trainee)"],
    description: "Many companies provide truck training. 12.5-hour days paid. Weekly pay. Career pathway to experienced operator ($145k-165k).",
    netMonthlyMin: 6104,
    netMonthlyMax: 6979
  },
  {
    id: 6,
    title: "Underground Truck/Nipper",
    salaryMin: 90000,
    salaryMax: 110000,
    roster: "7:7 or 8:6",
    tickets: ["White Card", "First Aid & CPR", "Manual C-Class Licence", "Medical & Drug Screening"],
    eligibleVisaTypes: roleEligibilityMapping["Underground Truck/Nipper"],
    description: "Underground work. Assessment day recruitment process. Training provided. Career pathway to underground operator roles.",
    netMonthlyMin: 5854,
    netMonthlyMax: 6979
  },
  {
    id: 7,
    title: "Trade Assistant",
    salaryMin: 85000,
    salaryMax: 105000,
    roster: "2:1 or 8:6",
    tickets: ["White Card", "First Aid & CPR", "Manual C-Class Licence", "HR Licence (preferred)"],
    eligibleVisaTypes: roleEligibilityMapping["Trade Assistant"],
    description: "Support qualified tradespeople. Physically demanding. Good pathway to apprenticeship. Diesel TA and Shot Firer TA pay $3,500-4,000/week.",
    netMonthlyMin: 5521,
    netMonthlyMax: 6729
  },
  {
    id: 8,
    title: "FIFO Utilities (Camp Services)",
    salaryMin: 85000,
    salaryMax: 100000,
    roster: "2:1, 1:1, or lifestyle",
    tickets: ["White Card", "First Aid & CPR", "Food Safety (for kitchen roles)"],
    eligibleVisaTypes: roleEligibilityMapping["FIFO Utilities (Camp Services)"],
    description: "Easiest entry point. Roles include cleaning, housekeeping, kitchen utility, laundry. Even pay fortnightly. Private rooms, meals provided.",
    netMonthlyMin: 5521,
    netMonthlyMax: 6479
  },
  {
    id: 9,
    title: "Soil Technician",
    salaryMin: 80000,
    salaryMax: 95000,
    roster: "3:1 (Karratha)",
    tickets: ["White Card", "First Aid & CPR", "Manual C-Class Licence"],
    eligibleVisaTypes: roleEligibilityMapping["Soil Technician"],
    description: "Full training provided. Karratha-based. Entry-level geotechnical work. Career pathway to senior technician roles.",
    netMonthlyMin: 5229,
    netMonthlyMax: 6104
  },
  {
    id: 10,
    title: "General Hand / Labourer",
    salaryMin: 75000,
    salaryMax: 90000,
    roster: "2:1 or 8:6",
    tickets: ["White Card", "First Aid & CPR", "Manual C-Class Licence"],
    eligibleVisaTypes: roleEligibilityMapping["General Hand / Labourer"],
    description: "Most accessible entry-level role. Various duties across site. Good starting point for career progression. Lower pay but easier to secure.",
    netMonthlyMin: 4896,
    netMonthlyMax: 5854
  }
];

export interface RecruitmentAgency {
  id: number;
  name: string;
  website: string;
  specialization: string;
  visaFriendly: boolean;
  supportedVisaTypes: VisaTypeId[];
  description: string;
}

export const recruitmentAgencies: RecruitmentAgency[] = [
  {
    id: 1,
    name: "Programmed",
    website: "programmed.com.au",
    specialization: "Entry-level to experienced FIFO roles",
    visaFriendly: true,
    supportedVisaTypes: ["whv_417", "whv_462", "student_500", "tss_482"],
    description: "Hundreds of mining roles available, seeking experienced, semi-skilled, and entry-level operators. Large national company with strong presence in WA mining."
  },
  {
    id: 2,
    name: "Hays Recruitment",
    website: "hays.com.au",
    specialization: "Resources & Mining recruitment across all levels",
    visaFriendly: true,
    supportedVisaTypes: ["whv_417", "whv_462", "student_500", "tss_482", "pr_pathway"],
    description: "Entry-level through to executive positions in mining. One of Australia's largest recruitment agencies with dedicated mining division."
  },
  {
    id: 3,
    name: "RecruitWest",
    website: "recruitwest.com.au",
    specialization: "FIFO mining, engineering, and logistics in WA",
    visaFriendly: true,
    supportedVisaTypes: ["whv_417", "whv_462", "student_500"],
    description: "Perth-based agency with strong local connections. Specializes in attracting and retaining candidates for FIFO roles from Perth to the Pilbara."
  }
];

export const rosterExplanations = {
  "2:1": "14 days on, 7 days off",
  "4:2": "28 days on, 14 days off",
  "8:6": "8 days on, 6 days off",
  "7:7": "7 days on, 7 days off",
  "2:2": "14 days on, 14 days off",
  "3:1": "21 days on, 7 days off",
  "1:1": "7 days on, 7 days off"
};
