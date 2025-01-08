import ApiService from "../core/api.service";
import { Inscription, Inscriptions } from "../shared/interfaces/entities/Inscription.interface";

export const InscriptionService = {
    getAll(): Promise<Inscriptions> {
        return ApiService.get<Inscriptions>("inscriptions/detailed");
    },
    getAllUser(): Promise<Inscriptions> {
        return ApiService.get<Inscriptions>(`inscriptions/user`);
    },
    delete(slug_inscription: string): Promise<Inscription> {
        return ApiService.put<Inscription>(`inscriptions/delete/${slug_inscription}`);
    },
    create(id_activity: number): Promise<Inscription> {
        console.log(id_activity);
        return ApiService.post<Inscription>("inscriptions/create", { id_activity });
    },
};




