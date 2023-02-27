// 定義 newIndex function
function generate_newIndex() {
    // 字元表：由0~9、A~Z、a~z
    const base_62_char ="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    
    let newIndex = ""
    for (let i = 0; i<5; i++){
        const index = Math.floor(Math.random() * base_62_char.length)
        newIndex += base_62_char[index]
    }

    return newIndex
    // console.log('newIndex', newIndex)
}

// 調用 generate_newIndex function
module.exports = generate_newIndex