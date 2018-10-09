const api_config = {
	HOST : 'http://localhost:8000',
	DEFAUT_PARAMS : {
		token : localStorage.getItem('token') || ''
	}
}

export default api_config;