import ApiService from "../core/api.service";

// export const ArticlesService = {
//     query(type, params) {
//         return ApiService.query("articles" + (type === "feed" ? "/feed" : ""), {
//             params: params
//         });
//     },
//     get(slug) {
//         return ApiService.get("articles", slug);
//     },
//     create(params) {
//         return ApiService.post("articles", { article: params });
//     },
//     update(slug, params) {
//         return ApiService.update("articles", slug, { article: params });
//     },
//     destroy(slug) {
//         return ApiService.delete(`articles/${slug}`);
//     }
// };

export const SportService = {
    getAll() {
        console.log("getAll");
        const resp =ApiService.get("sports");
        console.log("resp", resp);
        return resp;
    },
    getById(id:string) {
        return ApiService.get(`sports/${id}`);
    },
};




