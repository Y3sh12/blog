import { req } from "@/utils/http.js";

export default {
    // 前台
    font: {
        // 底部的最新博客
        getLatest: () => req.get("/latest"),
        // 博客列表并分页
        getBlogList: (data) => req.get('/', { 'pageNum': data }),
        // 推荐文章
        getRecommendation: () => req.get("/recommend"),
        // 前3个类别
        getType: () => req.get("/types"),
        // 前6个标签
        getTag: () => req.get("/tags"),
        // 数据统计
        getCount: () => req.get("/count"),

    },
    // 后台文章管理
    back: {
        // 文章信息并分页
        getBlogList: (data) => req.get('/admin/blog', { 'pageNum': data }),
        // 所有类别及标签
        getSelectItem: () => req.get("/admin/blog/select"),
        // 删除单个
        removeSingleBlog: (data) => req.get(`/admin/blog/${data}`),
        // 批量删除
        removeBatch: (data) => req.get("/admin/blog/remove", { 'ids': data }),

    }
}