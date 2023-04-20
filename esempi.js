/// esempio 1 (JSON)


class Segment{
    constructor(xA, yA, xB, yB){
        this.xA = xA;
        this.yA = yA;
        this.xB = xB;
        this.yB = yB;
    }

    calculateLength(){
        return Math.sqrt(((this.xA - this.xB) ** 2) + ((this.yA- this.yB) ** 2));
    }
}


const pippoArray = ['pippo', 'de pippis', 20];

const pippo = {
    name: 'pippo',
    surname: 'de pippis',
    age: 20,
};

const seg1 = new Segment(1,1,4,5);

console.log('esempio 1', pippo);
console.log('esempio 1', JSON.stringify(pippo));

console.log('esempio 1', seg1);
console.log('esempio 1', JSON.stringify(seg1));


const string1 = '{"name":"pippo","surname":"de pippis","age":20}'

const string1ToObject = JSON.parse(string1);

console.log('esempio 1', string1ToObject);


fetch('./config.json').then(resp => resp.json()).then(config => console.log('esempio 1',config))


// esempio 2 (static)

class Geometry{

    static PI = 3.14

    static distanceBetweenTwoPoints(xA, yA, xB, yB){
        return Math.sqrt(((xA - xB) ** 2) + ((yA - yB) ** 2));
    }

}

console.log('esempio 2', Geometry.distanceBetweenTwoPoints(1,1,4,5));

console.log('esempio 2', Geometry.PI);


// esempio 3 (than)

fetch('./config.json').then(transformResultToJson).then(logData)

function transformResultToJson(result){
    return result.json()
}

function logData(data){
    console.log('esempio 3', data)
}

// esempio 4 (costruttore di serie)

const nuovaSerie = new Serie('the mandalorian', 'john favreau');

console.log('esempio 4', nuovaSerie);