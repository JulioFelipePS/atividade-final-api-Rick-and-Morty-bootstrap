async function fetchPage(page) {
    try {
        const response = await api.get(`/character?page=${page}`)
        console.log(response.data.results)
    }catch (error) {
        console.log('Erro ao buscar mensagens', error)
    }}
    fetchPage(2)
    fetchPage(30)

    async function fetchName(name) {
        try {
            const response = await api.get(`/character?name=${name}`)
            console.log(response.data.info.pages)
            const totalPages = response.data.info.pages
            const characters = [];
            let response2
            if (totalPages===1) {
                characters.push(response.data.results)
            } else {
                for (let index = 1; index <= totalPages; index++) {
                    response2 = await api.get(`/character?page=${index}&name=${name}`)
                    response2.data.results.forEach(element => {
                        characters.push(element)
                    });
    
                }
            }
            console.log(characters)
        }catch (error) {
            console.log('Erro ao buscar mensagens', error)
        }}
    fetchName("Morty")