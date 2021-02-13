
// export class LoadList {
//     constructor(input, playerList, containerList) {
//         this.input = input
//         this.playerList = playerList
//         this.containerList = containerList
//     }

//     loadPlayerList() {
//         const el = readXlsxFile(this.input.files[0]).then((data) => {
//             const containerList = this.containerList
//             const playerList = this.playerList

//             data.map((row, index) => {
//              const rows = document.createElement('div')
//                rows.className = 'player-item'
//                rows.innerHTML = `
//                <h5>${row[0]}</h5>
//                <p>${row[1]}</p>
//                <div class="lamp"></div>
//                <ion-icon name="close-outline" class="delete"></ion-icon>
//                `;
//             containerList.appendChild(rows)
//             playerList.push(rows)
//             console.log(row[1])
//             })
//         })
//     }
// }

// addPlayerToList(player) {
//     const list = this.list
//     const row = document.createElement('div')
//     row.className = 'player-item'
//     row.innerHTML = `
//                <h5>${player.name}</h5>
//                <p>${player.number}</p>
//                <div class="lamp"></div>
//                <ion-icon name="close-outline" class="delete"></ion-icon>
//        `;

//     this.playersList.push(row)
//     this.renderList()
//     list.appendChild(row)
//     this.clearFields()
// }