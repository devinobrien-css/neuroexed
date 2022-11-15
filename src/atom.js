import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()


export const pageState = atom({
    key: "page",
    default: "home",
    effects_UNSTABLE: [persistAtom],
});

export const adminState = atom({
    key: "admin",
    default: "people",
    effects_UNSTABLE: [persistAtom],
});

export const userState = atom({
    key: "user",
    default: "",
    effects_UNSTABLE: [persistAtom],
});



export const example = atom({
    key: "example",
    default: true,
    effects_UNSTABLE: [persistAtom],
});