export const hasLocalStorage = () => {
    return  localStorage.getItem('email') && 
            localStorage.getItem('username') && 
            localStorage.getItem('user_id') && 
            localStorage.getItem('name')
} 