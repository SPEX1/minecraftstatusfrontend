"use strict";
document.addEventListener("DOMContentLoaded", () => {
    getServerInformation();
});
const serverNameElement = document.getElementById("serverName");
const serverAdressElement = document.getElementById("serverAdress");
const userElement = document.getElementById("serverOnlineUsers");
const statusIcon = document.getElementById("serverStatus");
const serverIcon = document.getElementById("serverImage");
const motdElement = document.getElementById("serverMotd");
const serverAdressName = "Hypixel.net";
async function getServerInformation() {
    try {
        const response = await fetch(`https://api.mcsrvstat.us/3/${serverAdressName}`);
        if (!response.ok) {
            throw new Error(`Error fetching server information. ${response.status}`);
        }
        const data = await response.json();
        const splitAdress = serverAdressName.split(".");
        if (!data.online) {
            serverNameElement.textContent = splitAdress[0];
            serverAdressElement.textContent = `.` + splitAdress[1];
            userElement.textContent = `0 / 0`;
            statusIcon.src = "./img/connectionempty.png";
            motdElement.textContent = `Cannot reach server...`;
        }
        else {
            const playersOnline = data.players.online;
            const playersMax = data.players.max;
            const motd = data.motd.html.join("<br>");
            if (data.icon) {
                serverIcon.src = data.icon;
            }
            serverNameElement.textContent = splitAdress[0];
            serverAdressElement.textContent = `.` + splitAdress[1];
            userElement.textContent = `${playersOnline} / ${playersMax}`;
            motdElement.innerHTML = `${motd}`;
        }
    }
    catch (error) {
    }
}
//# sourceMappingURL=script.js.map