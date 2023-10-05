import axios from "axios";
import { PUBLIC_URL } from "../constant/public";
import dataType from "./DataType";

class Main {
    
    /**
     * 获取public目录下面的数据
     * @see dataType
     * @returns dataType[]
     */
    public async fetchData() {
        const respData = await axios.get(`${PUBLIC_URL}/data/data.json`);
        const finalData: dataType[] = respData.data as dataType[];
        return finalData;
    }

    /**
     * 检查这个视频在video文件夹里面有没有
     * @param video 视频
     * @returns true代表有，false代表没有
     */
    public async checkResourceStatus(video: dataType) {
        try {
            const response = await axios.head(`${PUBLIC_URL}/video/${video.fileName}`);
            // 这里只关心响应状态码，不需要响应内容
            console.log(`视频读取成功！${video.fileName}`)
            return response.status === 200; // 200表示资源存在
        } catch (error) {
            console.error('失败', video.fileName);
            return false; // 出现错误时假定资源不存在
        }
    };

    /**
     * 分页查询
     * @param data 全部数据
     * @param count 每一页的数量
     * @param curPage 当前页
     * @returns 分页查询的结果
     */
    public getPage(data: dataType[], count: number, curPage: number): dataType[] {
        let n = data.length;
        let start = (curPage - 1) * count;
        let rtnData: dataType[] = [];
        for (let i = start ; i < start + count && i < n ; i++) {
            rtnData.push(data[i]);
        }
        return rtnData;
    }

}

export default new Main();