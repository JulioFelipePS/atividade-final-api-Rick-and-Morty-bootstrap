const rowCards = document.getElementById("rowCards")

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
            writeCards(characters)
        }catch (error) {
            console.log('Erro ao buscar mensagens', error)
        }}
    fetchName("Morty")

    function writeCards(array){
        array.forEach(element => {
            let listaUl = criarListaHTML(element.episode)
            

            rowCards.innerHTML +=`
            
            <div class="  col-6 col-sm-12 mb-5    " style="max-width: 700px; min-width: 375px;" >
                  <div class="container-fluid  ">
                    <div class="row   text-bg-dark "   >
                      <div class="col-6 pt-3 ">
                        <img src=${element.image} class="img-fluid rounded mx-auto d-block  " alt="...">
                      </div>
                      <div class="col-6 py-3  ">
                        <h1 class=" fs-3">${element.name}</h1>
                        <ul class="circle-list">
                          <li class="fs-4 ">${element.status}  - <span class="fs-4 ">${element.species}</span></li>
                        </ul>
                        <p class="mt-2 fs-5  mb-0 ">Ultima localização conhecida:</p>
                        <p class="mb-4 fs-2 ">${element.location.name}</p>
                        <p class="mb-0 fs-5 ">Visto ulktima vez em:</p>
                        <p class="fs-3 ">${element.episode[element.episode.length-1]}</p>
                        <div class="d-grid gap-2">
                          <button type="button" class="btn btn-outline-success  " data-bs-toggle="modal" data-bs-target="#exampleModal${element.id}">
                            Saiba mais
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Modal -->
                <div class="modal fade" id="exampleModal${element.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel${element.id}">Modal title</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body" id="${element.id}modal-body">
                           
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                      </div>
                    </div>
                  </div>
                </div>
            `
            
            let modalPai = document.getElementById(`${element.id}modal-body`) 
            modalPai.appendChild(listaUl)

        });
    }

    function criarListaHTML(array2) {
        let ulElement = document.createElement("ul");
    
        for (let i = 0; i < array2.length; i++) {
            let liElement = document.createElement("li");
            liElement.textContent = array2[i];
            ulElement.appendChild(liElement);
        }
        return ulElement;
    }