export interface Sport {
    id_sport: number;
    n_sport: string;
    img_sport: string;
    slug_sport: string;
}

export interface Sports {
    sports: Array<Sport>;
}