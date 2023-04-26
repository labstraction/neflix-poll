const seriesCollection = new Collection();

startLoading()
DataService.getSeries()
.then(data=> {
    addDataToCollection(data);
    console.log(seriesCollection);
    displayCollection()
    stopLoading();
})
.catch( err => {
    // const errorMessage = document.getElementById('error-message');

    // const errorNode = document.createTextNode('accidenti, si è verificato un errore');

    // errorMessage.appendChild(errorNode);
    displayErrorMessage('accidenti, si è verificato un errore')
    stopLoading();
})

function addDataToCollection(data){
    for (let i = 0; i < data.length; i++) {
        // const {title, seasons, creator, isCompleted, imgUrl, upVotes, downVotes, id} = data[i];
        // const newSerie = new Serie(title, creator, seasons, isCompleted, upVotes, downVotes, imgUrl, id)
        const o = data[i];
        const newSerie = new Serie(o.title, o.creator, o.seasons, o.isCompleted, o.upVotes, o.downVotes, o.imageUrl, o.id)
        seriesCollection.addSerie(newSerie);
    }
}

function displayCollection(){
    const container = document.getElementById('series-container')
    container.innerHTML = '';
    for (let i = 0; i < seriesCollection.series.length; i++) {
        const serie = seriesCollection.series[i];
        container.innerHTML += `
        <div class="card">
            <div class="serie-data">
                <img class="serie-img" src="${serie.imageUrl}" alt="image from ${serie.title}">
                <div>
                    <span class="title">${serie.title}</span>
                    <div class="subtitle">
                        <span class="creator">creator: ${serie.creator}</span>
                        <span class="seasons">seasons: ${serie.seasons} ${serie.isCompleted ? 'Completed' : ''}</span>
                    </div>
                </div>
            </div>
            <div class="button-container">
                <div id="up-container${i}">
                    <span>${serie.upVotes}</span>
                </div>
                <div id="down-container${i}">
                    <span>${serie.downVotes}</span>
                </div>
            </div>
        </div>
        `
    }


    for (let i = 0; i < seriesCollection.series.length; i++) {
        const serie = seriesCollection.series[i];
        const upContainer = document.getElementById('up-container'+i);
        const downContainer = document.getElementById('down-container'+i);

        const upButton = document.createElement('button');
        const downButton = document.createElement('button');

        upButton.appendChild(document.createTextNode('UP'));
        downButton.appendChild(document.createTextNode('DOWN'));

        upButton.addEventListener('click', (event) => upVoteClicked(serie));
        downButton.addEventListener('click', (event) => downVoteClicked(serie));

        upContainer.appendChild(upButton);
        downContainer.appendChild(downButton);
    }
}

function upVoteClicked(serie){
    serie.upVotes += 1;
    startLoading();
    DataService.putSerie(serie)
    .then(modifiedSerie => {
        stopLoading();
        displayCollection();
    })
    .catch(error => {
        stopLoading();
        displayErrorMessage('Accidenti! In questo momento non puoi votare');
    });
}

function downVoteClicked(serie){
    serie.downVotes += 1;
    DataService.putSerie(serie)
    .then(modifiedSerie => {
        stopLoading();
        displayCollection();
    })
    .catch(error => {
        stopLoading();
        displayErrorMessage('Accidenti! In questo momento non puoi votare');
    });
}

function sortCollectionByTitle(){
    seriesCollection.sortByTitle();
    displayCollection();
}

function sortCollectionByUpVotes(){
    seriesCollection.sortByUpVotes();
    displayCollection();
    
}

function sortCollectionByDownVotes(){
    seriesCollection.sortByDownVotes();
    displayCollection();
}

function sortCollectionByRating(){
    seriesCollection.sortByRating();
    displayCollection();
    
}

function saveNewSerie(){
    const titleInput = document.getElementById('title-input');
    const creatorInput = document.getElementById('creator-input');

    const newSerieTitle = titleInput.value;
    const newSerieCreator = creatorInput.value;

    const newSerie = new Serie(newSerieTitle, newSerieCreator);

    console.log('newSerie',newSerie);
    startLoading();
    DataService.postSerie(newSerie)
    .then(savedSerie => {
        stopLoading();
        //const finalSerie = new Serie(savedSerie.title, savedSerie.creator, savedSerie.seasons, savedSerie.isCompleted, savedSerie.upVotes, savedSerie.downVotes, savedSerie.imageUrl, savedSerie.id );
        newSerie.id = savedSerie.id;
        seriesCollection.addSerie(newSerie);
        displayCollection()
    })
    .catch(err => {
        startLoading();
        displayErrorMessage('Accidenti, non puoi salvare nuove serie')
    })
    // seriesCollection.addSerie(newSerie);
    // displayCollection();
}

function displayErrorMessage(message){
    const errorMessage = document.getElementById('error-message');
    const errorNode = document.createTextNode(message);
    errorMessage.appendChild(errorNode);
}

function startLoading(){
    const loadingIcon = document.getElementById('loading-icon');
    loadingIcon.style.display = 'inline-block'
}

function stopLoading(){
    const loadingIcon = document.getElementById('loading-icon');
    loadingIcon.style.display = 'none'
}