class DataService{


    static DATA_URL = 'https://643693bf3e4d2b4a12d6050e.mockapi.io';

    static getSeries(){
        return fetch(this.DATA_URL).then(resp => resp.json())
    }

    static putSerie(serie){
        return fetch(this.DATA_URL+'/'+serie.id, {method:'PUT', headers:{'content-type':'application/json'}, body:JSON.stringify(serie)}).then(resp => resp.json())
    }

}