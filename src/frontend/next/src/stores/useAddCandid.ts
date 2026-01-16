import { create, StateCreator } from "zustand";
import { getHostname, getTodayDate } from "@/lib/utils";
import {
	getCity,
	getCityByName,
	getCityByZipcode,
	getOrCreateCompanyByName,
	getOrCreateWebsiteByName,
	postCandid,
	ROUTES,
	scrapUrl,
} from "@/lib/api";
import {
	CandidCreate,
	Tech,
	Website,
	Company,
	City,
	Candid,
	ContractCreate,
	TechCreate,
	CompanyCreate,
	WebsiteCreate,
} from "@/types";
import { formatDate } from "@/lib/utils";
import { CONTRACT_TYPES } from "@/lib";

type DataFromScrap = {
	city?: City;
	company?: Company;
	website?: Website;
	title: string;
	contract: ContractCreate;
};

interface ComponentStateSlice {
	show: boolean;
	loading: boolean;
	error: boolean;
	reset: () => void;
	toggle: () => void;
}

interface TitleSlice {
	title: string;
	updateTitle: (v: string) => void;
}

interface TechSlice {
	tech: TechCreate;
	stack: TechCreate[];
	techCompletionList: Tech[];
	updateTech: (v: TechCreate) => void;
	updateStack: () => void;
	removeStackItem: (v: TechCreate) => void; // update this
	updateTechCompletionList: (v: Tech[]) => void;
}

interface UrlSlice {
	url: string;
	updateUrl: (v: string) => void;
	lookupUrl: () => void;
}

type CityLookup = {
	id: number | null;
	name: string | null;
};

interface CitySlice {
	// valid: boolean;
	// updateValide: (v: boolean) => void;
	// city: CityLookup;
	city: City;
	cityCompletionList: City[];
	updateCity: (v: City) => void;
	updateCityCompletionList: (v: City[]) => void;
}

interface CompanySlice {
	company: CompanyCreate;
	companyCompletionList: Company[];
	updateCompany: (v: CompanyCreate) => void;
	updateCompanyCompletionList: (v: Company[]) => void;
}

interface WebsiteSlice {
	website: WebsiteCreate;
	websiteCompletionList: Website[];
	updateWebsite: (v: WebsiteCreate) => void;
	updateWebsiteCompletionList: (v: Website[]) => void;
}

interface ContractSlice {
	contract: ContractCreate;
	updateContract: (v: ContractCreate) => void;
}

const contractSlice: StateCreator<AddCandidStore, [], [], ContractSlice> = (
	set,
) => ({
	contract: { type: CONTRACT_TYPES[CONTRACT_TYPES.length - 1], duration: 0 },
	updateContract: (v) =>
		set({ contract: { type: v.type, duration: v.duration || 0 } }),
});

// updateContract: (v: string) => void;

interface RemainingSlice {
	techOffer: boolean;
	unsolicited: boolean;
	answer: boolean;
	dateApply: string;

	updateTechOffer: (v: boolean) => void;
	updateUnsolicited: (v: boolean) => void;
	updateAnswer: (v: boolean) => void;
	updateDateApply: (v: string) => void;
	postCandid: () => Promise<Candid>;
}

type AddCandidStore = ComponentStateSlice &
	TechSlice &
	TitleSlice &
	UrlSlice &
	CitySlice &
	CompanySlice &
	WebsiteSlice &
	ContractSlice &
	RemainingSlice;

const componentStateSlice: StateCreator<
	AddCandidStore,
	[],
	[],
	ComponentStateSlice
> = (set, _, store) => ({
	show: false,
	loading: false,
	error: false,
	reset: () => set({ ...store.getInitialState(), show: true }),
	toggle: () => set((state) => ({ show: !state.show })),
});

const titleSlice: StateCreator<AddCandidStore, [], [], TitleSlice> = (set) => ({
	title: "",
	updateTitle: (v: string) => set({ title: v }),
});

