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
        let data: dataType[] = [];
        const respData = await axios.get(`${PUBLIC_URL}/data/data.json`);
        const finalData: dataType[] = respData.data as dataType[];
        for (let i = 0 ; i < finalData.length ; i++) {
            const flag = await this.checkResourceStatus(finalData[i]);
            if (flag) {
                data.push(finalData[i]);
            }
        }
        return data;
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

}

export default new Main();