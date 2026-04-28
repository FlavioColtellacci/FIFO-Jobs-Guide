export interface FIFOJob {
  id: number;
  title: string;
  salaryMin: number;
  salaryMax: number;
  roster: string;
  tickets: string[];
  visaEligible: boolean;
  description: string;
  netMonthlyMin: number;
  netMonthlyMax: number;
}

export const fifoJobs: FIFOJob[] = [
  {
    id: 1,
    title: "Driller's Offsider",
    salaryMin: 120000,
    salaryMax: 140000,
    roster: "2:1 or 4:2",
    tickets: ["White Card", "First Aid & CPR", "Manual C-Class Licence", "Medical & Drug Screening"],
    visaEligible: true,
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
    visaEligible: true,
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
    visaEligible: true,
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
    visaEligible: true,
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
    visaEligible: true,
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
    visaEligible: true,
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
    visaEligible: true,
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
    visaEligible: true,
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
    visaEligible: true,
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
    visaEligible: true,
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
  description: string;
}

export const recruitmentAgencies: RecruitmentAgency[] = [
  {
    id: 1,
    name: "Programmed",
    website: "programmed.com.au",
    specialization: "Entry-level to experienced FIFO roles",
    visaFriendly: true,
    description: "Hundreds of mining roles available, seeking experienced, semi-skilled, and entry-level operators. Large national company with strong presence in WA mining."
  },
  {
    id: 2,
    name: "Hays Recruitment",
    website: "hays.com.au",
    specialization: "Resources & Mining recruitment across all levels",
    visaFriendly: true,
    description: "Entry-level through to executive positions in mining. One of Australia's largest recruitment agencies with dedicated mining division."
  },
  {
    id: 3,
    name: "RecruitWest",
    website: "recruitwest.com.au",
    specialization: "FIFO mining, engineering, and logistics in WA",
    visaFriendly: true,
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