const urlSlice: StateCreator<AddCandidStore, [], [], UrlSlice> = (
	set,
	get,
) => ({
	url: "",
	updateUrl: (v: string) => set(() => ({ url: v })),
	lookupUrl: async () => {
		try {
			set({ loading: true });

			const url = get().url;
			const hostname = getHostname(url);
			const { title, hiringOrganization, jobLocation, employmentType } =
				await scrapUrl(url);

			let d: DataFromScrap = {
				title: title,
				contract: { type: employmentType, duration: 0 },
			};
			let city: City | null;
			if (Array.isArray(jobLocation)) {
				city = await getCity(jobLocation[0].address.addressLocality, jobLocation[0].address.postalCode);
			} else {
				city = await getCity(jobLocation.address.addressLocality, jobLocation.address.postalCode);
			}
			if (city) d.city = city;

			const cp: Company = await getOrCreateCompanyByName(hiringOrganization.name);
			if (cp) d.company = cp;

			let website: Website | null = hostname
				? await getOrCreateWebsiteByName(hostname)
				: null;
			if (website) d.website = website;

			// get().updateFormFromScrappedPage(d);
			set({
				title: d.title,
				company: d.company,
				...(d.city && { city: d.city }),
				...(d.website && { webiste: d.website }),
				...(d.contract && { webiste: d.contract }),
			});
		} catch (e) {
			set({ error: true });
		} finally {
			set({ loading: false });
		}
	},
});

const citySlice: StateCreator<AddCandidStore, [], [], CitySlice> = (set) => ({
	city: { name: "", id: -1 }, // should not be -1
	cityCompletionList: [],
	updateCity: (v) => set({ city: v }),
	updateCityCompletionList: (v) => set({ cityCompletionList: v }),
});

const companyNameSlice: StateCreator<AddCandidStore, [], [], CompanySlice> = (
	set,
) => ({
	company: { name: "", id: null },
	companyCompletionList: [],
	updateCompany: (v) => set({ company: v }),
	updateCompanyCompletionList: (v) => set({ companyCompletionList: v }),
});

const websiteSlice: StateCreator<AddCandidStore, [], [], WebsiteSlice> = (
	set,
) => ({
	// TODO verifier que le state s'appelle websiteName partout..
	website: { name: "", id: null },
	websiteCompletionList: [],
	updateWebsite: (v) => set({ website: v }),
	updateWebsiteCompletionList: (v) => set({ websiteCompletionList: v }),
});

const techSlice: StateCreator<AddCandidStore, [], [], TechSlice> = (
	set,
	get,
) => ({
	tech: { name: "", id: null },
	stack: [],
	techCompletionList: [],

	updateTech: (v) => set({ tech: v }),

	updateStack: () => {
		const stack = get().stack;
		const tech = get().tech;
		!stack.includes(tech) &&
			set({ stack: [...stack, tech], tech: { name: "", id: null } });
	},

	removeStackItem: (v) => {
		let index = -1;

		for (const item of get().stack) {
			index += 1;
			if (item.id == v.id) break;
		}

		if (index == -1) return;
		set({ stack: get().stack.toSpliced(index, 1) });
	},

	updateTechCompletionList: (v) => set({ techCompletionList: v }),
});

const remainingSlice: StateCreator<AddCandidStore, [], [], RemainingSlice> = (
	set,
	get,
	store,
) => ({
	techOffer: true,
	unsolicited: false,
	answer: false,
	dateApply: formatDate(new Date()),

	updateTechOffer: (value: boolean) => set({ techOffer: value }),
	updateUnsolicited: (value: boolean) => set({ unsolicited: value }),
	updateAnswer: (value: boolean) => set({ answer: value }),
	updateDateApply: (date: string) => set({ dateApply: date }),

	postCandid: async () => {
		const payload: CandidCreate = {
			url: get().url,
			title: get().title,
			unsolicited: get().unsolicited,
			techOffer: get().techOffer,
			dateApply: new Date(get().dateApply).toISOString(),
			answer: false,
			company: get().company,
			city: get().city,
			website: get().website,
			contract: get().contract,
			stack: get().stack,
		};

		console.log("PAYLOAD ", payload);

		try {
			const candid = await postCandid(payload);
			set(store.getInitialState());
			return candid;
		} catch (e) {
			throw new Error("useAddCandid: error posting candid");
		}
	},
});

export const useAddCandidStore = create<AddCandidStore>((...a) => ({
	...componentStateSlice(...a),
	...urlSlice(...a),
	...titleSlice(...a),
	...citySlice(...a),
	...companyNameSlice(...a),
	...websiteSlice(...a),
	...techSlice(...a),
	...contractSlice(...a),
	...remainingSlice(...a),
}));
