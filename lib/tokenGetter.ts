const tokenGetter = () => {
    // Check if we're in the browser environment
    if (typeof window === 'undefined') {
        return null;
    }
    
    try {
        const token = JSON.parse(localStorage.getItem('token') || 'null');
        return token;
    } catch (error) {
        console.error('Error getting token from localStorage:', error);
        return null;
    }
}
export default tokenGetter;