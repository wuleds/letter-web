//删除所有cookie
function clearCookies() {
    // 获取所有 cookie
    const cookies = document.cookie.split("; ");
    // 遍历所有 cookie
    for (const cookie of cookies) {
        // 将 cookie 的 `expires` 属性设置为过去的时间
        document.cookie = cookie.replace(/expires=[^;]+;?/, "expires=Thu, 01 Jan 1970 00:00:00 GMT;");
    }
}

//根据cookie的名字和值来删除cookie
function deleteAuthorization() {
    localStorage.removeItem('Authorization');
}