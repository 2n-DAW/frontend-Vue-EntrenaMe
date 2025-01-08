import { Inscription } from "../entities/Inscription.interface";

export interface InscriptionState {
    inscriptions: Inscription[];
    inscription_user: Inscription[];
}