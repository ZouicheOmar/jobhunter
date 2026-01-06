enum CONTRACT_TYPES_ENUM {
  "CDI TEMPS PLEIN",
  "CDI TEMPS PARTIEL",
  "INTERIMAIRE",
  "CDD",
  "ALTERNANT",
  "BÉNÉVOLE",
  "FREELANCE",
  "AUTRE",
}

export type Contract = {
  id: number;
  type: string;
  duration: number | null;
};

export type ContractCreate = {
  type: string;
  duration: number | null;
};
