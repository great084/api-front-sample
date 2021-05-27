// Rails API 側の ベースURL
const baseURL = "https://stormy-river-94347.herokuapp.com";
// 投稿リストの DOM 要素オブジェクトを取得
const postList = document.getElementById("post-list");

// Rails の API から投稿一覧データを取得する関数
const fetchPosts = async () => {
  const url = `${baseURL}/posts`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`${response.status} (${resopnse.statusText})`);
  }

  const posts = await response.json();
  return posts;
};

const addPost = (post) => {
  const content = `
  <div id="posts-${post.id}">
  <p>タイトル: ${post.title}</p>
  <p>内容: ${post.content}</p>
  </div>
  `;
  postList.insertAdjacentHTML("beforeend", content);
};

const displayPosts = async () => {
  try {
    const posts = await fetchPosts();
    posts.forEach((post) => addPost(post));
  } catch (e) {
    alert(e);
  }
};

// 投稿ボタンの DOM 要素オブジェクトを取得
const postButton = document.getElementById("post-button");
// タイトル入力フィールドの DOM 要素オブジェクトを取得
const titleElement = document.getElementById("post-title");
// 内容入力エリアの DOM 要素オブジェクトを取得
const contentElement = document.getElementById("post-content");

// 入力内容をAPI側のサーバーに送信して保存する関数
const registerPost = async () => {
  const url = `${baseURL}/posts`;
  const PostParams = {
    post: {
      title: titleElement.value,
      content: contentElement.value,
    },
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(PostParams),
  });

  if (!response.ok) {
    throw new Error(`${response.status} (${response.statusText})`);
  }

  const post = await response.json();
  return post;
};

// フォームを送信し，入力内容を消去する関数
const postForm = async () => {
  try {
    // 入力内容をAPI側のサーバーに送信
    const post = await registerPost();
    // 入力内容を投稿リストに追加
    addPost(post);
    // 入力内容を消去
    titleElement.value = contentElement.value = "";
  } catch (e) {
    alert(e);
  }
};

// ボタンをクリックしたときにフォームを送信
postButton.addEventListener("click", postForm);

displayPosts();
