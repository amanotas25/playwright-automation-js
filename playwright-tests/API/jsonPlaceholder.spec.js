import {test, expect} from "@playwright/test";
const JsonPlaceHolder = require("#pom/API/jsonPlaceHolder");

test('JsonPlaceholder API - POST a new post test', async ({request}) => {
    const jsonPlaceHolder = new JsonPlaceHolder(request);

    const response = await jsonPlaceHolder.createPost(
        "This a just a Test from Playwright",
        "This is a post created via Playwright API test",
        1
    );

    const body = await response.json();
    expect(await response.status()).toBe(201);
    expect(body).toHaveProperty("id");
    expect(body.title).toBe("This a just a Test from Playwright")
    console.log("Created resource: ", body);
})

test('JsonPlaceholder API - GET all Posts test', async ({request}) => {
    const jsonPlaceHolder = new JsonPlaceHolder(request);

    const response = await jsonPlaceHolder.getAllPosts();
    expect(await response.status()).toBe(200);

    const body = await response.json();
    expect(body.length).toBeGreaterThan(90);
    console.log("Real body length:", body.length);
})

test('JsonPlaceholder API - GET a post by id test', async ({request}) => {
    const jsonPlaceHolder = new JsonPlaceHolder(request);

    const response = await jsonPlaceHolder.getPostById(75);
    expect(await response.status()).toBe(200);

    const body = await response.json();
    expect(body.userId).toBe(8);
    expect(body.id).toBe(75);
    expect(body).toHaveProperty("title");
    expect(body).toHaveProperty("body");
    console.log("Retrieved data with ID 75:", body);
})

test('JsonPlaceholder API - PUT a post test', async ({request}) => {
    const jsonPlaceHolder = new JsonPlaceHolder(request);

    const response = await jsonPlaceHolder.updatePost(
        66,
        "I just updated this post",
        "With playwright, just to be sure",
        105);
    expect(await response.status()).toBe(200);

    const body = await response.json();
    expect(body.id).toBe(66);
    expect(body.title).toBe("I just updated this post");
    expect(body.body).toBe("With playwright, just to be sure");
    expect(body.userId).toBe(105);

    console.log("Post Updated data:", body);
})

test('JsonPlaceholder API - DELETE a post test', async ({request}) => {
    const jsonPlaceHolder = new JsonPlaceHolder(request);

    const response = await jsonPlaceHolder.deletePost(42);
    expect(await response.status()).toBe(200);

    const body = await response.json();
    expect(body).toStrictEqual({});
    console.log("The empty body of the delete:", body);
})