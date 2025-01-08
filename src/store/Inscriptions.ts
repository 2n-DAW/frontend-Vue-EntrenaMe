import { Module } from "vuex";
import { Inscription } from "../shared/interfaces/entities/Inscription.interface";
import { InscriptionService } from "../services/inscription.service";

export interface InscriptionState {
    inscriptions: Inscription[];
    inscription_user: Inscription[];
}

const state: InscriptionState = {
    inscriptions: [],
    inscription_user: [],
};

export const inscription: Module<InscriptionState, any> = {
    namespaced: true,
    state,

    actions: {
        async initializeInscriptions({ commit }) {
            try {
                const response = await InscriptionService.getAll();
                
                if (response){
                    commit('setInscriptions', response.inscriptions);
                }
                

            } catch (error) {
                console.error('Error loading inscriptions:', error);
            }
        },
        async initializeInscriptionsUser({ commit }) {
            try {
                const response = await InscriptionService.getAllUser();
                if (response){
                    commit('setInscriptionsUser', response.inscriptions);
                }
                

            } catch (error) {
                console.error('Error loading inscriptions:', error);
            }
        },
        async deleteInscription({ commit }, slug_inscription: string) {
            try {
                await InscriptionService.delete(slug_inscription);
                const response = await InscriptionService.getAllUser();
                const response_all = await InscriptionService.getAll(); 
                if (response){
                    commit('setInscriptionsUser', response.inscriptions);
                }
                if (response_all){
                    commit('setInscriptions', response_all.inscriptions);
                }
            } catch (error) {
                console.error('Error deleting inscription:', error);
            }
        },
        async addInscription({ commit }, id_activity: number) {
            try {
                await InscriptionService.create(id_activity);
                const response = await InscriptionService.getAllUser();
                const response_all = await InscriptionService.getAll();
                if (response){
                    commit('setInscriptionsUser', response.inscriptions);
                }
                if (response_all){
                    commit('setInscriptions', response_all.inscriptions);
                }
            } catch (error) {
                console.error('Error adding inscription:', error);
            }
        },
    },

    mutations: {
        setInscriptions(state, inscriptions: Inscription[]) {
            state.inscriptions = inscriptions;
        },
        setInscriptionsUser(state, inscriptions: Inscription[]) {
            state.inscription_user = inscriptions;
        },
    },
    getters: {
        allInscriptions(state:InscriptionState): Inscription[] {
            return state.inscriptions;
        },
        allUserInscriptions(state:InscriptionState): Inscription[] {
            return state.inscription_user;
        },
    },
};