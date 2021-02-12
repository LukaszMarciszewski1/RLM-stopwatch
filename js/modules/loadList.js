// import { LoadList } from './playerList.json';
export class LoadList {
    constructor(){
        this.body = document.querySelector('.add-player-list')
        this.body.addEventListener('click', this.loadPlayerList.bind(this))
    }

    loadPlayerList(){
        const myInit = {
            method: 'GET',
            headers: {
                'Content-Type': 'aplication/json'
            },
            mode: 'cors',
            catche: 'default'
        }
        let myRequest = new Request("./data.json", myInit)
        function getData() {
            fetch(myRequest)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                })
        };
        document.querySelector('.add-player-list').addEventListener('click', getData);
}
}


// var XMLHttpRequestObject = false;

// if (window.XMLHttpRequest) {
//     XMLHttpRequestObject = new XMLHttpRequest();
// } else if (window.ActiveXObject) {
//     XMLHttpRequestObject = new ActiveXObject("Microsoft.XMLHTTP");
// }

// function pobierzDane() {
//     if (XMLHttpRequestObject) {
//         var p = document.getElementById("pt1");
//         XMLHttpRequestObject.open("GET", "dane.txt");
//         XMLHttpRequestObject.onreadystatechange = function () {
//             if (XMLHttpRequestObject.readyState == 4 &&
//                 XMLHttpRequestObject.status == 200) {
//                 p.innerHTML = XMLHttpRequestObject.responseText;
//             }
//         }
//         XMLHttpRequestObject.send(null);
//     }
// }