class jsonPlaceHolder {

    constructor(request){
        this.request = request;
        this.url = "https://jsonplaceholder.typicode.com";
    }

    async createPost(title, body, userId){
        return await this.request.post(`${this.url}/posts`, {
            data: {
                title,
                body,
                userId
            }
        });
    }

    async updatePost(id, title, body, userId){
        return await this.request.put(`${this.url}/posts/${id}`,{
            data: {
                id,
                title,
                body,
                userId
            }
        });
    }

    async deletePost(id){
        return await this.request.delete(`${this.url}/posts/${id}`);
    }

    async getPostById(id){
        return await this.request.get(`${this.url}/posts/${id}`);
    }

    async getAllPosts(){
        return await this.request.get(`${this.url}/posts`);
    }

}

module.exports = jsonPlaceHolder;